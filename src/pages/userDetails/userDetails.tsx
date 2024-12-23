import '../../../public/index.scss';
import { useEffect, useState } from 'react';

import { ContactInfo } from '../../components/info/contactInfo';
import { GeneralInfo } from '../../components/info/generalInfo';
import { TravelInfo } from '../../components/info/travelInfo';
import { UserDetailsHeader } from '../../components/userDetailsHeader/userDetailsHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticatedUser } from '../../shared/authenticateUser';
import { Role, User } from '../../models/user.model';

export const UserDetails: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<User | null>(null);
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

  useEffect(() => {
    if (userData) {
      Object.keys(userData).forEach((key) => {
        updateForm(userData[key as keyof typeof userData], key);
      });
    }
  }, [userData]);

  const updateForm = (value: any, id: string) => {
    setEditForm((editForm) => {
      if (!editForm) {
        editForm = {} as User;
      }
      return { ...editForm, [id]: value };
    });
  };

  const updateMode = () => {
    if (
      currentUser?.userRole === Role.ADMIN ||
      (currentUser?.userRole === Role.HR &&
        currentUser.userId === userData?.manager.id)
    ) {
      setIsEditMode((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isEditMode) {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(editForm),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.log(error, 'ERROR'));
    }
  }, [isEditMode]);

  return (
    <>
      <div className="main-container">
        {editForm && (
          <>
            <section className="user__details-section">
              <UserDetailsHeader
                setEditForm={updateForm}
                userData={editForm}
                isEditMode={isEditMode}
                setIsEditMode={updateMode}
                currentUser={currentUser}
              />
            </section>
            <section className="user__details-section second-section">
              <GeneralInfo
                userData={editForm}
                isEditMode={isEditMode}
                setEditForm={updateForm}
              />
              <ContactInfo
                userData={editForm}
                isEditMode={isEditMode}
                setEditForm={updateForm}
              />
              <TravelInfo
                userData={editForm}
                isEditMode={isEditMode}
                setEditForm={updateForm}
              />
            </section>
          </>
        )}
      </div>
    </>
  );
};
