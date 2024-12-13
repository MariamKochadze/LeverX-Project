import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditPage from './src/pages/edit/editPage';
import UserDetailsPage from './src/pages/userDetails/userDetailsPage';
import SignInPage from './src/pages/signIn/signInPage';
import UsersPage from './src/pages/users/usersPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UsersPage />} />
                <Route path="/edit" element={<EditPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/userDetailsPage" element={<UserDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
