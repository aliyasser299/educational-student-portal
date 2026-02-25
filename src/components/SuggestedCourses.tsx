import React from 'react';
import { suggestedCourses } from '../data/mockData';
import SuggestedCourseItem from './SuggestedCourseItem';

const SuggestedCourses: React.FC = () => {
  const [activePeriod, setActivePeriod] = React.useState('week');

  const handleMenuClick = (name: string) => {
    alert(`Options for ${name}`);
  };

  return (
    <div className="top-learners-section">
      <div className="learners-header">
        <div className="learners-title-group">
          <h2 className="learners-title">Suggested Courses</h2>
          <span className="learners-count"><strong>32 hours</strong>, duration in average</span>
        </div>
        <div className="learners-toggle">
          <button
            className={`toggle-btn ${activePeriod === 'week' ? 'active' : ''}`}
            onClick={() => setActivePeriod('week')}
          >
            Week
          </button>
          <button
            className={`toggle-btn ${activePeriod === 'month' ? 'active' : ''}`}
            onClick={() => setActivePeriod('month')}
          >
            Month
          </button>
        </div>
      </div>

      <div className="learners-list">
        {suggestedCourses.map((course) => (
          <SuggestedCourseItem key={course.id} course={course} onMenuClick={handleMenuClick} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedCourses;
