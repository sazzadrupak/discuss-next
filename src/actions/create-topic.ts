'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import paths from '@/paths';
import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    // the reason to put _form here is to avoid accidentally colliding with any form field names
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const result = createTopicSchema.safeParse({ name, description });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a topic'],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['An unknown error occurred'],
        },
      };
    }
  }

  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
