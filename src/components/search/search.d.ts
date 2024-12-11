// const basicSearchInput: HTMLInputElement = document.querySelector('#basic-input')!;
// const basicSearchBtn: HTMLElement = document.querySelector('#basic-options .search-btn')!;

// export const basicSearch = (searchTerm: string) => {
//     const term = searchTerm.toLowerCase();
//     const filteredUsers = usersData.filter((user) => {
//         const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
//         const id = user.id.toLowerCase();
//         return fullName.includes(term) || id === term;
//     });

//     const currentView = (document.querySelector('.view-toggle.active')! as HTMLElement).dataset.view;
//     if (currentView) {
//         renderUsers(filteredUsers, currentView);
//     }
//     updateUserCount(filteredUsers.length);

//     // Update URL with search term
//     const searchParams = new URLSearchParams(window.location.search);
//     searchParams.set('search', searchTerm);
//     window.history.pushState({}, '', `?${searchParams.toString()}`);
// };

// // Event listeners for basic search
// basicSearchBtn.addEventListener('click', () => basicSearch(basicSearchInput.value.trim()));
// basicSearchInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') basicSearch(basicSearchInput.value.trim());
// });
