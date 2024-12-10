// Create the header element
const header: HTMLElement = document.createElement('header');
header.classList.add('header');

// Create the nav element
const nav: HTMLElement = document.createElement('nav');
nav.classList.add('header__nav');

// Create the burger input
const burgerInput: HTMLInputElement = document.createElement('input');
burgerInput.type = 'checkbox';
burgerInput.id = 'burger-toggle';
burgerInput.classList.add('header__burger-input');

// Create the burger label
const burgerLabel: HTMLElement = document.createElement('label');
burgerLabel.setAttribute('for', 'burger-toggle');
burgerLabel.classList.add('header__burger');

// Create burger lines
for (let i = 0; i < 3; i++) {
    const burgerLine: HTMLElement = document.createElement('div');
    burgerLine.classList.add('header__burger-line');
    burgerLabel.appendChild(burgerLine);
}

// Create the page overlay
const pageOverlay: HTMLElement = document.createElement('div');
pageOverlay.classList.add('page-overlay');

// Create the nav list (ul)
const navList: HTMLElement = document.createElement('ul');
navList.classList.add('header__nav-list');

// Create the logo list item (li)
const logoItem: HTMLElement = document.createElement('li');
logoItem.classList.add('header__logo');

const logoLink: HTMLAnchorElement = document.createElement('a');
logoLink.href = '#';
logoLink.classList.add('header__title');

// Create logo title spans
const titleSmall: HTMLElement = document.createElement('span');
titleSmall.classList.add('header__title--small');
titleSmall.textContent = 'LEVERX';

const titleLarge: HTMLElement = document.createElement('span');
titleLarge.classList.add('header__title--large');
titleLarge.textContent = 'EMPLOYEE SERVICES';

// Append title spans to the logo link
logoLink.appendChild(titleSmall);
logoLink.appendChild(titleLarge);

// Append the logo link to the logo list item
logoItem.appendChild(logoLink);

// Create the Address Book tab list item
const addressBookTab: HTMLElement = document.createElement('li');
addressBookTab.classList.add('header__tab', 'header__active-tab');
addressBookTab.tabIndex = 0;
addressBookTab.textContent = 'Address Book';

// Create the profile actions list item
const profileActionsItem: HTMLElement = document.createElement('li');
profileActionsItem.classList.add('header__actions');
profileActionsItem.id = 'profile__icon';

// Create the support button
const supportButton: HTMLAnchorElement = document.createElement('a');
supportButton.href = '#';
supportButton.classList.add('header__button');

const supportIcon: HTMLImageElement = document.createElement('img');
supportIcon.classList.add('header__button--img');
supportIcon.src = './assets/question-mark.svg';
supportIcon.alt = 'Support Icon';

supportButton.appendChild(supportIcon);
supportButton.appendChild(document.createTextNode('SUPPORT'));

// Create the profile button
const profileButton: HTMLAnchorElement = document.createElement('a');
profileButton.href = './pages/user-details/user-details.html#/users/550e8400-e29b-41d4-a716-446655440000';
profileButton.classList.add('header__button');
profileButton.id = 'profile__button';

const avatarIcon: HTMLImageElement = document.createElement('img');
avatarIcon.src = './assets/avataaars (1).svg';
avatarIcon.alt = 'Avatar icon';
avatarIcon.classList.add('header__profile--icon');

profileButton.appendChild(avatarIcon);
profileButton.appendChild(document.createTextNode('LUFFY MONKEY'));

// Create the logout button
const logoutButton: HTMLAnchorElement = document.createElement('a');
logoutButton.href = '#';
logoutButton.classList.add('header__button', 'log-out');
logoutButton.id = 'logout__btn';

const logoutIcon: HTMLImageElement = document.createElement('img');
logoutIcon.classList.add('header__button--img');
logoutIcon.src = './assets/power-off-solid.svg';
logoutIcon.alt = 'Log out icon';

logoutButton.appendChild(logoutIcon);

// Append items to the profile actions list item
profileActionsItem.appendChild(supportButton);
profileActionsItem.appendChild(profileButton);
profileActionsItem.appendChild(logoutButton);

// Append the elements to the nav list
navList.appendChild(logoItem);
navList.appendChild(addressBookTab);
navList.appendChild(profileActionsItem);

// Append nav elements to the nav
nav.appendChild(burgerInput);
nav.appendChild(burgerLabel);
nav.appendChild(pageOverlay);
nav.appendChild(navList);

// Create the mobile search container
const mobileSearch: HTMLElement = document.createElement('div');
mobileSearch.classList.add('header__mobile-search');

const searchIcon: HTMLImageElement = document.createElement('img');
searchIcon.src = './assets/search-icon.svg';
searchIcon.alt = 'Search icon';
searchIcon.classList.add('search__icon');

const searchText: HTMLElement = document.createElement('span');
searchText.textContent = 'Open search panel';

// Append search icon and text to the mobile search container
mobileSearch.appendChild(searchIcon);
mobileSearch.appendChild(searchText);

// Append everything to the header
header.appendChild(nav);
header.appendChild(mobileSearch);

// Append header to the body (or any other container)
document.body.appendChild(header);
