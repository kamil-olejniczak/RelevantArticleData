# RelevantArticleData

It's a front-end app which uses Mercury Web Parser API to display only relevant article data.

This app was created as recruitment task for an internship.

## Quick setup
```
***To use this project you need to create account and get an api key from Mercury Web Parser.***
1. Create folder on your drive.
2. Clone this repo: git clone 'https://github.com/kamil-olejniczak/RelevantArticleData.git'.
3. run 'npm install' while you are in root folder.
4. While node is downloading dependencies create file ".env" in root folder, paste this line:
'REACT_APP_API_KEY=your_private_api_key_for_mercury_web_parser'.
5. run yarn 'start' or 'npm start'.
6. (Optional) If your browser didn't show up, open it and go to this link: 'http://localhost:3000/'.
```

## What does this app do?

Only thing that you need to do is, to find some articles that you would like to strip from unwanted additional data - this service is provided by Mercury Web Parser API.
This app only displays response returned from API call, additionally you can see the most frequent tags used in article which was provided by you, there is also a list of 5 articles
which were visited by you.
Data used in this app is stored in your browser local storage, you can extract it and save to file.

## Screenshots

![main page](https://github.com/kamil-olejniczak/ClientDatabaseAngularFront/blob/screenshots/main_page.png "Main page with article search")
Main page with article search.

![parsed article](https://github.com/kamil-olejniczak/ClientDatabaseAngularFront/blob/screenshots/filter_applied.png "Parsed article")
Parsed article.

![div with article data](https://github.com/kamil-olejniczak/ClientDatabaseAngularFront/blob/screenshots/client_details.png "Article data div")
Article data div.

![recently visited articles](https://github.com/kamil-olejniczak/ClientDatabaseAngularFront/blob/screenshots/secondary_route.png "Recently visited articles by user")
Recently visited articles by user.

## Used packages

```
Dependencies:
axios: to send api request to Mercury Web Parser,
normalize.css: to remove default browser styling,
react: library on top of which this app is created (love that JSX syntax),
react-dom: react package to work with DOM,
react-redux: to connect multiple components and containers,
react-router-dom: to provide user side routing,
redux: to maintain state between multiple components and containers,
redux-saga: to provide easier async actions (instead of redux-thunk),
uuid: to generate random ids,
font-awesome: for a little bit of styling.

Dev dependencies:
enzyme: for shallow rendering,
enzyme-adapter-react-16: to use enzyme with react16+,
react-test-renderer: to render and compare snapshots (simple UI tests),
redux-mock-store: to test connected components.
```

## Why react instead of angular?

I just wanted to learn a new library and extend my JavaScript knowledge with ES6 new features.

## How this app can be improved?

This app almost like anything can be improved.

First of all, amount of data transformation and mapping is a little bit to high. What I mean is, that response sent from Mercury Web Parser API is not exactly formatted as this app needs it to be,
so this app takes care of that by mapping it to suitable form. Creating simple backend, which maps this response to suitable form would be a better idea,
but there is a downside of this solution - now you have frontend app which calls your backend, which calls Mercury API.

Treating this app as view layer and creating backend server gives you more flexibility, for example in future you can create your own web parser,
add user database, store and provide more meaningful and specific data (something like user favourite articles, article read count, etc.).

Mostly used tags are stored in a simple map - it's an object, object fields (keys) are tag names, values of this fields are tags occurrences count. This aspect could be improved by using HashMap.
In Java you can create HashMap with starting size and default load factor provided by user - in this case the size would be equal to count of all html tags, hash map size could be fixed
since it doesn't need to extend size. By using proper hashCode() you can have certainty, that in every bucket there is always only one html tag, that gives you O(1) for map lookups.

This app needs more styling for more user-friendly experience. There is a spinner for interval when data is being resolved, but there is no transition between two components when data is finally resolved.
One div disappear, another pops in, this lack of animation is a bit to rough for user.

### Additional information

Do you know what "excerpt" and "dek" means? Well I didn't know either, but while developing this app I encountered those words and learned what they mean. Let me share this knowledge with you!

*Excerpt - A passage or segment taken from a longer work, such as a literary or musical composition, a document, or a film.*

*Dek - it's a journalism term for the summary that appears below the headline of a story on a printed page, usually in a smaller font.*
