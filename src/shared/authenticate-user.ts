import { Role } from './../models/user.model';
import { User } from '../models/user.model';

const API = 'https://www.toptal.com/developers/bcrypt/api';

const findUser = async (email: string) => {
    const response = await fetch('../../../users.json');
    const users = await response.json();
    return users.find((user: User) => email.toLocaleLowerCase().trim() === user.email.toLocaleLowerCase());
};

export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
    try {
        const foundUser: User = await findUser(email);
        const response = await fetch(`${API}/check-password.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `hash=${encodeURIComponent(foundUser.password)}&password=${encodeURIComponent(password)}&cost=${5}`,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.ok) {
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem('currentUser', JSON.stringify({ userRole: foundUser.role }));
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
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

        //in real scene result already should include user with role
        //now we need to send second request to compare if email is Admin/HR/Employee
        const usersResponse = await fetch('../../../users.json');
        const users: User[] = await usersResponse.json();
        const user = users.find((user: User) => {
            return user.email === email;
        });

        if (result.ok) {
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem('hash', result.hash);
            sessionStorage.setItem('currentUser', JSON.stringify({ userRole: user?.role }));

            return true;
        }
        return false;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export const isAuthenticareUser = (): { role: Role } | undefined => {
    const currentUser: string | null = sessionStorage.getItem('currentUser');
    try {
        return currentUser ? JSON.parse(currentUser) : undefined;
    } catch (error) {
        return undefined;
    }
};

export const logOut = () => {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('hash');
    window.location.href = '/src/pages/sign-in/sign-in.html';
};
