import Link from 'next/link';

function SideNavLink({
  icon,
  title,
  href = '/',
  type = 'link',
  onClick,
  active = false,
  prefetch = false
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  type?: 'link' | 'button';
  onClick?: () => void;
  active?: boolean;
  prefetch?: boolean;
}) {
  if (type === 'link') {
    return (
      <Link
        href={href}
        className={`flex w-full flex-row py-1 ${active ? 'border-icon border-r-7' : ''}`}
        prefetch={prefetch}
      >
        {icon} <p className="ml-3 font-medium">{title}</p>
      </Link>
    );
  }

  return (
    <button
      className="flex w-full cursor-pointer flex-row py-1"
      onClick={onClick}
    >
      {icon} <p className="ml-3 font-medium">{title}</p>
    </button>
  );
}

export default SideNavLink;
