import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const source = readFileSync(new URL('../plugins/analytics.client.ts', import.meta.url), 'utf8')
  .replace('export default ', '')
  .replaceAll('import.meta.dev', 'isDev')
  .replaceAll('import(', 'loadModule(')

for (const isDev of [false, true]) {
  for (const posthogKey of ['', 'phc_test']) {
    for (const idle of [false, true]) {
      const calls = []
      const pending = []
      let scheduled
      runInNewContext(source, {
        isDev,
        console,
        window: idle ? { requestIdleCallback: true } : {},
        requestIdleCallback: (callback) => { scheduled = callback },
        setTimeout: (callback) => { scheduled = callback },
        defineNuxtPlugin: (setup) => setup(),
        useRuntimeConfig: () => ({ public: { posthogKey, posthogHost: 'https://eu.i.posthog.com' } }),
        loadModule: (name) => {
          calls.push(['import', name])
          const promise = Promise.resolve({
            inject() {},
            default: { init: (...args) => calls.push([name, ...args]) },
          })
          pending.push(promise)
          return promise
        },
      })
      assert.equal(calls.length, 0, 'Analytics must wait for idle scheduling')
      scheduled()
      await Promise.all(pending)
      const enabled = !isDev && Boolean(posthogKey)
      assert.equal(calls.some(([kind, name]) => kind === 'import' && name === 'posthog-js'), enabled)
      const init = calls.find(([name]) => name === 'posthog-js')
      assert.equal(Boolean(init), enabled)
      if (enabled) {
        assert.equal(init[1], posthogKey)
        assert.equal(init[2].api_host, 'https://eu.i.posthog.com')
        assert.equal(init[2].defaults, '2026-05-30')
        assert.equal(init[2].capture_pageview, 'history_change')
        assert.equal(init[2].autocapture, true)
        assert.equal(init[2].disable_session_recording, true)
      }
    }
  }
}
console.log('Analytics checks passed (production/dev, key/no key, idle/timeout).')
