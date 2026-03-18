export default defineNuxtPlugin(() => {
  const load = () => {
    import('@vercel/analytics').then(({ inject }) => inject())
    import('@microsoft/clarity').then(({ default: clarity }) => {
      clarity.init('REPLACE_WITH_YOUR_CLARITY_PROJECT_ID')
    })
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(load)
  } else {
    setTimeout(load, 2000)
  }
})
