import '../../../public/index.scss';
import React from 'react';

interface InfoFieldProps {
    icon: string;
    label: string;
    value: string | number;
    isEditable: boolean;
    id: string;
    onChange?: (value: string) => void;
}

export const InfoField: React.FC<InfoFieldProps> = ({ icon, label, value, isEditable, id, onChange }) => {
    return (
        <div className="editable-field" id={id}>
            {icon && <img src={icon} alt={`${label} Icon`} className="info-icon" />}
            <strong>{label}</strong>
            {isEditable ? (
                <input
                    type="text"
                    value={value}
                    className="editable-input"
                    onChange={(e) => onChange?.(e.target.value)}
                />
            ) : (
                <span>{value}</span>
            )}
        </div>
    );
};
