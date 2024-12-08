import { search } from './helpers/advanced-search.js';
import { request } from './helpers/fetch-polyfill.js';
import { isAuthenticareUser, logOut } from './shared/authenticate-user.js';
if (!isAuthenticareUser()) {
    window.location.href = '/src/pages/sign-in/sign-in.html';
}
document.addEventListener('DOMContentLoaded', () => {
    const usersView = document.querySelector('.users-body');
    const viewOptions = document.querySelector('.view-options');
    const basicSearchInput = document.querySelector('#basic-input');
    const basicSearchBtn = document.querySelector('#basic-options .search-btn');
    const advancedSearchForm = document.querySelector('.advanced-search');
    const infoContainer = document.querySelector('.info-container');
    const logOutBtn = document.querySelector('#logout__btn');
    let usersData = [];
    // Check for search params on load
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const updateUserCount = (count) => {
        const userCountElement = document.querySelector('.users-count');
        if (userCountElement) {
            userCountElement.textContent = `${count} employees displayed`;
        }
    };
    logOutBtn.addEventListener('click', () => {
        logOut();
    });
    const createViewButton = (type, iconPath) => {
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
    const toggleView = (activeBtn, inactiveBtn, displayStyle) => {
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
            const response = await request('../users.json', 'GET');
            usersData = await response.json();
            renderUsers(usersData, 'grid');
            updateUserCount(usersData.length);
            // Apply search if present in URL
            if (searchQuery) {
                basicSearchInput.value = searchQuery;
                basicSearch(searchQuery);
            }
        }
        catch (error) {
            console.error('Error fetching users:', error);
            renderNotFoundPage();
        }
    };
    // Enhanced search functionality
    const basicSearch = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filteredUsers = usersData.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const id = user._id.toLowerCase();
            return fullName.includes(term) || id === term;
        });
        const currentView = document.querySelector('.view-toggle.active').dataset.view;
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
        if (e.key === 'Enter')
            basicSearch(basicSearchInput.value.trim());
    });
    // Advanced search with URL params
    const advancedSearch = (formData) => {
        const filteredUsers = search(formData, usersData);
        console.log(filteredUsers);
        const currentView = document.querySelector('.view-toggle.active').dataset.view;
        if (currentView) {
            renderUsers(filteredUsers, currentView);
        }
        updateUserCount(filteredUsers.length);
        const searchParams = new URLSearchParams(window.location.search);
        Object.entries(formData).forEach(([key, value]) => {
            if (value)
                searchParams.set(key, value);
        });
        window.history.pushState({}, '', `?${searchParams.toString()}`);
    };
    advancedSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value,
            skype: document.querySelector('#skype').value,
            building: document.querySelector('#building').value,
            room: document.querySelector('#room').value,
            department: document.querySelector('#department').value,
        };
        advancedSearch(formData);
    });
    // Render functions
    const renderUsers = (users, layout) => {
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
            const element = document.querySelector(selector);
            if (element)
                element.style.display = 'none';
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
        document.getElementById('go-home-button').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    };
    // Initialize
    fetchUsers();
});
//# sourceMappingURL=script.js.map