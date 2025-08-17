document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');
        const emailError = document.getElementById('login-email-error');
        const passwordError = document.getElementById('login-password-error');
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Reset errors
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        
        // Validate email
        if (!patterns.email.test(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return;
        }
        
        // Validate password
        if (password.value.trim().length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            return;
        }
        
        // Find user (simulated - replace with actual API call)
        const user = users.find(u => u.email === email.value.trim() && u.password === password.value.trim());
        
        if (user) {
            // Success - redirect to index.html
            alert('Login successful! Redirecting...');
            window.location.href = 'index.html';
            
            // In a real app, you would:
            // 1. Store the auth token
            // 2. Set user session
            // 3. Handle "remember me" functionality
        } else {
            passwordError.textContent = 'Invalid email or password';
            passwordError.style.display = 'block';
        }
    });
    
    // Forgot password link
    const forgotPassword = document.getElementById('forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset functionality would be implemented here');
        });
    }
});