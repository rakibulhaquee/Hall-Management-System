// DOM Elements
const bookingForm = document.getElementById('booking-form');
const hallSelect = document.getElementById('hall-select');
const bookingDate = document.getElementById('booking-date');
const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
const confirmationModal = document.getElementById('confirmation-modal');
const printConfirmationBtn = document.getElementById('print-confirmation');
const newBookingBtn = document.getElementById('new-booking');

// Sample hall data (would normally come from an API)
const halls = [
    { id: 1, name: "Grand Ballroom" },
    { id: 2, name: "Conference Hall A" },
    { id: 3, name: "Conference Hall B" },
    { id: 4, name: "Seminar Room" },
    { id: 5, name: "Outdoor Pavilion" }
];

// Initialize hall select options
function initHallSelect() {
    if (!hallSelect) return;
    
    halls.forEach(hall => {
        const option = document.createElement('option');
        option.value = hall.id;
        option.textContent = hall.name;
        hallSelect.appendChild(option);
    });
}

// Handle form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const hallId = hallSelect.value;
        const hallName = hallSelect.options[hallSelect.selectedIndex].text;
        const date = bookingDate.value;
        const start = startTime.value;
        const end = endTime.value;
        const eventName = document.getElementById('event-name').value;
        const eventDesc = document.getElementById('event-description').value;
        const attendees = document.getElementById('attendees').value;
        const requirements = document.getElementById('additional-requirements').value;
        
        // Simple validation
        if (!hallId || !date || !start || !end || !eventName || !attendees) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (start >= end) {
            alert('End time must be after start time');
            return;
        }
        
        // In a real app, you would make an API call to book the hall
        console.log('Booking submitted:', { 
            hallId, date, start, end, eventName, eventDesc, attendees, requirements 
        });
        
        // Show confirmation
        showConfirmation({
            hallName,
            date,
            start,
            end,
            eventName,
            attendees,
            bookingRef: 'B' + Math.floor(Math.random() * 1000000)
        });
    });
}

// Show booking confirmation
function showConfirmation(booking) {
    if (!confirmationModal) return;
    
    const confirmationDetails = document.getElementById('confirmation-details');
    confirmationDetails.innerHTML = `
        <div class="confirmation-item">
            <div class="confirmation-label">Booking Reference:</div>
            <div class="confirmation-value">${booking.bookingRef}</div>
        </div>
        <div class="confirmation-item">
            <div class="confirmation-label">Hall:</div>
            <div class="confirmation-value">${booking.hallName}</div>
        </div>
        <div class="confirmation-item">
            <div class="confirmation-label">Date:</div>
            <div class="confirmation-value">${formatDate(booking.date)}</div>
        </div>
        <div class="confirmation-item">
            <div class="confirmation-label">Time:</div>
            <div class="confirmation-value">${formatTime(booking.start)} - ${formatTime(booking.end)}</div>
        </div>
        <div class="confirmation-item">
            <div class="confirmation-label">Event:</div>
            <div class="confirmation-value">${booking.eventName}</div>
        </div>
        <div class="confirmation-item">
            <div class="confirmation-label">Attendees:</div>
            <div class="confirmation-value">${booking.attendees}</div>
        </div>
    `;
    
    confirmationModal.style.display = 'block';
}

// Format date as DD/MM/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
}

// Format time as HH:MM
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

// Event Listeners
if (printConfirmationBtn) {
    printConfirmationBtn.addEventListener('click', () => {
        window.print();
    });
}

if (newBookingBtn) {
    newBookingBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
        bookingForm.reset();
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initHallSelect();
    
    // Set default date to today and min date
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.value = today;
        bookingDate.min = today;
    }
    
    // Set sensible default times
    if (startTime && endTime) {
        startTime.value = '09:00';
        endTime.value = '17:00';
    }
    
    // Check if coming from hall details page with a hall pre-selected
    const urlParams = new URLSearchParams(window.location.search);
    const hallId = urlParams.get('hallId');
    
    if (hallId && hallSelect) {
        hallSelect.value = hallId;
    }
});