import { EditUser, Role } from './../../models/user.model.js';

const userList = document.querySelector('.setting__user-list');

export const editUserCard = (userData: EditUser) => {
    const card: HTMLDivElement = document.createElement('div');
    const firstName: HTMLElement = document.createElement('p');
    const lastName: HTMLElement = document.createElement('p');
    const image: HTMLImageElement = document.createElement('img');
    const role: HTMLElement = document.createElement('p');

    card.classList.add('edit-user-card');
    firstName.classList.add('edit-user-name');
    lastName.classList.add('edit-user-surname');
    role.classList.add('edit-user-role');

    firstName.innerText = userData.name;
    lastName.innerText = userData.surname;
    role.innerText = userData.role === Role.ADMIN ? 'ADMIN' : userData.role === Role.HR ? 'HR' : 'EMPLOYEE';

    image.classList.add('edit-user-img');
    image.src = userData.img.src;
    image.alt = userData.img.alt;

    card.appendChild(firstName);
    card.appendChild(lastName);
    card.appendChild(image);
    card.appendChild(role);
    userList?.appendChild(card);
};
