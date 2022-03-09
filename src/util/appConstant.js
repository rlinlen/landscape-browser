

export const searchEngines = {
    'google': (uri) => `https://www.google.com/search?q=${uri}`,
    'duckduckgo': (uri) => `https://duckduckgo.com/?q=${uri}`,
    'bing': (uri) => `https://www.bing.com/search?q=${uri}`
};

export const defaultSearchEngine = 'duckduckgo';
export const defaultUrl = 'https://duckduckgo.com/'

export const addressBarHeight = 50
export const browserActionBarHeight = 48