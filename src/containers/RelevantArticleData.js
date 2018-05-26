import React, {Component} from 'react';
import TagStatistics from '../components/article/TagStatistics';
import RecentlyVisitedArticles from '../components/article/RecentlyVisitedArticles';
import ParsedArticle from '../components/article/ParsedArticle';
import ArticleSearch from './ArticleSearch';
import ArticleData from '../components/article/ArticleData';
import withNavbar from "../components/ui/navigation/Navbar";

class RelevantArticleData extends Component {
    render() {
        return (
            <div>
                <ArticleSearch/>
                <div>
                    <ArticleData/>
                    <ParsedArticle/>
                    <div className="dataDiv">
                        <RecentlyVisitedArticles/>
                        <TagStatistics/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavbar(RelevantArticleData);
