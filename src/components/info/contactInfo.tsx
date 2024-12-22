import { User } from '../../models/user.model';
import { InfoField } from '../infoField/infoField';
import phoneIcon from '@assets/phone-icon.svg';
import emailIcon from '@assets/email-icon.svg';
import skypeIcon from '@assets/skype-icon.svg';
import idIcon from '@assets/id-icon.svg';

interface ContactInfoProps {
    userData: User;
    isEditMode: boolean;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ userData, isEditMode }) => {
    return (
        <section className="user__details-section">
            <h1 className="user__details-header">CONTACTS</h1>
            <div className="info-container">
                <InfoField icon={phoneIcon} label="Phone" value={userData.phone} isEditable={isEditMode} id="phone" />
                <InfoField icon={emailIcon} label="Email" value={userData.email} isEditable={isEditMode} id="email" />
                <InfoField icon={skypeIcon} label="Skype" value={userData.skype} isEditable={isEditMode} id="skype" />
                <InfoField
                    icon={idIcon}
                    label="C-Number"
                    value={userData.cnumber}
                    isEditable={isEditMode}
                    id="cnumber"
                />
            </div>
        </section>
    );
};
