import { User } from '../../models/user.model';
import { InfoField } from '../infoField/infoField';
import workingIcon from '@assets/working-icon.svg';
import buildingIcon from '@assets/building-icon.svg';
import idIcon from '@assets/id-icon.svg';
import photoIcon from '@assets/photo-icon.svg';
import nameIcon from '@assets/name-icon.svg';

interface GeneralInfoProps {
    userData: User;
    isEditMode: boolean;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ userData, isEditMode }) => {
    return (
        <section className="user__details-section">
            <h1 className="user__details-header">GENERAL INFO</h1>
            <div className="info-container">
                <InfoField
                    icon={workingIcon}
                    label="Department"
                    value={userData.department}
                    isEditable={isEditMode}
                    id="department"
                />
                <InfoField
                    icon={buildingIcon}
                    label="Building"
                    value={userData.building}
                    isEditable={isEditMode}
                    id="building"
                />
                <InfoField icon={idIcon} label="Room" value={userData.room} isEditable={isEditMode} id="room" />
                <InfoField
                    icon={photoIcon}
                    label="Desk number"
                    value={userData.desk_number}
                    isEditable={isEditMode}
                    id="desk_number"
                />
                <InfoField
                    icon={idIcon}
                    label="Date of Birth"
                    value={`${userData.date_birth.day}/${userData.date_birth.month}/${userData.date_birth.year}`}
                    isEditable={isEditMode}
                    id="date_birth.year"
                />
                <InfoField
                    icon={nameIcon}
                    label="Manager"
                    value={`${userData.manager.first_name} ${userData.manager.last_name}`}
                    isEditable={isEditMode}
                    id="first_name-last_name"
                />
            </div>
        </section>
    );
};
