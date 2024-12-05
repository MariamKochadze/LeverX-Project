export const search = (formData, users) => {
    const filledFields = Object.entries(formData);
    let filteredUsers = [];
    filledFields.forEach((field) => {
        filteredUsers = users.filter((user) => {
            if (field[0] === 'name') {
                field[0] = 'first_name';
            }
            const value = user[field[0]];
            if (typeof value !== 'string') {
                return false;
            }
            return value.toLowerCase().includes(field[1].toLocaleLowerCase());
        });
    });
    return filteredUsers;
};
//# sourceMappingURL=advanced-search.js.map