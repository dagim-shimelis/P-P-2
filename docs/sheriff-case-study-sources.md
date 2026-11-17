# Sheriff case study sources

This note records the provenance used for `/projects/sheriff`. The Sheriff repositories were treated as read-only.

## Product and engineering sources

- `/Users/macbookpro/.paradev/projects/sheriff/README.md`
  - Product definition, supported hosts, installation, Run/Audit/Sync behavior, configuration, `.sheriff/` state layout, safety rules, limitations, and verification language.
- `/Users/macbookpro/.paradev/projects/sheriff/package.json`
  - Package name, current local source version (`0.2.1`), Node requirement, scripts, and executable entry point.
- `/Users/macbookpro/.paradev/projects/sheriff/sheriff/runtime.md`
  - Host-specific execution model, evidence requirements, authorization boundaries, ownership, retries, and recovery rules.
- `/Users/macbookpro/.paradev/projects/sheriff/workflows/run.md`
  - Discovery, planning, execution, dependency ordering, reporting, and resume behavior.
- `/Users/macbookpro/.paradev/projects/sheriff/workflows/audit.md`
  - Audit scope, authorization, findings, and test synchronization after fixes.
- `/Users/macbookpro/.paradev/projects/sheriff/workflows/sync.md`
  - Change selection, affected-test review, missing-assertion checks, and synchronization behavior.
- `/Users/macbookpro/.paradev/projects/sheriff/bin/install.js`
  - Package-manager detection, local/global installation, ownership checks, adapters, atomic writes, and rollback behavior.
- `/Users/macbookpro/.paradev/projects/sheriff/sheriff/bin/sheriff-tools.js`
  - State CLI commands for claims, results, handoffs, summaries, test maps, and Git safety helpers.
- `/Users/macbookpro/.paradev/projects/sheriff/docs/verification/codex-live-2026-10-14.md`
  - Fixture-specific Codex acceptance evidence and explicit limits. The case study intentionally does not turn this fixture into a general product metric.
- `/Users/macbookpro/.paradev/projects/sheriff/docs/verification/claude-live-2026-10-14.md`
  - Claude command discovery and the blocked live acceptance attempt. No Claude workflow pass is claimed.

## Website and visual sources

- `/Users/macbookpro/.paradev/projects/sheriff-website/src/app/page.tsx`
  - Public product copy, Run/Audit/Sync descriptions, principles, and links.
- `/Users/macbookpro/.paradev/projects/sheriff-website/src/components/workflow-cards.tsx`
  - Public workflow descriptions and command forms.
- `/Users/macbookpro/.paradev/projects/sheriff-website/README.md`
  - Website stack, content relationship to the package repository, accessibility notes, and documentation-version caveat.
- `/Users/macbookpro/.paradev/projects/sheriff/assets/banner.png`
  - Copied to `public/images/projects/sheriff-case-study/package-banner.png`.
- `/Users/macbookpro/.paradev/projects/sheriff/docs/images/testing-workflow.png`
  - Copied to `public/images/projects/sheriff-case-study/testing-workflow.png`.
- `/Users/macbookpro/.paradev/projects/sheriff-website/public/images/frontier.webp`
  - Copied to `public/images/projects/sheriff-case-study/frontier.webp`.
- `/Users/macbookpro/.paradev/projects/sheriff-website/public/images/the-posse.webp`
  - Copied to `public/images/projects/sheriff-case-study/the-posse.webp`.
- `/Users/macbookpro/.paradev/projects/sheriff-website/public/images/saddle-up-desert.webp`
  - Copied to `public/images/projects/sheriff-case-study/saddle-up-desert.webp`.
- Existing portfolio capture `public/images/projects/sheriff-hq.webp`
  - Copied to `public/images/projects/sheriff-case-study/website-home.webp`.

The Sheriff website repository describes these as supplied artwork. Creator and licensing details were not present in the inspected files, so the case study does not add an attribution claim.

## Illustrative content

The interactive workflow panel on the case study is explicitly labeled as an illustrative example. Its sample filenames, phase names, finding text, and UI statuses are not presented as customer data or measured project output. The stage names and orchestration behavior are sourced from the Sheriff runtime and workflow documentation.

## Uncertainties and constraints

- The package source reports version `0.2.1`, while the inspected website README says its current docs target `0.2.0`. The case study avoids displaying a version number in the interface.
- Live acceptance evidence is narrow and fixture-specific. The page states that it does not establish universal framework support.
- No user counts, adoption numbers, coverage gains, speed improvements, dates, customer claims, or performance achievements are asserted.
- The original case-study direction was generated with the portfolio’s paper/ink/orange palette and type preserved. The page was subsequently restructured into a calm, centered editorial case-study layout inspired by the information architecture of `https://charleshonig.design/contracts`, without copying its content or assets.
- The implemented controls are a keyboard-accessible Full/TL;DR view toggle, anchored section navigation with scroll tracking, and the keyboard-accessible workflow stage slider. Full content is server-rendered by default so a JavaScript failure does not hide the case study.
