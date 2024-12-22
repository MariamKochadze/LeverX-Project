import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditUser, Role } from './../../models/user.model';

interface EditUserCardProps {
    userData: EditUser;
}

export const EditUserCard: React.FC<EditUserCardProps> = ({ userData }) => {
    const navigate = useNavigate();

    const roleMapping = {
        1: 'Employee',
        2: 'HR',
        3: 'Admin',
    };

    const handleCardClick = () => {
        console.log('Navigating to:', `/user-details/${userData.id}`);
        navigate(`/user-details/${userData.id}`);
    };

    return (
        <div className="edit-user-card" onClick={handleCardClick}>
            <img
                className="edit-user-img"
                src={`/assets/${userData.img.src.split('/').pop()}`}
                alt={userData.img.alt || 'User Avatar'}
            />
            <div className="user-info">
                <span className="user-fullname">{`${userData.name} ${userData.surname}`}</span>
            </div>
            <span className={`edit-user-role role-${roleMapping[userData.role]?.toLowerCase()}`}>
                {roleMapping[userData.role] || 'Unknown Role'}
            </span>
        </div>
    );
};

export default EditUserCard;
