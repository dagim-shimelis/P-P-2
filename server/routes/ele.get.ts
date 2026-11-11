import page from '../../data/elephant-shape-comparison.json';

export default defineEventHandler((event) => {
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8');
    setHeader(event, 'X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return page;
});
