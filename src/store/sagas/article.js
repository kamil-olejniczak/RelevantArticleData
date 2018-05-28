import * as actions from '../actions/article';
import {put} from 'redux-saga/effects';
import {
    isImproperLink,
    parseResponseData,
    refreshRecentlyVisited,
    refreshTagStatistics,
    saveDataToLocalStorage
} from '../../utils/utils';
import uuid from 'uuid';
import axios from 'axios';
import {GET_ARTICLE} from "../actions/actionTypes";

export function* getArticleSaga({url}) {
    if (yield checkForImproperLink(url)) {
        return null;
    }
    yield checkForSuccessfulResponse(url, GET_ARTICLE);
}

function* checkForSuccessfulResponse(url, type) {
    const response = yield fetchArticle(url);
    if (!response.data) {
        return yield put(actions.errorOccurred(response));
    }
    yield put(actions.articleResponse(response, type));
}

function* fetchArticle(url) {
    yield put(actions.resolvingArticle());
    const authData = {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    };
    // url = 'https://www.livescience.com/62551-americans-are-more-anxious.html';
    let response;
    try {
        response = yield axios.get(`https://mercury.postlight.com/parser?url=${url}`, authData);
    } catch (error) {
        return error;
    }
    // const response = {
    //     data: {
    //         content: `<div><div><div class="section-content"><div class="section-inner sectionLayout--insetColumn"><figure id="1b95" class="graf graf--figure graf-after--h3"><img class="progressiveMedia-noscript js-progressiveMedia-inner" src="https://cdn-images-1.medium.com/max/1600/1*zo51eqdjJ_XSU0D8Vm8P9A.png"></figure><p id="c21b" class="graf graf--p graf-after--figure"><a href="https://github.com/postlight/awesome-cms" class="markup--anchor markup--p-anchor">Awesome CMS</a> is&#x2026;an awesome list of awesome CMSes. It&#x2019;s on GitHub, so anyone can add to it via a pull request. Here are some notes on how and why it came to be.</p><p id="2a96" class="graf graf--p graf-after--h3">GitHub has a <a href="https://help.github.com/articles/search-syntax/" class="markup--anchor markup--p-anchor">set of powerful commands</a> for narrowing search results. In seeking out modern content management tools, I used queries like this:</p><p id="5c79" class="graf graf--p graf-after--p"><a href="https://github.com/search?o=desc&amp;q=cms+OR+%22content+management%22+OR+admin+pushed%3A%3E2016-01-01+stars%3A%3E50&amp;ref=searchresults&amp;s=stars&amp;type=Repositories&amp;utf8=&#x2713;" class="markup--anchor markup--p-anchor">cms OR &#x201C;content management&#x201D; OR admin pushed:&gt;2016&#x2013;01&#x2013;01 stars:&gt;50</a></p><p id="7d38" class="graf graf--p graf-after--p">Sorting by stars, I worked my way backwards. I was able to quickly spot relevant CMS projects. I also started to notice some trends.</p><ul class="postList"><li id="8671" class="graf graf--li graf-after--p">Modern and popular content management systems are written in PHP, JavaScript, Python, and Ruby. There are also a few content management systems written in&#xA0;.NET (C#), but they are much less popular on GitHub.</li><li id="a406" class="graf graf--li graf-after--li">Headless content management systems are gaining popularity. Simply presenting the UI for users to edit content, and relying on the end user to create the user-facing site by ingesting the API. <a href="http://getdirectus.com/" class="markup--anchor markup--li-anchor">Directus</a> and <a href="https://www.cloudcms.com/" class="markup--anchor markup--li-anchor">Cloud CMS</a> are headless CMS options.</li><li id="e133" class="graf graf--li graf-after--li">Static content management systems don&#x2019;t host pages for you. Instead they help generate your CMS, using static files. <a href="https://github.com/netlify/netlify-cms" class="markup--anchor markup--li-anchor">Netlify CMS</a>, <a href="https://respondcms.com/" class="markup--anchor markup--li-anchor">Respond CMS</a>, and <a href="https://www.getlektor.com/" class="markup--anchor markup--li-anchor">Lektor</a> are a few of the options in the static CMS space.</li></ul><p id="3bfc" class="graf graf--p graf-after--h3">I knew the list of all popular content management systems would be huge. I didn&#x2019;t want to put that data into Markdown directly, as it would be difficult to maintain and to augment with extra data (stars on GitHub, last push date, tags, etc).</p><p id="4bcb" class="graf graf--p graf-after--p">Instead, I opted to store the data in <a href="https://github.com/toml-lang/toml" class="markup--anchor markup--p-anchor">TOML</a>, a human-friendly configuration file language. You can view all of the data that powers Awesome CMS in the <a href="https://github.com/postlight/awesome-cms/tree/97216ef432963d4dfb2238340e2ebf9a4127fb1e/data" class="markup--anchor markup--p-anchor">data folder</a>. Here&#x2019;s WordPress&#x2019; entry in that file:</p><pre id="4771" class="graf graf--pre graf-after--p">[[cms]]<br>name = &quot;WordPress&quot;<br>description = &quot;WordPress is a free and open-source content management system (CMS) based on PHP and MySQL.&quot;<br>url = &quot;https://wordpress.org&quot;<br>github_repo = &quot;WordPress/WordPress&quot;<br>awesome_repo = &quot;miziomon/awesome-wordpress&quot;<br>language = &quot;php&quot;</pre><p id="4703" class="graf graf--p graf-after--pre">I process this file using JavaScript in <a href="https://github.com/postlight/awesome-cms/blob/97216ef432963d4dfb2238340e2ebf9a4127fb1e/scripts/generateReadme.js" class="markup--anchor markup--p-anchor">generateReadme.js</a>. It handles processing the TOML, fetching information from GitHub, and generating the final README.md file using the <a href="https://github.com/postlight/awesome-cms/blob/master/README.md.hbs" class="markup--anchor markup--p-anchor">Handlebars template</a>. I&#x2019;m scraping GitHub for star counts because GitHub&#x2019;s API only allows for 60 requests an hour for authenticated users. We want to make it as easy as possible for anyone to contribute. Requiring users to generate a GitHub authentication token to generate the README wasn&#x2019;t an option.</p><p id="73aa" class="graf graf--p graf-after--p">By storing the data in TOML at generating the README.md using JavaScript, I&#x2019;ve essentially created an incredibly light-weight, GitHub backed, static CMS to power Awesome CMS.</p><figure id="7c3e" class="graf graf--figure graf-after--p graf--trailing"><img class="progressiveMedia-noscript js-progressiveMedia-inner" src="https://cdn-images-1.medium.com/max/1600/1*Y69yr0JgwOaLzACB0ZXDGw.gif"><figcaption class="imageCaption">I heard you like content management systems</figcaption></figure></div></div></div></div>`,
    //         title: 'some titledsafdsa fdsf sdaf dsafsdaf sda f ',
    //         url: 'https://docs.oracle.com/cd/E13150_01/jrockit_jvm/jrockit/geninfo/diagnos/garbage_collect.html',
    //         "date_published": "2016-09-30T07:00:12.000Z",
    //         "lead_image_url": "https://www.wired.com/wp-content/uploads/2016/09/Rosetta_impact-1-1200x630.jpg",
    //         "dek": "Time to break out the tissues, space fans.",
    //         "domain": "www.wired.com",
    //         "excerpt": "Time to break out the tissues, space fans.",
    //         "word_count": 1031,
    //         "direction": "ltr",
    //         "total_pages": 1,
    //         "rendered_pages": 1,
    //         "next_page_url": null
    //     }
    // };
    const visitedSite = {
        id: uuid(),
        title: response.data.title,
        url: response.data.url,
        date: new Date()
    };
    const formattedData = {
        data: parseResponseData(response.data),
        content: response.data.content,
        recentlyVisited: refreshRecentlyVisited(visitedSite),
        statistics: refreshTagStatistics(response.data.content)
    };

    saveDataToLocalStorage(formattedData);

    return formattedData;
}

function* checkForImproperLink(url) {
    if (!isImproperLink(url)) {
        yield put(actions.invalidUrl());
        return true;
    }
    return false;
}