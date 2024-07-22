import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import verifyTokenAndGetUser from "@/app/lib/cookies";
import {insertSelectedRecommendations} from "@/app/services/recommenderService";

export async function POST(req) {
    try {
        const cookieStore = cookies()
        const user = verifyTokenAndGetUser(cookieStore)

        const reqBody = await req.json()
        const { selectedRecommendations, bookName } = reqBody

        // Approve the given artwork
        const result = await insertSelectedRecommendations(selectedRecommendations, bookName)

        // Send a response indicating success
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}