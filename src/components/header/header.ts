import { ROLE } from '../../models/user.model';
import { isAuthenticareUser, logOut } from '../../shared/authenticate-user';
import '../../index.scss';

import questionMarkIcon from '../../assets/question-mark.svg';
import searchIcon from '../../assets/search-icon.svg';
import powerOffIcon from '../../assets/power-off-solid.svg';

function getCurrentUserId(): string | undefined {
  const urlHash = window.location.hash;
  return urlHash ? urlHash.split('/').pop() : undefined;
}

async function fetchUser(id: string) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  return await response.json();
}

const currentUser: { userRole: ROLE; userId: string } | undefined =
  isAuthenticareUser();

export function createHeader(): void {
  const header = document.createElement('header');
  header.classList.add('header');

  const headerContent = `
        <nav class="header__nav">
            <input type="checkbox" id="burger-toggle" class="header__burger-input">
            <label for="burger-toggle" class="header__burger">
                <div class="header__burger-line"></div>
                <div class="header__burger-line"></div>
                <div class="header__burger-line"></div>
            </label>
            <div class="page-overlay"></div>
            
            <ul class="header__nav-list">
                <li class="header__logo">
                    <a href="../index.html" class="header__title">
                        <span class="header__title--small">LEVERX</span>
                        <span class="header__title--large">EMPLOYEE SERVICES</span>
                    </a>
                </li>
                
                <li class="header__tab " id="address-book-id" tabindex="0"><a href="./index.html">Address Book</a></li>
                <li class="header__tab  edit-setting" id="edit-setting-id">
                </li>
                
                <li class="header__actions" id="profile__icon">
                    <a href="./index.html" class="header__button">
                        <img src="${questionMarkIcon}" alt="Support Icon" class="header__button--img">
                        SUPPORT
                    </a>
                    
                    <a href="/user-details.html#/users/550e8400-e29b-41d4-a716-446655440000" 
                       class="header__button" 
                       id="profile__button">
                        <img src="/assets/avataaars (1).svg" alt="Avatar icon" class="header__profile--icon">
                        <span class="profile-name">LUFFY MONKEY</span>
                    </a>
                </li>
            </ul>
        </nav>
        
        <div class="header__mobile-search">
            <img src="${searchIcon}" alt="Search icon" class="search__icon">
            <span>Open search panel</span>
        </div>
    `;

  const path = window.location.pathname;

  if (path === '/permission.html') {
    document
      .getElementById('edit-setting-id')
      ?.classList.add('header__active-tab');
  } else if (path === '/index.html') {
    document
      .getElementById('address-book-id')
      ?.classList.add('header__active-tab');
  }
  console.log(path);

  header.innerHTML = headerContent;

  const updateProfileAvatar = async () => {
    const profileButton = header.querySelector(
      '#profile__button'
    ) as HTMLAnchorElement;
    const avatarIcon = header.querySelector(
      '.header__profile--icon'
    ) as HTMLImageElement;
    const profileName = header.querySelector('.profile-name') as HTMLElement;

    if (currentUser?.userId) {
      try {
        const user = await fetchUser(currentUser?.userId as string);

        if (user) {
          avatarIcon.src = user.user_avatar.replace(
            './assets/',
            '/src/assets/'
          );
          profileName.textContent = `${user.first_name} ${user.last_name}`;
          profileButton.href = `/user-details.html#/users/${user.id}`;
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        avatarIcon.src = '/src/assets/avataaars (1).svg';
        profileName.textContent = 'LUFFY MONKEY';
      }
    }
  };

  window.addEventListener('hashchange', updateProfileAvatar);
  updateProfileAvatar();

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertBefore(header, document.body.firstChild);
  });

  // settings
  const aElement = document.createElement('a')!;
  aElement.innerText = 'Settings';
  aElement.href = '/permission.html';
  const settingList = document.getElementById('edit-setting-id')!;

  if (
    currentUser?.userRole === ROLE.ADMIN ||
    currentUser?.userRole === ROLE.HR
  ) {
    settingList?.appendChild(aElement);
  }

  //logOut btn
  const logOutLiEl = document.getElementById('profile__icon');

  const logOutBtn: HTMLAnchorElement = document.createElement('a')!;
  logOutBtn.href = '#';
  logOutBtn.className = 'header__button log-out';
  logOutBtn.id = 'logout__btn';

  const logOutImg: HTMLImageElement = document.createElement('img')!;
  logOutImg.classList.add('header__button--img');
  logOutImg.alt = 'Log out icon';
  logOutImg.src = powerOffIcon;

  logOutBtn.appendChild(logOutImg);

  logOutBtn.addEventListener('click', () => {
    logOut();
  });

  logOutLiEl?.appendChild(logOutBtn);
}
createHeader();
