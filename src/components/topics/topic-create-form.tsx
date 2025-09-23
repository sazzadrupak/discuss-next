import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';

import * as actions from '@/actions';

export default function TopicCreateForm() {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={actions.createTopic}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-medium">Create New Topic</h3>
            <Input
              label="Name"
              labelPlacement="outside"
              placeholder="Enter topic title"
              aria-label="Topic title"
            />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Enter topic description"
              aria-label="Topic description"
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
