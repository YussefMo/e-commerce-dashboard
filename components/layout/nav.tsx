import { Bell, CirclePlus, Mail, Search } from 'lucide-react';
import ThemeToggle from '../UI/themeToggle';
import Image from 'next/image';
import Link from 'next/link';

function Nav() {
  return (
    <header className="bg-sidebar-primary-foreground fixed top-0 right-0 left-67 flex items-center justify-between max-lg:left-0">
      <div className="px-3 py-4">
        <form className="bg-primary flex items-center gap-2 rounded-sm border px-3 py-2">
          <Search className="text-icon" />
          <input type="text" placeholder="Search Here" />
        </form>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link href="/add-product" className="flex cursor-pointer gap-3">
          <CirclePlus className="fill-icon text-white" />
          <span className="text-icon">Add New Product</span>
        </Link>
        <div className="ml-[25px] flex h-[74px] items-center gap-3 rounded-bl-4xl bg-linear-to-br from-[#7927FF] to-[#440398] pr-[24px] pl-[45px] dark:from-[#344257] dark:to-[#15191E]">
          <Link href="/messages">
            <Mail className="cursor-pointer text-white" />
          </Link>
          <Bell className="cursor-pointer text-white" />
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
