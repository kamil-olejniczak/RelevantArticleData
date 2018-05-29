import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

const withNavbar = (WrappedComponent) => {
    const search = 'Search for an article';
    return (props) => (
        <div>
            <ul className="Navbar">
                {props.clearArticle ? (<li onClick={props.clearArticle}>{search}</li>)
                    : <Link to="/">{search}</Link>}
                <Link to="/recentlyVisited">Your articles</Link>
                <li>
                    <a href="http://github.com/kamil-olejniczak" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
            </ul>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withNavbar;