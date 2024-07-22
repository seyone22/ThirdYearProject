import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const authenticateUser = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return NextResponse.json({ error: "Authentication token is missing" }, { status: 401 });
    }

    try {
        const user = jwt.verify(token.value, process.env.TOKEN_SECRET);
        return user;
    } catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
};
