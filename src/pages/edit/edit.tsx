import React, { useEffect, useState } from 'react';

import { Role, User } from '../../models/user.model';
import { Header } from '../../components/header/header';
import { isAuthenticatedUser } from '../../shared/authenticateUser';
import { request } from '../../helpers/fetch-polyfill';
import searchIcon from '@assets/search-icon.svg';
import { useNavigate } from 'react-router-dom';
import { EditUserCard } from '../../components/card/editUserCard';

const Edit: React.FC = () => {
    const currentUser = isAuthenticatedUser();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);

    if (!currentUser || (currentUser.userRole !== Role.ADMIN && currentUser.userRole !== Role.HR)) {
        navigate('/signin');
    }

    const fetchUsers = async (hrId?: string) => {
        const url = hrId ? `http://localhost:3000/users/?manager.id=${hrId}` : `http://localhost:3000/users/`;

        try {
            const userData = await request<User[]>(url, 'GET');
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', (error as Error).message);
        }
    };

    useEffect(() => {
        if (currentUser?.userRole === Role.ADMIN) {
            fetchUsers();
        } else if (currentUser?.userRole === Role.HR) {
            fetchUsers(currentUser.userId);
        }
    }, []);

    return (
        <>
            <Header currentUser={currentUser} />
            <div className="edit__body">
                <main className="edit__main-container">
                    <div className="setting__header">
                        <h1 className="setting__header-desc">ROLES & PERMISSION</h1>
                    </div>
                    <div className="edit__desc">
                        <div className="input-container">
                            <img className="search-icon" src={searchIcon} alt="Search icon" />
                            <input type="text" id="input__search" placeholder="Type to Search" />
                        </div>
                        <div className="setting__user-list">
                            {users.map((user) => (
                                <EditUserCard
                                    key={user.id}
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    user_avatar={user.user_avatar}
                                    role={user.role}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};


export default Edit;
