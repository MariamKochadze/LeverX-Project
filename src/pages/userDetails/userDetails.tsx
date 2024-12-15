import React, { useEffect, useState } from 'react';
import './userDetails.scss';
import { Role, User } from '../../models/user.model';
import { Header } from '../../components/header/header';
import { isAuthenticatedUser } from '../../shared/authenticateUser';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetails: React.FC = () => {
    const [userData, setUserData] = useState<User>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ userRole: Role; userId: string } | undefined>(undefined);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setCurrentUser(isAuthenticatedUser());
        if (!currentUser) {
            navigate('/signin');
            return;
        }
    }, [navigate, currentUser]);

    const getUserId = (): string | undefined => {
        console.log(params.id);
        return params.id;
    };

    const fetchUserById = async (userId: string): Promise<User | undefined> => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch user data. Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : error);
        }
    };

    const EditableField: React.FC<{
        icon?: string;
        label: string;
        value: string | number;
        editable: boolean;
        id: string;
        onChange?: (value: string) => void;
    }> = ({ icon, label, value, editable, id, onChange }) => {
        if (!icon) {
            return (
                <p className="editable-field" id={id}>
                    <strong>{label}</strong>
                    {editable ? (
                        <input
                            type="text"
                            value={value}
                            className="editable-input"
                            id={id}
                            onChange={(e) => onChange?.(e.target.value)}
                        />
                    ) : (
                        <span>{value}</span>
                    )}
                </p>
            );
        }

        return (
            <p className="editable-field" id={id}>
                <img src={`../../assets/${icon}`} alt={`${label} Icon`} className="info-icon" />
                <strong>{label}</strong>
                {editable ? (
                    <input
                        type="text"
                        value={value}
                        className="editable-input"
                        id={id}
                        onChange={(e) => onChange?.(e.target.value)}
                    />
                ) : (
                    <span>{value}</span>
                )}
            </p>
        );
    };

    const handleUpdateUser = async (updateData: Partial<User>) => {
        const userId = getUserId();
        if (!userId) return;

        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
            if (response.ok) {
                console.log('updated');
            }
        } catch (error) {
            console.log(error, 'ERROR');
        }
    };

    useEffect(() => {
        const loadUserData = async () => {
            const userId = getUserId();
            if (userId) {
                const user = await fetchUserById(userId);
                if (user) {
                    setUserData(user);
                }
            }
        };

        loadUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-container">
            <Header currentUser={currentUser} />
            {/* User Details Section */}
            <section className="user__details-section">
                <div className="user__details-container">
                    <button className="back-button" onClick={() => (window.location.href = '../../index.html')}>
                        <img src="../../assets/back-icon.svg" alt="Back" className="back-icon" />
                    </button>

                    {/* Top Section */}
                    <div className="user__details-top">
                        <img
                            className="user__details-avatar"
                            src={`../../${userData.user_avatar}`}
                            alt={`${userData.first_name} ${userData.last_name}`}
                        />
                        <EditableField
                            label=""
                            value={userData.first_name}
                            editable={isEditMode}
                            id="first_name"
                            onChange={(value) => handleUpdateUser({ first_name: value })}
                        />
                        {/* Add other editable fields */}
                    </div>

                    {/* Buttons Container */}
                    <div className="user__details-buttons">
                        <button className="user__details-copy-button">
                            <img src="../../assets/copy-icon.svg" alt="copy icon" className="copy__icon" />
                            Copy link
                        </button>
                        {(currentUser?.userRole === Role.ADMIN || currentUser?.userRole === Role.HR) && (
                            <button className="user__details-edit-button" onClick={() => setIsEditMode(!isEditMode)}>
                                <img src="../../assets/edit-icon.svg" alt="edit icon" className="edit__icon" />
                                {isEditMode ? 'SAVE' : 'EDIT'}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Info Sections */}
            <section className="user__details-section second-section">
                {/* Render General Info, Contacts, and Travel Info sections */}
                {/* Add the sections using the data structure from your original code */}
            </section>
        </div>
    );
};

export default UserDetails;
