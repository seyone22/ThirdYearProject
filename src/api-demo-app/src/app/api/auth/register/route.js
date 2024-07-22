import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Connect to MongoDB Database
dbConnect()

export async function POST(request){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {name, email, password, type} = reqBody
// Parses the request body to extract username, email, and password.

//Checks if a user with the provided email already exists.
        const user = await User.findOne({email})
//If yes, returns a 400 response.
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
//hash password using bcryptjs.
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            email: email,
            password: hashedPassword,
            name: name,
            type: type
        })
// Saves the new user to the database.js.
        const savedUser = await newUser.save()
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}