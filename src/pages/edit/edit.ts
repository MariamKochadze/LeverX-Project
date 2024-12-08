import { editUserCard } from '../../components/card/edit-user.card.js';
import { request } from '../../helpers/fetch-polyfill.js';
import { User } from '../../models/user.model.js';

const user: HTMLElement = document.querySelector('.setting__user-list')!;

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
