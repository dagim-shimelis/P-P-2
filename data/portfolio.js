import projects from './projects-list.json';

const categories = {
    'Dwight Prompt': 'AI tools',
    TriggerNote: 'Productivity',
    Vidspawn: 'Desktop app',
    Docspawn: 'Document automation',
    Supabrain: 'Developer tools',
    Lunaria: 'Document intelligence',
};

export const work = projects.map(project => ({
    ...project,
    link: project.link.trim(),
    category: categories[project.name] || 'Web experience',
    personal: ['Dwight Prompt', 'TriggerNote'].includes(project.name),
}));

export const selectedWork = ['Dwight Prompt', 'Vidspawn', 'Docspawn', 'TriggerNote', 'Sabi', 'HahuJobs Primary', 'Lunaria']
    .map(name => work.find(project => project.name === name));

export const email = 'dagimshimelis1992@gmail.com';
export const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/dagim-shimelis' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dagim-shimelis/' },
    { name: 'X', url: 'https://x.com/Dagim__Shimelis' },
    { name: 'Medium', url: 'https://medium.com/@dagimshimelis1992' },
];
