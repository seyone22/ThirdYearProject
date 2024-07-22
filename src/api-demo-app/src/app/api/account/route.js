import {NextResponse} from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import verifyTokenAndGetUser from "@/lib/cookies";
import {getUserData, updateUser} from "@/services/userService";

export async function GET(req) {
    try {
        const cookieStore = cookies();

        const user = verifyTokenAndGetUser(cookieStore)

        // Get non secure user data from DB
        const userData = await getUserData(user.id)

        // Send a response indicating success
        return NextResponse.json(userData, {status: 200})
    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function PUT(req, res) {
    try {
        const reqBody = await req.json();
        const { id, oldPassword, newPassword, name, email } = reqBody;

        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const userId = cookieStore.get('id');

        // Extract the token from cookies
        if (!token) {
            return NextResponse.json({error: "Authentication token is missing"}, {status: 401});
        }

        // Verify if submitted userId and self userID are the same
        if (userId.value !== id) {
            console.log(userId.value)
            console.log(id)
            return NextResponse.json({error: "Access denied, not your account"}, {status: 403})
        }

        // Verify the token and extract the user data
        let user;
        try {
            user = jwt.verify(token.value, process.env.TOKEN_SECRET);
        } catch (error) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 401});
        }

        // Update
        const result = await updateUser(id, oldPassword, newPassword, name, email);

        // Send a response indicating success
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}