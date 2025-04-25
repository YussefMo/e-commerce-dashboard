import {
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  ShoppingBasket
} from 'lucide-react';
import { Suspense } from 'react';
import Logo from '../icons/logo';
import SideNavLink from './sideNavLink';
import UserProfile from './userProfile';
import UserProfileSkeleton from './userProfileSkeleton';
import { signOut } from '@/lib/action/auth.action';

function SideNav() {
  return (
    <aside className="bg-sidebar-primary text-sidebar-text fixed top-0 bottom-0 left-0 z-20 flex h-[100dvh] w-67 flex-col justify-between pt-8 pb-8 pl-6 max-lg:hidden">
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
            onClick={signOut}
          />
        </div>
      </div>
      <div>
        <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfile />
        </Suspense>
      </div>
    </aside>
  );
}

export default SideNav;
