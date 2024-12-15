import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    text?: string;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type = 'button', className, text, children }) => {
    return (
        <button type={type} className={className}>
            {text}
            {children}
        </button>
    );
};

{
    /* <Button type="submit" className="my-button" text="Click me">
    <span>Additional content</span>
</Button>; */
}
