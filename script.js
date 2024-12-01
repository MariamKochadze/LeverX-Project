document.addEventListener('DOMContentLoaded', () => {
    const usersView = document.querySelector('.users-body');
    const viewOptions = document.querySelector('.view-options');
    let usersData = []; 

   
    const gridViewBtn = document.createElement('button');
    gridViewBtn.textContent = 'Grid View';
    gridViewBtn.classList.add('view-toggle'); 
    gridViewBtn.dataset.view = 'grid';

    const listViewBtn = document.createElement('button');
    listViewBtn.textContent = 'List View';
    listViewBtn.classList.add('view-toggle');
    listViewBtn.dataset.view = 'list';

    viewOptions.appendChild(gridViewBtn);
    viewOptions.appendChild(listViewBtn);

    
    const fetchUsers = async () => {
        try {
            const response = await fetch('./users.json');
            usersData = await response.json(); 
            renderUsers(usersData, 'grid'); 
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

  
    const renderUsers = (users, layout) => {
        usersView.innerHTML = ''; 

        const container = document.createElement('div');
        container.classList.add('users-view', layout === 'grid' ? 'grid-view' : 'list-view');

        users.forEach((user) => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
        <div class="avatar-container">
          <img src="${user.avatar}" alt="User Avatar" class="avatar" />
        </div>
        <h3 class="name">${user.name}</h3>
        <hr class="divider" />
        <div class="details">
          <div class="detail-item department">${user.department}</div>
          <div class="detail-item code">${user.code}</div>
        </div>
      `;

            container.appendChild(card);
        });

        usersView.appendChild(container);
    };

  
    const handleLayoutSwitch = (event) => {
        const selectedLayout = event.target.dataset.view;
        if (selectedLayout) {
            renderUsers(usersData, selectedLayout);

            document.querySelectorAll('.view-toggle').forEach((btn) => {
                btn.classList.toggle('active', btn.dataset.view === selectedLayout);
            });
        }
    };


    gridViewBtn.addEventListener('click', handleLayoutSwitch);
    listViewBtn.addEventListener('click', handleLayoutSwitch);

 
    fetchUsers();
});
