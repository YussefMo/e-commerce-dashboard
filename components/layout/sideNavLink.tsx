import Link from 'next/link';

function SideNavLink({
  icon,
  title,
  href = '/',
  type = 'link',
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  type?: 'link' | 'button';
  onClick?: () => void;
}) {
  if (type === 'link') {
    return (
      <Link href={href} className="flex w-full flex-row py-1">
        {icon} <p className="ml-3 font-medium">{title}</p>
      </Link>
    );
  }

  return (
    <button className="flex w-full flex-row py-1" onClick={onClick}>
      {icon} <p className="ml-3 font-medium">{title}</p>
    </button>
  );
}

export default SideNavLink;
