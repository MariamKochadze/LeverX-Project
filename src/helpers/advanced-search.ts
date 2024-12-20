import { User } from '../models/user.model';
import { UserFormData } from '../script';

export const search = (formData: UserFormData, users: User[]) => {
  const filledFields = Object.entries(formData);

  let filteredUsers: User[] = [];

  filledFields.forEach((field) => {
    filteredUsers = users.filter((user) => {
      if (field[0] === 'name') {
        field[0] = 'first_name';
      }

      const value = user[field[0] as keyof User];
      if (typeof value !== 'string') {
        return false;
      }
      return value.toLowerCase().includes(field[1].toLocaleLowerCase());
    });
  });

  return filteredUsers;
};
