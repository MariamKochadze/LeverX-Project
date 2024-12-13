import React from 'react';

const UsersPage = () => {
    return (
        <div>
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
                        {/* Basic Search */}
                        <div className="search-options" id="basic-options">
                            <div className="basic-search">
                                <div className="input-container">
                                    <img className="search-icon" src="./assets/search-icon.svg" alt="Search icon" />
                                    <input type="text" id="basic-input" placeholder="John Smith" />
                                    <button type="button" className="search-btn">
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Search */}
                        <div className="search-options" id="advanced-options">
                            <form className="advanced-search">
                                <div className="input-container">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="John Smith" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="john.smith@leverex.com" />
                                </div>
                                <div className="input-container half-width">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" placeholder="Phone number" />
                                </div>
                                <div className="input-container half-width">
                                    <label htmlFor="skype">Skype</label>
                                    <input type="text" id="skype" placeholder="SkypeID" />
                                </div>
                                <div className="input-container building-room">
                                    <div className="building">
                                        <label htmlFor="building">Building</label>
                                        <select id="building">
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
                                        <select id="room">
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
                                    <select id="department">
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
                            <span className="users-count">0 employees displayed</span>
                            <div className="view-options"></div>
                        </div>
                        <div className="info-container">
                            <p>
                                <img src="./assets/photo-icon.svg" alt="photo icon" />
                                Photo
                            </p>
                            <p>
                                <img src="./assets/name-icon.svg" alt="name icon" />
                                Name
                            </p>
                            <p>
                                <img src="./assets/working-icon.svg" alt="working icon" />
                                Department
                            </p>
                            <p>
                                <img src="./assets/note-icon.svg" alt="room icon" />
                                Room
                            </p>
                        </div>
                    </div>
                    <div className="users-body"></div>
                </section>
            </main>
        </div>
    );
};

export default UsersPage;
