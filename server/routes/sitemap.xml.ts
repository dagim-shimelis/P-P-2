export default defineEventHandler((event) => {
    setHeader(event, 'content-type', 'application/xml; charset=utf-8')

    const baseUrl = 'https://dagim.codes'
    const today = new Date().toISOString().split('T')[0]

    const staticRoutes = [
        { path: '/', priority: '1.0', changefreq: 'monthly' },
        { path: '/projects/list', priority: '0.8', changefreq: 'monthly' },
    ]

    const urls = staticRoutes
        .map(
            (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
        )
        .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
})
