import React, {Component} from 'react';
import TagStatistics from '../components/article/TagStatistics';
import RecentlyVisitedArticles from '../components/article/RecentlyVisitedArticles';
import {connect} from 'react-redux';
import ParsedArticle from '../components/article/ParsedArticle';
import ArticleSearch from './ArticleSearch';
import './RelevantArticleData.css';
import ArticleData from '../components/article/ArticleData';
import * as articleActions from '../store/actions/article';
import * as localStorageActions from '../store/actions/localStorage';
import withNavbar from '../components/ui/navigation/Navbar';
import Spinner from "../components/ui/Spinner";

class RelevantArticleData extends Component {
    render() {
        return (
            <div>
                <ArticleSearch/>
                {this.props.isArticleShown ? (
                    <div>
                        <ArticleData data={this.props.data} isModalClosedByUser={this.props.isModalClosedByUser}/>
                        <ParsedArticle content={this.props.content}/>
                        <div className="dataDiv">
                            <RecentlyVisitedArticles recentlyVisited={this.props.recentlyVisited}
                                                     clearData={this.props.clearData}/>
                            <TagStatistics tagStats={this.props.statistics}/>
                        </div>
                    </div>) : null}
                {this.props.isDataBeingResolved ? (<Spinner/>) : null}
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
        isDataBeingResolved: state.article.isDataBeingResolved
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearArticle: () => dispatch(articleActions.clearArticle()),
        clearData: () => dispatch(localStorageActions.clearData())
    };
};

export const PureRelevantArticleData = (withNavbar(RelevantArticleData));
export default connect(mapStateToProps, mapDispatchToProps)(withNavbar(RelevantArticleData));