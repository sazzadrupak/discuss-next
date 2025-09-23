import {
  Avatar,
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import Link from 'next/link';

import * as actions from '@/actions';
import { auth } from '@/auth';

export default async function Header() {
  const session = await auth();

  let authContent: React.ReactNode;
  if (session?.user) {
    authContent = (
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Avatar
            src={session.user.image || ''}
            alt={session.user.name || ''}
            className="cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button
                type="submit"
                color="primary"
                variant="flat"
                className="w-full"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input
            placeholder="Search topics..."
            aria-label="Search topics"
            className="w-[300px]"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}
