import React, { useState } from 'react';
import { scheduleEvents } from '../data/mockData';
import type { ScheduleEvent } from '../data/mockData';

const ScheduleSection: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<ScheduleEvent | null>(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const times = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  const getEvent = (day: string, time: string): ScheduleEvent | undefined => {
    return scheduleEvents.find(e => e.day === day && e.time === time);
  };

  const handleCellClick = (event: ScheduleEvent) => {
    if (activeEvent === event) {
      setActiveEvent(null);
    } else {
      setActiveEvent(event);
    }
  };

  return (
    <div className="schedule-section">
      <div className="schedule-header">
        <h2 className="schedule-title">Current week schedule</h2>
        <p className="schedule-subtitle">Click on any time slot to view instructor details</p>
      </div>

      <div className={`schedule-grid ${activeEvent ? 'has-active' : ''}`}>
        <div className="schedule-time-header"></div>
        {times.map(time => (
          <div key={time} className="schedule-time-header">{time}</div>
        ))}

        {days.map(day => (
          <React.Fragment key={day}>
            <div className="schedule-day-label">{day}</div>
            {times.map(time => {
              const event = getEvent(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  className={`schedule-cell ${event ? 'has-event' : ''}`}
                  onClick={() => event && handleCellClick(event)}
                >
                  {event && (
                    <>
                      <div className={`time-slot ${event.color} ${activeEvent === event ? 'active' : ''}`}></div>
                      {activeEvent === event && (
                        <div className="instructor-card show" onClick={(e) => e.stopPropagation()}>
                          <div className="instructor-header">
                            <img src={event.avatar} alt={event.instructor} className="instructor-avatar" />
                            <div className="instructor-info">
                              <div className="instructor-name">{event.instructor}</div>
                              <div className="instructor-subject">{event.subject}</div>
                            </div>
                          </div>
                          <button
                            className="contact-btn"
                            onClick={() => alert(`Contacting ${event.instructor.split(' ')[0]}...`)}
                          >
                            Contact {event.instructor.split(' ')[0]}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {activeEvent && (
        <div className="schedule-overlay show" onClick={() => setActiveEvent(null)}></div>
      )}
    </div>
  );
};

export default ScheduleSection;
