export const version = "1.0.0";

export const searchEngines = {
    'google': (uri) => `https://www.google.com/search?q=${uri}`,
    'duckduckgo': (uri) => `https://start.duckduckgo.com/?q=${uri}`,
    'bing': (uri) => `https://www.bing.com/search?q=${uri}`
};

export const defaultSearchEngine = 'google';
export const defaultUrl = 'https://google.com/'
export const defaultFavItem = {
    url: 'https://www.google.com/',
    title: 'Google'
}
export const defaultSmileToScrollThreshold = 0.12;
// export const defaultUrl = ''
export const defaultIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='

export const addressBarHeight = 50
export const browserActionBarHeight = 48

export const injectedJS =  (isLandscape) => {

    if (isLandscape){
        return `
        // console.log('test');
        // var videos = document.getElementsByTagName("video");
        // for (var i = 0; i < videos.length; i++) {
        //     videos[i].style.webkitTransform = "scale(1) rotate(180deg)";
        //     videos[i].style.transform = "scale(1) rotate(180deg)";
        // };
        `

    } else {
        return `
    // var a = document.getElementsByTagName("a");
    // for (i=0; i<a.length; i++)
    //     if (a[i].target == "_blank")
    //         a[i].target = "_self";
    `;
        
    }

    
}