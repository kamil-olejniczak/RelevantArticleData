import React, {Component} from 'react';
import TagStatistics from '../components/article/TagStatistics';
import RecentlyVisitedArticles from '../components/article/RecentlyVisitedArticles';
import {connect} from 'react-redux';
import ParsedArticle from '../components/article/ParsedArticle';
import ArticleSearch from './ArticleSearch';
import './RelevantArticleData.css';
import ArticleData from '../components/article/ArticleData';
import withNavbar from '../components/ui/navigation/Navbar';
import Spinner from "../components/ui/Spinner";

export class RelevantArticleData extends Component {
    render() {
        return (
            <div>
                <ArticleSearch/>
                {this.props.isArticleShown ? (
                    <div>
                        <ArticleData data={this.props.data}/>
                        <ParsedArticle/>
                        <div className="dataDiv">
                            <RecentlyVisitedArticles />
                            <TagStatistics/>
                        </div>
                    </div>) : null}
                {this.props.dataIsResolving ? (<Spinner/>) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.article.data,
        content: state.article.content,
        recentlyVisited: state.article.recentlyVisited,
        statistics: state.article.statistics,
        isArticleShown: state.article.isArticleShown,
        isModalClosedByUser: state.article.isModalClosedByUser,
        dataIsResolving: state.article.dataIsResolving
    };
};

export default connect(mapStateToProps, null)(withNavbar(RelevantArticleData));