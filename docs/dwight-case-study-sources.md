# Dwight case study sources

This note records the evidence used for `/projects/dwight`. The Dwight repositories were inspected read-only. No usage metrics, interviews, dates, user counts, conversion claims, or unsupported authorship claims were added.

## Public links verified

Checked for successful public responses during implementation:

- Product: https://www.dwightprompt.com/
- Support: https://www.dwightprompt.com/support
- Product guide: https://www.dwightprompt.com/support/prompts
- Contact: `hello@dwightprompt.com`, published in the website privacy and terms pages

The inspected GitHub remotes for the app and extension returned 404 publicly, so the case study does not present those repositories as public links.

## Product and interface sources

### Web application

Repository: `/Users/macbookpro/Documents/Code/Dwight Workspace/Dwight-app`

- `README.md` — product overview; Playground, history, libraries, profiles, authentication, quality metrics, and technology stack
- `pages/playground.vue` — original/improved two-column flow, persona selection, editable output, copy, save, statistics, and links into supported AI platforms
- `pages/history.vue`, `components/history/*`, `stores/history.js` — improvement history behavior
- `pages/saved.vue`, `components/saved/*`, `stores/saved.js` — curated saved prompts, search, filters, pagination, and CRUD behavior
- `pages/library/*`, `components/library/*`, `stores/library.js` — named library organization
- `components/profile/ProfileDialog.vue`, `stores/profile.js` — reusable persona and formatting settings
- `pages/onboarding/extension.vue`, `components/onboarding/interactive/StepExtension.vue`, `components/onboarding/interactive/StepPlatforms.vue` — extension onboarding and supported-platform explanation

### API

Repository: `/Users/macbookpro/Documents/Code/Dwight Workspace/better-prompt`

- `README.md`, `package.json` — NestJS, TypeScript, PostgreSQL, Prisma, Better Auth, and AI-provider architecture
- `src/tools/tools.service.ts` — improvement response shape and calculated prompt statistics
- `src/tools/utils/build-profile-instructions.ts` — persona, style, audience, format, language, length, additional instruction, and PII-masking options
- `src/library/*` — libraries and saved-prompt ownership/CRUD behavior
- `src/profiles/*` — profile persistence and subscription-aware creation
- `src/subscription/*` — plan limits, quota locking, Stripe integration, and usage state
- `src/security.integration.spec.ts` — ownership and concurrent quota/referral checks; used only as implementation evidence, not generalized into a security claim

### Chromium extension

Repository: `/Users/macbookpro/Documents/Code/Dwight Workspace/Dwight-extention-chromium`

- `wxt.config.js`, `entrypoints/playground.content/index.js`, `utils/domain-config.js` — supported domains: ChatGPT, Claude, Gemini, DeepSeek, Grok, and Perplexity
- `entrypoints/content.js` — injected control, SPA reinjection lifecycle, keyboard shortcut, prompt read/apply behavior, and inline improvement flow
- `utils/injection-manager.js` — navigation detection, mutation observation, cleanup, and reinjection
- `utils/api-client.js`, `utils/content-api.js`, `utils/schemas.js`, `utils/rate-limiter.js` — API communication, response validation, and rate limiting
- `components/features/*`, `components/content/PlaygroundPanel.vue` — extension views for Playground, history, libraries, saved prompts, and profiles

### Marketing and support site

Repository: `/Users/macbookpro/Documents/Code/Dwight Workspace/Dwight-website`

- `components/landing/Features.vue`, `Comparison.vue`, `FAQ.vue`, `Integrations.vue` — public product framing
- `pages/support/prompts.vue` — public descriptions of Playground, history, saved prompts, libraries, personas, and statistics
- `pages/support/integrations.vue` — public extension workflow and supported platforms
- `pages/support/privacy.vue`, `pages/privacy.vue` — public explanation of extension access and prompt handling; only implementation-relevant statements were used

## Image provenance

Copied into `public/images/projects/dwight-case-study/` from repository-controlled Dwight assets:

- `playground.png`, `persona.png`, `history.png`, `library.png`, `comparison.png`
  - Source: `Dwight-extention-chromium/store-assets/screenshots/`
  - These are promotional compositions based on product UI. Captions identify them as promotional artwork rather than literal production screenshots or user evidence.
- `demo-poster.jpg`
  - Source: `Dwight-website/public/videos/dwight-demo-poster.jpg`
  - Retained as a sourced asset but not required in the final page.
- Hero image: existing portfolio asset `public/images/projects/dwight-prompt-1080.webp`

## Interpretation boundaries

- The workflow slider is explicitly labeled illustrative. Its stages summarize implemented behavior; they are not analytics stages or research findings.
- Promotional image copy and example prompt scores are not treated as measured outcomes.
- The source contains configurable subscription limits and marketing examples. The case study avoids time-sensitive price/limit claims.
- The source includes tests and defensive implementation choices. The case study describes those choices without claiming universal security, reliability, or performance.
- No private repository is linked as if it were publicly accessible.
- No usage, conversion, or performance claims are made. The case study documents implemented behavior and public product material rather than inferring results the available sources do not establish.
- The extension copy is limited to the triggered improvement path proven in `entrypoints/content.js`; it does not claim that prompt text can never be accessed through any other extension interaction.
