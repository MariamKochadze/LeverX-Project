import '../../../public/index.scss';
import { useEffect, useState } from 'react';
import { Header } from '../../components/header/header';
import { ContactInfo } from '../../components/info/contactInfo';
import { GeneralInfo } from '../../components/info/generalInfo';
import { TravelInfo } from '../../components/info/travelInfo';
import { UserDetailsHeader } from '../../components/userDetailsHeader/userDetailsHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticatedUser } from '../../shared/authenticateUser';
import { User } from '../../models/user.model';

export const UserDetails: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = isAuthenticatedUser();

    useEffect(() => {
        if (!currentUser) {
            navigate('/sign-in');
            return;
        }

        if (id) {
            fetchUserData();
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`);
            if (!response.ok) {
                navigate('/');
                return;
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user:', error);
            navigate('/');
        }
    };

    return (
        <>
            <Header />
            <div className="main-container">
                {userData && (
                    <>
                        <UserDetailsHeader
                            userData={userData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                            currentUser={currentUser}
                        />
                        <GeneralInfo userData={userData} isEditMode={isEditMode} />
                        <ContactInfo userData={userData} isEditMode={isEditMode} />
                        <TravelInfo userData={userData} isEditMode={isEditMode} />
                    </>
                )}
            </div>
        </>
    );
};
