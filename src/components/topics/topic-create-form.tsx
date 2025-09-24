'use client';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { startTransition, useActionState } from 'react';

import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-medium">Create New Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter topic name"
              aria-label="Topic name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter topic description"
              aria-label="Topic description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            {formState.errors._form && (
              <div className="p-2 bg-red-200 border border-red-600 rounded">
                {formState.errors._form?.join(', ')}
              </div>
            )}
            <FormButton isLoading={isPending}>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
