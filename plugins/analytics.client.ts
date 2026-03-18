export default defineNuxtPlugin(() => {
  const load = () => {
    import('@vercel/analytics').then(({ inject }) => inject())
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(load)
  } else {
    setTimeout(load, 2000)
  }
})
