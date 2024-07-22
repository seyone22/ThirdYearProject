import {NextResponse} from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import verifyTokenAndGetUser from "@/lib/cookies";
import {deleteUser, getAllUsers, toggleAdmin} from "@/services/userService";

export async function GET(req) {
    try {
        const cookieStore = cookies();
        const user = verifyTokenAndGetUser(cookieStore)

        // Get non secure user data from DB
        const userData = await getAllUsers()

        // Send a response indicating success
        return NextResponse.json(userData, {status: 200})
    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function DELETE(req) {
    try {
        const cookieStore = cookies();
        const user = verifyTokenAndGetUser(cookieStore)

        const reqBody = await req.json()
        const { userId } = reqBody

        if(user.type !== "admin") {
            return NextResponse.json({error: "Forbidden for user"}, {status: 403})
        }

        if(user.id === userId) {
            return NextResponse.json({error: "Trying to delete self"}, {status: 400})
        }
        const operation = await deleteUser(userId)
        if (operation === {}) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }


        return NextResponse.json({operation: operation}, {status:200})
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}

export async function PATCH(req) {
    try {
        const cookieStore = cookies();
        const user = verifyTokenAndGetUser(cookieStore)

        const reqBody = await req.json()
        const { userId } = reqBody

        console.log("Passed checks")

        if(user.type !== "admin") {
            return NextResponse.json({error: "Forbidden for user"}, {status: 403})
        }

        if(user.id === userId) {
            return NextResponse.json({error: "Trying to delete self"}, {status: 400})
        }

        console.log("Passed checks")

        const operation = await toggleAdmin(userId)

        if (operation === {}) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }
        return NextResponse.json({operation: operation}, {status:200})
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}

