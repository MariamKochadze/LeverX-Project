import React, { useEffect, useRef, useState } from 'react';
import './permission.scss';
import { request } from '../../helpers/fetch-polyfill';
import { Role, User } from '../../models/user.model';
import { Header } from '../../components/header/header';
import { isAuthenticatedUser } from '../../shared/authenticateUser';
import { EditUserCard } from '../../components/card/editUserCard';
import { useNavigate } from 'react-router-dom';

const Permission: React.FC = () => {
    const userListRef = useRef<HTMLDivElement>(null);
    const currentUser = isAuthenticatedUser();
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    const fetchUsers = async (hrId?: string) => {
        const url = hrId ? `http://localhost:3000/users/?manager.id=${hrId}` : `http://localhost:3000/users/`;

        try {
            const response = await request<User[]>(url, 'GET');
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        const initializeUsers = async () => {
            if (!currentUser || (currentUser.userRole !== Role.ADMIN && currentUser.userRole !== Role.HR)) {
                navigate('/sign-in.html');
                return;
            }

            if (currentUser.userRole === Role.ADMIN) {
                await fetchUsers();
            } else if (currentUser.userRole === Role.HR) {
                await fetchUsers(currentUser.userId);
            }
        };

        initializeUsers();
    }, [currentUser, navigate]);

    return (
        <>
            <Header currentUser={currentUser} />
            <div className="input-container">
                <img
                    className="search-icon"
                    id="edit__serach-icon"
                    src="../../assets/search-icon.svg"
                    alt="Search icon"
                />
                <input type="text" id="edit__search" placeholder="Type to Search" />
            </div>
            <div className="setting__user-list" ref={userListRef}>
                {users.map((user) => {
                    const avatarSrc = require(`@assets/${user.user_avatar.split('/').pop()}`);
                    return (
                        <EditUserCard
                            key={user.id}
                            userData={{
                                id: user.id,
                                img: {
                                    src: avatarSrc,
                                    alt: 'user avatar',
                                },
                                name: user.first_name,
                                surname: user.last_name,
                                role: user.role,
                            }}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Permission;
