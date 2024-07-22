import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import {getUser} from "@/services/userService";

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        //check if user exists
        const regex = new RegExp(email, 'i'); // 'i' flag for case-insensitive search
        const user = await getUser(regex)
        console.log(user)

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

//create token data
// A JavaScript object (tokenData) is created to store essential user 
// information. In this case, it includes the user's unique identifier (id), 
// username, and email.

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            type: user.type
        }

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        let type = ''

        if(user.type === 'admin') {
            type = process.env.ADMIN_GUID
        } else if (user.type === 'partner') {
            type = process.env.PARTNER_GUID
        }

        // Create a JSON response indicating successful login
        const response = NextResponse.json({
            message: "Login successful",
            type: user.type,
            success: true,
        })

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day in seconds
        })

        response.cookies.set("type", type, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day in seconds
        })

        response.cookies.set("id", user._id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
        })

        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}