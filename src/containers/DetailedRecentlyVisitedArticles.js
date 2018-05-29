import React, {Component} from 'react';
import withNavbar from '../components/ui/navigation/Navbar';
import {connect} from 'react-redux';
import * as articleActions from '../store/actions/article';
import './DetailedRecentlyVisitedArticles.css';

export class DetailedRecentlyVisitedArticles extends Component {
    initReloadPreviouslyVisitedArticle = (url) => {
        this.props.reloadPreviouslyVisitedArticle(url);
        this.props.history.push('/');
    };

    render() {
        return (
            this.props.recentlyVisited.length ? (
                <div className="DetailedRecentlyVisitedArticles info">
                    {this.props.recentlyVisited.map((article, index) => (
                        <div key={article.id}>
                            <p>
                                <i className="fab fa-adn contentSeparator"></i>
                                Title: "{article.title}".
                            </p>
                            <p>
                                <i className="far fa-calendar-alt contentSeparator"></i>
                                Visited on: {article.date.toLocaleString()}.
                            </p>
                            <p>
                                <i className="fas fa-anchor contentSeparator"></i>
                                <span className="link"
                                      onClick={() => this.initReloadPreviouslyVisitedArticle(article.url)}>
                                    Reload article in our app.
                                </span>
                                <i className="fas fa-arrow-circle-up contentSeparator"></i><a href={article.url}>
                                Revisit this article on original page.</a>
                            </p>
                            {index !== this.props.recentlyVisited.length - 1 ? <hr/> : null}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="warning">There is no data to be displayed, please search for an article.</p>
            )
        );
    }
}

const mapStateToProps = state => {
    return {
        recentlyVisited: state.article.recentlyVisited
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reloadPreviouslyVisitedArticle: (url) => dispatch(articleActions.reloadPreviouslyVisitedArticle(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavbar(DetailedRecentlyVisitedArticles));
