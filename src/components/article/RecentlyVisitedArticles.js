import React from 'react';
import {Link} from 'react-router-dom';
import './RecentlyVisitedArticles.css';

const RecentlyVisitedArticles = (props) => (
    <div className="RecentlyVisitedArticles">
        <span className="header">Recently Visited Articles:</span>
        <span id="resetStats" onClick={props.clearData}>Reset stats</span>
        {props.recentlyVisited.map(article => (
            <div key={article.id}>
                <Link to="/recentlyVisited">
                    Title: {article.title.length > 40 ? 'Title to long, show detailed statistics.' : article.title}
                </Link>
                <br/>
                <a href={article.url}>
                    Url: {article.url.length > 40 ? 'Link to long, click here to follow it.' : article.url}
                </a>
                <hr/>
            </div>
        ))}
    </div>
);

export default RecentlyVisitedArticles;