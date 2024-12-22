// import { useState } from 'react';
// import { User } from '../../models/user.model';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// export const BasicSearch = () => {
//     const [searchInputValue, setSearchInputValue] = useState('');
//     const [usersData, setUsersData] = useState<User[]>([]);
//     const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//     const [searchParams, setSearchParams] = useSearchParams();
//     const navigate = useNavigate();

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/users');
//             const data = await response.json();
//             setUsersData(data);
//             console.log(data);
//             setFilteredUsers(data);

//             const searchQuery = searchParams.get('search');
//             if (searchQuery) {
//                 basicSearch(searchQuery);
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     //search
//     const handleBasicSearch = () => {
//         const term = searchInputValue.toLowerCase();
//         const filtered = usersData.filter((user) => {
//             const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
//             const id = user.id.toLowerCase();
//             return fullName.includes(term) || id === term;
//         });

//         setFilteredUsers(filtered);
//         setSearchParams({ search: searchInputValue });

//         if (filtered.length === 0) {
//             navigate('/notFound', {
//                 state: {
//                     reason: `No users found matching "${searchInputValue}"`,
//                 },
//             });
//         }
//     };

//     const basicSearch = (searchTerm: string) => {
//         const term = searchTerm.toLowerCase();
//         const filtered = usersData.filter((user) => {
//             const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
//             const id = user.id.toLowerCase();
//             return fullName.includes(term) || id === term;
//         });
//         setFilteredUsers(filtered);
//         setSearchParams({ search: searchTerm });
//     };
// };
