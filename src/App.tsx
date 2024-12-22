import { Routes, Route } from 'react-router-dom';
import UsersPage from './pages/users/usersPage';
import SignInPage from './pages/signIn/signInPage';
import NotFoundPage from './pages/notFound/notFoundPage';
import Permission from './pages/permission/permission';
import { UserDetails } from './pages/userDetails/userDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/permission" element={<Permission />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/user-details/:id" element={<UserDetails />} />
      <Route path="/notFound" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
