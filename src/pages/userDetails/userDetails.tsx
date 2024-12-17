import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Role, User } from '../../models/user.model';
import { Header } from '../../components/header/header';

import backIcon from '@assets/back-icon.svg';
import copyIcon from '@assets/copy-icon.svg';
import editIcon from '@assets/edit-icon.svg';
import workingIcon from '@assets/working-icon.svg';
import buildingIcon from '@assets/building-icon.svg';
import idIcon from '@assets/id-icon.svg';
import photoIcon from '@assets/photo-icon.svg';
import nameIcon from '@assets/name-icon.svg';
import phoneIcon from '@assets/phone-icon.svg';
import emailIcon from '@assets/email-icon.svg';
import skypeIcon from '@assets/skype-icon.svg';
import citizenshipIcon from '@assets/citizenship-icon.svg';
import visaIcon from '@assets/visa-icon.svg';
import { isAuthenticatedUser } from '../../shared/authenticateUser';

interface EditableFieldProps {
    icon?: string;
    label: string;
    value: string | number;
    editable: boolean;
    id: string;
    onChange?: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ icon, label, value, editable, id, onChange }) => {
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
            <img src={icon} alt={`${label} Icon`} className="info-icon" />
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

const UserDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState<User>();
    const [isEditMode, setIsEditMode] = useState(false);
    const currentUser = isAuthenticatedUser();

    const avatarSrc = userData ? require(`@assets/${userData.user_avatar.split('/').pop()}`) : '';

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
            return;
        }

        const loadUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                const users = await response.json();
                console.log('Users:', users);
                console.log('Current ID:', id);
                const user = users.find((u: User) => u.id === id);

                if (user) {
                    console.log('Found user:', user);
                    setUserData(user);
                } else {
                    console.log('User not found');
                    navigate('/notFound');
                }
            } catch (error) {
                console.error('Error:', error);
                navigate('/notFound');
            }
        };

        loadUserData();
    }, [id, currentUser, navigate]);

    const handleEdit = async () => {
        if (isEditMode && userData && id) {
            const updateUser: Record<string, string> = {};

            document.querySelectorAll('.editable-field').forEach((field) => {
                const input = field.querySelector('input');
                if (input instanceof HTMLInputElement && input.value) {
                    updateUser[input.id] = input.value;
                }
            });

            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateUser),
                });

                if (!response.ok) {
                    throw new Error('Failed to update user');
                }

                const updatedUser = await response.json();
                setUserData(updatedUser);
                console.log('User updated successfully');
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }

        setIsEditMode(!isEditMode);
    };

    const handleFieldChange = (field: string, value: string) => {
        setUserData((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    if (!userData) return <div>Loading...</div>;

    const generalInfo = [
        { icon: workingIcon, label: 'Department', value: userData.department, id: 'department' },
        { icon: buildingIcon, label: 'Building', value: userData.building, id: 'building' },
        { icon: idIcon, label: 'Room', value: userData.room, id: 'room' },
        { icon: photoIcon, label: 'Desk number', value: userData.desk_number, id: 'desk_number' },
        {
            icon: idIcon,
            label: 'Date of Birth',
            value: `${userData.date_birth.day}/${userData.date_birth.month}/${userData.date_birth.year}`,
            id: 'date_birth',
        },
        {
            icon: nameIcon,
            label: 'Manager',
            value: `${userData.manager.first_name} ${userData.manager.last_name}`,
            id: 'manager',
        },
    ];

    const contacts = [
        { icon: phoneIcon, label: 'Phone', value: userData.phone, id: 'phone' },
        { icon: emailIcon, label: 'Email', value: userData.email, id: 'email' },
        { icon: skypeIcon, label: 'Skype', value: userData.skype, id: 'skype' },
        { icon: idIcon, label: 'C-Number', value: userData.cnumber, id: 'cnumber' },
    ];

    const travelInfo = [
        { icon: citizenshipIcon, label: 'Citizenship', value: userData.citizenship, id: 'citizenship' },
        {
            icon: visaIcon,
            label: 'Visa Type',
            value: `${userData.visa[0].type} (${userData.visa[0].issuing_country})`,
            id: 'visa_type',
        },
        {
            icon: visaIcon,
            label: 'Visa Start Date',
            value: new Date(userData.visa[0].start_date).toLocaleDateString(),
            id: 'visa_start',
        },
        {
            icon: visaIcon,
            label: 'Visa End Date',
            value: new Date(userData.visa[0].end_date).toLocaleDateString(),
            id: 'visa_end',
        },
    ];

    return (
        <>
            <Header />
            <div className="main-container">
                <section className="user__details-section">
                    <div className="user__details-container">
                        <button className="back-button" onClick={() => navigate('/')}>
                            <img src={backIcon} alt="Back" className="back-icon" />
                        </button>

                        <div className="user__details-top">
                            <img
                                className="user__details-avatar"
                                src={avatarSrc}
                                alt={userData ? `${userData.first_name} ${userData.last_name}` : 'User Avatar'}
                            />
                            <EditableField
                                value={userData.first_name}
                                editable={isEditMode}
                                id="first_name"
                                label=""
                                onChange={(value) => handleFieldChange('first_name', value)}
                            />
                            <EditableField
                                value={userData.last_name}
                                editable={isEditMode}
                                id="last_name"
                                label=""
                                onChange={(value) => handleFieldChange('last_name', value)}
                            />
                            <p className="native-format">
                                {`${userData.last_native_name} ${userData.middle_native_name} ${userData.first_native_name}`}
                            </p>
                        </div>

                        <div className="user__details-buttons">
                            <button className="user__details-copy-button">
                                <img src={copyIcon} alt="copy icon" className="copy__icon" />
                                Copy link
                            </button>
                            {(currentUser?.userRole === Role.ADMIN || currentUser?.userRole === Role.HR) && (
                                <button className="user__details-edit-button" onClick={handleEdit}>
                                    <img src={editIcon} alt="edit icon" className="edit__icon" />
                                    {isEditMode ? 'SAVE' : 'EDIT'}
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="user__details-section second-section">
                    <h1 className="user__details-header">GENERAL INFO</h1>
                    <div className="infoo-container">
                        {generalInfo.map((field) => (
                            <EditableField
                                key={field.id}
                                icon={field.icon}
                                label={field.label}
                                value={field.value}
                                editable={isEditMode}
                                id={field.id}
                                onChange={(value) => handleFieldChange(field.id, value)}
                            />
                        ))}
                    </div>

                    <h1 className="user__details-header">CONTACTS</h1>
                    <div className="infoo-container">
                        {contacts.map((field) => (
                            <EditableField
                                key={field.id}
                                icon={field.icon}
                                label={field.label}
                                value={field.value}
                                editable={isEditMode}
                                id={field.id}
                                onChange={(value) => handleFieldChange(field.id, value)}
                            />
                        ))}
                    </div>

                    <h1 className="user__details-header">TRAVEL INFO</h1>
                    <div className="infoo-container">
                        {travelInfo.map((field) => (
                            <EditableField
                                key={field.id}
                                icon={field.icon}
                                label={field.label}
                                value={field.value}
                                editable={isEditMode}
                                id={field.id}
                                onChange={(value) => handleFieldChange(field.id, value)}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default UserDetails;
