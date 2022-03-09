

export const searchEngines = {
    'google': (uri) => `https://www.google.com/search?q=${uri}`,
    'duckduckgo': (uri) => `https://start.duckduckgo.com/?q=${uri}`,
    'bing': (uri) => `https://www.bing.com/search?q=${uri}`
};

export const defaultSearchEngine = 'google';
export const defaultUrl = 'https://www.google.com/'

export const addressBarHeight = 50
export const browserActionBarHeight = 48