document.addEventListener('DOMContentLoaded', () => {
    const usersView = document.querySelector('.users-body');
    const viewOptions = document.querySelector('.view-options');
    const basicSearchInput = document.querySelector('#basic-input');
    const basicSearchBtn = document.querySelector('#basic-options .search-btn');
    const advancedSearchForm = document.querySelector('.advanced-search');
    let usersData = [];

    // View toggle buttons setup remains the same
    const gridViewBtn = document.createElement('button');
    gridViewBtn.textContent = 'Grid View';
    gridViewBtn.classList.add('view-toggle', 'active');
    gridViewBtn.dataset.view = 'grid';

    const listViewBtn = document.createElement('button');
    listViewBtn.textContent = 'List View';
    listViewBtn.classList.add('view-toggle');
    listViewBtn.dataset.view = 'list';

    viewOptions.appendChild(gridViewBtn);
    viewOptions.appendChild(listViewBtn);

    // Fetch users function remains the same
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

    // Basic search functionality
    const basicSearch = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filteredUsers = usersData.filter(user => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const id = user._id.toLowerCase();
            return fullName.includes(term) || id === term;
        });

        renderUsers(filteredUsers, document.querySelector('.view-toggle.active').dataset.view);
        updateUserCount(filteredUsers.length);
    };

    // Advanced search functionality
    const advancedSearch = (formData) => {
        const filteredUsers = usersData.filter(user => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const nameMatch = !formData.name || fullName.includes(formData.name.toLowerCase());
            const emailMatch = !formData.email || user.email.toLowerCase().includes(formData.email.toLowerCase());
            const phoneMatch = !formData.phone || user.phone.includes(formData.phone);
            const skypeMatch = !formData.skype || user.skype.toLowerCase().includes(formData.skype.toLowerCase());
            const billingMatch = !formData.billing || formData.billing === 'any' || user.building === formData.billing;
            const roomMatch = !formData.room || formData.room === 'any' || user.room === formData.room;
            const departmentMatch = !formData.department || formData.department === 'any' || user.department === formData.department;

            return nameMatch && emailMatch && phoneMatch && skypeMatch && 
                   billingMatch && roomMatch && departmentMatch;
        });

        renderUsers(filteredUsers, document.querySelector('.view-toggle.active').dataset.view);
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
            department: document.querySelector('#department').value
        };
        advancedSearch(formData);
    });

    // Layout switch handlers remain the same
    const handleLayoutSwitch = (event) => {
        const selectedLayout = event.target.dataset.view;
        if (selectedLayout) {
            document.querySelectorAll('.view-toggle').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === selectedLayout);
            });
            renderUsers(usersData, selectedLayout);
        }
    };

    gridViewBtn.addEventListener('click', handleLayoutSwitch);
    listViewBtn.addEventListener('click', handleLayoutSwitch);

    // Render functions
    const renderUsers = (users, layout) => {
        usersView.innerHTML = '';
        
        if (users.length === 0) {
            renderNotFound();
            return;
        }
    
        const container = document.createElement('div');
        container.classList.add('users-view', `${layout}-view`);
    
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <div class="avatar-container">
                        <img src="${user.user_avatar}" alt="${user.first_name}'s Avatar" class="avatar" />
                    </div>
                    <div class="user-info">
                        <img src="./assets/user-icon.svg" alt="User" class="info-icon"/>
                        <h3 class="name">${user.first_name} ${user.last_name}</h3>
                    </div>
                </div>
                <div class="details">
                    <div class="detail-row">
                        <img src="./assets/department-icon.svg" alt="Department" class="info-icon"/>
                        <span class="detail-text">${user.department}</span>
                    </div>
                    <div class="detail-row">
                        <img src="./assets/room-icon.svg" alt="Room" class="info-icon"/>
                        <span class="detail-text">${user.room}</span>
                    </div>
                </div>
            `;
    
            card.addEventListener('click', () => {
                window.location.href = `userDetails.html#/users/${user._id}`;
            });
            
            container.appendChild(card);
        });
    
        usersView.appendChild(container);
    };
    

    const renderNotFound = () => {
        usersView.innerHTML = `
            <div class="not-found">
                <div class="not-found__content">
                    <img src="./assets/not-found.svg" alt="Not Found Icon" class="not-found__image">
                    <h2 class="not-found__title">Nothing found</h2>
                    <p class="not-found__description">
                        No results match your search. Consider <br/> trying a different search request.
                    </p>
                </div>
            </div>
        `;
    };

    const updateUserCount = (count) => {
        const countElement = document.querySelector('.users-count');
        countElement.textContent = `${count} employees displayed`;
    };

    // Initialize
    fetchUsers();
});
