import { parseConfig } from 'hazeglow/core';

const meshPoints = [
    [0.04, 0.08], [0.35, 0.04], [0.68, 0.08], [0.96, 0.18],
    [0.18, 0.36], [0.52, 0.34], [0.84, 0.42], [0.06, 0.7],
    [0.34, 0.72], [0.64, 0.66], [0.94, 0.82], [0.48, 0.96],
];

function hashName(name) {
    return [...name].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 7);
}

function makeConfig(name, palette) {
    const seed = hashName(name);
    const offset = seed % palette.length;

    return parseConfig({
        version: 1,
        seed: (seed % 97) + 1,
        shape: 'mesh',
        center: [0.5, 0.46],
        size: [1, 0.9],
        roundness: 0.76,
        softness: 0.2,
        rotation: seed % 360,
        rampDirection: 0.82,
        angle: seed % 180,
        warp: 0.42,
        warpScale: 2.4,
        palette,
        background: palette[0],
        mesh: meshPoints.map(([x, y], index) => [x, y, palette[(index + offset) % palette.length]]),
        grain: 0.24,
        motion: 'drift',
        speed: 0.55,
        loop: 0,
        hover: 0,
        hoverMode: 'pull',
        effect: 'ascii',
        effectSize: 2,
        effectAmount: 0.15,
    });
}

const palettes = {
    'Dwight Prompt': ['#E4E4E5', '#BFC0C1', '#ABACAD', '#242424', '#646464', '#4D3C38', '#877D7D'],
    TriggerNote: ['#F5F4F1', '#2B2D30', '#3F3E3F', '#DAD3B9', '#515254', '#ADADAE', '#CE935A'],
    Vidspawn: ['#F7F6F2', '#F4F4EE', '#18181B', '#D3CEB5', '#A0A09E', '#5F5F59', '#B3CA68'],
    Docspawn: ['#F9FAFC', '#F6F5F6', '#BFC8CC', '#A0A0A1', '#646464', '#272727', '#758D85'],
    'HahuJobs Primary': ['#0A2426', '#243846', '#165859', '#07988C', '#3E565B', '#639495', '#4E9492'],
    'HahuJobs Enterprise': ['#0A211E', '#395752', '#579F95', '#A7BBB9', '#3E9488', '#3F8C73', '#90B558'],
    Supabrain: ['#F5F5F7', '#B7C6CA', '#98A4AE', '#334C5F', '#637786', '#748994'],
    EYEA: ['#F4F3F2', '#C8B6AF', '#ECD49C', '#ABAAA9', '#95786E', '#4D4D4E', '#C5A06F'],
    Kena: ['#F9F0F1', '#E51F36', '#A09FA2', '#EFA4AE', '#46424C', '#DD495A', '#AF7886'],
    Lunaria: ['#F9F9F8', '#F6F3F9', '#C19FE7', '#9E9EA0', '#9858E3', '#59595B', '#9C868C'],
    'Hey Mobile Store': ['#F3ECEF', '#FEFEFF', '#F1F2F3', '#A0A0A2', '#A8BDCE', '#4A3C4A', '#7992B7'],
    Philia: ['#312C29', '#655A52', '#52453A', '#453B34', '#94918F', '#887B72', '#413F41'],
    Taya: ['#FEFEFE', '#FDFDFD', '#BDA6B4', '#523870', '#A77074', '#5E4679'],
    Zelela: ['#FBFAFD', '#ADA9D5', '#4C3B42', '#B1AEC3', '#5B64A2', '#8E797A', '#5B3AA4'],
    Papira: ['#FFFFFF', '#FBFAFC', '#CAB6AE', '#A4A19E', '#4E443C', '#936F57', '#A4868F'],
    'Scrimba Progress': ['#543CAA', '#519395', '#385A98', '#495BA8', '#44499D', '#8EA3BC', '#788AC4'],
    'Hire Pilot': ['#EFF2F6', '#A9A3E6', '#C1C7B1', '#5F4FDF', '#E1F05C', '#8677EB', '#5F6D6C'],
    'RAYEE SNV': ['#1C1917', '#463E38', '#E6E9EB', '#5E5A54', '#A6A7A9', '#B3C8D6', '#748089'],
    'Awaqi Centers': ['#F4F4F3', '#F9E4B0', '#43464D', '#B6BCC1', '#526E8C', '#9FA3A5', '#AB8C71'],
    "Neba's Design": ['#20203A', '#262749', '#4C365F', '#56506A', '#B3B4BD', '#736F88', '#875089'],
    Foundo: ['#F9FBFA', '#B1D5C0', '#99A7A0', '#618D73', '#71A085', '#5E746A'],
    Boosty: ['#FBFBFA', '#E44D19', '#A6B3C9', '#BCB6B1', '#E18E6B', '#555152', '#CD6C49'],
};

const sheriffConfig = parseConfig({
    version: 1,
    seed: 3,
    shape: 'mesh',
    center: [0.5, 0.42],
    size: [0.86, 0.6],
    roundness: 0.7,
    softness: 0.1,
    rotation: 0,
    rampDirection: 0.9,
    angle: 90,
    warp: 1,
    warpScale: 4,
    palette: ['#848683', '#162b30', '#6f614e', '#1a2e31', '#ac8f3c', '#7a573b', '#d0b23f', '#473026', '#878580', '#878581'],
    background: '#ffffff',
    mesh: [
        [0.891, 0.007, '#848683'], [0.011, 0.679, '#162b30'], [0.947, 0.777, '#6f614e'],
        [0.423, 0.893, '#5f5142'], [0.121, 0.139, '#1a2e31'], [0.46, 0.462, '#ac8f3c'],
        [0.389, 0.112, '#7a573b'], [0.171, 0.82, '#d0b23f'], [0.288, 0.648, '#362c22'],
        [0.867, 0.451, '#473026'], [0.758, 0.965, '#878580'], [0.757, 0.23, '#878581'],
    ],
    grain: 0.3,
    motion: 'drift',
    speed: 1,
    loop: 0,
    hover: 0,
    hoverMode: 'pull',
    effect: 'ascii',
    effectSize: 2,
    effectAmount: 0.15,
});

const sabiConfig = parseConfig({
    version: 1,
    seed: 11,
    shape: 'mesh',
    center: [0.58, 0.42],
    size: [1, 0.9],
    roundness: 0.78,
    softness: 0.22,
    rotation: 0,
    rampDirection: 0.82,
    angle: 105,
    warp: 0.35,
    warpScale: 2.3,
    palette: ['#ffffff', '#efff8c', '#cfe97a', '#2a6845', '#292929', '#a7aca8', '#8a5a43'],
    background: '#ffffff',
    mesh: [
        [0.06, 0.08, '#ffffff'], [0.42, 0.1, '#f8faf7'], [0.88, 0.05, '#efff8c'],
        [0.98, 0.38, '#dff47d'], [0.72, 0.28, '#2a6845'], [0.59, 0.55, '#ffffff'],
        [0.9, 0.7, '#292929'], [0.72, 0.9, '#8a5a43'], [0.34, 0.84, '#a7aca8'],
        [0.08, 0.72, '#edf3ee'], [0.28, 0.42, '#ffffff'], [0.48, 0.68, '#cfe97a'],
    ],
    grain: 0.22,
    motion: 'drift',
    speed: 0.55,
    loop: 0,
    hover: 0,
    hoverMode: 'pull',
    effect: 'ascii',
    effectSize: 2,
    effectAmount: 0.15,
});

const darkProjects = new Set([
    'Sheriff', 'HahuJobs Primary', 'HahuJobs Enterprise', 'Philia',
    'Scrimba Progress', 'RAYEE SNV', "Neba's Design",
]);

export function hazeglowAssetSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function withMedia(name, entry) {
    const slug = hazeglowAssetSlug(name);
    return {
        ...entry,
        poster: `/media/hazeglow/${slug}.png`,
        video: `/media/hazeglow/${slug}.mp4`,
    };
}

export const projectHazeglow = Object.fromEntries([
    ...Object.entries(palettes).map(([name, palette]) => [name, withMedia(name, {
        config: makeConfig(name, palette),
        dark: darkProjects.has(name),
        fallback: palette[0],
    })]),
    ['Sheriff', withMedia('Sheriff', { config: sheriffConfig, dark: true, fallback: '#162b30' })],
    ['Sabi', withMedia('Sabi', { config: sabiConfig, dark: false, fallback: '#efff8c' })],
]);
