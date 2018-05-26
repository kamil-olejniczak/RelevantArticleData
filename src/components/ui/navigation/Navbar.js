import React from 'react';

const withNavbar = (WrappedComponent) => {
    return (props) => (
        <div>
            <div>Navbar is working!</div>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withNavbar;