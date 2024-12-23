import '../../styles/pages/sign-in.scss';

import { authenticateUser } from '../../shared/authenticateUser';

window.addEventListener('load', () => {
  const form: HTMLFormElement = document.querySelector('#signin-form')!;
  const errorMessage: HTMLElement = document.getElementById('error-message')!;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const email = (document.getElementById('email') as HTMLInputElement).value;

    errorMessage.style.display = 'none';

    let success = false;

    success = await authenticateUser(email, password);

    if (success) {
      window.location.replace('/index.html');
    } else {
      errorMessage.style.display = 'block';
    }
  });
});
