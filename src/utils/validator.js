export const validateSignInData=(data) => {
    const { email, password } = data;
    if (!email || !password) {
        return { valid: false, message: 'Email and password are required.' };
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password); // Password must be at least 6 characters with required complexity
    if (!emailRegex) {
        return { valid: false, message: 'Invalid email format.' };
    }
    if (!passwordValid) {
        return { valid: false, message: 'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.' };
    }
    return { valid: true, message: 'Data is valid.' };
}