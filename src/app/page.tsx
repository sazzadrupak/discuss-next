import * as actions from '@/actions';
import { auth } from '@/auth';
import { Button } from '@nextui-org/react';

import Profile from '@/components/profile';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {/* From the server component, the session might be null or has user information */}
      {session?.user ? (
        <div>
          <h2>Welcome, {session.user.name}</h2>
          <p>User ID: {session.user.id}</p>
        </div>
      ) : (
        <h2>Please sign in</h2>
      )}
      <Profile />
    </div>
  );
}
