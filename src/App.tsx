import { Routes, Route } from 'react-router-dom';
import UsersPage from './pages/users/usersPage';
import EditPage from './pages/edit/editPage';

import UserDetailsPage from './pages/userDetails/userDetailsPage';
import SignInPage from './pages/signIn/signInPage';
import NotFoundPage from './pages/notFound/notFountPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/userDetailsPage/:id" element={<UserDetailsPage />} />
            <Route path="/notFound" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;
