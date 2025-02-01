import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path: string = request.nextUrl.pathname;

    const isPucblicPath: boolean = path === '/login' || path === '/signup';

    const token: string = request.cookies.get('token')?.value || '';

    if (!isPucblicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    if (isPucblicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:id*',
        '/login',
        '/signup',

    ],
}