import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const source = readFileSync(new URL('../plugins/analytics.client.ts', import.meta.url), 'utf8')
  .replace('export default ', '')
  .replaceAll('import.meta.dev', 'isDev')
  .replaceAll('import(', 'loadModule(')

for (const isDev of [false, true]) {
  for (const configured of [false, true]) {
    for (const idle of [false, true]) {
      for (const readyState of ['loading', 'complete']) {
        const calls = []
        const pending = []
        let scheduled, loaded
        const schedule = (callback) => { scheduled = callback }
        runInNewContext(source, {
          isDev,
          console,
          window: {
            ...(idle ? { requestIdleCallback: schedule } : {}),
            addEventListener: (event, callback, options) => {
              assert.equal(event, 'load')
              assert.equal(options.once, true)
              loaded = callback
            },
          },
          document: {
            readyState,
            createElement: () => ({}),
            head: { append: (script) => calls.push(['script', script]) },
          },
          setTimeout: schedule,
          defineNuxtPlugin: (setup) => setup(),
          useHead: (head) => calls.push(['head', head]),
          useRuntimeConfig: () => ({ public: {
            gaId: configured ? 'G-TEST' : '',
            clarityId: configured ? 'clarity_test' : '',
            vercelAnalytics: configured,
          } }),
          loadModule: (name) => {
            calls.push(['import', name])
            const promise = Promise.resolve({
              inject: () => calls.push(['vercel']),
              default: { init: (...args) => calls.push([name, ...args]) },
            })
            pending.push(promise)
            return promise
          },
        })
        assert.equal(calls.some(([kind]) => kind === 'import' || kind === 'script'), false, 'No analytics downloads during startup')
        if (isDev) {
          assert.equal(calls.length, 0)
          assert.equal(scheduled, undefined)
          assert.equal(loaded, undefined)
          continue
        }
        if (readyState === 'loading') {
          assert.equal(scheduled, undefined, 'Idle alone must not start analytics before page load')
          loaded()
        }
        scheduled()
        await Promise.all(pending)
        assert.equal(calls.some(([name]) => name === 'vercel'), configured)
        assert.equal(calls.some(([kind, name]) => kind === 'import' && name === '@microsoft/clarity'), configured)
        const script = calls.find(([kind]) => kind === 'script')?.[1]
        assert.equal(Boolean(script), configured)
        if (configured) {
          assert.equal(script.src, 'https://www.googletagmanager.com/gtag/js?id=G-TEST')
          assert.equal(script.async, true)
          const queue = {}
          runInNewContext(calls.find(([kind]) => kind === 'head')[1].script[0].innerHTML, { window: queue, dataLayer: queue.dataLayer = [] })
          assert.equal(queue.dataLayer[1][0], 'config')
          assert.equal(queue.dataLayer[1][1], 'G-TEST')
        }
      }
    }
  }
}
console.log('GA, Clarity, and Vercel Analytics checks passed (production/dev, configured/missing IDs, idle/timeout, loading/loaded).')
