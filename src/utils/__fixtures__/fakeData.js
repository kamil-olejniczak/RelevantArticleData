export const firstRecentlyVisitedSite = {
    id: 1,
    title: 'SomeTitle',
    url: 'SomeUrl',
    date: new Date(1 << 30),
};
export const secondRecentlyVisitedSite = {
    id: 2,
    title: 'SomeTitle2',
    url: 'SomeUrl2',
    date: new Date(1 << 30),
};
export const fakeRecentlyVisited = {
    recentlyVisited: [firstRecentlyVisitedSite, secondRecentlyVisitedSite]
};
export const fakeArticleData = {
    data: {
        title: 'Some Title',
        date_published: '1970-01-01',
        domain: 'www.dabliu.com',
        dek: 'Short dek text',
        excerpt: 'Short excerpt text',
        word_count: 111,
        lead_image_url: 'http://www.dabliu.pl/image.html',
    }
};
export const fakeTagStatistics = {
    div: 8,
    p: 2,
    a: 3,
    span: 10,
    i: 9,
    html: 1,
    br: 2,
    table: 7,
    hr: 6,
    input: 4,
    textarea: 5
};
export const fakeSortedTagStatistics = [
    'span', '10',
    'i', '9',
    'div', '8',
    'table', '7',
    'hr', '6',
    'textarea', '5',
    'input', '4',
    'a', '3',
    'br', '2',
    'p', '2',
];