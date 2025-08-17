// DOM Elements
const feedbackForm = document.getElementById('feedback-form');
const feedbackModal = document.getElementById('feedback-modal');
const closeFeedbackModal = document.getElementById('close-feedback-modal');

// Sample testimonials data
const testimonials = [
    {
        name: "John Smith",
        rating: 5,
        text: "The hall booking system was incredibly easy to use. I booked our annual conference in minutes!",
        date: "2023-05-15"
    },
    {
        name: "Sarah Johnson",
        rating: 4,
        text: "Great selection of halls and the availability calendar is very helpful. Would be perfect with a mobile app.",
        date: "2023-06-22"
    },
    {
        name: "Michael Brown",
        rating: 5,
        text: "Excellent service from start to finish. The confirmation process was seamless and the staff were very helpful.",
        date: "2023-04-10"
    }
];

// Handle form submission
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('feedback-name').value;
        const email = document.getElementById('feedback-email').value;
        const subject = document.getElementById('feedback-subject').value;
        const message = document.getElementById('feedback-message').value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Check if email is valid
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real app, you would make an API call to submit feedback
        console.log('Feedback submitted:', { name, email, subject, message, rating });
        
        // Show thank you modal
        if (feedbackModal) {
            feedbackModal.style.display = 'block';
        }
        
        // Reset form
        feedbackForm.reset();
        
        // In a real app, you might also add the new testimonial to the display
        // For now we'll just reload the testimonials
        displayTestimonials();
    });
}

// Display testimonials
function displayTestimonials() {
    const container = document.querySelector('.testimonial-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    testimonials.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        const initials = testimonial.name.split(' ').map(n => n[0]).join('');
        
        card.innerHTML = `
            <div class="testimonial-meta">
                <div class="testimonial-avatar">${initials}</div>
                <div>
                    <div class="testimonial-name">${testimonial.name}</div>
                    <div class="testimonial-rating">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
                </div>
            </div>
            <div class="testimonial-text">"${testimonial.text}"</div>
        `;
        
        container.appendChild(card);
    });
}

// Event Listeners
if (closeFeedbackModal) {
    closeFeedbackModal.addEventListener('click', () => {
        feedbackModal.style.display = 'none';
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', displayTestimonials);