import store from '../store/store';

export function refreshRecentlyVisited(recentlyVisitedSite) {
    const oldUrls = store.getState().article.recentlyVisited;
    if (oldUrls.length < 5) {
        return new Array(recentlyVisitedSite).concat(oldUrls);
    } else {
        return new Array(recentlyVisitedSite).concat(oldUrls.slice(0, 4));
    }
}

export function refreshTagStatistics(newTagData) {
    return countHTMLTags(newTagData);
}

export function parseResponseData(data) {
    const date = new Date(data.date_published);
    return {
        ...data,
        date_published: date.getTime() === 0 ? null : date.toLocaleDateString()
    }
}

export function parseDateForRecentlyVisitedFromLocalStorage(data) {
    return data.map(site => ({...site, date: new Date(site.date)}));
}

export function isImproperLink(url) {
    const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    const match = regExp.test(url);
    return match && url;
}

export function saveDataToLocalStorage(formattedData) {
    localStorage.setItem('tagStats', JSON.stringify(formattedData.statistics));
    localStorage.setItem('recentVisit', JSON.stringify(formattedData.recentlyVisited));
}

export function clearLocalStorage() {
    localStorage.clear()
}

function countHTMLTags(htmlCode) {
    const map = {...store.getState().article.statistics};
    const regExp = /<([a-z]+)(?=[\s>])(?:[^>=]|='[^']*'|="[^"]*"|=[^'"\s]*)*\s?\/?>/gi;
    let match;

    do {
        match = regExp.exec(htmlCode);
        if (match) {
            if (!(match[1] in map)) { // first group, only tag name is needed
                map[match[1]] = 0
            }
            map[match[1]]++
        }
    } while (match);

    return map;
}