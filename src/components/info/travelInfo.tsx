import { User } from '../../models/user.model';
import { InfoField } from '../infoField/infoField';
import citizenshipIcon from '@assets/citizenship-icon.svg';
import visaIcon from '@assets/visa-icon.svg';

interface TravelInfoProps {
    userData: User;
    isEditMode: boolean;
    setEditForm: (value: string, id: string) => void;
}

export const TravelInfo: React.FC<TravelInfoProps> = ({ userData, isEditMode, setEditForm }) => {
    return (
        <>
            <h1 className="user__details-header">TRAVEL INFO</h1>
            <div className="infoo-container">
                <InfoField
                    icon={citizenshipIcon}
                    label="Citizenship"
                    value={userData.citizenship}
                    isEditable={isEditMode}
                    id="citizenship"
                    onChange={(value: string, id) => setEditForm(value, id)}
                />
                <InfoField
                    icon={visaIcon}
                    label="Visa Type"
                    value={`${userData.visa[0].type} (${userData.visa[0].issuing_country})`}
                    isEditable={isEditMode}
                    id="issuing_country"
                />
                <InfoField
                    icon={visaIcon}
                    label="Visa Start Date"
                    value={new Date(userData.visa[0].start_date).toLocaleDateString()}
                    isEditable={isEditMode}
                    id="start_date"
                />
                <InfoField
                    icon={visaIcon}
                    label="Visa End Date"
                    value={new Date(userData.visa[0].end_date).toLocaleDateString()}
                    isEditable={isEditMode}
                    id="end_date"
                />
            </div>
        </>
    );
};
