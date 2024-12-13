import React from 'react';

interface ViewToggleProps {
  viewType: 'grid' | 'list';
  setViewType: (type: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewType, setViewType }) => {
  return (
    <div className="view-options">
      <button
        className={`view-toggle ${viewType === 'grid' ? 'active' : ''}`}
        onClick={() => setViewType('grid')}
      >
        <img src="./assets/grid-icon.svg" alt="Grid View Icon" className="view-icon" />
      </button>
      <button
        className={`view-toggle ${viewType === 'list' ? 'active' : ''}`}
        onClick={() => setViewType('list')}
      >
        <img src="./assets/list-icon.svg" alt="List View Icon" className="view-icon" />
      </button>
    </div>
  );
};

export default ViewToggle;
