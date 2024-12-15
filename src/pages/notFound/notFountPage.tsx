import React from 'react';

interface NotFoundPageProps {
    home?: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ home }) => {
    const handleHome = () => {
        if (home) {
            home();
        } else {
            window.location.href = 'index.html';
        }
    };

    return (
        <div className="not-found">
            <div className="not-found__content">
                <img src="./assets/not-found.svg" alt="Not Found Icon" className="not-found__image" />
                <h2 className="not-found__title">404 PAGE NOT FOUND</h2>
                <p className="not-found__description">
                    Sorry, we can't find that page! It might be an older link or maybe it was removed.
                </p>
                <button id="go-home-button" onClick={handleHome}>
                    GO TO THE HOME PAGE
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
