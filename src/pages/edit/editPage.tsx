import React from 'react';
import './edit.scss';

const EditPage = () => {
    return (
        <div className="edit__body">
            <main className="edit__main-container">
                <div className="setting__header">
                    <h1 className="setting__header-desc">ROLES & PERMISSION</h1>
                </div>
                <div className="edit__desc">
                    <div className="input-container">
                        <img className="search-icon" src="../../assets/search-icon.svg" alt="Search icon" />
                        <input type="text" id="input__search" placeholder="Type to Search" />
                    </div>

                    <div className="setting__user-list"></div>
                </div>
            </main>
            <script type="module" src="../../../dist/edit.bundle.js"></script>
        </div>
    );
};

export default EditPage;
