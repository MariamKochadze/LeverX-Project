import { useState } from 'react';
import { User } from '../../models/user.model';
import { useParams } from 'react-router-dom';
import { EditContext, useEditContext } from '../../context/editContext';

interface EditableFieldProps {
    icon?: string;
    label: string;
    value: string | number;
    editable: boolean;
    id: string;
    onChange?: (value: string) => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({ icon, label, value, editable, id, onChange }) => {
    const { isEditMode, updateUserData } = useEditContext();

    if (!icon) {
        return (
            <p className="editable-field" id={id}>
                <strong>{label}</strong>
                {editable ? (
                    <input
                        type="text"
                        value={value}
                        className="editable-input"
                        id={id}
                        onChange={(e) => onChange?.(e.target.value)}
                    />
                ) : (
                    <span>{value}</span>
                )}
            </p>
        );
    }

    return (
        <p className="editable-field" id={id}>
            {icon && <img src={icon} alt={`${label} Icon`} className="info-icon" />}
            <strong>{label}</strong>
            {isEditMode ? (
                <input
                    type="text"
                    value={value}
                    className="editable-input"
                    id={id}
                    onChange={(e) => updateUserData({ [id]: e.target.value })}
                />
            ) : (
                <span>{value}</span>
            )}
        </p>
    );
};

export const handleEdit = async () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState<User>();

    if (isEditMode && userData && id) {
        const updateUser: Record<string, string> = {};

        document.querySelectorAll('.editable-field').forEach((field) => {
            const input = field.querySelector('input');
            if (input instanceof HTMLInputElement && input.value) {
                updateUser[input.id] = input.value;
            }
        });

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateUser),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const updatedUser = await response.json();
            setUserData(updatedUser);
            console.log('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    setIsEditMode(!isEditMode);
};
