import { authenticareUser, registerUser } from '../../shared/authenticate-user.js';
window.addEventListener('load', () => {
    const form = document.querySelector('#signin-form');
    const errorMessage = document.getElementById('error-message');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        console.log(password, email);
        errorMessage.style.display = 'none';
        const hash = sessionStorage.getItem('hash');
        console.log(hash);
        let success = false;
        if (hash) {
            success = await authenticareUser(email, password, hash);
            console.log(success);
        }
        else {
            success = await registerUser(email, password);
        }
        if (success) {
            window.location.replace('/src/index.html');
        }
        else {
            errorMessage.style.display = 'block';
        }
    });
});
//# sourceMappingURL=sign-in.js.map