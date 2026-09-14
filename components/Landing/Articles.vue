<script setup>
const articles = [
    { date: '15 Apr 2023', title: "Dos and Don'ts for a Junior Developer", category: 'Development', link: 'https://medium.com/@dagimshimelis1992/dos-and-donts-for-a-junior-developer-b74ff9830f89' },
    { date: '20 Oct 2023', title: 'Mastering the Art of Laser-Focused Productivity', category: 'Process', link: 'https://medium.com/@dagimshimelis1992/mastering-the-art-of-laser-focused-productivity-65123baa340e' },
    { date: '30 Oct 2023', title: 'To sleep or not to sleep, that is the question', category: 'Life beyond the screen', link: 'https://medium.com/@dagimshimelis1992/d3eb7f678180' },
];
</script>

<template>
    <section id="articles" class="articles-section page-gutter section-space" aria-labelledby="articles-heading">
        <div class="section-marker"><h2 id="articles-heading">Notes along the way.</h2><span class="eyebrow">05 / A little thinking out loud</span></div>
        <div class="article-list">
            <a v-for="article in articles" :key="article.title" :href="article.link" target="_blank" rel="noopener noreferrer" class="article-row"><span class="eyebrow">{{ article.date }}</span><h3>{{ article.title }}</h3><span class="eyebrow article-category">{{ article.category }}</span><span aria-hidden="true">↗</span></a>
        </div>
    </section>
</template>
