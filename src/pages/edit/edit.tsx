import React, { useEffect } from 'react';
import { editUserCard } from '../../components/card/editUserCard';
import { Role, User } from '../../models/user.model';
import { Header } from '../../components/header/header';
import { isAuthenticatedUser } from '../../shared/authenticateUser';
import { request } from '../../helpers/fetch-polyfill';

const Edit: React.FC = () => {
    const currentUser = isAuthenticatedUser();

    if (!currentUser || (currentUser.userRole !== Role.ADMIN && currentUser.userRole !== Role.HR)) {
        window.location.href = '/src/pages/sign-in/sign-in.html';
    }

    const fetchUsers = async (hrId?: string) => {
        const url = hrId ? `http://localhost:3000/users/?manager.id=${hrId}` : `http://localhost:3000/users/`;

        try {
            const userData = await request<User[]>(url, 'GET');
            console.log(userData);

            userData.forEach((user) => {
                editUserCard({
                    name: user.first_name,
                    surname: user.last_name,
                    img: { src: user.user_avatar, alt: 'user avatar' },
                    role: user.role,
                });
            });
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
                            <img className="search-icon" src="../../assets/search-icon.svg" alt="Search icon" />
                            <input type="text" id="input__search" placeholder="Type to Search" />
                        </div>
                        <div className="setting__user-list"></div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Edit;
