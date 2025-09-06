"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome {session.user.name}</p>
        <img src={session.user.image} width={40} style={{ borderRadius: "50%" }} />
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  return <button onClick={() => signIn("google")}>Login with Google</button>;
}
