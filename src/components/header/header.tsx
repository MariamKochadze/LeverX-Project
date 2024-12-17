import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Role, User } from '../../models/user.model';
import { isAuthenticatedUser, logOut } from '../../shared/authenticateUser';
import '../../../public/index.scss';
import questionMarkIcon from '@assets/question-mark.svg';
import powerOffIcon from '@assets/power-off-solid.svg';
import searchIcon from '@assets/search-icon.svg';

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
    const userAvatar = userData?.user_avatar
        ? require(`@assets/${userData.user_avatar.split('/').pop()}`)
        : defaultAvatar;

    const fetchUser = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`);
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

    const handleCardClick = (userId: string) => {
        navigate(`/user-details/${userId}`);
    };

    return (
        <header className="header">
            <nav className="header__nav">
                <input type="checkbox" id="burger-toggle" className="header__burger-input" />
                <label htmlFor="burger-toggle" className="header__burger">
                    <div className="header__burger-line"></div>
                    <div className="header__burger-line"></div>
                    <div className="header__burger-line"></div>
                </label>
                <div className="page-overlay"></div>

                <ul className="header__nav-list">
                    <li className="header__logo">
                        <Link to="/" className="header__title">
                            <span className="header__title--small">LEVERX</span>
                            <span className="header__title--large">EMPLOYEE SERVICES</span>
                        </Link>
                    </li>

                    <li className="header__tab header__active-tab">Address Book</li>
                    <li className="header__tab header__active-tab edit-setting">
                        {(currentUser?.userRole === Role.ADMIN || currentUser?.userRole === Role.HR) && (
                            <Link to="/edit">Settings</Link>
                        )}
                    </li>

                    <li className="header__actions" id="profile__icon">
                        <Link to="#" className="header__button">
                            <img src={questionMarkIcon} alt="Support Icon" className="header__button--img" />
                            SUPPORT
                        </Link>

                        <Link
                            to={`/user-details/${userData?.id || '550e8400-e29b-41d4-a716-446655440000'}`}
                            className="header__button"
                        >
                            <img src={userAvatar} alt="Avatar icon" className="header__profile--icon" />
                            <span className="profile-name">
                                {userData ? `${userData.first_name} ${userData.last_name}` : 'LUFFY MONKEY'}
                            </span>
                        </Link>

                        <Link to="#" className="header__button log-out" onClick={logOut}>
                            <img src={powerOffIcon} alt="Log out icon" className="header__button--img" />
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="header__mobile-search">
                <img src={searchIcon} alt="Search icon" className="search__icon" />
                <span>Open search panel</span>
            </div>
        </header>
    );
};
