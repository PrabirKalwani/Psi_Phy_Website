import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const protectedRoutes = ['/dashboard']

  if (protectedRoutes.includes(pathname)) {
    const token = req.cookies.get('access_token')?.value

    if (!token) {
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
          return NextResponse.next()
        } else {
          return NextResponse.redirect(new URL('/login', req.url))
        }
      })
      .catch((error) => {
        console.error('Error verifying token:', error)
        return NextResponse.redirect(new URL('/login', req.url))
      })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard',
}
