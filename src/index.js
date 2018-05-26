import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css/normalize.css';
import './index.css';
import RelevantArticleData from './containers/RelevantArticleData';

const app = (
    <RelevantArticleData/>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
