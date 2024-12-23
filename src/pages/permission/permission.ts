import './permission.scss';
import { editUserCard } from '../../components/card/edit-user.card';
import { request } from '../../helpers/fetch-polyfill';
import { ROLE, User } from '../../models/user.model';
import { isAuthenticareUser } from '../../shared/authenticate-user';
import '../../components/header/header';
import { createHeader } from '../../components/header/header';

const user: HTMLElement = document.querySelector('.setting__user-list')!;

const currentUser = isAuthenticareUser();

if (
  !currentUser ||
  (currentUser.userRole !== ROLE.ADMIN && currentUser.userRole !== ROLE.HR)
) {
  window.location.href = '/sign-in.html';
}

//fetch users
export const fetchUsers = async (hrId?: string) => {
  const url = hrId
    ? `http://localhost:3000/users/?manager.id=${hrId}`
    : `http://localhost:3000/users/`;
  try {
    const response = await request<User[]>(url, 'GET');
    const userData = await response.json();
    userData.forEach((user) => {
      editUserCard({
        name: user.first_name,
        surname: user.last_name,
        img: { src: user.user_avatar, alt: 'user avatar' },
        role: user.role,
        id: user.id,
      });
    });
  } catch (error) {}
};

window.addEventListener('load', () => {
  if (currentUser?.userRole === ROLE.ADMIN) {
    fetchUsers();
  } else if (currentUser?.userRole === ROLE.HR) {
    fetchUsers(currentUser.userId);
  }

  createHeader();
});
