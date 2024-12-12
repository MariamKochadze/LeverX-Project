import { Role, User } from '../../models/user.model';
import { isAuthenticareUser } from '../../shared/authenticate-user';
import '../../components/header/header';
import { createHeader } from '../../components/header/header';

const currentUser: { userRole: Role } | undefined = isAuthenticareUser();

if (!currentUser) {
    window.location.href = '/src/pages/sign-in/sign-in.html';
}

function getUserId(): string | undefined {
    const urlHash = window.location.hash;
    const id = urlHash.split('/').pop();
    return id;
}

const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.body.appendChild(mainContainer);

async function fetchUserById(userId: string): Promise<User | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        const user: User = await response.json();
        return user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
    }
}

function createEditableField(
    icon: string,
    label: string,
    value: string | number,
    editable: boolean,
    id: string
): HTMLElement {
    const container = document.createElement('p');
    container.classList.add('editable-field');
    container.id = id;
    if (!icon) {
        container.innerHTML = editable
            ? `<strong>${label}</strong>
           <input type='text' value='${value}' class='editable-input' id='${id}'>`
            : `<strong>${label}</strong>
           <span>${value}</span>`;
        return container;
    }
    container.innerHTML = editable
        ? `<img src="../../assets/${icon}" alt="${label} Icon" class="info-icon">
           <strong>${label}</strong>
           <input type='text' value='${value}' class='editable-input' id='${id}'>`
        : `<img src="../../assets/${icon}" alt="${label} Icon" class="info-icon">
           <strong>${label}</strong>
           <span>${value}</span>`;
    return container;
}

document.addEventListener('DOMContentLoaded', async () => {
    let userData: User | undefined;
    let isEditMode = false;

    async function showUserDetails() {
        try {
            const userId = getUserId();
            if (!userId) {
                return;
            }

            userData = await fetchUserById(userId);
            if (!userData) {
                return;
            }

            const section = document.createElement('section');
            section.classList.add('user__details-section');

            const container = document.createElement('div');
            container.classList.add('user__details-container');

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
            avatar.src = `../../` + userData.user_avatar;
            avatar.alt = `${userData.first_name} ${userData.last_name}`;

            const firstNameField = createEditableField('', '', userData.first_name, false, 'first_name');

            const lastNameField = createEditableField('', '', userData.last_name, false, 'last_name');
            const fullName = createEditableField(
                '',
                '',
                `${userData.first_name} ${userData.last_name}`,
                false,
                'first_name-last_name'
            );

            const nativeFormat = document.createElement('p');
            nativeFormat.classList.add('native-format');
            nativeFormat.textContent = `${userData.last_native_name} ${userData.middle_native_name} ${userData.first_native_name}`;

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('user__details-buttons');

            const copyButton = document.createElement('button');
            copyButton.classList.add('user__details-copy-button');
            copyButton.innerHTML = `<img src="../../assets/copy-icon.svg" alt="copy icon" class="copy__icon">Copy link`;

            const editButton = document.createElement('button');
            editButton.classList.add('user__details-edit-button');
            editButton.innerHTML = `<img src="../../assets/edit-icon.svg" alt="edit icon" class="edit__icon">EDIT`;

            if (currentUser?.userRole === Role.ADMIN || currentUser?.userRole === Role.HR) {
                editButton.addEventListener('click', () => {
                    isEditMode = !isEditMode;

                    const updateUser: any = {};

                    document.querySelectorAll('.editable-field').forEach((field) => {
                        const span = field.querySelector('span');
                        const input = field.querySelector('input');

                        if (isEditMode && span) {
                            const value = span.textContent || '';
                            const parent = span.parentElement;

                            if (parent) {
                                parent.replaceWith(
                                    createEditableField(
                                        parent.querySelector('img')?.src.split('/').pop() || '',
                                        parent.querySelector('strong')?.textContent || '',
                                        value,
                                        true,
                                        field.id
                                    )
                                );
                            }
                        } else if (!isEditMode && input) {
                            const value = (input as HTMLInputElement).value;
                            const parent = input.parentElement;
                            updateUser[input.id] = input.value;
                            if (parent) {
                                parent.replaceWith(
                                    createEditableField(
                                        parent.querySelector('img')?.src.split('/').pop() || '',
                                        parent.querySelector('strong')?.textContent || '',
                                        value,
                                        false,
                                        field.id
                                    )
                                );
                            }
                            fetch(`http://localhost:3000/users/${userId}`, {
                                method: 'PATCH',
                                body: JSON.stringify(updateUser),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log('updated');
                                })
                                .catch((error) => console.log(error, 'ERROR'));
                        }
                    });

                    editButton.textContent = isEditMode ? 'SAVE' : 'EDIT';
                });
            }

            topSection.appendChild(avatar);
            topSection.appendChild(firstNameField);
            topSection.appendChild(lastNameField);
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
    async function showCombinedInfo() {
        try {
            if (!userData) {
                return;
            }

            const section = document.createElement('section');
            section.classList.add('user__details-section', 'second-section');

            const data = [
                {
                    header: 'GENERAL INFO',
                    fields: [
                        { icon: 'working-icon.svg', label: 'Department', value: userData.department, id: 'department' },
                        { icon: 'building-icon.svg', label: 'Building', value: userData.building, id: 'building' },
                        { icon: 'id-icon.svg', label: 'Room', value: userData.room, id: 'room' },
                        {
                            icon: 'photo-icon.svg',
                            label: 'Desk number',
                            value: userData.desk_number,
                            id: 'desk_number',
                        },
                        {
                            icon: 'id-icon.svg',
                            label: 'Date of Birth',
                            value: `${userData.date_birth.day}/${userData.date_birth.month}/${userData.date_birth.year}`,
                            id: 'date_birth.year',
                        },
                        {
                            icon: 'name-icon.svg',
                            label: 'Manager',
                            value: `${userData.manager.first_name} ${userData.manager.last_name}`,
                            id: 'first_name-last_name',
                        },
                    ],
                },
                {
                    header: 'CONTACTS',
                    fields: [
                        { icon: 'phone-icon.svg', label: 'Phone', value: userData.phone, id: 'phone' },
                        { icon: 'email-icon.svg', label: 'Email', value: userData.email, id: 'email' },
                        { icon: 'skype-icon.svg', label: 'Skype', value: userData.skype, id: 'skype' },
                        { icon: 'id-icon.svg', label: 'C-Number', value: userData.cnumber, id: 'cnumber' },
                    ],
                },
                {
                    header: 'TRAVEL INFO',
                    fields: [
                        {
                            icon: 'citizenship-icon.svg',
                            label: 'Citizenship',
                            value: userData.citizenship,
                            id: 'citizenship',
                        },
                        {
                            icon: 'visa-icon.svg',
                            label: 'Visa Type',
                            value: `${userData.visa[0].type} (${userData.visa[0].issuing_country})`,
                            id: 'issuing_country',
                        },
                        {
                            icon: 'visa-icon.svg',
                            label: 'Visa Start Date',
                            value: new Date(userData.visa[0].start_date).toLocaleDateString(),
                            id: 'start_date',
                        },
                        {
                            icon: 'visa-icon.svg',
                            label: 'Visa End Date',
                            value: new Date(userData.visa[0].end_date).toLocaleDateString(),
                            id: 'end_date',
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

                fields.forEach(({ icon, label, value, id }) => {
                    const field = createEditableField(icon, label, value, false, id);
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

    await showUserDetails();
    await showCombinedInfo();
    createHeader();
});
