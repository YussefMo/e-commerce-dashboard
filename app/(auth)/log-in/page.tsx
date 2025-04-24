import Logo from '@/components/icons/logo';
import { LoginForm } from '@/components/login-form';
import Image from 'next/image';

function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[3fr_2fr]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo width='107' hight='30' />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block bg-linear-to-bl from-[#7927FF] to-[#440398]">
        <Image src='/Opior.svg' alt='shape' width={410} height={409} className='absolute left-[-6rem]' />
      </div>
    </div>
  );
}

export default Page;
