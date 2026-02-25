import React from 'react';
import type { Course } from '../data/mockData';

interface CourseRowProps {
  course: Course;
  onAction: (name: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = React.memo(({ course, onAction }) => {
  return (
    <div className="course-row">
      <div className="course-name">{course.name}</div>
      <div className="teacher-info">
        <img src={course.instructorAvatar} alt="Teacher" className="teacher-avatar" />
        <span className="teacher-name">{course.instructor}</span>
      </div>
      <div className="duration">{course.duration}</div>
      <div className="progress-info">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="progress-text">{course.completedLessons}/{course.totalLessons}</span>
          <span className="progress-percentage">({course.progress}%)</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>
      <div className="students-avatars">
        {course.students.map((student, index) => (
          <img key={index} src={student.avatar} alt="Student" className="student-avatar" />
        ))}
        <div className="more-students">+{course.moreStudents}</div>
      </div>
      <button
        className="action-btn"
        onClick={() => onAction(course.name)}
      >
        {course.status === 'Completed' ? 'Complete' : 'Continue'}
      </button>
    </div>
  );
});

export default CourseRow;
