// Paste into the browser console on the homepage or work archive.
(async () => {
    const passed = [];
    const check = (condition, message) => {
        if (!condition) throw new Error(message);
        passed.push(message);
    };
    const settle = () => new Promise(resolve => setTimeout(resolve, 100));
    check(document.querySelectorAll('main').length === 1, 'One main landmark');
    check(document.querySelectorAll('h1').length === 1, 'One page heading');
    check(document.documentElement.scrollWidth <= innerWidth + 1, 'No horizontal overflow');
    for (const link of document.querySelectorAll('a[href^="#"]')) {
        check(!!document.getElementById(link.hash.slice(1)), `Anchor exists: ${link.hash}`);
    }
    for (const link of document.querySelectorAll('.project-card a[target="_blank"]')) {
        check(link.rel.includes('noopener'), 'Project links protect the opener');
    }
    for (const preview of document.querySelectorAll('.project-visual')) {
        const cursor = preview.querySelector('.project-cursor');
        const archived = preview.closest('.project-archived');
        check(archived ? !cursor : cursor?.textContent === 'View website ↗', 'Only live projects have the website cursor');
        const { left, top } = preview.getBoundingClientRect();
        for (const offset of [100, 160]) {
            preview.querySelector('img').dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse', clientX: left + offset, clientY: top + offset }));
            check(archived ? !preview.style.getPropertyValue('--cursor-x') : Math.abs(parseFloat(preview.style.getPropertyValue('--cursor-x')) - offset) < 1 && Math.abs(parseFloat(preview.style.getPropertyValue('--cursor-y')) - offset) < 1, 'Cursor follows nested preview movement only on live projects');
        }
        await settle();
        check(archived || preview.classList.contains('cursor-visible'), 'Pointer movement shows the website cursor');
        window.dispatchEvent(new Event('scroll'));
        await settle();
        check(!preview.classList.contains('cursor-visible'), 'Scrolling dismisses the website cursor');
        if (cursor) check(getComputedStyle(cursor).opacity === '0', 'Website cursor is invisible after scrolling');
        preview.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', clientX: left + 170, clientY: top + 170 }));
        await settle();
        check(archived || preview.classList.contains('cursor-visible'), 'Pointer movement restores the website cursor after scrolling');
        preview.dispatchEvent(new PointerEvent('pointerleave'));
        await settle();
        check(!preview.classList.contains('cursor-visible'), 'Leaving the project dismisses the website cursor');
        const position = preview.style.cssText;
        preview.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'touch', clientX: left + 200, clientY: top + 200 }));
        check(preview.style.cssText === position, 'Touch does not move the website cursor');
        check(!preview.classList.contains('cursor-visible'), 'Touch does not show the website cursor');
        if (cursor) check(getComputedStyle(cursor).pointerEvents === 'none', 'Website cursor cannot block project clicks');
        if (cursor && !matchMedia('(hover: hover) and (pointer: fine)').matches) check(getComputedStyle(cursor).display === 'none', 'Website cursor stays hidden on touch screens');
        preview.style.removeProperty('--cursor-x');
        preview.style.removeProperty('--cursor-y');
    }
    const menu = document.querySelector('#site-menu');
    if (menu) {
        document.querySelector('[aria-controls="site-menu"]').click();
        await settle();
        check(menu.open && menu.contains(document.activeElement), 'Menu opens and receives focus');
        menu.querySelector('button').click();
        await settle();
        check(!menu.open && document.querySelector('[aria-controls="site-menu"]').getAttribute('aria-expanded') === 'false', 'Menu closes and resets its state');
    }
    const next = document.querySelector('[aria-label="Next testimonial"]');
    if (next) {
        const original = document.querySelector('blockquote').textContent;
        next.click();
        await settle();
        check(document.querySelector('blockquote').textContent !== original, 'Next testimonial changes the quote');
        document.querySelector('[aria-label="Previous testimonial"]').click();
        await settle();
        check(document.querySelector('blockquote').textContent === original, 'Previous testimonial restores the quote');
    }
    const filters = [...document.querySelectorAll('.archive-filters button')];
    if (filters.length) {
        const total = document.querySelectorAll('.project-card').length;
        for (const button of filters) {
            button.click();
            await settle();
            check(button.getAttribute('aria-pressed') === 'true' && filters.filter(item => item.getAttribute('aria-pressed') === 'true').length === 1, `${button.textContent}: exactly one active filter`);
            const inactive = filters.find(item => item !== button);
            check(getComputedStyle(button).borderBottomColor !== getComputedStyle(inactive).borderBottomColor, `${button.textContent}: active filter has a distinct underline`);
            check(filters.every(item => getComputedStyle(item).backgroundColor === 'rgba(0, 0, 0, 0)'), 'Filters do not inherit the solid action button background');
            check(filters.every(item => item.getBoundingClientRect().height >= 44 && item.scrollWidth <= item.clientWidth + 1), 'Filter labels fit inside touch-sized controls');
            check(document.querySelector('.archive-toolbar [role="status"]').textContent.trim() === `${document.querySelectorAll('.project-card').length} projects`, 'Result count matches the visible projects');
        }
        filters.find(button => button.textContent === 'Independent products').click();
        await settle();
        check(document.querySelectorAll('.project-card').length === 2, 'Independent products filter returns both startups');
        filters.find(button => button.textContent === 'Archive').click();
        await settle();
        check(document.querySelectorAll('.project-card').length > 0 && !document.querySelector('.project-card a'), 'Archived projects cannot open offline sites');
        filters[0].click();
        await settle();
        check(document.querySelectorAll('.project-card').length === total, 'All filter restores the complete collection');
        const gallery = document.querySelector('.archive-gallery');
        if (gallery) {
            const columns = matchMedia('(max-width: 767px)').matches ? 1 : 2;
            const cards = [...gallery.children].map(card => card.getBoundingClientRect());
            check(cards.slice(0, columns).every(card => Math.abs(card.top - cards[0].top) < 1) && cards[columns].top >= cards[0].bottom, `Projects wrap into rows of ${columns}`);
            check(gallery.scrollWidth <= gallery.clientWidth + 1, 'Project grid has no horizontal overflow');
            check(!document.querySelector('.gallery-controls'), 'Carousel controls are removed');
        }
    }
    check(document.querySelector('.footer-back-top')?.getAttribute('href') === '#main-content', 'Footer links back to the top of the page');
    check(!document.querySelector('.footer-tools'), 'Grid and color controls are removed');
    const canvas = document.querySelector('.hero-art canvas');
    if (canvas) {
        await new Promise(resolve => setTimeout(resolve, 2100));
        const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        check(pixels.some((value, index) => index % 4 === 3 && value > 0), 'ASCII portrait has rendered visible pixels');

    }
    const assets = [...new Set([...document.images].map(image => image.getAttribute('src')).filter(src => src?.startsWith('/')))];
    const responses = await Promise.all(assets.map(async src => ({ src, response: await fetch(src, { method: 'HEAD' }) })));
    for (const { src, response } of responses) check(response.ok, `Image exists: ${src}`);
    console.info(`Portfolio check: ${passed.length} passed at ${innerWidth}px`, passed);
    return { passed: passed.length, width: innerWidth, path: location.pathname };
})()
