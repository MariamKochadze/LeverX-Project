//  main container 
const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.body.appendChild(mainContainer);

// First section function
async function showUserDetails() {
    try {
        const response = await fetch('./user.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const user = await response.json();

        const section = document.createElement('section');
        section.classList.add('user__details-section');

        const container = document.createElement('div');
        container.classList.add('user__details-container');

        const avatar = document.createElement('img');
        avatar.classList.add('user__details-avatar');
        avatar.src = user.user_avatar;
        avatar.alt = `${user.first_name} ${user.last_name}`;

        const fullName = document.createElement('p');
        fullName.classList.add('full-name');
        fullName.textContent = `${user.first_name} ${user.last_name}`;

        const nativeFormat = document.createElement('p');
        nativeFormat.classList.add('native-format');
        nativeFormat.textContent = `${user.last_native_name} ${user.middle_native_name} ${user.first_native_name}`;

        const copyButton = document.createElement('button');
        copyButton.classList.add('user__details-copy-button');
        copyButton.innerHTML = `
            <img src="./assets/copy-icon.svg" alt="copy icon" class="copy__icon">
            Copy link
        `;

        const editButton = document.createElement('button');
        editButton.classList.add('user__details-edit-button');
        editButton.innerHTML = `
            <img src="./assets/edit-icon.svg" alt="edit icon" class="edit__icon">
            EDIT
        `;

        container.appendChild(avatar);
        container.appendChild(fullName);
        container.appendChild(nativeFormat);
        container.appendChild(copyButton);
        container.appendChild(editButton);

        section.appendChild(container);

        
        mainContainer.appendChild(section);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Second section function
async function createGeneralInfoSection() {
    try {
        const response = await fetch('./user.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }
        const user = await response.json();

        const section = document.createElement('section');
        section.classList.add('user__details-section');

        const generalInfoHeader = document.createElement('h1');
        generalInfoHeader.classList.add('user__details-header');
        generalInfoHeader.textContent = 'GENERAL INFO';

       
        const departmentInfo = document.createElement('p');
        departmentInfo.innerHTML = `
            <img src="./assets/working-icon.svg" alt="Department Icon" class="info-icon">
            <strong>Department:</strong> <span>${user.department}</span>
        `;

        
        const buildingInfo = document.createElement('p');
        buildingInfo.innerHTML = `
            <img src="./assets/building-icon.svg" alt="Building Icon" class="info-icon">
            <strong>Building:</strong> <span>${user.building}</span>
        `;

       
        const roomInfo = document.createElement('p');
        roomInfo.innerHTML = `
            <img src="./assets/id-icon.svg" alt="Room Icon" class="info-icon">
            <strong>Room:</strong> <span>${user.room}</span>
        `;

       
        const deskInfo = document.createElement('p');
        deskInfo.innerHTML = `
            <img src="./assets/photo-icon.svg" alt="Desk Number Icon" class="info-icon">
            <strong>Desk number:</strong> <span>${user.desk_number}</span>
        `;

        
        const dobInfo = document.createElement('p');
        const { day, month, year } = user.date_birth;
        dobInfo.innerHTML = `
            <img src="./assets/id-icon.svg" alt="Date of Birth Icon" class="info-icon">
            <strong>Date of Birth:</strong> <span>${day}/${month}/${year}</span>
        `;

       
        const managerInfo = document.createElement('p');
        const { first_name, last_name } = user.manager;
        managerInfo.innerHTML = `
            <img src="./assets/name-icon.svg" alt="Manager Icon" class="info-icon">
            <strong>Manager:</strong> <span>${first_name} ${last_name}</span>
        `;

        const contactsHeader = document.createElement('h1');
        contactsHeader.classList.add('user__details-contact');
        contactsHeader.textContent = 'CONTACTS';

        
        const phoneInfo = document.createElement('p');
        phoneInfo.innerHTML = `
            <img src="./assets/phone-icon.svg" alt="Phone Icon" class="info-icon">
            <strong>Mobile phone:</strong> <span>${user.phone}</span>
        `;

       
        const emailInfo = document.createElement('p');
        emailInfo.innerHTML = `
            <img src="./assets/email-icon.svg" alt="Email Icon" class="info-icon">
            <strong>Email:</strong> <span>${user.email}</span>
        `;

        
        const skypeInfo = document.createElement('p');
        skypeInfo.innerHTML = `
            <img src="./assets/skype-icon.svg" alt="Skype Icon" class="info-icon">
            <strong>Skype:</strong> <span>${user.skype}</span>
        `;

        
        const cnumberInfo = document.createElement('p');
        cnumberInfo.innerHTML = `
            <img src="./assets/c-number-icon.svg" alt="C-Number Icon" class="info-icon">
            <strong>C-Number:</strong> <span>${user.cnumber}</span>
        `;

        const travelInfoHeader = document.createElement('h1');
        travelInfoHeader.classList.add('user__details-travel-info');
        travelInfoHeader.textContent = 'TRAVEL INFO';

       
        const citizenshipInfo = document.createElement('p');
        citizenshipInfo.innerHTML = `
            <img src="./assets/citizenship-icon.svg" alt="Citizenship Icon" class="info-icon">
            <strong>Citizenship:</strong> <span>${user.citizenship}</span>
        `;

        
        const visaDetails = user.visa[0];
        const visaInfo = document.createElement('p');
        visaInfo.innerHTML = `
            <img src="./assets/visa-icon.svg" alt="Visa Icon" class="info-icon">
            <strong>Visa:</strong> <span>${visaDetails.type} (${visaDetails.issuing_country})</span>
        `;

        const visaValidity = document.createElement('p');
        const startDate = new Date(visaDetails.start_date).toLocaleDateString();
        const endDate = new Date(visaDetails.end_date).toLocaleDateString();
        visaValidity.innerHTML = `
            <img src="./assets/visa-icon.svg" alt="Visa Validity Icon" class="info-icon">
            <strong>Visa validity period:</strong> <span>${startDate} - ${endDate}</span>
        `;

        section.appendChild(generalInfoHeader);
        section.appendChild(departmentInfo);
        section.appendChild(buildingInfo);
        section.appendChild(roomInfo);
        section.appendChild(deskInfo);
        section.appendChild(dobInfo);
        section.appendChild(managerInfo);
        section.appendChild(contactsHeader);
        section.appendChild(phoneInfo);
        section.appendChild(emailInfo);
        section.appendChild(skypeInfo);
        section.appendChild(cnumberInfo);
        section.appendChild(travelInfoHeader);
        section.appendChild(citizenshipInfo);
        section.appendChild(visaInfo);
        section.appendChild(visaValidity);

        
        mainContainer.appendChild(section);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

showUserDetails();
createGeneralInfoSection();
