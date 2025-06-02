import AdminUser from '@/components/settings/AdminUser';
import ReadOnlyUser from '@/components/settings/ReadOnlyUser';
import UpdateUser from '@/components/settings/UpdateUser';

function Page() {
  return (
    <>
      <ReadOnlyUser />
      <AdminUser />
      <UpdateUser />
    </>
  );
}

export default Page;
