'use client';

import * as actions from '@/actions';
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={actions.search}>
      <Input
        placeholder="Search topics..."
        aria-label="Search topics"
        className="w-[300px]"
        name="term"
        defaultValue={searchParams.get('term') || ''}
      />
    </form>
  );
}
