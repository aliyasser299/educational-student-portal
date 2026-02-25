import React, { useState } from 'react';
import CourseTable from './CourseTable';
import { courses } from '../data/mockData';

const CoursesDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('In progress');

  const filteredCourses = activeTab === 'All'
    ? courses
    : courses.filter(course => course.status === activeTab);

  const tabs = ['All', 'In progress', 'Completed'];

  return (
    <div className="courses-section">
      <div className="courses-header">
        <h1 className="courses-title">Courses</h1>
        <div className="course-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-row">
        <button className="filter-btn" onClick={() => alert('Filter options would appear here')}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </span>
          <span>Filters</span>
          <span>▼</span>
        </button>
        <div className="sort-section">
          <span style={{ color: '#666', fontSize: '14px' }}>Sort by:</span>
          <button className="sort-dropdown" onClick={() => alert('Sort options would appear here')}>
            <span>Duration</span>
            <span>▼</span>
          </button>
        </div>
      </div>

      <CourseTable courses={filteredCourses} />
    </div>
  );
};

export default CoursesDashboard;
