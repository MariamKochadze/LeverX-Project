import './userNotFound.scss';
import notFoundIcon from '@assets/not-found.svg';

export const UserNotFound = () => {
  return (
    <>
      <div className="not-found search not-found-user">
        <div className="not-found__content">
          <img
            src={notFoundIcon}
            alt="Not Found Icon"
            className="not-found__image"
          />
          <h2 className="not-found__title">404 USERS NOT FOUND</h2>
          <p className="not-found__description">
            Sorry, we can't find such user!
          </p>
        </div>
      </div>
    </>
  );
};
