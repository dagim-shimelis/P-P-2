// Paste into Chrome DevTools on the homepage, at desktop or mobile width.
(async () => {
    const check = (condition, message) => { if (!condition) throw new Error(message); };
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const art = [...document.querySelectorAll('.ascii-interactive')];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wordmark = document.querySelector('.footer-wordmark');
    check(art.length === 3, 'The portrait and both hands must be interactive');
    check(+getComputedStyle(wordmark).zIndex > +getComputedStyle(document.querySelector('.footer-hands')).zIndex, 'Name must render above the artwork');
    const pixels = canvas => {
        const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        check(pixels.some((value, i) => i % 4 === 3 && value > 0), 'Artwork must render visible pixels');
        return pixels;
    };
    const same = (before, after) => {
        let difference = 0, ink = 0;
        for (let i = 3; i < before.length; i += 4) {
            difference += Math.abs(before[i] - after[i]);
            ink += Math.max(before[i], after[i]);
        }
        // Allow minor GPU/CPU text antialiasing differences after canvas readback.
        return difference / ink < .02;
    };
    for (const button of art) {
        button.scrollIntoView({ block: 'center', behavior: 'instant' });
        const canvas = button.querySelector('canvas');
        await document.fonts.ready;
        await wait(2200);
        canvas.dispatchEvent(new PointerEvent('pointerleave'));
        await wait(1200);
        check(button.tagName === 'BUTTON' && button.getAttribute('aria-label') && !button.closest('[aria-hidden="true"]'), 'Artwork needs an accessible native button');
        const box = canvas.getBoundingClientRect();
        const point = { clientX: box.left + box.width * .65, clientY: box.top + box.height * .6 };
        check(button.contains(document.elementFromPoint(point.clientX, point.clientY)), 'Artwork must receive pointer input');
        const initial = pixels(canvas);
        canvas.dispatchEvent(new PointerEvent('pointermove', { ...point, pointerType: 'mouse', bubbles: true }));
        await wait(80);
        const entering = pixels(canvas);
        await wait(1000);
        check(same(pixels(canvas), initial) === reduced, 'Hover effect must respect reduced motion');
        if (!reduced) check(!same(entering, pixels(canvas)), 'Hover must build gradually');
        canvas.dispatchEvent(new PointerEvent('pointerleave'));
        await wait(80);
        if (!reduced) check(!same(pixels(canvas), initial), 'Hover must fade out instead of snapping off');
        await wait(1200);
        check(same(pixels(canvas), initial), `${button.getAttribute('aria-label')}: pointer exit must restore and settle the art`);
        button.click();
        await wait(50);
        check(button.getAttribute('aria-pressed') === 'true', 'Click must toggle the artwork');
        check(art.filter(other => other !== button).every(other => other.getAttribute('aria-pressed') === 'false'), 'Artworks must toggle independently');
        const early = pixels(canvas);
        await wait(850);
        const changed = pixels(canvas);
        check(!same(changed, initial), 'Click must change the rendered shading');
        if (reduced) check(same(early, changed), 'Reduced motion must switch shading without animation');
        await wait(100);
        check(same(pixels(canvas), changed), 'Click animation must settle');
        button.click();
        await wait(900);
        check(button.getAttribute('aria-pressed') === 'false' && same(pixels(canvas), initial), 'Second click must restore the original shading');
    }
    check(document.documentElement.scrollWidth <= innerWidth + 1, 'Page must fit the viewport');
    return { passed: true, artworks: art.length, width: innerWidth, reducedMotion: reduced };
})()
