'use client';

import { signOut } from '@/lib/action/auth.action';
import {
  LayoutDashboard,
  LogOut,
  Mail,
  ReceiptText,
  Settings,
  ShoppingBasket
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from '../icons/logo';
import SideNavLink from './sideNavLink';

function SideNav({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <aside className="bg-sidebar-primary text-sidebar-text fixed top-0 bottom-0 left-0 z-20 flex h-[100dvh] w-67 flex-col justify-between pt-8 pb-8 pl-6 max-lg:hidden">
      <div>
        <Logo width="107" hight="30" />
        <div className="mt-18 flex flex-col flex-wrap gap-3">
          <SideNavLink
            href="/"
            icon={
              <LayoutDashboard
                className={pathName === '/' ? 'text-icon' : ''}
              />
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
            prefetch={true}
            title="Products"
            active={pathName === '/products'}
          />
          <SideNavLink
            href="/orders"
            icon={
              <ReceiptText
                className={pathName === '/orders' ? 'text-icon' : ''}
              />
            }
            title="Orders"
            active={pathName === '/orders'}
          />
          <SideNavLink
            href="/messages"
            icon={
              <Mail className={pathName === '/messages' ? 'text-icon' : ''} />
            }
            title="Messages"
            active={pathName === '/messages'}
          />
          <SideNavLink
            href="/settings"
            icon={
              <Settings
                className={pathName === '/settings' ? 'text-icon' : ''}
              />
            }
            title="Settings"
            active={pathName === '/settings'}
          />
          <SideNavLink
            type="button"
            icon={<LogOut />}
            title="Logout"
            href={''}
            onClick={signOut}
          />
        </div>
      </div>
      <div>{children}</div>
    </aside>
  );
}

export default SideNav;
