import React from 'react';
import { recommendedCourses } from '../data/mockData';

const RecommendedSection: React.FC = () => {
  return (
    <div className="recommended-section">
      <div className="section-header">
        <h2 className="section-title">Recommended for you</h2>
        <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); alert('Viewing all recommended courses'); }}>View all</a>
      </div>

      <div className="recommended-cards">
        {recommendedCourses.map((course) => (
          <div key={course.id} className="course-card">
            <span className={`course-tag ${course.tagClass}`}>{course.tag}</span>
            <div className="lesson-count">{course.lessons} lessons</div>
            <h3 className="card-title">{course.title}</h3>
            <p className="card-description">{course.description}</p>
            <button
              className="learn-more-btn"
              onClick={() => alert(`Learning more about: ${course.title}`)}
            >
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;
