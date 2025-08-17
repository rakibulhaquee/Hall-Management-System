// DOM Elements
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeBtns = document.querySelectorAll('.close');

// Show Login Modal
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });
}

// Show Signup Modal
if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'block';
    });
}

// Close Modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
        
        // Close other modals if they exist on the page
        const otherModals = document.querySelectorAll('.modal');
        otherModals.forEach(modal => {
            if (modal.id !== 'login-modal' && modal.id !== 'signup-modal') {
                modal.style.display = 'none';
            }
        });
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Forgot Password Link
const forgotPassword = document.getElementById('forgot-password');
if (forgotPassword) {
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset link will be sent to your email.');
    });
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.querySelector('footer p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2023', currentYear);
    }
    
    // Active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});