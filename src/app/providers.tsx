'use client';

import { NextUIProvider } from '@nextui-org/react';
// this is for checking if a user is signed in from the client component
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>{' '}
    </SessionProvider>
  );
}
