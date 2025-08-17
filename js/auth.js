// Login Form Submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // In a real app, you would make an API call here
        console.log('Login attempt with:', { email, password });

        // Simulate successful login
        setTimeout(() => {
            alert('Login successful! Redirecting...');
            document.getElementById('login-modal').style.display = 'none';
            // Update UI to show logged in state
            const loginBtn = document.getElementById('login-btn');
            const signupBtn = document.getElementById('signup-btn');

            if (loginBtn && signupBtn) {
                loginBtn.textContent = 'Logout';
                loginBtn.id = 'logout-btn';
                signupBtn.style.display = 'none';

                // Add logout functionality
                document.getElementById('logout-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    // Clear any user data
                    localStorage.removeItem('user');
                    // Reset UI
                    loginBtn.textContent = 'Login';
                    loginBtn.id = 'login-btn';
                    signupBtn.style.display = 'inline-block';
                    window.location.href = 'index.html';
                });
            }

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({ email }));

            // Redirect or update UI
            window.location.href = 'index.html';
        }, 1000);
    });
}

// Signup Form Submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const department = document.getElementById('signup-department').value;
        const phone = document.getElementById('signup-phone').value;

        // Simple validation
        if (!name || !email || !password || !department || !phone) {
            alert('Please fill in all fields');
            return;
        }

        // Check if email is valid
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        // In a real app, you would make an API call here
        console.log('Signup attempt with:', { name, email, password, department, phone });

        // Simulate successful signup
        setTimeout(() => {
            alert('Registration successful! You can now login.');
            document.getElementById('signup-modal').style.display = 'none';
        }, 1000);
    });
}

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('user');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    if (user && loginBtn && signupBtn) {
        const userData = JSON.parse(user);
        loginBtn.textContent = 'Logout';
        loginBtn.id = 'logout-btn';
        signupBtn.style.display = 'none';

        // Add logout functionality
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            // Clear user data
            localStorage.removeItem('user');
            // Reset UI
            loginBtn.textContent = 'Login';
            loginBtn.id = 'login-btn';
            signupBtn.style.display = 'inline-block';
            window.location.href = 'index.html';
        });
    }
   // Simple user database (in a real app, use a real database)
// Shared validation patterns
const patterns = {
    name: /^[a-zA-Z\s]{3,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
};

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    // Lowercase check
    if (/[a-z]/.test(password)) strength++;
    // Uppercase check
    if (/[A-Z]/.test(password)) strength++;
    // Number check
    if (/\d/.test(password)) strength++;
    // Special char check
    if (/[@$!%*?&]/.test(password)) strength++;
    
    return strength;
}

// Update password strength UI
function updatePasswordStrength(password) {
    const strength = checkPasswordStrength(password);
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    
    strengthBars.forEach((bar, index) => {
        bar.style.background = index < strength ? 
            getStrengthColor(strength) : '#ddd';
    });
    
    if (strengthText) {
        strengthText.textContent = getStrengthText(strength);
        strengthText.style.color = getStrengthColor(strength);
    }
}

function getStrengthColor(strength) {
    switch(strength) {
        case 0:
        case 1: return '#e74c3c'; // Red
        case 2: return '#f39c12'; // Orange
        case 3: return '#f1c40f'; // Yellow
        case 4: 
        case 5: return '#2ecc71'; // Green
        default: return '#ddd';
    }
}

function getStrengthText(strength) {
    switch(strength) {
        case 0: return 'Very Weak';
        case 1: return 'Weak';
        case 2: return 'Fair';
        case 3: return 'Good';
        case 4: return 'Strong';
        case 5: return 'Very Strong';
        default: return '';
    }
}

// Shared user data (in a real app, use a database)
const users = [];

// Initialize auth pages
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('signup-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
        });
    }
});

});

