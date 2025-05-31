// Function to handle student sign up
function handleSignUp() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) { // Check if the signup form exists on the current page
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission (page reload)

            const email = signupForm['signupEmail'].value;
            const password = signupForm['signupPassword'].value;
            const confirmPassword = signupForm['confirmPassword'].value;

            console.log('Attempting to sign up with Email:', email); // Log the action [cite: 30]

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                console.error('Signup failed: Passwords do not match.'); // Log the error [cite: 30]
                return;
            }

            auth.createUserWithEmailAndPassword(email, password)
                .then((cred) => {
                    // User successfully created in Firebase Authentication
                    console.log('User signed up successfully:', cred.user.email); // Log success [cite: 30]
                    alert('Account created successfully! Please login.');

                    // Optional: Store additional user details in Firestore
                    return db.collection('students').doc(cred.user.uid).set({
                        email: email,
                        // Add any other initial student details you collect here
                        createdAt: firebase.firestore.FieldValue.serverTimestamp() // Timestamp
                    });
                })
                .then(() => {
                    console.log('Student details saved to Firestore.'); // Log database action [cite: 30]
                    window.location.href = 'index.html'; // Redirect to login page after successful signup
                })
                .catch((error) => {
                    // Handle errors during sign up
                    console.error('Signup error:', error.message); // Log the error [cite: 30]
                    alert('Error signing up: ' + error.message);
                });
        });
    }
}

// Function to handle student login
function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) { // Check if the login form exists on the current page
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission (page reload)

            const email = loginForm['email'].value;
            const password = loginForm['password'].value;

            console.log('Attempting to log in with Email:', email); // Log the action [cite: 30]

            auth.signInWithEmailAndPassword(email, password)
                .then((cred) => {
                    // User successfully logged in
                    console.log('User logged in successfully:', cred.user.email); // Log success [cite: 30]
                    alert('Login successful!');
                    // Redirect to a student dashboard or career selection page
                    window.location.href = 'career-selection.html'; // We'll create this next
                })
                .catch((error) => {
                    // Handle errors during login
                    console.error('Login error:', error.message); // Log the error [cite: 30]
                    alert('Error logging in: ' + error.message);
                });
        });
    }
}

// Execute the functions based on which page is loaded
// This ensures the correct event listener is attached
document.addEventListener('DOMContentLoaded', () => {
    // These functions will only attach listeners if the respective form IDs exist on the page
    handleSignUp();
    handleLogin();
});

// Optional: Add Firebase authentication state observer to check if user is logged in
// This is useful for protecting routes or showing different content
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        console.log('Auth state changed: User is signed in:', user.email); // Log auth state [cite: 30]
        // You might want to redirect to a dashboard if they land on login/signup page while already logged in
    } else {
        // User is signed out.
        console.log('Auth state changed: User is signed out.'); // Log auth state [cite: 30]
    }
});