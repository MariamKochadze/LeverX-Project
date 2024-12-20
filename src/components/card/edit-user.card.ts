import { EditUser, ROLE } from './../../models/user.model';

const userList = document.querySelector('.setting__user-list');

export const editUserCard = (userData: EditUser) => {
  const card = document.createElement('div');
  card.classList.add('edit-user-card');

  const image = document.createElement('img');
  image.classList.add('edit-user-img');
  image.src = userData.img.src.replace('./assets/', '/src/assets/');
  image.alt = userData.img.alt;

  const userInfo = document.createElement('div');
  userInfo.classList.add('user-info');

  const fullName = document.createElement('span');
  fullName.textContent = `${userData.name} ${userData.surname}`;
  fullName.classList.add('user-fullname');

  const role = document.createElement('span');
  role.classList.add('edit-user-role');
  role.classList.add(`role-${ROLE[userData.role].toLowerCase()}`);
  role.textContent = ROLE[userData.role];
  userInfo.appendChild(fullName);
  card.appendChild(image);
  card.appendChild(userInfo);
  card.appendChild(role);

  card.addEventListener('click', () => {
    window.location.href = `/user-details.html#/users/${userData.id}`;
  });

  userList?.appendChild(card);
};
