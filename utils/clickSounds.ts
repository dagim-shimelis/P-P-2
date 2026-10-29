export type ClickSound = 'action' | 'empty' | 'illustration'

// Explicit markers override semantic detection for custom controls and backdrops.
export function classifyClick(event: MouseEvent): ClickSound | null {
  if (event.button !== 0) return null
  const path = event.composedPath().filter((node): node is Element => node instanceof Element)
  if (path.some(el => el.matches('[disabled], [aria-disabled="true"], [inert], [data-click-sound="off"]'))) return null
  for (const el of path) {
    const sound = el.getAttribute('data-click-sound')
    if (sound === 'action' || sound === 'empty' || sound === 'illustration') return sound
    if (sound === 'self-action' && el === path[0]) return 'action'
    if (el.matches('a[href], button, input, select, textarea, summary, label, [role="button"], [role="link"], [role="tab"], [role="checkbox"], [role="switch"], [contenteditable="true"]')) return 'action'
  }
  return 'empty'
}

export function createClickSounds() {
  let context: AudioContext | undefined
  let master: GainNode
  let noise: AudioBuffer
  let count = 0
  let disposed = false

  function initialize() {
    if (context) return context
    const Audio = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Audio) return
    context = new Audio()
    master = context.createGain()
    // Match the audition's volume and compressor exactly.
    master.gain.value = .45 * .7
    const limiter = context.createDynamicsCompressor()
    limiter.threshold.value = -12
    limiter.knee.value = 12
    limiter.ratio.value = 8
    master.connect(limiter)
    limiter.connect(context.destination)
    noise = context.createBuffer(1, context.sampleRate * .3, context.sampleRate)
    const data = noise.getChannelData(0)
    let seed = 12345
    for (let i = 0; i < data.length; i++) {
      seed = (seed * 16807) % 2147483647
      data[i] = seed / 2147483647 * 2 - 1
    }
    return context
  }

  function tone(time: number, frequency: number, end: number, duration: number, amplitude: number, type: OscillatorType = 'sine') {
    const ctx = context!
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, time)
    oscillator.frequency.exponentialRampToValueAtTime(end, time + duration)
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(amplitude, time + .002)
    gain.gain.exponentialRampToValueAtTime(.0001, time + duration)
    oscillator.connect(gain)
    gain.connect(master)
    oscillator.start(time)
    oscillator.stop(time + duration + .01)
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
  }

  async function play(sound: ClickSound) {
    try {
      if (disposed) return
      const ctx = initialize()
      if (!ctx) return
      await ctx.resume()
      if (disposed || ctx.state !== 'running') return
      const time = ctx.currentTime + .004
      const pitch = 1 + Math.sin(++count * 2.4) * .035
      if (sound === 'action') {
        // Frost dust is copied from the audition's no-action channel: retain its quiet gain.
        const source = ctx.createBufferSource()
        const filter = ctx.createBiquadFilter()
        const gain = ctx.createGain()
        source.buffer = noise
        filter.type = 'bandpass'
        filter.frequency.value = 3900 * pitch
        filter.Q.value = 2
        gain.gain.setValueAtTime(0, time)
        gain.gain.linearRampToValueAtTime(.32 * .45, time + .001)
        gain.gain.exponentialRampToValueAtTime(.0001, time + .038)
        source.connect(filter)
        filter.connect(gain)
        gain.connect(master)
        source.start(time)
        source.stop(time + .048)
        source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect() }
      } else if (sound === 'empty') {
        tone(time, 170 * pitch, 150 * pitch, .034, .22 * .45, 'triangle')
      } else {
        tone(time, 1400 * pitch, 1380 * pitch, .11, .23)
        tone(time, 3200 * pitch, 3150 * pitch, .055, .09)
        tone(time + .06, 2200 * pitch, 2170 * pitch, .14, .18)
      }
    } catch {
      // Audio is optional: unsupported browsers or playback restrictions must never block a click.
    }
  }

  function setMuted(muted: boolean) {
    if (context && master) master.gain.setTargetAtTime(muted ? 0 : .45 * .7, context.currentTime, .01)
  }

  function dispose() {
    disposed = true
    void context?.close().catch(() => {})
  }
  return { play, setMuted, dispose }
}
