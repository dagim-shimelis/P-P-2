// WebKit (Safari) can't keep backdrop-filter on the fixed header in sync while
// scrolling: the frost flashes sharp, stale page content through the header.
// Tag such browsers so main.css can fall back to a near-opaque scrolled header.
export default defineNuxtPlugin(() => {
    const ua = navigator.userAgent;
    const isWebKit = /applewebkit\//i.test(ua);
    const isBlink = /chrome|chromium|crios|edg(?:e|a|ium)?|fxios|opt\//i.test(ua);
    if (isWebKit && !isBlink) document.documentElement.classList.add('frost-unsafe');
});
