import React from 'react';
import ReactDOM from 'react-dom';
import RelevantArticleData from './containers/RelevantArticleData';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store/store';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './index.css';

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={RelevantArticleData} exact/>
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
