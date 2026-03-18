export default defineNuxtPlugin(() => {
  const { clarityId } = useRuntimeConfig().public
  const load = () => {
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
