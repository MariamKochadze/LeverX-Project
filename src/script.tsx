import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../public/index.scss';

import { User, UserFormData } from './models/user.model';
import { search } from './helpers/advanced-search';

import { isAuthenticatedUser } from './shared/authenticateUser';

interface SearchProps {
  onBasicSearch: (searchTerm: string) => void;
  onAdvancedSearch: (formData: UserFormData) => void;
}

const BasicSearchForm: React.FC<SearchProps> = ({ onBasicSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="basic-search">
      <input
        id="basic-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onBasicSearch(searchTerm)}
      />
      <button onClick={() => onBasicSearch(searchTerm)}>Search</button>
    </div>
  );
};

const AdvancedSearchForm: React.FC<SearchProps> = ({ onAdvancedSearch }) => {
  const [formData, setFormData] = useState<UserFormData>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdvancedSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="advanced-search">
      <input
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit">Advanced Search</button>
    </form>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersData, setUsersData] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

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
  };

  const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <div className="card" onClick={() => navigate(`/users/${user.id}`)}>
      <div className="card-header">
        <div className="avatar-container">
          <img
            src={user.user_avatar}
            alt={`${user.first_name}'s Avatar`}
            className="avatar"
          />
        </div>
        <div className="user-info">
          <h3 className="name">{`${user.first_name} ${user.last_name}`}</h3>
        </div>
      </div>
      <hr className="divider" />
      <div className="details">
        <div className="detail-row">
          <img
            src="/assets/working-icon.svg"
            alt="Department Icon"
            className="info-icon"
          />
          <span className="detail-text">{user.department}</span>
        </div>
        <div className="detail-row">
          <img
            src="/assets/note-icon.svg"
            alt="Room Icon"
            className="info-icon"
          />
          <span className="detail-text">{user.room}</span>
        </div>
      </div>
    </div>
  );

  const ViewToggle: React.FC = () => (
    <div className="view-options">
      <button
        className={`view-toggle ${viewType === 'grid' ? 'active' : ''}`}
        onClick={() => setViewType('grid')}
      >
        <img
          src="/assets/grid-icon.svg"
          alt="Grid View Icon"
          className="view-icon"
        />
      </button>
      <button
        className={`view-toggle ${viewType === 'list' ? 'active' : ''}`}
        onClick={() => setViewType('list')}
      >
        <img
          src="/assets/list-icon.svg"
          alt="List View Icon"
          className="view-icon"
        />
      </button>
    </div>
  );

  return (
    <div className="home-page">
      <main>
        <div className="search-container">
          <BasicSearchForm
            onBasicSearch={basicSearch}
            onAdvancedSearch={advancedSearch}
          />
          <AdvancedSearchForm
            onBasicSearch={basicSearch}
            onAdvancedSearch={advancedSearch}
          />
        </div>
        <ViewToggle />
        <div className="users-count">
          {filteredUsers.length} employees displayed
        </div>
        <div className={`users-view ${viewType}-view`}>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
};
