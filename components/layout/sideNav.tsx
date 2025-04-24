import {
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  ShoppingBasket
} from 'lucide-react';
import Image from 'next/image';
import Logo from '../icons/logo';
import SideNavLink from './sideNavLink';

function SideNav() {
  return (
    <aside className="bg-sidebar-primary text-sidebar-text flex h-[100dvh] w-67 flex-col justify-between pt-8 pb-8 pl-6">
      <div>
        <Logo width="107" hight="30" />
        <div className="mt-18 flex flex-col flex-wrap gap-3">
          <SideNavLink href="/" icon={<LayoutDashboard />} title="Dashboard" />
          <SideNavLink
            href="/products"
            icon={<ShoppingBasket />}
            title="Products"
          />
          <SideNavLink href="/messages" icon={<Mail />} title="Messages" />
          <SideNavLink href="/settings" icon={<Settings />} title="Settings" />
          <SideNavLink
            type="button"
            icon={<LogOut />}
            title="Logout"
            href={''}
          />
        </div>
      </div>
      <div>
        <span className="flex w-full flex-row">
          <Image
            className="mr-3"
            src="/Ellipse 2.png"
            alt="user"
            width={54}
            height={54}
          />
          <span className="flex flex-col">
            <h2 className="text-2xl font-medium">Ayesha</h2>
            <p>someone@email.com</p>
          </span>
        </span>
      </div>
    </aside>
  );
}

export default SideNav;
