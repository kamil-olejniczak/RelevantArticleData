import React from 'react';
import './ParsedArticle.css';

const ParsedArticle = props => {
    return (
        <div className="ParsedArticle" dangerouslySetInnerHTML={{__html: props.content}}></div>
    );
};

export default ParsedArticle;