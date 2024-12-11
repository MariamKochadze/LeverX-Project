import { editUserCard } from '../../components/card/edit-user.card';
import { request } from '../../helpers/fetch-polyfill';
import { Role, User } from '../../models/user.model';
import { isAuthenticareUser } from '../../shared/authenticate-user';
import '../../components/header/header';

const user: HTMLElement = document.querySelector('.setting__user-list')!;

const currentUser = isAuthenticareUser();

if (!currentUser || (currentUser.role !== Role.ADMIN && currentUser.role !== Role.HR)) {
    window.location.href = '/src/pages/sign-in/sign-in.html';
}

//fetch users
export const fetchUsers = async () => {
    try {
        const response = await request<User[]>('../../../users.json', 'GET');
        const userData = await response.json();
        console.log(userData);
        userData.forEach((user) => {
            editUserCard({
                name: user.first_name,
                surname: user.last_name,
                img: { src: user.user_avatar, alt: 'user avatar' },
                role: user.role,
            });
        });
    } catch (error) {}
};

window.addEventListener('load', () => {
    fetchUsers();
});
