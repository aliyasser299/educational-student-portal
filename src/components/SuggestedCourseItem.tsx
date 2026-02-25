import React from 'react';
import type { SuggestedCourse } from '../data/mockData';

interface SuggestedCourseItemProps {
  course: SuggestedCourse;
  onMenuClick: (name: string) => void;
}

const SuggestedCourseItem: React.FC<SuggestedCourseItemProps> = React.memo(({ course, onMenuClick }) => {
  return (
    <div className="learner-item">
      <img src={course.avatar} className="learner-avatar" alt={course.name} />
      <div className="learner-info">
        <div className="learner-name">{course.name}</div>
        <div className="learning-streak">Learning period: {course.period}</div>
      </div>
      <div className="learner-level">
        <span className="level-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
          </svg>
        </span>
        <span>{course.level}</span>
      </div>
      <div className="learner-date">
        <span className="date-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
          </svg>
        </span>
        <span>{course.date}</span>
      </div>
      <div className="learner-progress">
        <div className="progress-circle">
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#f0f0f0" strokeWidth="4" />
            <circle
              cx="20" cy="20" r="16" fill="none" stroke="#14b8a6" strokeWidth="4"
              strokeDasharray="100" strokeDashoffset={100 - course.progress} strokeLinecap="round"
            />
          </svg>
          <span className="progress-percentage">{course.progress}%</span>
        </div>
      </div>
      <button className="learner-menu-btn" onClick={() => onMenuClick(course.name)}>⋮</button>
    </div>
  );
});

export default SuggestedCourseItem;
