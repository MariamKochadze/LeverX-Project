import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../../public/index.scss';
import { User, UserFormData } from '../../models/user.model';
import { isAuthenticatedUser } from '../../shared/authenticateUser';
import { search } from '../../helpers/advanced-search';
import { Header } from '../../components/header/header';
import workingIcon from '@assets/working-icon.svg';
import noteIcon from '@assets/note-icon.svg';
import gridIcon from '@assets/grid-icon.svg';
import listIcon from '@assets/list-icon.svg';
import serachicon from '@assets/search-icon.svg';
import nameIcon from '@assets/name-icon.svg';
import photoIcon from '@assets/photo-icon.svg';

const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [usersData, setUsersData] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [searchInputValue, setSearchInputValue] = useState('');

    useEffect(() => {
        if (!isAuthenticatedUser()) {
            navigate('/signin');
            return;
        }
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            setUsersData(data);
            
            setFilteredUsers(data);

            const searchQuery = searchParams.get('search');
            if (searchQuery) {
                basicSearch(searchQuery);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    //search
    
    const handleBasicSearch = () => {
        const term = searchInputValue.toLowerCase();
        const filtered = usersData.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const id = user.id.toLowerCase();
            return fullName.includes(term) || id === term;
        });

        setFilteredUsers(filtered);
        setSearchParams({ search: searchInputValue });

        if (filtered.length === 0) {
            navigate('/notFound', {
                state: {
                    reason: `No users found matching "${searchInputValue}"`,
                },
            });
        }
    };

    const basicSearch = (searchTerm: string) => {
        const term = searchTerm.toLowerCase();
        const filtered = usersData.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            const id = user.id.toLowerCase();
            return fullName.includes(term) || id === term;
        });
        setFilteredUsers(filtered);
        setSearchParams({ search: searchTerm });
    };

    const advancedSearch = (formData: UserFormData) => {
        const filtered = search(formData, usersData);
        setFilteredUsers(filtered);

        const params = new URLSearchParams(searchParams);
        Object.entries(formData).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setSearchParams(params);
        if (filtered.length === 0) {
            navigate('/notFound', {
                state: {
                    reason: `No users found `,
                },
            });
        }
    };

    const UserCard: React.FC<{ user: User }> = ({ user }) => {
        const navigate = useNavigate();
        const avatarSrc = require(`@assets/${user.user_avatar.split('/').pop()}`);

        const handleCardClick = (userId: string) => {
            navigate(`/user-details/${userId}`);
        };

        return (
            <div className="card" onClick={() => handleCardClick(user.id)}>
                <div className="card-header">
                    <div className="avatar-container">
                        <img src={avatarSrc} alt={`${user.first_name}'s Avatar`} className="avatar" />
                    </div>
                    <div className="user-info">
                        <h3 className="name">{`${user.first_name} ${user.last_name}`}</h3>
                    </div>
                </div>
                <hr className="divider" />
                <div className="details">
                    <div className="detail-row">
                        <img src={workingIcon} alt="Department Icon" className="info-icon" />
                        <span className="detail-text">{user.department}</span>
                    </div>
                    <div className="detail-row">
                        <img src={noteIcon} alt="Room Icon" className="info-icon" />
                        <span className="detail-text">{user.room}</span>
                    </div>
                </div>
            </div>
        );
    };

    const ViewToggle: React.FC = () => (
        <div className="view-options">
            <button
                className={`view-toggle ${viewType === 'grid' ? 'active' : ''}`}
                onClick={() => setViewType('grid')}
            >
                <img src={gridIcon} alt="Grid View Icon" className="view-icon" />
            </button>
            <button
                className={`view-toggle ${viewType === 'list' ? 'active' : ''}`}
                onClick={() => setViewType('list')}
            >
                <img src={listIcon} alt="List View Icon" className="view-icon" />
            </button>
        </div>
    );

    return (
        <div>
            <Header />
            <main className="main">
                <aside className="main__search">
                    <input type="radio" id="basic-search" name="search-type" defaultChecked />
                    <input type="radio" id="advanced-search" name="search-type" />
                    <div className="search-header">
                        <label htmlFor="basic-search" className="search-toggle">
                            Basic Search
                        </label>
                        <label htmlFor="advanced-search" className="search-toggle">
                            Advanced Search
                        </label>
                    </div>
                    <div className="search-body">
                        <div className="search-options" id="basic-options">
                            <div className="basic-search">
                                <div className="input-container">
                                    <img className="search-icon" src={serachicon} alt="Search icon" />
                                    <input
                                        type="text"
                                        id="basic-input"
                                        placeholder="John Smith"
                                        value={searchInputValue}
                                        onChange={(e) => setSearchInputValue(e.target.value)}
                                    />
                                    <button type="button" className="search-btn" onClick={handleBasicSearch}>
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="search-options" id="advanced-options">
                            <form
                                className="advanced-search"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    advancedSearch(Object.fromEntries(formData));
                                }}
                            >
                                <div className="input-container">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" placeholder="John Smith" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" placeholder="john.smith@leverex.com" />
                                </div>
                                <div className="input-container half-width">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" name="phone" placeholder="Phone number" />
                                </div>
                                <div className="input-container half-width">
                                    <label htmlFor="skype">Skype</label>
                                    <input type="text" id="skype" name="skype" placeholder="SkypeID" />
                                </div>
                                <div className="input-container building-room">
                                    <div className="building">
                                        <label htmlFor="building">Building</label>
                                        <select id="building" name="building">
                                            <option value="any">Any</option>
                                            <option value="building1">Pilsudskiego 69 (Poland)</option>
                                            <option value="building2">Pilsudskiego 68 (Poland)</option>
                                            <option value="building3">Pilsudskiego 67 (Poland)</option>
                                            <option value="building4">Pilsudskiego 66 (Poland)</option>
                                            <option value="building5">Pilsudskiego 65 (Poland)</option>
                                            <option value="building6">Pilsudskiego 64 (Poland)</option>
                                            <option value="building7">Pilsudskiego 63 (Poland)</option>
                                            <option value="building8">Pilsudskiego 62 (Poland)</option>
                                            <option value="building9">Pilsudskiego 61 (Poland)</option>
                                        </select>
                                    </div>
                                    <div className="room">
                                        <label htmlFor="room">Room</label>
                                        <select id="room" name="room">
                                            <option value="any">Any</option>
                                            <option value="room1">1404</option>
                                            <option value="room2">1405</option>
                                            <option value="room3">1406</option>
                                            <option value="room4">1407</option>
                                            <option value="room5">1408</option>
                                            <option value="room6">1409</option>
                                            <option value="room7">1410</option>
                                            <option value="room8">1411</option>
                                            <option value="room9">1412</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="department">Department</label>
                                    <select id="department" name="department">
                                        <option value="any">Any</option>
                                        <option value="dept">Web & Mobile</option>
                                    </select>
                                </div>
                                <div className="input-container">
                                    <button type="submit" className="search-btn">
                                        SEARCH
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </aside>
                <section className="main__users">
                    <div className="users--header">
                        <div className="users-count-container">
                            <span className="users-count">{filteredUsers.length} employees displayed</span>
                            <ViewToggle />
                        </div>
                        <div className="info-container">
                            <p>
                                <img src={photoIcon} alt="photo icon" />
                                Photo
                            </p>
                            <p>
                                <img src={nameIcon} alt="name icon" />
                                Name
                            </p>
                            <p>
                                <img src={workingIcon} alt="working icon" />
                                Department
                            </p>
                            <p>
                                <img src={noteIcon} alt="room icon" />
                                Room
                            </p>
                        </div>
                    </div>
                    <div className="users-body">
                        <div className={`users-view ${viewType}-view`}>
                            {filteredUsers.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UsersPage;
