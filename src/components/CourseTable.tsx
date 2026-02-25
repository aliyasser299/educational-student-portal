import React from 'react';
import type { Course } from '../data/mockData';
import CourseRow from './CourseRow';

interface CourseTableProps {
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  const handleAction = (courseName: string) => {
    alert(`Opening: ${courseName}`);
  };

  return (
    <div className="course-table">
      <div className="table-header">
        <div>Course</div>
        <div>Instructor</div>
        <div>Duration</div>
        <div>Progress</div>
        <div>Students</div>
        <div></div>
      </div>

      {courses.map((course) => (
        <CourseRow key={course.id} course={course} onAction={handleAction} />
      ))}

      <div className="pagination">
        <button className="page-btn">◀</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">...</button>
        <button className="page-btn">▶</button>
      </div>
    </div>
  );
};

export default CourseTable;
