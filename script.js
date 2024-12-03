document.addEventListener('DOMContentLoaded', () => {
    const usersView = document.querySelector('.users-body');
    const viewOptions = document.querySelector('.view-options');
    const basicSearchInput = document.querySelector('#basic-input');
    const basicSearchBtn = document.querySelector('#basic-options .search-btn');
    const advancedSearchForm = document.querySelector('.advanced-search');
    const infoContainer = document.querySelector('.info-container');
    let usersData = [];


    //update users count
    const updateUserCount = (count) => {
        const userCountElement = document.querySelector('.users-count');
        if (userCountElement) {
            userCountElement.textContent = `${count} employees displayed`;
        }
    };

    // Toggle grid and list
    const gridViewBtn = document.createElement('button');
    const gridIcon = document.createElement('img');
    gridIcon.src = './assets/grid-icon.svg';
    gridIcon.alt = 'Grid View Icon';
    gridIcon.classList.add('view-icon');
    gridViewBtn.classList.add('view-toggle', 'active');
    gridViewBtn.dataset.view = 'grid';
    gridViewBtn.appendChild(gridIcon);

    const listViewBtn = document.createElement('button');
    const listIcon = document.createElement('img');
    listIcon.src = './assets/list-icon.svg';
    listIcon.alt = 'List View Icon';
    listIcon.classList.add('view-icon');
    listViewBtn.classList.add('view-toggle');
    listViewBtn.dataset.view = 'list';
    listViewBtn.appendChild(listIcon);

    viewOptions.appendChild(gridViewBtn);
    viewOptions.appendChild(listViewBtn);

    // Event listeners for toggling views
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        infoContainer.style.display = 'none';
        renderUsers(usersData, 'grid');
    });

    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        infoContainer.style.display = 'flex';
        renderUsers(usersData, 'list');
    });

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await fetch('./users.json');
            usersData = await response.json();
            renderUsers(usersData, 'grid');
            updateUserCount(usersData.length);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    infoContainer.style.display = 'none';

    // Basic search functionality
    const basicSearch = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filteredUsers = usersData.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const id = user._id.toLowerCase();
            return fullName.includes(term) || id === term;
        });

        const currentView = document.querySelector('.view-toggle.active').dataset.view;
        renderUsers(filteredUsers, currentView);
        updateUserCount(filteredUsers.length);
    };

    // Advanced search functionality
    const advancedSearch = (formData) => {
        const filteredUsers = usersData.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const nameMatch = !formData.name || fullName.includes(formData.name.toLowerCase());
            const emailMatch = !formData.email || user.email.toLowerCase().includes(formData.email.toLowerCase());
            const phoneMatch = !formData.phone || user.phone.includes(formData.phone);
            const skypeMatch = !formData.skype || user.skype.toLowerCase().includes(formData.skype.toLowerCase());
            const billingMatch = !formData.billing || formData.billing === 'any' || user.building === formData.billing;
            const roomMatch = !formData.room || formData.room === 'any' || user.room === formData.room;
            const departmentMatch = !formData.department || formData.department === 'any' || user.department === formData.department;

            return nameMatch && emailMatch && phoneMatch && skypeMatch && billingMatch && roomMatch && departmentMatch;
        });

        const currentView = document.querySelector('.view-toggle.active').dataset.view;
        renderUsers(filteredUsers, currentView);
        updateUserCount(filteredUsers.length);
    };

    // Event Listeners
    basicSearchBtn.addEventListener('click', () => {
        basicSearch(basicSearchInput.value.trim());
    });

    basicSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            basicSearch(basicSearchInput.value.trim());
        }
    });

    advancedSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value,
            skype: document.querySelector('#skype').value,
            billing: document.querySelector('#billing').value,
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
  </div>
</div> `;
            card.addEventListener('click', () => {
                window.location.href = `userDetails.html#/users/${user._id}`;
            });

            container.appendChild(card);
        });

        usersView.appendChild(container);
    };

    // Not-found page
    const renderNotFoundPage = () => {
        const elementsToToggle = [
            { element: document.querySelector('.header'), display: 'flex' },
            { element: document.querySelector('.main__search'), display: 'block' },
            { element: document.querySelector('.view-options'), display: 'flex' },
            { element: document.querySelector('.users-count'), display: 'block' },
            { element: document.querySelector('.info-container'), display: 'none' }
        ];

        elementsToToggle.forEach(({ element }) => {
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
            </div>
        `;

        document.getElementById('go-home-button').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    };

    fetchUsers();
});
