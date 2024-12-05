const API = 'https://www.toptal.com/developers/bcrypt/api';

export const authenticareUser = async (email: string, password: string, hash: string): Promise<boolean> => {
    return fetch(`${API}/check-password.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `hash=${encodeURIComponent(hash)}&password=${encodeURIComponent(email + password)}&cost=${5}`,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.ok) {
                sessionStorage.setItem('authenticated', 'true');
                return true;
            }
            return false;
        })
        .catch((error) => {
            return false;
        });
};

export const registerUser = async (email: string, password: string): Promise<boolean> => {
    const credentials = email + password;
    try {
        const response = await fetch(`${API}/generate-hash.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `password=${encodeURIComponent(credentials)}&cost=${5}`,
        });

        const result = await response.json();

        if (result.ok) {
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem('hash', result.hash);

            return true;
        }
        return false;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export const isAuthenticareUser = (): string | null => {
    return sessionStorage.getItem('authenticated');
};

export const logOut = () => {
    sessionStorage.removeItem('authenticated');
    window.location.href = '/src/pages/sign-in/sign-in.html';
};
