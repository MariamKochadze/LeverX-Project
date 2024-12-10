import { search } from './helpers/advanced-search';
import { request } from './helpers/fetch-polyfill';
import { User } from './models/user.model';
import { authenticateUser, isAuthenticareUser, logOut } from './shared/authenticate-user';
import './index.scss';
import './components/header/header';

export type UserFormData = Partial<
    Pick<User, 'first_name' | 'last_name' | 'email' | 'phone' | 'skype' | 'building' | 'room' | 'department'>
> & {
    name?: string;
};

if (!isAuthenticareUser()) {
    window.location.href = '/src/pages/sign-in/sign-in.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const usersView: HTMLElement = document.querySelector('.users-body')!;
    const viewOptions: HTMLElement = document.querySelector('.view-options')!;
    const basicSearchInput: HTMLInputElement = document.querySelector('#basic-input')!;
    const basicSearchBtn: HTMLElement = document.querySelector('#basic-options .search-btn')!;
    const advancedSearchForm: HTMLElement = document.querySelector('.advanced-search')!;
    const infoContainer: HTMLElement = document.querySelector('.info-container')!;
    const logOutBtn: HTMLButtonElement = document.querySelector('#logout__btn')!;
    let usersData: User[] = [];

    // Check for search params on load
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    const updateUserCount = (count: number) => {
        const userCountElement = document.querySelector('.users-count');
        if (userCountElement) {
            userCountElement.textContent = `${count} employees displayed`;
        }
    };

    logOutBtn.addEventListener('click', () => {
        logOut();
    });

    // View toggle buttons
    type ToggleType = 'grid' | 'list';

    const createViewButton = (type: ToggleType, iconPath: string) => {
        const button = document.createElement('button');

        const icon = document.createElement('img');
        icon.src = iconPath;
        icon.alt = `${type} View Icon`;
        icon.classList.add('view-icon');
        button.classList.add('view-toggle');
        button.dataset.view = type;
        button.appendChild(icon);
        return button;
    };

    const gridViewBtn = createViewButton('grid', './assets/grid-icon.svg');
    const listViewBtn = createViewButton('list', './assets/list-icon.svg');
    gridViewBtn.classList.add('active');

    viewOptions.appendChild(gridViewBtn);
    viewOptions.appendChild(listViewBtn);

    // View toggle handlers
    const toggleView = (activeBtn: HTMLButtonElement, inactiveBtn: HTMLButtonElement, displayStyle: string) => {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
        infoContainer.style.display = displayStyle;
        if (activeBtn.dataset.view) {
            renderUsers(usersData, activeBtn.dataset.view);
        }

        const searchParams = new URLSearchParams(window.location.search);
        if (activeBtn.dataset.view) {
            searchParams.set('view', activeBtn.dataset.view);
        }

        window.history.pushState({}, '', `?${searchParams.toString()}`);
    };

    gridViewBtn.addEventListener('click', () => toggleView(gridViewBtn, listViewBtn, 'none'));
    listViewBtn.addEventListener('click', () => toggleView(listViewBtn, gridViewBtn, 'flex'));

    // Fetch users with XMLHttpRequest fallback
    const fetchUsers = async () => {
        try {
            const response = await request<User[]>('../users.json', 'GET');
            usersData = await response.json();
            renderUsers(usersData, 'grid');
            updateUserCount(usersData.length);

            // Apply search if present in URL
            if (searchQuery) {
                basicSearchInput.value = searchQuery;
                basicSearch(searchQuery);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            renderNotFoundPage();
        }
    };

    // Enhanced search functionality
    const basicSearch = (searchTerm: string) => {
        const term = searchTerm.toLowerCase();
        const filteredUsers = usersData.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const id = user._id.toLowerCase();
            return fullName.includes(term) || id === term;
        });

        const currentView = (document.querySelector('.view-toggle.active')! as HTMLElement).dataset.view;
        if (currentView) {
            renderUsers(filteredUsers, currentView);
        }
        updateUserCount(filteredUsers.length);

        // Update URL with search term
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('search', searchTerm);
        window.history.pushState({}, '', `?${searchParams.toString()}`);
    };

    // Event listeners
    basicSearchBtn.addEventListener('click', () => basicSearch(basicSearchInput.value.trim()));
    basicSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') basicSearch(basicSearchInput.value.trim());
    });

    // Advanced search with URL params

    const advancedSearch = (formData: UserFormData) => {
        const filteredUsers = search(formData, usersData);
        console.log(filteredUsers);

        const currentView = (document.querySelector('.view-toggle.active')! as HTMLDivElement).dataset.view;
        if (currentView) {
            renderUsers(filteredUsers, currentView);
        }
        updateUserCount(filteredUsers.length);

        const searchParams = new URLSearchParams(window.location.search);
        Object.entries(formData).forEach(([key, value]) => {
            if (value) searchParams.set(key, value);
        });
        window.history.pushState({}, '', `?${searchParams.toString()}`);
    };

    advancedSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: (document.querySelector('#name')! as HTMLInputElement).value,
            email: (document.querySelector('#email')! as HTMLInputElement).value,
            phone: (document.querySelector('#phone')! as HTMLInputElement).value,
            skype: (document.querySelector('#skype')! as HTMLInputElement).value,
            building: (document.querySelector('#building')! as HTMLInputElement).value,
            room: (document.querySelector('#room')! as HTMLInputElement).value,
            department: (document.querySelector('#department')! as HTMLInputElement).value,
        };
        advancedSearch(formData);
    });

    // Render functions
    const renderUsers = (users: User[], layout: string) => {
        usersView.innerHTML = '';

        if (users.length === 0) {
            renderNotFoundPage();
            return;
        }

        const container = document.createElement('div');
        container.classList.add('users-view', `${layout}-view`);

        users.forEach((user) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <div class="avatar-container">
                        <img src="${user.user_avatar}" alt="${user.first_name}'s Avatar" class="avatar" />
                    </div>
                    <div class="user-info">
                        <h3 class="name">${user.first_name} ${user.last_name}</h3>
                    </div>
                </div>
                <hr class="divider" />
                <div class="details">
                    <div class="detail-row">
                        <img src="./assets/working-icon.svg" alt="Department Icon" class="info-icon" />
                        <span class="detail-text">${user.department}</span>
                    </div>
                    <div class="detail-row">
                        <img src="./assets/note-icon.svg" alt="Room Icon" class="info-icon" />
                        <span class="detail-text">${user.room}</span>
                    </div>
                </div>`;

            card.addEventListener('click', () => {
                window.location.href = `pages/user-details/user-details.html#/users/${user._id}`;
            });

            container.appendChild(card);
        });

        usersView.appendChild(container);
    };

    const renderNotFoundPage = () => {
        const elementsToHide = ['.header', '.main__search', '.view-options', '.users-count', '.info-container'];
        elementsToHide.forEach((selector) => {
            const element: HTMLElement = document.querySelector(selector)!;
            if (element) element.style.display = 'none';
        });

        usersView.innerHTML = `
            <div class="not-found">
                <div class="not-found__content">
                    <img src="./assets/not-found.svg" alt="Not Found Icon" class="not-found__image">
                    <h2 class="not-found__title">404 PAGE NOT FOUND</h2>
                    <p class="not-found__description">
                        Sorry, we can't find that page! It might be an older link or maybe it was removed.
                    </p>
                    <button id="go-home-button">GO TO THE HOME PAGE</button>
                </div>
            </div>`;

        document.getElementById('go-home-button')!.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    };

    // Initialize
    fetchUsers();
});
