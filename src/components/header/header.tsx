import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Role, User } from '../../models/user.model';
import { isAuthenticatedUser, logOut } from '../../shared/authenticateUser';
import '../../../public/index.scss';
import questionMarkIcon from '@assets/question-mark.svg';
import powerOffIcon from '@assets/power-off-solid.svg';
import searchIcon from '@assets/search-icon.svg';
import { FaBars, FaTimes } from 'react-icons/fa';

const defaultAvatar = require('@assets/avataaars (1).svg');

interface HeaderProps {
  currentUser?: {
    userRole: Role;
    userId: string;
  };
}

export const Header: React.FC<HeaderProps> = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const currentUser = isAuthenticatedUser();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const userAvatar = userData?.user_avatar
    ? require(`@assets/${userData.user_avatar.split('/').pop()}`)
    : defaultAvatar;

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`https://db-qc67.vercel.app/users/${id}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (currentUser?.userId) {
      fetchUser(currentUser.userId);
    }
  }, [currentUser]);

  useEffect(() => {
    switch (location.pathname) {
      case '/permission':
        setActiveTab('edit-setting');
        break;
      case '/':
        setActiveTab('address-book');
        break;
      default:
        setActiveTab('');
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentUser?.userId) {
      fetchUser(currentUser.userId);
    }
  }, [currentUser]);

  const handleCardClick = (userId: string) => {
    navigate(`/user-details/${userId}`);
  };

  const showNavBar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle('responsive_nav');
    }
  };

  return (
    <header className="header">
      <div id="header-logo-container">
        <Link to="/" className="header__title">
          <span className="header__title--small">LEVERX</span>
          <span className="header__title--large">EMPLOYEE SERVICES</span>
        </Link>
      </div>
      <nav className="header__nav" ref={navRef}>
        <ul className="header__nav-list">
          {/* Desktop Logo */}
          <li className="header__logo" id="header__logoo">
            <Link to="/" className="header__title">
              <span className="header__title--small">LEVERX</span>
              <span className="header__title--large">EMPLOYEE SERVICES</span>
            </Link>
          </li>

          {/* Desktop Navigation */}
          <li
            className={`header__tab ${activeTab === 'address-book' ? 'header__active-tab' : ''}`}
          >
            <Link to="/">Address Book</Link>
          </li>
          <li
            className={`header__tab ${activeTab === 'edit-setting' ? 'header__active-tab' : ''}`}
          >
            {(currentUser?.userRole === Role.ADMIN ||
              currentUser?.userRole === Role.HR) && (
              <Link to="/permission" className="settings__tab">
                Settings
              </Link>
            )}
          </li>

          {/* Desktop Actions */}
          <li className="header__actions" id="profile__icon">
            <Link to="#" className="header__button">
              <img
                src={questionMarkIcon}
                alt="Support Icon"
                className="header__button--img"
              />
              SUPPORT
            </Link>
            <Link
              to={`/user-details/${userData?.id || '550e8400-e29b-41d4-a716-446655440000'}`}
              className="header__button"
            >
              <img
                src={userAvatar}
                alt="Avatar icon"
                className="header__profile--icon"
              />
              <span className="profile-name">
                {userData
                  ? `${userData.first_name} ${userData.last_name}`
                  : 'LUFFY MONKEY'}
              </span>
            </Link>
            <Link to="#" className="header__button log-out" onClick={logOut}>
              <img
                src={powerOffIcon}
                alt="Log out icon"
                className="header__button--img"
              />
            </Link>
          </li>

          <li className="mobile-menu-container">
            <div className="mobile-profile">
              <div className="mobile-profile__header">
                <img
                  src={userAvatar}
                  alt="Avatar icon"
                  className="header__profile--icon"
                />
                <span className="profile-name">
                  {userData
                    ? `${userData.first_name} ${userData.last_name}`
                    : 'LUFFY MONKEY'}
                </span>
              </div>
              <button className="mobile-logout" onClick={logOut}>
                Sign out
              </button>
            </div>

            <div className="mobile-divider"></div>

            <div className="mobile-nav">
              <Link to="/" className="mobile-nav__link">
                Address Book
              </Link>
            </div>

            <div className="mobile-support">
              <Link to="#" className="mobile-support__link">
                <img
                  src={questionMarkIcon}
                  alt="Support Icon"
                  className="header__button--img"
                />
                SUPPORT
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div className="overlay"></div>
      <button className="nav-btn nav-close-btn" onClick={showNavBar}>
        <FaTimes />
      </button>
      <button className="nav-btn" onClick={showNavBar}>
        <FaBars />
      </button>
    </header>
  );
};
