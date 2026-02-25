import React, { useState } from 'react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2016, 11, 1)); // December 2016
  const [selectedDay, setSelectedDay] = useState(22);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Simplified calendar grid for the specific design
  const days = [
    { day: '', class: 'other-month' },
    { day: '', class: 'other-month' },
    { day: '', class: 'other-month' },
    { day: '', class: 'other-month' },
    { day: '1', class: '' },
    { day: '2', class: '' },
    { day: '3', class: '' },
    { day: '4', class: '' },
    { day: '5', class: 'has-event' },
    { day: '6', class: 'has-event' },
    { day: '7', class: '' },
    { day: '8', class: '' },
    { day: '9', class: '' },
    { day: '10', class: '' },
    { day: '11', class: '' },
    { day: '12', class: 'has-event' },
    { day: '13', class: '' },
    { day: '14', class: '' },
    { day: '15', class: '' },
    { day: '16', class: '' },
    { day: '17', class: '' },
    { day: '18', class: '' },
    { day: '19', class: '' },
    { day: '20', class: '' },
    { day: '21', class: '' },
    { day: '22', class: 'has-event' },
    { day: '23', class: '' },
    { day: '24', class: '' },
    { day: '25', class: '' },
    { day: '26', class: '' },
    { day: '27', class: '' },
    { day: '28', class: '' },
    { day: '29', class: '' },
    { day: '30', class: '' },
    { day: '31', class: '' },
  ];

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <h3 className="calendar-title">Schedule session</h3>
        <div className="calendar-nav">
          <button className="calendar-nav-btn" onClick={handlePrevMonth}>‹</button>
          <span className="calendar-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button className="calendar-nav-btn" onClick={handleNextMonth}>›</button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-day-header">S</div>
        <div className="calendar-day-header">M</div>
        <div className="calendar-day-header">T</div>
        <div className="calendar-day-header">W</div>
        <div className="calendar-day-header">T</div>
        <div className="calendar-day-header">F</div>
        <div className="calendar-day-header">S</div>

        {days.map((item, index) => (
          <div
            key={index}
            className={`calendar-day ${item.class} ${item.day === selectedDay.toString() && !item.class.includes('other-month') ? 'selected' : ''}`}
            onClick={() => item.day && !item.class.includes('other-month') && setSelectedDay(parseInt(item.day))}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
