import '../../pages/userDetails/userDetails.scss';
import { User } from '../../models/user.model';
import backIcon from '@assets/back-icon.svg';
import copyIcon from '@assets/copy-icon.svg';
import editIcon from '@assets/edit-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface UserDetailsHeaderProps {
    userData: User;
    isEditMode: boolean;
    setIsEditMode: () => void;
    currentUser: any;
    setEditForm: (value: string, id: string) => void;
}

export const UserDetailsHeader: React.FC<UserDetailsHeaderProps> = ({
    userData,
    isEditMode,
    setIsEditMode,
    currentUser,
}) => {
    const navigate = useNavigate();

    const avatarSrc = require(`@assets/${userData.user_avatar.split('/').pop()}`);

    return (
        <div className="user__details-container">
            <button className="back-button" onClick={() => navigate('/')}>
                <img src={backIcon} alt="Back" className="back-icon" />
            </button>

            <div className="user__details-top">
                <img
                    className="user__details-avatar"
                    src={avatarSrc}
                    alt={`${userData.first_name} ${userData.last_name}`}
                />
                <h2 className="full-name">{`${userData.first_name} ${userData.last_name}`}</h2>
                <p className="native-format">
                    {`${userData.last_native_name} ${userData.middle_native_name} ${userData.first_native_name}`}
                </p>
            </div>

            <div className="user__details-buttons">
                <button className="user__details-copy-button">
                    <img src={copyIcon} alt="copy icon" className="copy__icon" />
                    Copy link
                </button>
                <button className="user__details-edit-button" onClick={() => setIsEditMode()}>
                    <img src={editIcon} alt="edit icon" className="edit__icon" />
                    {isEditMode ? 'SAVE' : 'EDIT'}
                </button>
            </div>
        </div>
    );
};
