import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protected routes
  const protectedRoutes = ['/dashboard']

  // Check if the requested route is protected
  if (protectedRoutes.includes(pathname)) {
    const token = req.cookies.get('access_token')?.value

    if (!token) {
      // If no token, redirect to the login page
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const verifyUrl = 'http://localhost:8080/api/posts'

    return fetch(verifyUrl, {
      method: 'GET',
      headers: {
        cookie: `access_token=${token}`,  
      },
    })
      .then((response) => {
        if (response.ok) {
          // If the token is valid, allow the request to continue
          return NextResponse.next()
        } else {
          // If token verification fails, redirect to login
          return NextResponse.redirect(new URL('/login', req.url))
        }
      })
      .catch((error) => {
        // In case of any error (e.g., network issue), redirect to login
        console.error('Error verifying token:', error)
        return NextResponse.redirect(new URL('/login', req.url))
      })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard',
}
