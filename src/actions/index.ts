'use server';

import * as auth from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signIn() {
  return auth.signIn('github');
}

export async function signOut() {
  await auth.signOut();
  revalidatePath('/');
  redirect('/');
}
