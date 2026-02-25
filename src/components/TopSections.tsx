import React from 'react';
import Calendar from './Calendar';
import Reviews from './Reviews';

const TopSections: React.FC = () => {
  return (
    <div className="top-sections-container">
      <Calendar />
      <Reviews />
    </div>
  );
};

export default TopSections;
