<script setup>
const mode = ref('full');
const activeSection = ref('overview');

const fullSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'approach', label: 'Approach' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'product-design', label: 'Product design' },
    { id: 'reflection', label: 'Outcomes / reflection' },
];
const condensedSections = fullSections.filter(section => ['overview', 'approach', 'reflection'].includes(section.id));
const visibleSections = computed(() => mode.value === 'full' ? fullSections : condensedSections);

const stages = [
    { name: 'Discover', title: 'Map sources, tests, and known gaps', detail: 'The workflow starts with an inventory rather than immediately generating tests.', items: ['Source inventory', 'Existing suites', 'Known gaps'] },
    { name: 'Plan', title: 'Order work by risk and dependency', detail: 'Sources and test ownership become explicit phases that can be resumed safely.', items: ['Owned paths', 'Dependencies', 'Execution waves'] },
    { name: 'Audit', title: 'Review source when requested', detail: 'Findings remain visible. Source changes require the configured policy or explicit authorization.', items: ['Finding recorded', 'Fix authorized', 'Tests synchronized'] },
    { name: 'Test', title: 'Write, run, and verify', detail: 'Sheriff reuses the project runner and requires actual execution evidence before passing work.', items: ['Runner selected', 'Regression added', 'Output checked'] },
    { name: 'Report', title: 'Keep evidence and handoffs', detail: 'Results, unresolved work, and resumable context stay in the repository for the next session.', items: ['Result saved', 'Review retained', 'Handoff ready'] },
];
const stageIndex = ref(0);
const currentStage = computed(() => stages[stageIndex.value]);

let observer;
let scrollLockTimer;
let scrollSpyLocked = false;
function setupScrollSpy() {
    observer?.disconnect();
    if (import.meta.server) return;
    observer = new IntersectionObserver((entries) => {
        if (scrollSpyLocked) return;
        const targetLine = window.innerHeight * 0.2;
        const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => Math.abs(a.boundingClientRect.top - targetLine) - Math.abs(b.boundingClientRect.top - targetLine));
        if (visible[0]) activeSection.value = visible[0].target.id;
    }, { rootMargin: '-10% 0px -60% 0px', threshold: [0, 0.1] });
    for (const section of visibleSections.value) {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
    }
}
function preferredScrollBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
function setMode(nextMode) {
    if (mode.value === nextMode) return;
    mode.value = nextMode;
    if (!visibleSections.value.some(section => section.id === activeSection.value)) activeSection.value = 'overview';
    nextTick(() => {
        setupScrollSpy();
        document.getElementById(activeSection.value)?.scrollIntoView({ behavior: preferredScrollBehavior(), block: 'start' });
    });
}
function goToSection(id) {
    activeSection.value = id;
    scrollSpyLocked = true;
    clearTimeout(scrollLockTimer);
    document.getElementById(id)?.scrollIntoView({ behavior: preferredScrollBehavior(), block: 'start' });
    history.replaceState(null, '', `#${id}`);
    scrollLockTimer = setTimeout(() => { scrollSpyLocked = false; }, preferredScrollBehavior() === 'auto' ? 0 : 2800);
}

onMounted(() => {
    setupScrollSpy();
    const hash = location.hash.slice(1);
    if (visibleSections.value.some(section => section.id === hash)) activeSection.value = hash;
});
watch(visibleSections, () => nextTick(setupScrollSpy));
onBeforeUnmount(() => {
    observer?.disconnect();
    clearTimeout(scrollLockTimer);
});

useSeoMeta({
    title: 'Sheriff case study — Dagim Shimelis',
    description: 'How Sheriff coordinates test discovery, planning, execution, audit, sync, and evidence across Claude Code and Codex.',
    ogTitle: 'Sheriff case study — Dagim Shimelis',
    ogDescription: 'An open-source testing orchestration layer for Claude Code and Codex.',
    ogImage: 'https://dagim.codes/images/projects/sheriff-case-study/website-home.webp',
    twitterCard: 'summary_large_image',
});
</script>

<template>
    <main id="main-content" class="sheriff-case" :class="{ 'is-condensed': mode === 'tldr' }">
        <div class="case-shell">
            <aside class="case-index" aria-label="Case study navigation">
                <NuxtLink to="/projects/list" class="case-back">← Back</NuxtLink>
                <div class="view-toggle" role="group" aria-label="Case study length">
                    <button type="button" :aria-pressed="mode === 'full'" @click="setMode('full')">Full</button>
                    <button type="button" :aria-pressed="mode === 'tldr'" @click="setMode('tldr')">TL;DR</button>
                </div>
                <nav aria-label="On this page">
                    <a v-for="section in visibleSections" :key="section.id" :href="`#${section.id}`" :class="{ active: activeSection === section.id }" :aria-current="activeSection === section.id ? 'location' : undefined" @click.prevent="goToSection(section.id)">{{ section.label }}</a>
                </nav>
                <p class="case-index-note">Independent open-source project</p>
            </aside>

            <article class="case-article">
                <header id="overview" class="case-header">
                    <h1>Sheriff</h1>
                    <p class="case-subtitle">A testing orchestration layer that helps Claude Code and Codex find test gaps, plan the work, run tests, and keep evidence aligned with source changes.</p>
                    <dl class="case-meta">
                        <div><dt>Project type</dt><dd>Independent open source</dd></div>
                        <div><dt>Case study focus</dt><dd>Product design, frontend, installer safety, orchestration architecture</dd></div>
                        <div><dt>Scope</dt><dd>Claude Code, Codex, JavaScript and TypeScript projects</dd></div>
                    </dl>
                    <div class="case-actions">
                        <a class="case-button" href="https://sheriff.dagim.codes/" target="_blank" rel="noopener noreferrer">Visit live site ↗</a>
                        <a href="https://github.com/dagim-shimelis/sheriff" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                        <a href="https://sheriff.dagim.codes/docs" target="_blank" rel="noopener noreferrer">Documentation ↗</a>
                    </div>
                </header>

                <div class="mobile-case-tools">
                    <div class="view-toggle" role="group" aria-label="Case study length">
                        <button type="button" :aria-pressed="mode === 'full'" @click="setMode('full')">Full</button>
                        <button type="button" :aria-pressed="mode === 'tldr'" @click="setMode('tldr')">TL;DR</button>
                    </div>
                    <nav aria-label="On this page">
                        <a v-for="section in visibleSections" :key="section.id" :href="`#${section.id}`" :class="{ active: activeSection === section.id }" :aria-current="activeSection === section.id ? 'location' : undefined" @click.prevent="goToSection(section.id)">{{ section.label }}</a>
                    </nav>
                </div>

                <figure class="hero-visual evidence-frame">
                    <img src="/images/projects/sheriff-case-study/website-home.webp" alt="Sheriff product website showing its Big ideas. Fewer blind spots. headline and installation command" width="3840" height="2160" />
                    <figcaption>The product website introduces the workflow, installation path, and open-source repository.</figcaption>
                </figure>

                <section class="case-chapter">
                    <div class="chapter-heading"><p>Overview</p><h2>What this project demonstrates</h2></div>
                    <div class="chapter-copy">
                        <p>Sheriff turns a broad request to “add tests” into a visible sequence of discovery, planning, execution, review, and reporting. It does not replace the project’s runner or the AI host. It coordinates them and records what happened.</p>
                        <p>The project connects interface and infrastructure: it explains a complex workflow clearly, supports two host environments, preserves repository safety, and treats evidence as part of the product experience.</p>
                    </div>
                    <figure class="evidence-frame overview-art">
                        <img src="/images/projects/sheriff-case-study/package-banner.png" alt="Sheriff package banner" width="1932" height="476" loading="lazy" />
                    </figure>
                </section>

                <template v-if="mode === 'full'">
                    <section id="challenge" class="case-chapter">
                        <div class="chapter-heading"><p>Challenge</p><h2>Testing needs more than generation</h2></div>
                        <div class="chapter-copy">
                            <p>A coding agent can produce a test file quickly. A reliable testing pass also needs to know what is untested, which work depends on what, who owns each file, whether the runner truly executed, and what remains unresolved.</p>
                            <p>The harder constraint is continuity. Sessions can stop, repositories already contain uncommitted work, and passing old tests may still miss changed behavior. Sheriff therefore has to preserve state without taking unsafe control of the worktree.</p>
                        </div>
                        <div class="challenge-points" aria-label="Core product constraints">
                            <p><strong>Scope before edits.</strong> Map the repository and its existing conventions first.</p>
                            <p><strong>Evidence before status.</strong> A generated file alone is not a pass.</p>
                            <p><strong>Recovery without repetition.</strong> Resume from handoffs and terminal results.</p>
                            <p><strong>Authorization before source changes.</strong> Findings do not silently become fixes.</p>
                        </div>
                    </section>
                </template>

                <section id="approach" class="case-chapter">
                    <div class="chapter-heading"><p>Approach</p><h2>Separate policy from execution</h2></div>
                    <div class="chapter-copy">
                        <p>Markdown workflows define the testing policy and role boundaries. A small Node state engine owns structured mutations such as claims, results, handoffs, summaries, configuration, and source-to-test mapping.</p>
                        <p>The AI host still performs code analysis and edits with the project’s tools. This separation keeps the orchestration inspectable while allowing Claude Code and Codex to use host-native entry points.</p>
                    </div>
                    <figure class="evidence-frame workflow-diagram">
                        <img src="/images/projects/sheriff-case-study/testing-workflow.png" alt="Sheriff workflow diagram: discover, plan, optional audit, test, and report" width="1536" height="1024" loading="lazy" />
                        <figcaption>The shared workflow. Audit is optional; reporting and unresolved evidence remain part of the path.</figcaption>
                    </figure>
                </section>

                <template v-if="mode === 'full'">
                    <section id="workflow" class="case-chapter">
                        <div class="chapter-heading"><p>Workflow</p><h2>Move through the real runtime stages</h2></div>
                        <div class="chapter-copy"><p>Use the slider or arrow keys to inspect the stages. The panel is an illustrative interface using sourced runtime behavior, not a terminal transcript or customer dataset.</p></div>
                        <div class="workflow-demo">
                            <div :key="`copy-${stageIndex}`" class="workflow-demo-copy workflow-stage-enter" aria-live="polite" aria-atomic="true">
                                <p>{{ currentStage.name }}</p>
                                <h3>{{ currentStage.title }}</h3>
                                <p>{{ currentStage.detail }}</p>
                            </div>
                            <div :key="`panel-${stageIndex}`" class="workflow-ui workflow-stage-enter" data-ui>
                                <div class="workflow-ui-top"><span>sheriff.workflow</span><span>Runtime stage: {{ currentStage.name.toLowerCase() }}</span></div>
                                <ul><li v-for="(item, index) in currentStage.items" :key="item"><span>{{ index + 1 }}</span>{{ item }}<b>{{ index === 0 ? 'active' : 'queued' }}</b></li></ul>
                            </div>
                            <div class="workflow-control">
                                <input v-model.number="stageIndex" type="range" min="0" :max="stages.length - 1" step="1" aria-label="Choose a Sheriff workflow stage" />
                                <div aria-hidden="true"><span v-for="(stage, index) in stages" :key="stage.name" :class="{ active: index === stageIndex }">{{ stage.name }}</span></div>
                            </div>
                        </div>
                    </section>

                    <section id="engineering" class="case-chapter">
                        <div class="chapter-heading"><p>Engineering</p><h2>Decisions and tradeoffs</h2></div>
                        <div class="decision-rows">
                            <article><h3>One shared runtime</h3><p>Claude Code commands and Codex skills point to package-backed instructions and the same project state.</p><p><strong>Tradeoff:</strong> shared semantics reduce drift, while host capabilities still require distinct execution paths.</p></article>
                            <article><h3>File-based project state</h3><p>Maps, plans, audits, results, summaries, and handoffs remain inspectable under <code>.sheriff/</code>.</p><p><strong>Tradeoff:</strong> portability and visibility require strict ownership and one orchestrator per project.</p></article>
                            <article><h3>Conservative evidence rules</h3><p>A pass requires actual execution, a successful exit, and at least one passing test. Empty or skipped suites are not proof.</p><p><strong>Tradeoff:</strong> fewer optimistic statuses, but uncertainty stays honest and reviewable.</p></article>
                            <article><h3>Safe installation</h3><p>The installer detects npm, pnpm, Yarn, or Bun, tracks owned files, refuses unrelated collisions, and uses atomic writes.</p><p><strong>Tradeoff:</strong> migration and rollback safeguards make installation code more involved than copying adapters.</p></article>
                        </div>
                    </section>

                    <section id="product-design" class="case-chapter">
                        <div class="chapter-heading"><p>Product design</p><h2>Make a careful tool feel approachable</h2></div>
                        <div class="chapter-copy">
                            <p>The public website uses an editorial frontier identity to make test infrastructure memorable without disguising the constraints. The product copy repeatedly returns to concrete actions: run, audit, sync, inspect evidence, and choose what gets fixed.</p>
                            <p>The visual system gives a careful infrastructure tool a distinctive voice while the documentation keeps commands, limits, and authorization rules concrete.</p>
                        </div>
                        <div class="design-gallery">
                            <figure class="evidence-frame"><img src="/images/projects/sheriff-case-study/the-posse.webp" alt="Two riders against a large orange cloudscape used in Sheriff’s visual identity" width="1080" height="758" loading="lazy" /><figcaption>Supplied Sheriff website artwork.</figcaption></figure>
                            <figure class="evidence-frame"><img src="/images/projects/sheriff-case-study/saddle-up-desert.webp" alt="Orange desert landscape used in the Sheriff installation section" width="1440" height="1152" loading="lazy" /><figcaption>Installation section artwork.</figcaption></figure>
                        </div>
                    </section>
                </template>

                <section id="reflection" class="case-chapter reflection-chapter">
                    <div class="chapter-heading"><p>Outcomes / reflection</p><h2>Activity is not evidence</h2></div>
                    <div class="chapter-copy">
                        <p>The strongest part of Sheriff is its refusal to turn activity into a claim. Unresolved findings remain unresolved, failed regressions remain failures, and a source inventory is never presented as measured coverage.</p>
                        <p>The architecture applies that principle across two AI hosts, package managers, interrupted sessions, and repositories with pre-existing work. The result is less about automating every decision and more about making each decision recoverable and reviewable.</p>
                        <p>The documented limits matter too. Test quality still depends on the project, model, runner, and working browser or service environment. Fixture-specific acceptance evidence does not establish universal framework support.</p>
                    </div>
                    <div class="reflection-actions">
                        <a class="case-button" href="https://sheriff.dagim.codes/" target="_blank" rel="noopener noreferrer">Visit Sheriff ↗</a>
                        <a href="https://github.com/dagim-shimelis/sheriff" target="_blank" rel="noopener noreferrer">Explore the source ↗</a>
                        <NuxtLink to="/#contact">Talk about a project ↗</NuxtLink>
                    </div>
                </section>
            </article>
        </div>
    </main>
</template>

<style scoped>
.sheriff-case { --case-orange: #fd551d; --case-green: #173c34; padding: 150px var(--gutter) 120px; background: var(--paper); color: var(--ink); }
.case-shell { width: min(100%, 1280px); margin-inline: auto; display: grid; grid-template-columns: 180px minmax(0, 1000px); gap: clamp(48px, 7vw, 100px); align-items: start; }
.case-index { position: sticky; top: 98px; min-height: calc(100svh - 130px); display: flex; flex-direction: column; align-items: flex-start; }
.case-back,.case-index nav a,.case-actions a:not(.case-button),.reflection-actions a:not(.case-button) { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 5px; }
.case-back { color: var(--muted); font-size: 14px; }
.view-toggle { display: inline-flex; margin-top: 42px; padding: 4px; background: var(--surface); }
.view-toggle button { min-height: 38px; padding: 8px 13px; border-radius: 0; color: var(--muted); background: transparent; font-size: 14px; }
.view-toggle button[aria-pressed="true"] { color: #fff; background: var(--ink); }
.view-toggle button:enabled:hover { color: var(--ink); background: var(--surface-strong); }
.view-toggle button[aria-pressed="true"]:enabled:hover { color: #fff; background: var(--ink); }
.case-index nav { display: flex; flex-direction: column; gap: 13px; margin-top: 38px; }
.case-index nav a { width: fit-content; color: var(--muted); font-size: 14px; text-decoration-color: transparent; transition: color .2s, text-decoration-color .2s; }
.case-index nav a:hover,.case-index nav a.active { color: var(--ink); text-decoration-color: var(--case-orange); }
.case-index-note { margin-top: auto; max-width: 150px; color: var(--muted); font-size: 13px; line-height: 1.5; }
.case-article { min-width: 0; }
.case-header { scroll-margin-top: 96px; padding-top: 8px; }
.case-header h1 { margin-top: 18px; font-size: clamp(64px, 7vw, 104px); line-height: .95; }
.case-subtitle { max-width: 760px; margin-top: 28px; font-size: clamp(21px, 2vw, 28px); line-height: 1.4; letter-spacing: -.025em; text-wrap: pretty; }
.case-meta { display: grid; grid-template-columns: .8fr 1.4fr 1fr; gap: 30px; margin: 52px 0 0; padding: 28px 0; border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); }
.case-meta dt { color: var(--muted); font-size: 13px; }
.case-meta dd { margin: 9px 0 0; font-size: 15px; line-height: 1.55; }
.case-actions,.reflection-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 28px; margin-top: 34px; }
.case-actions a:not(.case-button),.reflection-actions a:not(.case-button) { font-size: 14px; }
.case-button { min-height: 48px; display: inline-flex; align-items: center; padding: 12px 18px; color: var(--accent-ink); background: var(--case-orange); font-size: 14px; font-weight: 650; }
.mobile-case-tools { display: none; }
.evidence-frame { margin: 0; padding: 10px; background: var(--surface); }
.evidence-frame img { width: 100%; height: auto; }
.evidence-frame figcaption { display: block; margin: 10px 2px 2px; color: var(--muted); font-size: 13px; line-height: 1.5; }
.hero-visual { margin-top: 70px; }
.case-chapter { scroll-margin-top: 96px; padding-top: clamp(110px, 12vw, 170px); }
.chapter-heading { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 30px; align-items: start; }
.chapter-heading > p { padding-top: 8px; color: var(--case-orange); font-size: 14px; font-weight: 650; }
.chapter-heading h2 { max-width: 720px; font-size: clamp(40px, 4.5vw, 64px); line-height: 1.03; text-wrap: balance; }
.chapter-copy { max-width: 700px; margin: 42px 0 0 180px; }
.chapter-copy p { font-size: 18px; line-height: 1.7; text-wrap: pretty; }
.chapter-copy p + p { margin-top: 22px; }
.overview-art,.workflow-diagram { margin-top: 64px; }
.overview-art img { aspect-ratio: 1932/476; object-fit: cover; background: #1d1d1d; }
.challenge-points { margin: 56px 0 0 180px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.challenge-points p { min-height: 150px; padding: 24px; background: var(--surface); font-size: 16px; line-height: 1.6; }
.challenge-points strong { display: block; margin-bottom: 10px; font-size: 18px; }
.workflow-diagram img { background: #f8f7f4; }
.workflow-demo { margin-top: 58px; padding: 36px; color: #fff; background: var(--case-green); display: grid; grid-template-columns: .85fr 1.15fr; gap: 42px; }
.workflow-demo-copy { align-self: center; }
.workflow-demo-copy > p:first-child { color: #f4d447; font-size: 14px; font-weight: 650; }
.workflow-demo-copy h3 { margin-top: 16px; font-size: clamp(30px, 3vw, 44px); line-height: 1.05; letter-spacing: -.04em; }
.workflow-demo-copy > p:last-child { margin-top: 22px; color: #d9e1dc; font-size: 16px; line-height: 1.6; }
.workflow-ui { padding: 22px; color: var(--case-green); background: var(--paper); }
.workflow-ui-top { display: flex; justify-content: space-between; gap: 18px; margin-bottom: 26px; font-size: 13px; font-weight: 650; }
.workflow-ui ul { list-style: none; margin: 0; padding: 0; }
.workflow-ui li { display: grid; grid-template-columns: 28px 1fr auto; gap: 10px; padding: 15px 0; border-top: 2px solid var(--case-green); font-size: 15px; }
.workflow-ui li b { color: var(--muted); font-size: 13px; font-weight: 500; }
.workflow-control { grid-column: 1 / -1; }
.workflow-control input { width: 100%; height: 44px; appearance: none; background: transparent; }
.workflow-control input::-webkit-slider-runnable-track { height: 8px; background: #f8f7f4; }
.workflow-control input::-webkit-slider-thumb { appearance: none; width: 30px; height: 30px; margin-top: -11px; border: 0; border-radius: 0; background: #f4d447; }
.workflow-control input::-moz-range-track { height: 8px; background: #f8f7f4; }
.workflow-control input::-moz-range-thumb { width: 30px; height: 30px; border: 0; border-radius: 0; background: #f4d447; }
.workflow-control > div { display: flex; justify-content: space-between; gap: 10px; color: #9fb0aa; font-size: 13px; }
.workflow-control .active { color: #f4d447; }
.decision-rows { margin-top: 56px; }
.decision-rows article { display: grid; grid-template-columns: .8fr 1fr 1fr; gap: 34px; padding: 34px 0; border-top: 2px solid var(--ink); }
.decision-rows article:last-child { border-bottom: 2px solid var(--ink); }
.decision-rows h3 { font-size: 22px; line-height: 1.2; letter-spacing: -.035em; }
.decision-rows p { font-size: 15px; line-height: 1.65; }
.decision-rows p:last-child { color: var(--muted); }
.decision-rows code { font: inherit; background: var(--surface); padding: 2px 5px; }
.design-gallery { display: grid; grid-template-columns: 1.35fr .65fr; gap: 20px; margin-top: 64px; align-items: stretch; }
.design-gallery figure { display: flex; flex-direction: column; }
.design-gallery figure img { height: 100%; object-fit: cover; }
.design-gallery figure:last-child img { aspect-ratio: 4/5; }
.reflection-chapter { padding-bottom: 60px; }
.reflection-actions { margin-left: 180px; }

@media (max-width: 980px) {
    .sheriff-case { padding-top: 130px; }
    .case-shell { grid-template-columns: 1fr; }
    .case-index { display: none; }
    .mobile-case-tools { position: sticky; top: 64px; z-index: 20; display: block; margin-top: 48px; padding: 10px 0 12px; background: color-mix(in srgb, var(--paper) 94%, transparent); }
    .mobile-case-tools .view-toggle { margin-top: 0; }
    .mobile-case-tools nav { display: flex; gap: 18px; margin-top: 12px; padding-bottom: 6px; overflow-x: auto; scrollbar-width: thin; }
    .mobile-case-tools nav a { flex: 0 0 auto; color: var(--muted); font-size: 14px; }
    .mobile-case-tools nav a.active { color: var(--case-orange); }
    .hero-visual { margin-top: 45px; }
}

@media (max-width: 700px) {
    .sheriff-case { padding: 116px 20px 90px; }
    .case-header h1 { font-size: 68px; }
    .case-subtitle { font-size: 21px; }
    .case-meta { grid-template-columns: 1fr; gap: 22px; margin-top: 38px; }
    .case-actions { align-items: flex-start; flex-direction: column; }
    .mobile-case-tools { margin-left: -20px; margin-right: -20px; padding-left: 20px; padding-right: 20px; }
    .case-chapter { padding-top: 95px; }
    .chapter-heading { grid-template-columns: 1fr; gap: 14px; }
    .chapter-heading > p { padding-top: 0; }
    .chapter-heading h2 { font-size: 42px; }
    .chapter-copy,.challenge-points,.reflection-actions { margin-left: 0; }
    .chapter-copy { margin-top: 30px; }
    .chapter-copy p { font-size: 17px; }
    .challenge-points { grid-template-columns: 1fr; margin-top: 38px; }
    .challenge-points p { min-height: 0; }
    .overview-art,.workflow-diagram,.design-gallery { margin-top: 42px; }
    .workflow-demo { padding: 22px; grid-template-columns: 1fr; gap: 28px; }
    .workflow-ui-top { align-items: flex-start; flex-direction: column; }
    .workflow-ui li { grid-template-columns: 24px 1fr; }
    .workflow-ui li b { grid-column: 2; }
    .workflow-control { grid-column: auto; }
    .workflow-control > div { display: grid; grid-template-columns: repeat(3, 1fr); }
    .decision-rows article { grid-template-columns: 1fr; gap: 14px; }
    .design-gallery { grid-template-columns: 1fr; }
    .design-gallery figure img,.design-gallery figure:last-child img { height: auto; aspect-ratio: auto; }
    .reflection-actions { align-items: flex-start; flex-direction: column; }
}

/* Small feedback cues; reading content never depends on an animation. */
.view-toggle { position: relative; isolation: isolate; }
.view-toggle::before { content: ''; position: absolute; z-index: -1; inset: 4px auto 4px 4px; width: calc((100% - 8px) / 2); background: var(--ink); transition: transform 240ms cubic-bezier(.22,1,.36,1); }
.is-condensed .view-toggle::before { transform: translateX(100%); }
.view-toggle button { width: 64px; transition: color 180ms, transform 180ms; }
.view-toggle button[aria-pressed="true"],.view-toggle button[aria-pressed="true"]:enabled:hover { background: transparent; }
.view-toggle button:enabled:hover { background: transparent; }
.view-toggle button:active { transform: scale(.95); }
.case-index nav a { transition: transform 200ms, color 200ms, text-decoration-color 200ms; }
.case-back { display: inline-block; transition: transform 200ms, color 200ms; }
.case-button { transition: transform 200ms cubic-bezier(.22,1,.36,1), background-color 200ms; }
.case-actions a:not(.case-button),.reflection-actions a:not(.case-button) { transition: color 180ms, text-underline-offset 180ms; }
.evidence-frame img { transition: transform 450ms cubic-bezier(.22,1,.36,1); transform-origin: center; }
.workflow-stage-enter { animation: workflow-stage-arrive 240ms ease-out both; }
.workflow-ui.workflow-stage-enter { animation-delay: 40ms; }
@keyframes workflow-stage-arrive { from { opacity: .45; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.workflow-control input { cursor: pointer; }
.workflow-control input:focus-visible { outline: 2px solid #f4d447; outline-offset: 5px; }
.workflow-control input::-webkit-slider-thumb { transition: transform 180ms; }
.workflow-control input::-moz-range-thumb { transition: transform 180ms; }
.workflow-control input:active::-webkit-slider-thumb { transform: scale(1.12); }
.workflow-control input:active::-moz-range-thumb { transform: scale(1.12); }
.workflow-control > div span { transition: color 180ms; }
@media (hover: hover) and (pointer: fine) {
    .case-index nav a:hover { transform: translateX(3px); }
    .case-back:hover { transform: translateX(-3px); color: var(--ink); }
    .case-button:hover { transform: translateY(-2px); background: color-mix(in srgb, var(--case-orange) 90%, var(--paper)); }
    .case-actions a:not(.case-button):hover,.reflection-actions a:not(.case-button):hover { color: var(--muted); text-underline-offset: 8px; }
    .hero-visual:hover img,.design-gallery figure:hover img { transform: scale(.985); }
}
.case-button:active { transform: translateY(0) scale(.98); }
@media (prefers-reduced-motion: reduce) {
    .sheriff-case *, .sheriff-case *::before { animation: none !important; transition: none !important; }
    .case-index nav a:hover,.case-back:hover,.case-button:hover,.case-button:active,.view-toggle button:active,.evidence-frame:hover img { transform: none; }
    .workflow-control input:active::-webkit-slider-thumb { transform: none; }
    .workflow-control input:active::-moz-range-thumb { transform: none; }
}
</style>
