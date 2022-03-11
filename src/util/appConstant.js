

export const searchEngines = {
    'google': (uri) => `https://www.google.com/search?q=${uri}`,
    'duckduckgo': (uri) => `https://start.duckduckgo.com/?q=${uri}`,
    'bing': (uri) => `https://www.bing.com/search?q=${uri}`
};

export const defaultSearchEngine = 'duckduckgo';
export const defaultUrl = 'https://www.google.com/'
export const defaultIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='

export const addressBarHeight = 50
export const browserActionBarHeight = 48