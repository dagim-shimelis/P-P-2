import { classifyClick, createClickSounds } from '~/utils/clickSounds'

export default defineNuxtPlugin(() => {
  const enabled = useState('click-sounds-enabled', () => true)
  const storageKey = 'portfolio-click-sounds-enabled'
  try { enabled.value = localStorage.getItem(storageKey) !== 'false' } catch {}
  const sounds = createClickSounds()
  const unwatch = watch(enabled, value => {
    sounds.setMuted(!value)
    try { localStorage.setItem(storageKey, String(value)) } catch {}
  }, { flush: 'sync' })

  const onClick = (event: MouseEvent) => {
    // Ignore script-generated clicks (including the second click forwarded by a label).
    if (!enabled.value || !event.isTrusted) return
    const sound = classifyClick(event)
    if (sound) void sounds.play(sound)
  }
  // Capture before routing or a dialog close changes the clicked element's ancestry.
  document.addEventListener('click', onClick, true)
  if (import.meta.hot) import.meta.hot.dispose(() => {
    document.removeEventListener('click', onClick, true)
    unwatch()
    sounds.dispose()
  })
})
