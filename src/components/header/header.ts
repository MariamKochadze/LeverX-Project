function getCurrentUserId(): string | undefined {
    const urlHash = window.location.hash;
    return urlHash ? urlHash.split('/').pop() : undefined;
}

async function fetchUsers() {
    const response = await fetch('/users.json');
    return response.json();
}

function createHeader(): void {
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
                    
                    <a href="#" class="header__button log-out" id="logout__btn">
                        <img src="/src/assets/power-off-solid.svg" alt="Log out icon" class="header__button--img">
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
        const userId = getCurrentUserId();
        const profileButton = header.querySelector('#profile__button') as HTMLAnchorElement;
        const avatarIcon = header.querySelector('.header__profile--icon') as HTMLImageElement;
        const profileName = header.querySelector('.profile-name') as HTMLElement;

        if (userId) {
            try {
                const users = await fetchUsers();
                const currentUser = users.find((user: any) => user._id === userId);

                if (currentUser) {
                    avatarIcon.src = currentUser.user_avatar.replace('./', '/src/');
                    profileName.textContent = `${currentUser.first_name} ${currentUser.last_name}`;
                    profileButton.href = `/src/pages/user-details/user-details.html#/users/${currentUser._id}`;
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.insertBefore(header, document.body.firstChild);
        });
    } else {
        document.body.insertBefore(header, document.body.firstChild);
    }
}

createHeader();
