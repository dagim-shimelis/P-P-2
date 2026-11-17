<script setup>
const mode = ref('full');
const activeSection = ref('overview');

const fullSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Product problem' },
    { id: 'system', label: 'Product system' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'extension', label: 'Browser extension' },
    { id: 'reflection', label: 'Outcomes / reflection' },
];
const condensedSections = fullSections.filter(section => ['overview', 'system', 'reflection'].includes(section.id));
const visibleSections = computed(() => mode.value === 'full' ? fullSections : condensedSections);

const stages = [
    { name: 'Draft', title: 'Start with the rough intent', detail: 'The Playground accepts the prompt as written instead of requiring the user to learn a prompt template first.', items: ['Original prompt', 'Optional persona', 'Improve action'] },
    { name: 'Shape', title: 'Apply a reusable persona', detail: 'A persona can carry role, response style, audience, output format, language, length, and optional privacy preferences.', items: ['Role and tone', 'Audience and format', 'Optional constraints'] },
    { name: 'Improve', title: 'Generate a more structured prompt', detail: 'The API combines the original request with profile instructions and returns an editable improved prompt.', items: ['Context added', 'Requirements clarified', 'Output structured'] },
    { name: 'Review', title: 'Keep the result inspectable', detail: 'The app presents the original and improved versions, editable output, and calculated prompt statistics before reuse.', items: ['Compare versions', 'Edit or copy', 'Review statistics'] },
    { name: 'Reuse', title: 'Move the prompt into the next task', detail: 'An improved prompt can be saved to a library, revisited in history, or opened in a supported AI platform.', items: ['Save to library', 'Find in history', 'Apply to an AI tool'] },
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
    title: 'Dwight case study — Dagim Shimelis',
    description: 'A product case study of Dwight, a prompt improvement platform spanning a web app, API, prompt library, personas, history, and a Chromium extension.',
    ogTitle: 'Dwight case study — Dagim Shimelis',
    ogDescription: 'How Dwight connects prompt improvement, reusable context, organization, and in-browser workflows.',
    ogImage: 'https://dagim.codes/images/projects/dwight-prompt-1080.webp',
    twitterCard: 'summary_large_image',
});
</script>

<template>
    <main id="main-content" class="dwight-case" :class="{ 'is-condensed': mode === 'tldr' }">
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
                <p class="case-index-note">Prompt improvement across web and browser surfaces</p>
            </aside>

            <article class="case-article">
                <header id="overview" class="case-header">
                    <p class="eyebrow">Product case study</p>
                    <h1>Dwight</h1>
                    <p class="case-subtitle">A prompt assistant that turns rough requests into structured, reusable prompts—then carries that workflow into the AI tools people already use.</p>
                    <dl class="case-meta">
                        <div><dt>Product</dt><dd>AI prompt improvement platform</dd></div>
                        <div><dt>Surfaces</dt><dd>Marketing site, web app, API, admin, Chromium extension</dd></div>
                        <div><dt>Core system</dt><dd>Playground, personas, history, saved prompts, libraries</dd></div>
                    </dl>
                    <div class="case-actions">
                        <a class="case-button" href="https://www.dwightprompt.com/" target="_blank" rel="noopener noreferrer">Visit Dwight ↗</a>
                        <a href="https://www.dwightprompt.com/support/prompts" target="_blank" rel="noopener noreferrer">Product guide ↗</a>
                        <a href="https://www.dwightprompt.com/support" target="_blank" rel="noopener noreferrer">Support ↗</a>
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
                    <img src="/images/projects/dwight-prompt-1080.webp" alt="Dwight website with the headline Great AI Starts with Great Prompts" width="1920" height="1080" />
                    <figcaption>The public website positions Dwight as a bridge between an initial idea and a prompt ready for an AI tool.</figcaption>
                </figure>

                <section class="case-chapter">
                    <div class="chapter-heading"><p>Overview</p><h2>One workflow, not just one rewrite</h2></div>
                    <div class="chapter-copy">
                        <p>Dwight begins with prompt improvement, but the product extends beyond a single before-and-after result. The web app supports editable output, prompt statistics, reusable personas, automatic history, saved prompts, and named libraries.</p>
                        <p>A Chromium extension brings the same account data and improvement flow into ChatGPT, Claude, Gemini, DeepSeek, Grok, and Perplexity. The product system therefore has to remain coherent across a full web application, an API, and interfaces injected into third-party pages.</p>
                    </div>
                    <figure class="evidence-frame overview-art">
                        <img src="/images/projects/dwight-case-study/comparison.png" alt="Dwight promotional comparison showing a vague request transformed into a structured analysis prompt" width="1280" height="800" loading="lazy" />
                        <figcaption>Repository promotional artwork showing the product’s before-and-after model. The example content is illustrative.</figcaption>
                    </figure>
                </section>

                <template v-if="mode === 'full'">
                    <section id="problem" class="case-chapter">
                        <div class="chapter-heading"><p>Product problem</p><h2>Prompt quality is only half the friction</h2></div>
                        <div class="chapter-copy">
                            <p>A rough prompt may be missing context, constraints, an audience, or a requested output shape. Improving that text solves the immediate problem, but users can still lose the result, repeat the same preferences, or interrupt their work to move between tools.</p>
                            <p>Dwight treats those as connected product problems: improve the request, preserve the useful result, make context reusable, and reduce the distance between refinement and execution.</p>
                        </div>
                        <div class="challenge-points" aria-label="Core product considerations">
                            <p><strong>Low setup cost.</strong> Accept a rough request before asking users to learn a method.</p>
                            <p><strong>Visible control.</strong> Keep the improved prompt editable, copyable, and reviewable.</p>
                            <p><strong>Reusable context.</strong> Store persona preferences instead of repeatedly pasting them.</p>
                            <p><strong>Workflow continuity.</strong> Connect history, libraries, and supported AI platforms.</p>
                        </div>
                    </section>
                </template>

                <section id="system" class="case-chapter">
                    <div class="chapter-heading"><p>Product system</p><h2>Build around the life of a prompt</h2></div>
                    <div class="chapter-copy">
                        <p>The Playground is the entry point: original prompt on one side, improved and editable output on the other. From there, Dwight keeps two different records. History is the automatic log of improvements; Saved Prompts is the curated set a user chooses to retain and organize.</p>
                        <p>Personas add a reusable instruction layer. The backend can shape an improvement by role, response style, audience, prompt format, output format, language, maximum length, additional instructions, and optional PII masking when configured.</p>
                    </div>
                    <div class="system-gallery">
                        <figure class="evidence-frame"><img src="/images/projects/dwight-case-study/playground.png" alt="Dwight promotional artwork showing the two-column prompt Playground and statistics" width="1280" height="800" loading="lazy" /><figcaption>Playground promotional artwork derived from the product interface.</figcaption></figure>
                        <figure class="evidence-frame"><img src="/images/projects/dwight-case-study/persona.png" alt="Dwight promotional artwork showing reusable personas" width="1280" height="800" loading="lazy" /><figcaption>Personas hold repeatable context and output preferences.</figcaption></figure>
                    </div>
                </section>

                <template v-if="mode === 'full'">
                    <section id="workflow" class="case-chapter">
                        <div class="chapter-heading"><p>Workflow</p><h2>Follow the prompt from draft to reuse</h2></div>
                        <div class="chapter-copy"><p>Use the slider or arrow keys to inspect the flow. This is an illustrative interface assembled from implemented product behavior, not an analytics funnel or user-research finding.</p></div>
                        <div class="workflow-demo">
                            <div :key="`copy-${stageIndex}`" class="workflow-demo-copy workflow-stage-enter" aria-live="polite" aria-atomic="true">
                                <p>{{ currentStage.name }}</p>
                                <h3>{{ currentStage.title }}</h3>
                                <p>{{ currentStage.detail }}</p>
                            </div>
                            <div :key="`panel-${stageIndex}`" class="workflow-ui workflow-stage-enter" data-ui>
                                <div class="workflow-ui-top"><span>dwight.prompt</span><span>Stage: {{ currentStage.name.toLowerCase() }}</span></div>
                                <ul><li v-for="(item, index) in currentStage.items" :key="item"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item }}<b>{{ index === 0 ? 'current' : 'next' }}</b></li></ul>
                            </div>
                            <div class="workflow-control">
                                <input v-model.number="stageIndex" type="range" min="0" :max="stages.length - 1" step="1" aria-label="Choose a Dwight product workflow stage" />
                                <div aria-hidden="true"><span v-for="(stage, index) in stages" :key="stage.name" :class="{ active: index === stageIndex }">{{ stage.name }}</span></div>
                            </div>
                        </div>
                    </section>

                    <section id="engineering" class="case-chapter">
                        <div class="chapter-heading"><p>Engineering</p><h2>Keep several surfaces on the same model</h2></div>
                        <div class="decision-rows">
                            <article><h3>Structured improvement response</h3><p>The NestJS API returns an improved prompt, suggested name and description, improvement state, and calculated statistics.</p><p><strong>Tradeoff:</strong> richer output supports the interface, but it creates a contract that the web app and extension must both track.</p></article>
                            <article><h3>Account-backed organization</h3><p>PostgreSQL and Prisma persist profiles, prompt improvements, saved prompts, libraries, preferences, and subscription state.</p><p><strong>Tradeoff:</strong> cross-device continuity requires authentication, ownership checks, pagination, and careful quota handling.</p></article>
                            <article><h3>Reusable profile instructions</h3><p>Profile settings are translated into explicit instructions before the original prompt reaches the AI provider.</p><p><strong>Tradeoff:</strong> more control improves repeatability, while format and privacy options increase prompt-building complexity.</p></article>
                            <article><h3>Defensive browser integration</h3><p>The extension uses per-domain selectors, SPA navigation detection, reinjection, rate limits, response validation, and an inline keyboard shortcut.</p><p><strong>Tradeoff:</strong> working inside third-party interfaces is convenient but remains sensitive to their DOM changes.</p></article>
                        </div>
                    </section>

                    <section id="extension" class="case-chapter">
                        <div class="chapter-heading"><p>Browser extension</p><h2>Bring improvement to the point of use</h2></div>
                        <div class="chapter-copy">
                            <p>The extension does more than open the web app. It identifies supported chat interfaces, injects a Dwight control beside the prompt input, and—when improvement is triggered—can take the current prompt through Dwight and write the improved text back into that input.</p>
                            <p>Its popup also exposes Playground, history, libraries, saved prompts, and profiles. This keeps the vocabulary and account model consistent while adapting the interaction to the smaller browser surface.</p>
                        </div>
                        <div class="extension-strip" aria-label="Supported AI platforms">
                            <span>ChatGPT</span><span>Claude</span><span>Gemini</span><span>DeepSeek</span><span>Grok</span><span>Perplexity</span>
                        </div>
                        <div class="design-gallery">
                            <figure class="evidence-frame"><img src="/images/projects/dwight-case-study/history.png" alt="Dwight promotional artwork showing prompt improvement history" width="1280" height="800" loading="lazy" /><figcaption>History keeps the automatic record distinct from intentionally saved prompts.</figcaption></figure>
                            <figure class="evidence-frame"><img src="/images/projects/dwight-case-study/library.png" alt="Dwight promotional artwork showing named prompt libraries" width="1280" height="800" loading="lazy" /><figcaption>Libraries organize prompts selected for reuse.</figcaption></figure>
                        </div>
                    </section>
                </template>

                <section id="reflection" class="case-chapter reflection-chapter">
                    <div class="chapter-heading"><p>Outcomes / reflection</p><h2>The product is the continuity between steps</h2></div>
                    <div class="chapter-copy">
                        <p>Dwight’s clearest product idea is that improvement should not be an isolated generation event. A prompt moves through drafting, contextual shaping, review, storage, and reuse; the web app and extension are two entrances to that same system.</p>
                        <p>The implementation also reveals the cost of that continuity. Third-party interfaces change, profile options expand the instruction model, and synchronized account data adds authentication and ownership concerns. The useful design constraint is to keep those complexities behind a small set of recognizable actions: improve, edit, copy, save, find, and apply.</p>
                        <p>The broader lesson is to design the handoffs as carefully as the headline feature. The improved prompt matters, but so do the transitions into review, organization, and the tool where the work continues.</p>
                    </div>
                    <div class="reflection-actions">
                        <a class="case-button" href="https://www.dwightprompt.com/" target="_blank" rel="noopener noreferrer">Visit Dwight ↗</a>
                        <a href="https://www.dwightprompt.com/support/prompts" target="_blank" rel="noopener noreferrer">Read the product guide ↗</a>
                        <a href="mailto:hello@dwightprompt.com">Contact Dwight ↗</a>
                        <NuxtLink to="/#contact">Talk about a project ↗</NuxtLink>
                    </div>
                </section>
            </article>
        </div>
    </main>
</template>

<style scoped>
.dwight-case { --case-green: #18b960; --case-black: #111210; --case-soft: #e8f7ed; padding: 150px var(--gutter) 120px; background: var(--paper); color: var(--ink); }
.case-shell { width: min(100%, 1280px); margin-inline: auto; display: grid; grid-template-columns: 180px minmax(0, 1000px); gap: clamp(48px, 7vw, 100px); align-items: start; }
.case-index { position: sticky; top: 98px; min-height: calc(100svh - 130px); display: flex; flex-direction: column; align-items: flex-start; }
.case-back,.case-index nav a,.case-actions a:not(.case-button),.reflection-actions a:not(.case-button) { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 5px; }
.case-back { color: var(--muted); font-size: 14px; }
.view-toggle { position: relative; isolation: isolate; display: inline-flex; margin-top: 42px; padding: 4px; background: var(--surface); }
.view-toggle::before { content: ''; position: absolute; z-index: -1; inset: 4px auto 4px 4px; width: calc((100% - 8px) / 2); background: var(--ink); transition: transform 240ms cubic-bezier(.22,1,.36,1); }
.is-condensed .view-toggle::before { transform: translateX(100%); }
.view-toggle button { width: 64px; min-height: 38px; padding: 8px 10px; border-radius: 0; color: var(--muted); background: transparent; font-size: 14px; transition: color 180ms, transform 180ms; }
.view-toggle button[aria-pressed="true"] { color: #fff; }
.view-toggle button:active { transform: scale(.95); }
.case-index nav { display: flex; flex-direction: column; gap: 13px; margin-top: 38px; }
.case-index nav a { width: fit-content; color: var(--muted); font-size: 14px; text-decoration-color: transparent; transition: transform 200ms, color 200ms, text-decoration-color 200ms; }
.case-index nav a:hover,.case-index nav a.active { color: var(--ink); text-decoration-color: var(--case-green); }
.case-index-note { margin-top: auto; max-width: 155px; color: var(--muted); font-size: 13px; line-height: 1.5; }
.case-article { min-width: 0; }
.case-header { scroll-margin-top: 96px; padding-top: 8px; }
.eyebrow { color: var(--case-green); font-size: 14px; font-weight: 700; }
.case-header h1 { margin-top: 18px; font-size: clamp(64px, 7vw, 104px); line-height: .95; }
.case-subtitle { max-width: 780px; margin-top: 28px; font-size: clamp(21px, 2vw, 28px); line-height: 1.4; letter-spacing: -.025em; text-wrap: pretty; }
.case-meta { display: grid; grid-template-columns: .8fr 1.35fr 1fr; gap: 30px; margin: 52px 0 0; padding: 28px 0; border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); }
.case-meta dt { color: var(--muted); font-size: 13px; }
.case-meta dd { margin: 9px 0 0; font-size: 15px; line-height: 1.55; }
.case-actions,.reflection-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 28px; margin-top: 34px; }
.case-actions a:not(.case-button),.reflection-actions a:not(.case-button) { font-size: 14px; transition: color 180ms, text-underline-offset 180ms; }
.case-button { min-height: 48px; display: inline-flex; align-items: center; padding: 12px 18px; color: #07140b; background: var(--case-green); font-size: 14px; font-weight: 700; transition: transform 200ms cubic-bezier(.22,1,.36,1), background-color 200ms; }
.mobile-case-tools { display: none; }
.evidence-frame { margin: 0; padding: 10px; background: var(--surface); }
.evidence-frame img { width: 100%; height: auto; transition: transform 450ms cubic-bezier(.22,1,.36,1); transform-origin: center; }
.evidence-frame figcaption { display: block; margin: 10px 2px 2px; color: var(--muted); font-size: 13px; line-height: 1.5; }
.hero-visual { margin-top: 70px; }
.case-chapter { scroll-margin-top: 96px; padding-top: clamp(110px, 12vw, 170px); }
.chapter-heading { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 30px; align-items: start; }
.chapter-heading > p { padding-top: 8px; color: var(--case-green); font-size: 14px; font-weight: 700; }
.chapter-heading h2 { max-width: 740px; font-size: clamp(40px, 4.5vw, 64px); line-height: 1.03; text-wrap: balance; }
.chapter-copy { max-width: 700px; margin: 42px 0 0 180px; }
.chapter-copy p { font-size: 18px; line-height: 1.7; text-wrap: pretty; }
.chapter-copy p + p { margin-top: 22px; }
.overview-art,.system-gallery,.design-gallery { margin-top: 64px; }
.challenge-points { margin: 56px 0 0 180px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.challenge-points p { min-height: 150px; padding: 24px; background: var(--surface); font-size: 16px; line-height: 1.6; }
.challenge-points strong { display: block; margin-bottom: 10px; font-size: 18px; }
.system-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.workflow-demo { margin-top: 58px; padding: 36px; color: #f4f4ef; background: var(--case-black); display: grid; grid-template-columns: .85fr 1.15fr; gap: 42px; }
.workflow-demo-copy { align-self: center; }
.workflow-demo-copy > p:first-child { color: var(--case-green); font-size: 14px; font-weight: 700; }
.workflow-demo-copy h3 { margin-top: 16px; font-size: clamp(30px, 3vw, 44px); line-height: 1.05; letter-spacing: -.04em; }
.workflow-demo-copy > p:last-child { margin-top: 22px; color: #b8bdb7; font-size: 16px; line-height: 1.6; }
.workflow-ui { padding: 22px; color: var(--case-black); background: #f8f8f5; }
.workflow-ui-top { display: flex; justify-content: space-between; gap: 18px; margin-bottom: 26px; font-size: 13px; font-weight: 700; }
.workflow-ui ul { list-style: none; margin: 0; padding: 0; }
.workflow-ui li { display: grid; grid-template-columns: 34px 1fr auto; gap: 10px; padding: 15px 0; border-top: 2px solid var(--case-black); font-size: 15px; }
.workflow-ui li span { color: var(--case-green); font-weight: 700; }
.workflow-ui li b { color: var(--muted); font-size: 13px; font-weight: 500; }
.workflow-control { grid-column: 1 / -1; }
.workflow-control input { width: 100%; height: 44px; appearance: none; background: transparent; cursor: pointer; }
.workflow-control input:focus-visible { outline: 2px solid var(--case-green); outline-offset: 5px; }
.workflow-control input::-webkit-slider-runnable-track { height: 8px; background: #f8f8f5; }
.workflow-control input::-webkit-slider-thumb { appearance: none; width: 30px; height: 30px; margin-top: -11px; border: 0; border-radius: 50%; background: var(--case-green); transition: transform 180ms; }
.workflow-control input::-moz-range-track { height: 8px; background: #f8f8f5; }
.workflow-control input::-moz-range-thumb { width: 30px; height: 30px; border: 0; border-radius: 50%; background: var(--case-green); transition: transform 180ms; }
.workflow-control input:active::-webkit-slider-thumb,.workflow-control input:active::-moz-range-thumb { transform: scale(1.12); }
.workflow-control > div { display: flex; justify-content: space-between; gap: 10px; color: #777d76; font-size: 13px; }
.workflow-control .active { color: var(--case-green); }
.workflow-stage-enter { animation: workflow-stage-arrive 240ms ease-out both; }
.workflow-ui.workflow-stage-enter { animation-delay: 40ms; }
@keyframes workflow-stage-arrive { from { opacity: .45; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.decision-rows { margin-top: 56px; }
.decision-rows article { display: grid; grid-template-columns: .8fr 1fr 1fr; gap: 34px; padding: 34px 0; border-top: 2px solid var(--ink); }
.decision-rows article:last-child { border-bottom: 2px solid var(--ink); }
.decision-rows h3 { font-size: 22px; line-height: 1.2; letter-spacing: -.035em; }
.decision-rows p { font-size: 15px; line-height: 1.65; }
.decision-rows p:last-child { color: var(--muted); }
.extension-strip { margin: 48px 0 0 180px; display: flex; flex-wrap: wrap; gap: 8px; }
.extension-strip span { padding: 10px 13px; color: #0a2413; background: var(--case-soft); font-size: 14px; font-weight: 650; }
.design-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.reflection-chapter { padding-bottom: 60px; }
.reflection-actions { margin-left: 180px; }

@media (hover: hover) and (pointer: fine) {
    .case-index nav a:hover { transform: translateX(3px); }
    .case-back:hover { transform: translateX(-3px); color: var(--ink); }
    .case-button:hover { transform: translateY(-2px); background: color-mix(in srgb, var(--case-green) 88%, var(--paper)); }
    .case-actions a:not(.case-button):hover,.reflection-actions a:not(.case-button):hover { color: var(--muted); text-underline-offset: 8px; }
    .hero-visual:hover img,.system-gallery figure:hover img,.design-gallery figure:hover img { transform: scale(.985); }
}
.case-back { display: inline-block; transition: transform 200ms, color 200ms; }
.case-button:active { transform: translateY(0) scale(.98); }

@media (max-width: 980px) {
    .dwight-case { padding-top: 130px; }
    .case-shell { grid-template-columns: 1fr; }
    .case-index { display: none; }
    .mobile-case-tools { position: sticky; top: 64px; z-index: 20; display: block; margin-top: 48px; padding: 10px 0 12px; background: color-mix(in srgb, var(--paper) 94%, transparent); }
    .mobile-case-tools .view-toggle { margin-top: 0; }
    .mobile-case-tools nav { display: flex; gap: 18px; margin-top: 12px; padding-bottom: 6px; overflow-x: auto; scrollbar-width: thin; }
    .mobile-case-tools nav a { flex: 0 0 auto; color: var(--muted); font-size: 14px; }
    .mobile-case-tools nav a.active { color: var(--case-green); }
    .hero-visual { margin-top: 45px; }
}

@media (max-width: 700px) {
    .dwight-case { padding: 116px 20px 90px; }
    .case-header h1 { font-size: 68px; }
    .case-subtitle { font-size: 21px; }
    .case-meta { grid-template-columns: 1fr; gap: 22px; margin-top: 38px; }
    .case-actions { align-items: flex-start; flex-direction: column; }
    .mobile-case-tools { margin-left: -20px; margin-right: -20px; padding-left: 20px; padding-right: 20px; }
    .case-chapter { padding-top: 95px; }
    .chapter-heading { grid-template-columns: 1fr; gap: 14px; }
    .chapter-heading > p { padding-top: 0; }
    .chapter-heading h2 { font-size: 42px; }
    .chapter-copy,.challenge-points,.reflection-actions,.extension-strip { margin-left: 0; }
    .chapter-copy { margin-top: 30px; }
    .chapter-copy p { font-size: 17px; }
    .challenge-points { grid-template-columns: 1fr; margin-top: 38px; }
    .challenge-points p { min-height: 0; }
    .overview-art,.system-gallery,.design-gallery { margin-top: 42px; }
    .system-gallery,.design-gallery { grid-template-columns: 1fr; }
    .workflow-demo { padding: 22px; grid-template-columns: 1fr; gap: 28px; }
    .workflow-ui-top { align-items: flex-start; flex-direction: column; }
    .workflow-ui li { grid-template-columns: 30px 1fr; }
    .workflow-ui li b { grid-column: 2; }
    .workflow-control { grid-column: auto; }
    .workflow-control > div { display: grid; grid-template-columns: repeat(3, 1fr); }
    .decision-rows article { grid-template-columns: 1fr; gap: 14px; }
    .reflection-actions { align-items: flex-start; flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
    .dwight-case *, .dwight-case *::before { animation: none !important; transition: none !important; }
    .case-index nav a:hover,.case-back:hover,.case-button:hover,.case-button:active,.view-toggle button:active,.evidence-frame:hover img { transform: none; }
    .workflow-control input:active::-webkit-slider-thumb,.workflow-control input:active::-moz-range-thumb { transform: none; }
}
</style>
