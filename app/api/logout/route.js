import { cookies } from 'next/headers';

export async function GET() {
  cookies().set('token', '', { maxAge: 0 });
  return Response.json({ message: "Logged out" });
}
