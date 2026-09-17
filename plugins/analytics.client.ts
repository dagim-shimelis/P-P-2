export default defineNuxtPlugin(() => {
  const { clarityId, posthogKey, posthogHost } = useRuntimeConfig().public
  const load = () => {
    if (!import.meta.dev && posthogKey) {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          defaults: '2026-05-30',
          capture_pageview: 'history_change',
          autocapture: true,
          person_profiles: 'identified_only',
          disable_session_recording: true,
        })
      }).catch((error) => console.warn('PostHog failed to load', error))
    }
    import('@vercel/analytics').then(({ inject }) => inject())
    import('@microsoft/clarity').then(({ default: clarity }) => {
      clarity.init(clarityId)
    })
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(load)
  } else {
    setTimeout(load, 2000)
  }
})
