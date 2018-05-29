import React from 'react';
import {connect} from 'react-redux';
import * as articleActions from '../../store/actions/article';
import './ArticleData.css';

const ArticleData = ({data, isModalClosedByUser, closeModalWithData}) => {
    const title = data.title && (<p>You are currently reading: "{data.title}".</p>);
    const datePublished = data.date_published && ( <p>Which was published on {data.date_published}.</p>);
    const domain = data.domain && (<p>On "{data.domain}" domain.</p>);
    const dek = data.dek && (<p>Headline of the story (dek): "{data.dek}".</p>);
    const excerpt = data.excerpt && (<p>Hand-crafted summary of content (excerpt): "{data.excerpt}".</p>);
    const wordCount = data.word_count && (<p>This article has: {data.word_count} words.</p>);
    const leadImage = data.lead_image_url && (<div><p>Lead image to help you memorise it:</p>
        <img className="leadImg" src={data.lead_image_url} alt={data.excerpt}/></div>);
    return (
        isModalClosedByUser ? null : (
            <div className="ArticleData">
                <span id="close" onClick={closeModalWithData}><i className='far fa-times-circle'/></span>
                {title}
                {datePublished}
                {domain}
                {dek}
                {excerpt}
                {wordCount}
                {leadImage}
            </div>
        )
    );
};

const mapDispatchToProps = dispatch => {
    return {
        closeModalWithData: () => dispatch(articleActions.closeModalWithData())
    };
};

export default connect(null, mapDispatchToProps)(ArticleData);