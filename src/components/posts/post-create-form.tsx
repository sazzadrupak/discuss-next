'use client';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { useActionState } from 'react';

import * as actions from '@/actions';
import FormButton from '../common/form-button';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  console.log('PostCreateForm', slug);
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-medium">Create New Post</h3>
            <Input
              name="title"
              placeholder="Post Title"
              label="title"
              labelPlacement="outside"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              name="content"
              placeholder="Content"
              label="content"
              labelPlacement="outside"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />
            {formState.errors._form && (
              <div className="p-2 bg-red-200 border border-red-600 rounded">
                {formState.errors._form?.join(', ')}
              </div>
            )}
            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
