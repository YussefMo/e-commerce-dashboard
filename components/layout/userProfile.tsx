import Image from 'next/image';
import { getCurrentUser } from '@/lib/action/auth.action';

async function UserProfile() {
  const user = await getCurrentUser();

  if (!user) {
    // Handle the case where the user is not found or not logged in
    // You might want to return null or a placeholder, or redirect
    return null;
  }

  return (
    <span className="flex w-full flex-row">
      <Image
        className="mr-3 rounded-full"
        src="/profile.svg"
        alt="user profile picture"
        width={54}
        height={54}
      />
      <span className="flex flex-col">
        <h2 className="text-2xl font-medium">{user.name}</h2>
        <p>{user.email}</p>
      </span>
    </span>
  );
}

export default UserProfile;
