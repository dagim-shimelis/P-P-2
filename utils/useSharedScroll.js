// One shared window scroll listener for the many components that need to react
// to scrolling (e.g. hiding card cursors). A single listener instead of one per
// component instance keeps long lists cheap.
const callbacks = new Set();
let listening = false;

function handleScroll() {
    for (const callback of callbacks) callback();
}

/**
 * Register a scroll callback on a single shared listener.
 * Returns a cleanup function that removes the callback (and the listener
 * itself once nothing is registered anymore).
 */
export function onSharedWindowScroll(callback) {
    if (typeof window === 'undefined') return () => {}; // SSR: no scroll events
    callbacks.add(callback);
    if (!listening) {
        listening = true;
        window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    }
    return () => {
        callbacks.delete(callback);
        if (!callbacks.size && listening) {
            listening = false;
            window.removeEventListener('scroll', handleScroll, true);
        }
    };
}
