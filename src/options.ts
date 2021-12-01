const backgrounds = [
    { url: '/assets/backgrounds/bg1.jpg', author: 'Dylan Calluy' },
    { url: '/assets/backgrounds/bg2.jpg', author: 'Adrian N' },
    { url: '/assets/backgrounds/bg3.jpg', author: 'Kellen Riggin' },
    { url: '/assets/backgrounds/bg4.jpg', author: 'Adrew Svk' },
]

export function getBackground() {
    const randomIndex = Math.floor(Math.random()*backgrounds.length);

    return backgrounds[randomIndex];
}

function prefixKey(keyname: string) {
    return `$elegant-${keyname}`;
}

export interface IBookmark {
    id: number;
    title: string;
    url: string;
    favicon: string;
}

export function getBookmarks(): IBookmark[] {
    const key = prefixKey('bookmarks');
    const bookmarksStr = localStorage.getItem(key);

    if (!bookmarksStr) {
        return [];
    }

    try {
        return JSON.parse(bookmarksStr);
    } catch {
        return [];
    }
}

export function saveBookmarks(bookmarks: IBookmark[]) {
    const key = prefixKey('bookmarks');
    localStorage.setItem(key, JSON.stringify(bookmarks));
}

export const websiteIcons = {
    'discord.com': '/assets/websites/discord.png',
    'duckduckgo.com': '/assets/websites/duckduckgo.png',
    'facebook.com': '/assets/websites/facebook.png',
    'figma.com': '/assets/websites/figma.png',
    'github.com': '/assets/websites/github.png',
    'gitlab.com': '/assets/websites/gitlab.png',
    'mail.google.com': '/assets/websites/gmail.png',
    'google.com': '/assets/websites/google.png',
    'jbzd.com.pl': '/assets/websites/jbzd.png',
    'instagram.com': '/assets/websites/instagram.png',
    'kde.com':  '/assets/websites/kde.png',
    'librus.pl': '/assets/websites/librus.png',
    'onet.pl': '/assets/websites/onet.png',
    'react.com': '/assets/websites/react.png',
    'reddit.com': '/assets/websites/reddit.png',
    'wikipedia.org': '/assets/websites/wikipedia.png',
    'wykop.pl': '/assets/websites/wykop.png',
    'youtube.com': '/assets/websites/youtube.png',
    'spotify.com': '/assets/websites/spotify.png',
    'x-kom.pl': '/assets/websites/xkom.png',
    'startpage.com': '/assets/websites/startpage.png',
    'npmjs.com': '/assets/websites/npm.png',
    'nodejs.org': '/assets/websites/node.png',
    'stackoverflow.com': '/assets/websites/stackoverflow.png',
    'twitter.com': '/assets/websites/twitter.png',
    'nestjs.com': '/assets/websites/nestjs.png',
    'netflix.com': '/assets/websites/netflix.png',
    'outlook.live.com': '/assets/websites/outlook.png',
    'office.live.com': '/assets/websites/office.png',
    'www.office.com': '/assets/websites/office.png',
    'teams.microsoft.com': '/assets/websites/teams.png',
    'microsoft.com': '/assets/websites/microsoft.png',
    'teams.com': '/assets/websites/microsoft.png',
    'protonmail.com': '/assets/websites/protonmail.png',
    'odrabiamy.pl': '/assets/websites/odrabiamy.png',
}

export function getWebsiteIcon(url: string) {
    try {
        const { protocol, hostname } = new URL(url);
        for (const [host, icon] of Object.entries(websiteIcons)) {
            if (hostname.endsWith(host)) return icon;
        }

        return `${protocol}//${hostname}/favicon.ico`;
    } catch (err) {
        return '/assets/websites/generic.png';
    }
}

export enum SearchEngines {
    GOOGLE = 'google',
    DDG = 'duckduckgo',
    BING = 'bing',
    QWANT = 'qwant',
    SWISSCOWS = 'swisscows',
    SEARX = 'searx',
    YAHOO = 'yahoo',
}

const SearchUrls: any = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    bing: 'https://www.bing.com/search?q=',
    yahoo: 'https://search.yahoo.com/search?p=',
    qwant: 'https://www.qwant.com/?q=',
    swisscows: 'https://swisscows.com/web?query=',
    searx: 'https://searx.be/search?q='
}

export function getSearchIcon() {
    const key = prefixKey('search')
    const engine = localStorage.getItem(key) || SearchEngines.GOOGLE;

    return `/assets/engines/${engine}.png`;
}

export function search(q: string) {
    const key = prefixKey('search')
    const engine = localStorage.getItem(key) || SearchEngines.GOOGLE;

    const url = SearchUrls[engine];
    return `${url}${q}`;
}

export function getSearchEngine() {
    const key = prefixKey('search')
    const engine = localStorage.getItem(key) || SearchEngines.GOOGLE;

    return engine;
}

export function saveSearch(engine: SearchEngines) {
    const key = prefixKey('search');
    localStorage.setItem(key, engine);
}