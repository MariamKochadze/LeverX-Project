import React from 'react';
import './signIn.scss';

const SignInPage = () => {
    return (
        <main className="main__container">
            <div className="login__header">
                <h1>Login</h1>
                <form id="signin-form">
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
                <p id="error-message">Email or Password is not correct</p>
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
