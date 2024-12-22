import React, { FormEvent, useState } from 'react';

import './signIn.scss';
import { authenticateUser } from '../../shared/authenticateUser';

const SignInPage: React.FC = () => {
    const [errorVisible, setErrorVisible] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;

        setErrorVisible(false);

        const success = await authenticateUser(email, password);
        

        if (success) {
            window.location.replace('/');
        } else {
            setErrorVisible(true);
        }
    };

    return (
        <main className="main__container">
            <div className="login__header">
                <h1>Login</h1>
                <form id="signin-form" onSubmit={handleSubmit}>
                    <div className="input__box">
                        <label htmlFor="email">Email:</label>
                        <input className="input-field" type="text" id="email" placeholder="Type your Email" required />
                    </div>
                    <div className="input__box">
                        <label htmlFor="password">Password</label>
                        <input
                            className="input-field"
                            type="password"
                            id="password"
                            placeholder="Type your password"
                            required
                        />
                        <section>
                            <input type="checkbox" id="checkbox" />
                            <label htmlFor="checkbox">Remember me</label>
                        </section>
                    </div>
                    <div className="input__submit">
                        <button type="submit" className="submit__btn">
                            Sign In
                        </button>
                    </div>
                </form>
                <p id="error-message" style={{ display: errorVisible ? 'block' : 'none' }}>
                    Email or Password is not correct
                </p>
            </div>
            <div className="login__title">
                <h1>
                    GIVING YOU CONFIDENCE
                    <br />
                    IN COMPLEX SAP PROJECTS
                </h1>
            </div>
        </main>
    );
};

export default SignInPage;
