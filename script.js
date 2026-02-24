        // Tab switching functionality
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Pagination functionality
        const pageButtons = document.querySelectorAll('.page-btn');
        pageButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (this.textContent !== '◀' && this.textContent !== '▶' && this.textContent !== '...') {
                    pageButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Action button functionality
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', function () {
                const courseName = this.closest('.course-row').querySelector('.course-name').textContent;
                alert(`Opening: ${courseName}`);
            });
        });

        // Learn more button functionality
        const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
        learnMoreButtons.forEach(button => {
            button.addEventListener('click', function () {
                const courseTitle = this.closest('.course-card').querySelector('.card-title').textContent;
                alert(`Learning more about: ${courseTitle}`);
            });
        });

        // Filter button functionality
        const filterButton = document.querySelector('.filter-btn');
        filterButton.addEventListener('click', function () {
            alert('Filter options would appear here');
        });

        // Sort dropdown functionality
        const sortDropdown = document.querySelector('.sort-dropdown');
        sortDropdown.addEventListener('click', function () {
            alert('Sort options would appear here');
        });

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                if (!this.classList.contains('active')) {
                    e.preventDefault();
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        // Top Learners toggle functionality
            const toggleButtons = document.querySelectorAll('.learners-toggle .toggle-btn');
            toggleButtons.forEach(button => {
                button.addEventListener('click', function () {
                    toggleButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const period = this.getAttribute('data-period');
                    console.log(`Switched to ${period} view`);
                    // You can add functionality here to load different data based on the period
                });
            });

            // Learner menu button functionality
            const learnerMenuBtns = document.querySelectorAll('.learner-menu-btn');
            learnerMenuBtns.forEach(button => {
                button.addEventListener('click', function () {
                    const learnerName = this.closest('.learner-item').querySelector('.learner-name').textContent;
                    alert(`Options for ${learnerName}`);
                });
            });
            // Schedule functionality
const scheduleCells = document.querySelectorAll('.schedule-cell.has-event');
const scheduleGrid = document.querySelector('.schedule-grid');
const scheduleOverlay = document.querySelector('.schedule-overlay');
let activeCard = null;

scheduleCells.forEach(cell => {
    cell.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const instructorName = this.getAttribute('data-instructor');
        const instructorSubject = this.getAttribute('data-subject');
        const instructorAvatar = this.getAttribute('data-avatar');
        const timeSlot = this.querySelector('.time-slot');
        
        // If clicking the same cell, close it
        if (activeCard && activeCard.parentElement === this) {
            closeInstructorCard();
            return;
        }
        
        // Close any existing card
        closeInstructorCard();
        
        // Add active state to grid
        scheduleGrid.classList.add('has-active');
        timeSlot.classList.add('active');
        
        // Create and show instructor card
        const card = document.createElement('div');
        card.className = 'instructor-card show';
        card.innerHTML = `
            <div class="instructor-header">
                <img src="${instructorAvatar}" alt="${instructorName}" class="instructor-avatar">
                <div class="instructor-info">
                    <div class="instructor-name">${instructorName}</div>
                    <div class="instructor-subject">${instructorSubject}</div>
                </div>
            </div>
            <button class="contact-btn">Contact ${instructorName.split(' ')[0]}</button>
        `;
        
        this.appendChild(card);
        activeCard = card;
        
        // Show overlay
        scheduleOverlay.classList.add('show');
        
        // Add contact button functionality
        card.querySelector('.contact-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            alert(`Contacting ${instructorName}...`);
        });
    });
});

// Close card when clicking overlay
scheduleOverlay.addEventListener('click', closeInstructorCard);

// Function to close instructor card
function closeInstructorCard() {
    if (activeCard) {
        activeCard.remove();
        activeCard = null;
    }
    
    scheduleGrid.classList.remove('has-active');
    scheduleOverlay.classList.remove('show');
    
    // Remove active class from all time slots
    document.querySelectorAll('.time-slot.active').forEach(slot => {
        slot.classList.remove('active');
    });
}

// Close card when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInstructorCard();
    }
});
// Calendar functionality
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentMonthSpan = document.getElementById('currentMonth');
const calendarDays = document.querySelectorAll('.calendar-day:not(.calendar-day-header)');

let currentDate = new Date(2016, 11, 1); // December 2016

function updateCalendar() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    currentMonthSpan.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

prevMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Calendar day selection
calendarDays.forEach(day => {
    day.addEventListener('click', function() {
        if (!this.classList.contains('calendar-day-header') && !this.classList.contains('other-month')) {
            calendarDays.forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
        }
    });
});

// Add review button
document.querySelector('.add-review-btn').addEventListener('click', function() {
    alert('Add review functionality');
});

// Review navigation
const reviewArrows = document.querySelectorAll('.review-arrow-btn');
const reviewsList = document.querySelector('.reviews-list');

reviewArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
        const scrollAmount = this.textContent === '›' ? 300 : -300;
        reviewsList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});