import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as articleActions from "../store/actions/article";
import './ArticleSearch.css';

class ArticleSearch extends Component {
    searchForArticle = (event) => {
        if (event.key === 'Enter') {
            this.props.onGetSpecifiedArticle(event.target.value);
        }
    };

    render() {
        return (
            !this.props.isArticleShown ? (
                <div className="ArticleSearch">
                    <div>
                        <h1>Relevant Article Data</h1>
                        <h2>Read only valuable content</h2>
                    </div>
                    <input className={this.props.error ? "reducedBottomMargin" : null}
                           type="text"
                           onKeyDown={this.searchForArticle}
                           placeholder="Paste link to article..."/>
                    {this.props.error ? (<div className="warning">{this.props.error}</div>) : null}
                </div>
            ) : null
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetSpecifiedArticle: (url) => dispatch(articleActions.getSpecifiedArticle(url))
    };
};

const mapStateToProps = state => {
    return {
        error: state.article.error,
        isArticleShown: state.article.isArticleShown
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearch);