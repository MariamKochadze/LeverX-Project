import { User } from '../../models/user.model';
import { InfoField } from '../infoField/infoField';
import phoneIcon from '@assets/phone-icon.svg';
import emailIcon from '@assets/email-icon.svg';
import skypeIcon from '@assets/skype-icon.svg';
import idIcon from '@assets/id-icon.svg';

interface ContactInfoProps {
    userData: User;
    isEditMode: boolean;
    setEditForm: (value: string, id: string) => void;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ userData, isEditMode, setEditForm }) => {
    return (
        <>
            <h1 className="user__details-header">CONTACTS</h1>
            <div className="infoo-container">
                <InfoField
                    icon={phoneIcon}
                    label="Phone"
                    value={userData.phone}
                    isEditable={isEditMode}
                    id="phone"
                    onChange={setEditForm}
                />
                <InfoField
                    icon={emailIcon}
                    label="Email"
                    value={userData.email}
                    isEditable={isEditMode}
                    id="email"
                    onChange={setEditForm}
                />
                <InfoField
                    icon={skypeIcon}
                    label="Skype"
                    value={userData.skype}
                    isEditable={isEditMode}
                    id="skype"
                    onChange={setEditForm}
                />
                <InfoField
                    icon={idIcon}
                    label="C-Number"
                    value={userData.cnumber}
                    isEditable={isEditMode}
                    id="cnumber"
                    onChange={setEditForm}
                />
            </div>
        </>
    );
};
