'use client';
import { useSession } from 'next-auth/react';

/* From the client component, the session will have the data property and it might be null or has user information */
export default function Profile() {
  const session = useSession();

  console.log('Client session:', session);
  if (session.data?.user) {
    return <div>From client: user is signed in</div>;
  }
  return <div>From client: user is not signed in</div>;
}
