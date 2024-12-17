import React from 'react';
import { Role } from '../../models/user.model';


interface EditUserCardProps {
    first_name: string;
    last_name: string;
    user_avatar: string;
    role: Role;
}

export const EditUserCard: React.FC<EditUserCardProps> = ({ first_name, last_name, user_avatar, role }) => {

    const avatarSrc = require(`@assets/${user_avatar.split('/').pop()}`);
    
    return (
        <div className="edit-user-card">
            <img className="edit-user-img" src={avatarSrc} alt="user avatar" />
            <div className="user-info">
                <span className="user-fullname">{`${first_name} ${last_name}`}</span>
            </div>
            <span className={`edit-user-role role-${Role[role].toLowerCase()}`}>{Role[role]}</span>
        </div>
    );
};
