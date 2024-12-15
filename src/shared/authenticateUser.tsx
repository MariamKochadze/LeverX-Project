import { Role, User } from '../models/user.model';

const API = 'https://www.toptal.com/developers/bcrypt/api';

const findUser = async (email: string) => {
    console.log(email);
    try {
        const response = await fetch(`http://localhost:3000/users?email=${email}`, {
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();
        return users[0];
    } catch (error) {
        console.log('Error fetching user:', error);
        return null;
    }
};

export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
    try {
        const foundUser = await findUser(email);

        if (!foundUser) {
            return false;
        }

        const response = await fetch(`${API}/check-password.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            body: `hash=${encodeURIComponent(foundUser.password)}&password=${encodeURIComponent(password)}&cost=${5}`,
        });

        const data = await response.json();

        if (data.ok) {
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem(
                'currentUser',
                JSON.stringify({
                    userRole: foundUser.role,
                    userId: foundUser.id,
                })
            );
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
        const usersResponse = await fetch('../../../users.json');
        const users: User[] = await usersResponse.json();
        const user = users.find((user: User) => user.email === email);

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

export const isAuthenticatedUser = (): { userRole: Role; userId: string } | undefined => {
    const currentUser = sessionStorage.getItem('currentUser');
    try {
        return currentUser ? JSON.parse(currentUser) : undefined;
    } catch (error) {
        return undefined;
    }
};

export const logOut = (): void => {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('hash');
    window.location.href = '/signin';
};
