'use client';

import { signOut } from '@/lib/action/auth.action';
import {
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  ReceiptText,
  Settings,
  ShoppingBasket
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from '../icons/logo';
import SideNavLink from './sideNavLink';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle
} from '@/components/UI/sheet';
import { Button } from '@/components/UI/button';

function SideNav({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const navLinks = (
    <>
      <SideNavLink
        href="/"
        icon={
          <LayoutDashboard className={pathName === '/' ? 'text-icon' : ''} />
        }
        title="Dashboard"
        active={pathName === '/'}
      />
      <SideNavLink
        href="/products"
        icon={
          <ShoppingBasket
            className={pathName === '/products' ? 'text-icon' : ''}
          />
        }
        title="Products"
        active={pathName === '/products'}
      />
      <SideNavLink
        href="/orders"
        icon={
          <ReceiptText className={pathName === '/orders' ? 'text-icon' : ''} />
        }
        title="Orders"
        active={pathName === '/orders'}
      />
      <SideNavLink
        href="/messages"
        icon={<Mail className={pathName === '/messages' ? 'text-icon' : ''} />}
        title="Messages"
        active={pathName === '/messages'}
      />
      <SideNavLink
        href="/settings"
        icon={
          <Settings className={pathName === '/settings' ? 'text-icon' : ''} />
        }
        title="Settings"
        active={pathName === '/settings'}
      />
      <SideNavLink
        type="button"
        icon={<LogOut />}
        title="Logout"
        href={''}
        onClick={async () => {
          await signOut();
        }}
      />
    </>
  );

  const nav = [
    {
      href: '/',
      icon: <LayoutDashboard className={pathName === '/' ? 'text-icon' : ''} />,
      title: 'Dashboard',
      active: pathName === '/'
    },
    {
      href: '/products',
      icon: (
        <ShoppingBasket
          className={pathName === '/products' ? 'text-icon' : ''}
        />
      ),
      title: 'Products',
      active: pathName === '/products'
    },
    {
      href: '/orders',
      icon: (
        <ReceiptText className={pathName === '/orders' ? 'text-icon' : ''} />
      ),
      title: 'Orders',
      active: pathName === '/orders'
    },
    {
      href: '/messages',
      icon: <Mail className={pathName === '/messages' ? 'text-icon' : ''} />,
      title: 'Messages',
      active: pathName === '/messages'
    },
    {
      href: '/settings',
      icon: (
        <Settings className={pathName === '/settings' ? 'text-icon' : ''} />
      ),
      title: 'Settings',
      active: pathName === '/settings'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="bg-sidebar-primary text-sidebar-text fixed top-0 bottom-0 left-0 z-890 hidden h-[100dvh] w-67 flex-col justify-between pt-8 pb-8 pl-6 lg:flex">
        <div>
          <Logo width="107" hight="30" />
          <div className="mt-18 flex flex-col flex-wrap gap-3">{navLinks}</div>
        </div>
        <div>{children}</div>
      </aside>

      {/* Mobile/Tablet Sheet Sidebar */}
      <div className="fixed top-4 left-4 z-880 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-sidebar-primary text-sidebar-text z-890 flex w-[250px] flex-col justify-between p-6 sm:w-[300px]"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div>
              <SheetClose asChild>
                <Logo width="107" hight="30" />
              </SheetClose>
              <div className="mt-18 flex flex-col flex-wrap gap-3">
                {nav.map((link) => (
                  <SideNavLink {...link} key={link.href} />
                ))}
                <SheetClose asChild>
                  <SideNavLink
                    type="button"
                    icon={<LogOut />}
                    title="Logout"
                    href={''}
                    onClick={async () => {
                      await signOut();
                    }}
                  />
                </SheetClose>
              </div>
            </div>
            <SheetClose asChild>
              <div>{children}</div>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default SideNav;
