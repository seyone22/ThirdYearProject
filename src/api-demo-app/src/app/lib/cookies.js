// lib/cookies.js
import jwt from 'jsonwebtoken';

// Function to verify and extract user data from JWT token
const verifyTokenAndGetUser = (cookieStore) => {
    // Extract the token from cookies
    const token = cookieStore.get('token');

    if (!token) {
        throw new Error("Authentication token is missing");
    }
    // Verify the token and extract the user data
    try {
        return jwt.verify(token.value, process.env.TOKEN_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

export default verifyTokenAndGetUser;
