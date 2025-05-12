import { Bell, CirclePlus, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '../UI/themeToggle';

function Nav() {
  return (
    <header className="bg-sidebar-primary-foreground fixed top-0 right-0 left-67 z-80 flex items-center justify-between border border-b-2 max-lg:left-0">
      <div className="px-3 py-4"></div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link href="/add-product" className="flex cursor-pointer gap-3">
          <CirclePlus className="fill-icon text-white" />
          <span className="text-icon">Add New Product</span>
        </Link>
        <div className="ml-[25px] flex h-[74px] items-center gap-3 rounded-bl-4xl bg-linear-to-br from-[#7927FF] to-[#440398] pr-[24px] pl-[45px] max-sm:gap-1 max-sm:px-1 dark:from-[#344257] dark:to-[#15191E]">
          <Link href="/messages">
            <Mail className="cursor-pointer text-white max-sm:hidden" />
          </Link>
          <Bell className="cursor-pointer text-white max-sm:hidden" />
          <Image
            className="mr-3 ml-[33px] cursor-pointer rounded-md"
            src="/profile.svg"
            alt="user profile picture"
            width={33}
            height={33}
          />
        </div>
      </div>
    </header>
  );
}

export default Nav;
