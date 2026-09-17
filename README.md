# Dagim Shimelis — portfolio

```sh
pnpm install
pnpm dev
pnpm build
```

PostHog: copy `.env.example` to `.env`, set your public project token and region,
and add the same variables to your hosting provider. Tracking runs in production
builds only, after the browser becomes idle: initial pageviews, client-side route
changes, and automatic interaction capture. Session replay is disabled.
Run `node scripts/check-analytics.mjs` to check initialization and its guards.

The portfolio uses a dark/light editorial layout, orange ASCII artwork, a sticky selected-work index, and large project imagery. The work archive uses a two-column grid, with one column on phones. The site covers Dagim's background, process, projects, writing, and contact details.

- Colors: `#141314`, `#eeeeee`, `#fd551d`; artwork: `#ff6b4a`.
- Type: Helvetica Neue (approved substitute for Aktiv Grotesk), self-hosted Geist Mono, and the existing Fractul font for the wordmark.
- Project content: `data/projects-list.json`; selection and presentation: `data/portfolio.js`.
- The About and menu portraits use Dagim's existing photo at `public/images/about-image.png`. Contact uses `public/images/rebrand/contact-portrait.webp`, framed with a square CSS crop. The workspace section uses `public/images/rebrand/workspace.webp` with a 4:5 crop and a black-and-white CSS filter.
- The ASCII renderer accepts an image through `src`. The hero uses Vermeer's *Girl with a Pearl Earring*; the footer uses the hands from Michelangelo's *The Creation of Adam*. Both use cropped public-domain artwork. Hover to distort the glyphs; click or press Enter/Space to invert the shading. Reduced motion switches the shading without animation. Run `scripts/check-ascii-art.js` in the homepage console to check all three artworks.
- Geist Mono's SIL Open Font License is included in `public/fonts/geist-mono/LICENSE`.

Paste `scripts/check-portfolio.js` into Chrome DevTools' console on `/` and `/projects/list` to check content, navigation, artwork, filters, project grid layout, and image loading. Repeat at desktop and mobile widths. Test the menu's Escape key and focus return manually. Motion respects `prefers-reduced-motion`. The footer includes a Back to top link.
