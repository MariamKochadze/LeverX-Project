import { User } from '../../models/user.model';
import { isAuthenticareUser, logOut } from '../../shared/authenticate-user.js';

if (!isAuthenticareUser()) {
    window.location.href = '/src/pages/sign-in/sign-in.html';
}

function getUserIdFromURL(): string | undefined {
    const urlHash = window.location.hash;
    const id = urlHash.split('/').pop();
    return id;
}

const logOutBtn: HTMLElement = document.querySelector('#logout__btn')!;

// Main container
const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.body.appendChild(mainContainer);

// Fetch user
async function fetchUserById(userId: string): Promise<User | undefined> {
    try {
        const response = await fetch('../../../users.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const users: User[] = await response.json();
        return users.find((user) => user._id === userId);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
    }
}

function createField(icon: string, label: string, value: string | number) {
    const p = document.createElement('p');
    p.innerHTML = `
        <img src="../../assets/${icon}" alt="${label} Icon" class="info-icon">
        <strong>${label}:</strong>
        <span>${value}</span>
    `;
    return p;
}

document.addEventListener('DOMContentLoaded', async () => {
    // First section  User Details
    async function showUserDetails() {
        try {
            const userId = getUserIdFromURL();
            if (!userId) {
                return;
            }

            const user = await fetchUserById(userId);
            if (!user) {
                return;
            }

            const section = document.createElement('section');
            section.classList.add('user__details-section');

            const container = document.createElement('div');
            container.classList.add('user__details-container');

            //  back button
            const backButton = document.createElement('button');
            backButton.classList.add('back-button');
            backButton.innerHTML = `
                <img src="../../assets/back-icon.svg" alt="Back" class="back-icon">
                
            `;
            backButton.addEventListener('click', () => {
                window.location.href = '../../index.html';
            });
            container.appendChild(backButton);

            const topSection = document.createElement('div');
            topSection.classList.add('user__details-top');

            const avatar = document.createElement('img');
            avatar.classList.add('user__details-avatar');
            avatar.src = `../../` + user.user_avatar;
            avatar.alt = `${user.first_name} ${user.last_name}`;

            const fullName = document.createElement('p');
            fullName.classList.add('full-name');
            fullName.textContent = `${user.first_name} ${user.last_name}`;

            const nativeFormat = document.createElement('p');
            nativeFormat.classList.add('native-format');
            nativeFormat.textContent = `${user.last_native_name} ${user.middle_native_name} ${user.first_native_name}`;

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('user__details-buttons');

            const copyButton = document.createElement('button');
            copyButton.classList.add('user__details-copy-button');
            copyButton.innerHTML = `<img src="../../assets/copy-icon.svg" alt="copy icon" class="copy__icon">Copy link`;

            const editButton = document.createElement('button');
            editButton.classList.add('user__details-edit-button');
            editButton.innerHTML = `<img src="../../assets/edit-icon.svg" alt="edit icon" class="edit__icon">EDIT`;

            topSection.appendChild(avatar);
            topSection.appendChild(fullName);
            topSection.appendChild(nativeFormat);

            buttonsContainer.appendChild(copyButton);
            buttonsContainer.appendChild(editButton);

            container.appendChild(topSection);
            container.appendChild(buttonsContainer);
            section.appendChild(container);

            mainContainer.appendChild(section);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
        }
    }

    // Second section Details Info
    async function showCombinedInfo() {
        try {
            const userId = getUserIdFromURL();
            if (!userId) {
                return;
            }

            const user = await fetchUserById(userId);
            if (!user) {
                return;
            }

            const section = document.createElement('section');
            section.classList.add('user__details-section', 'second-section');

            // Data mapping for each header
            const data = [
                {
                    header: 'GENERAL INFO',
                    fields: [
                        { icon: 'working-icon.svg', label: 'Department', value: user.department },
                        { icon: 'building-icon.svg', label: 'Building', value: user.building },
                        { icon: 'id-icon.svg', label: 'Room', value: user.room },
                        { icon: 'photo-icon.svg', label: 'Desk number', value: user.desk_number },
                        {
                            icon: 'id-icon.svg',
                            label: 'Date of Birth',
                            value: `${user.date_birth.day}/${user.date_birth.month}/${user.date_birth.year}`,
                        },
                        {
                            icon: 'name-icon.svg',
                            label: 'Manager',
                            value: `${user.manager.first_name} ${user.manager.last_name}`,
                        },
                    ],
                },
                {
                    header: 'CONTACTS',
                    fields: [
                        { icon: 'phone-icon.svg', label: 'Phone', value: user.phone },
                        { icon: 'email-icon.svg', label: 'Email', value: user.email },
                        { icon: 'skype-icon.svg', label: 'Skype', value: user.skype },
                        { icon: 'id-icon.svg', label: 'C-Number', value: user.cnumber },
                    ],
                },
                {
                    header: 'TRAVEL INFO',
                    fields: [
                        { icon: 'citizenship-icon.svg', label: 'Citizenship', value: user.citizenship },
                        {
                            icon: 'visa-icon.svg',
                            label: 'Visa Type',
                            value: `${user.visa[0].type} (${user.visa[0].issuing_country})`,
                        },
                        {
                            icon: 'visa-icon.svg',
                            label: 'Visa Start Date',
                            value: new Date(user.visa[0].start_date).toLocaleDateString(),
                        },
                        {
                            icon: 'visa-icon.svg',
                            label: 'Visa End Date',
                            value: new Date(user.visa[0].end_date).toLocaleDateString(),
                        },
                    ],
                },
            ];

            data.forEach(({ header, fields }) => {
                const headerElement = document.createElement('h1');
                headerElement.textContent = header;
                headerElement.classList.add('user__details-header');

                const container = document.createElement('div');
                container.classList.add('infoo-container');

                fields.forEach(({ icon, label, value }) => {
                    const field = createField(icon, label, value);
                    container.appendChild(field);
                });

                section.appendChild(headerElement);
                section.appendChild(container);
            });

            mainContainer.appendChild(section);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
        }
    }
    logOutBtn.addEventListener('click', () => {
        logOut();
    });

    await showUserDetails();
    await showCombinedInfo();
});
