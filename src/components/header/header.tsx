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

    const showNavBar = () => {
        if (navRef.current) {
            navRef.current.classList.toggle('responsive_nav');
        }
    };

    return (
        <header className="header">
            <nav className="header__nav" ref={navRef}>
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
                            <Link to="/permission">Settings</Link>
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

            <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                <FaTimes />
            </button>

            <button className="nav-btn" onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
};
