import Image from 'next/image';
import SignInForm from './sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '@core/components/shape/underline';
import logoImg from '@public/logo-tashabbus-blue.png';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign In'),
};

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          Welcome back! Please{' '}
          <span className="relative inline-block">
            Sign in to
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          continue.
        </>
      }
      description=""
      bannerTitle='"Prezident Iqtidorli Farzandlari" Milliy dasturi'
      bannerDescription=""
      isSocialLoginActive={false}
      pageImage={
        <div className="relative mx-auto aspect-[4/3] w-[500px] xl:w-[720px]">
          <Image
            src={logoImg}
            alt="Sign Up Thumbnail"
            fill
            priority
            className="object-contain"
          />
        </div>
      }
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
