import { Role } from '../../models/user.model';
import { isAuthenticareUser, logOut } from '../../shared/authenticate-user';

function getCurrentUserId(): string | undefined {
    const urlHash = window.location.hash;
    return urlHash ? urlHash.split('/').pop() : undefined;
}

async function fetchUser(id: string) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    return await response.json();
}

const currentUser: { userRole: Role; userId: string } | undefined = isAuthenticareUser();

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
                    <a href="#" class="header__title">
                        <span class="header__title--small">LEVERX</span>
                        <span class="header__title--large">EMPLOYEE SERVICES</span>
                    </a>
                </li>
                
                <li class="header__tab header__active-tab" tabindex="0">Address Book</li>
                <li class="header__tab header__active-tab edit-setting" id="edit-setting-id">
                </li>
                
                <li class="header__actions" id="profile__icon">
                    <a href="#" class="header__button">
                        <img src="/src/assets/question-mark.svg" alt="Support Icon" class="header__button--img">
                        SUPPORT
                    </a>
                    
                    <a href="/src/pages/user-details/user-details.html#/users/550e8400-e29b-41d4-a716-446655440000" 
                       class="header__button" 
                       id="profile__button">
                        <img src="/src/assets/avataaars (1).svg" alt="Avatar icon" class="header__profile--icon">
                        <span class="profile-name">LUFFY MONKEY</span>
                    </a>
                </li>
            </ul>
        </nav>
        
        <div class="header__mobile-search">
            <img src="/src/assets/search-icon.svg" alt="Search icon" class="search__icon">
            <span>Open search panel</span>
        </div>
    `;

    header.innerHTML = headerContent;

    const updateProfileAvatar = async () => {
        const profileButton = header.querySelector('#profile__button') as HTMLAnchorElement;
        const avatarIcon = header.querySelector('.header__profile--icon') as HTMLImageElement;
        const profileName = header.querySelector('.profile-name') as HTMLElement;

        if (currentUser?.userId) {
            try {
                const user = await fetchUser(currentUser?.userId as string);

                if (user) {
                    avatarIcon.src = user.user_avatar.replace('./', '/src/assets');
                    profileName.textContent = `${user.first_name} ${user.last_name}`;
                    profileButton.href = `/src/pages/user-details/user-details.html#/users/${user.id}`;
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
    aElement.href = '/src/pages/edit/edit.html';
    const settingList = document.getElementById('edit-setting-id')!;

    if (currentUser?.userRole === Role.ADMIN || currentUser?.userRole === Role.HR) {
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
    logOutImg.src = '/src/assets/power-off-solid.svg';

    logOutBtn.appendChild(logOutImg);

    logOutBtn.addEventListener('click', () => {
        logOut();
    });

    logOutLiEl?.appendChild(logOutBtn);
}
createHeader();
