export default defineNuxtPlugin(() => {
  if (import.meta.dev) return
  const { gaId, clarityId, posthogKey, posthogHost } = useRuntimeConfig().public
  const load = () => {
    if (gaId) {
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
      script.async = true
      document.head.append(script)
    }
    if (posthogKey) {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          defaults: '2026-05-30',
          capture_pageview: 'history_change',
          autocapture: true,
          person_profiles: 'identified_only',
          disable_session_recording: true,
          disable_surveys: true,
        })
      }).catch((error) => console.warn('PostHog failed to load', error))
    }
    import('@vercel/analytics').then(({ inject }) => inject()).catch((error) => console.warn('Vercel Analytics failed to load', error))
    if (clarityId) import('@microsoft/clarity').then(({ default: clarity }) => {
      clarity.init(clarityId)
    }).catch((error) => console.warn('Clarity failed to load', error))
  }
  if (gaId) {
    // Queue the initial visit now; download the SDK after the page has loaded.
    useHead({ script: [{ innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaId).replace(/</g, '\\u003c')});` }] })
  }
  const schedule = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 2000 })
    else setTimeout(load, 0)
  }
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
})
