document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('signup-name');
        const email = document.getElementById('signup-email');
        const password = document.getElementById('signup-password');
        const confirmPassword = document.getElementById('signup-confirm-password');
        const department = document.getElementById('signup-department');
        
        // Get error elements
        const nameError = document.getElementById('signup-name-error');
        const emailError = document.getElementById('signup-email-error');
        const passwordError = document.getElementById('signup-password-error');
        const confirmPasswordError = document.getElementById('signup-confirm-password-error');
        const departmentError = document.getElementById('signup-department-error');
        
        // Reset errors
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        departmentError.style.display = 'none';
        
        // Validate name
        if (!patterns.name.test(name.value.trim())) {
            nameError.textContent = 'Please enter a valid name (3-30 characters)';
            nameError.style.display = 'block';
            return;
        }
        
        // Validate email
        if (!patterns.email.test(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return;
        }
        
        // Check if email already exists
        if (users.some(u => u.email === email.value.trim())) {
            emailError.textContent = 'Email already registered';
            emailError.style.display = 'block';
            return;
        }
        
        // Validate password
        if (!patterns.password.test(password.value)) {
            passwordError.textContent = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character';
            passwordError.style.display = 'block';
            return;
        }
        
        // Validate password match
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.style.display = 'block';
            return;
        }
        
        // Validate department
        if (!department.value) {
            departmentError.textContent = 'Please select a department';
            departmentError.style.display = 'block';
            return;
        }
        
        // Create new user (simulated - replace with actual API call)
        const newUser = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value,
            department: department.value
        };
        
        users.push(newUser);
        
        // Success - redirect to login page
        alert('Account created successfully! Please login.');
        window.location.href = 'login.html';
    });
});