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
import { EditProvider, useEditContext } from '../../context/editContext';
import { EditableField } from '../../components/editableFieldList/editableFieldList';

const UserDetails: React.FC = () => {
    const navigate = useNavigate();
    const { isEditMode, userData, toggleEditMode, updateUserData } = useEditContext();
    const currentUser = isAuthenticatedUser();
    const avatarSrc = userData?.user_avatar ? require(`@assets/${userData.user_avatar.split('/').pop()}`) : '';
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
            return;
        }

        const loadUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching user with id ${id}`);
                }
                const user = await response.json();
                updateUserData(user);
            } catch (error) {
                console.error('Error:', error);
                navigate('/notFound');
            }
        };

        if (id) {
            loadUserData();
        }
    }, [id, navigate, updateUserData, currentUser]);

    if (!userData) return <div>Loading...</div>;

    const formatDateBirth = (dateBirth: any): string => {
        if (!dateBirth?.day || !dateBirth?.month || !dateBirth?.year) {
            return 'Not specified';
        }
        return `${dateBirth.day}/${dateBirth.month}/${dateBirth.year}`;
    };

    const generalInfo = [
        { icon: workingIcon, label: 'Department', value: userData.department, id: 'department' },
        { icon: buildingIcon, label: 'Building', value: userData.building, id: 'building' },
        { icon: idIcon, label: 'Room', value: userData.room, id: 'room' },
        { icon: photoIcon, label: 'Desk number', value: userData.desk_number, id: 'desk_number' },
        {
            icon: idIcon,
            label: 'Date of Birth',
            value: formatDateBirth(userData.date_birth),
            id: 'date_birth',
        },
        {
            icon: nameIcon,
            label: 'Manager',
            value: userData.manager ? `${userData.manager.first_name} ${userData.manager.last_name}` : 'Not assigned',
            id: 'manager',
        },
    ];

    const contacts = [
        { icon: phoneIcon, label: 'Phone', value: userData.phone, id: 'phone' },
        { icon: emailIcon, label: 'Email', value: userData.email, id: 'email' },
        { icon: skypeIcon, label: 'Skype', value: userData.skype, id: 'skype' },
        { icon: idIcon, label: 'C-Number', value: userData.cnumber, id: 'cnumber' },
    ];

    const formatVisaInfo = (visa: any) => {
        if (!visa?.[0]) {
            return {
                type: 'Not specified',
                startDate: 'Not specified',
                endDate: 'Not specified',
            };
        }
        return {
            type: `${visa[0].type} (${visa[0].issuing_country})`,
            startDate: new Date(visa[0].start_date).toLocaleDateString(),
            endDate: new Date(visa[0].end_date).toLocaleDateString(),
        };
    };

    const travelInfo = [
        {
            icon: citizenshipIcon,
            label: 'Citizenship',
            value: userData.citizenship || 'Not specified',
            id: 'citizenship',
        },
        {
            icon: visaIcon,
            label: 'Visa Type',
            value: formatVisaInfo(userData.visa).type,
            id: 'visa_type',
        },
        {
            icon: visaIcon,
            label: 'Visa Start Date',
            value: formatVisaInfo(userData.visa).startDate,
            id: 'visa_start',
        },
        {
            icon: visaIcon,
            label: 'Visa End Date',
            value: formatVisaInfo(userData.visa).endDate,
            id: 'visa_end',
        },
    ];

    return (
        <React.Fragment>
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
                            <EditableField value={userData.first_name} editable={isEditMode} id="first_name" label="" />
                            <EditableField value={userData.last_name} editable={isEditMode} id="last_name" label="" />
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
                                <button className="user__details-edit-button">
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
                            />
                        ))}
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
};

export default UserDetails;
