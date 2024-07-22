// src/middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname

    // Define paths that are considered public (accessible without a token)
    const isPublicPath = path === '/'
    const isLoginPath = path === '/auth/login'

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value || ''
    const type = request.cookies.get('type')?.value || ''

    // Redirect logic based on the path and token presence
    if((isPublicPath) && token) {
        // If trying to access a public path with a token, redirect to the home page
        if (type === process.env.ADMIN_GUID) {
            return NextResponse.redirect(new URL('/admin', request.nextUrl))
        } else if (type === process.env.PARTNER_GUID) {
            return NextResponse.redirect(new URL('/partner', request.nextUrl))
        }
    }

    // Redirect logic based on the path and token presence
    if(path === "/" && token) {
        // If trying to access a public path with a token, redirect to the home page
        if (type === process.env.ADMIN_GUID) {
            return NextResponse.redirect(new URL('/admin', request.nextUrl))
        } else if (type === process.env.PARTNER_GUID) {
            return NextResponse.redirect(new URL('/partner', request.nextUrl))
        }
    }

    if(path.startsWith('/login')) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }

    if (type === process.env.ADMIN_GUID && path.startsWith('/partner')) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }

    if (type === process.env.PARTNER_GUID && path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }

// If trying to access a protected path without a token, redirect to the login page
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }
}

// Specify pages to execute on
export const config = {
    matcher: [
        '/',
        '/admin',
    ]
}