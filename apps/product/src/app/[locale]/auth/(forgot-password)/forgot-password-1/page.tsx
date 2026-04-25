import ForgetPasswordForm from './forget-password-form';
import UnderlineShape from '@core/components/shape/underline';
import Image from 'next/image';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';
export const metadata = {
  ...metaObject('Reset Password'),
};
export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          Reset your{' '}
          <span className="relative inline-block">
            password!
            <UnderlineShape className="absolute -bottom-2 end-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      bannerTitle="The simplest way to manage your workspace."
      bannerDescription=""
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[720px]">
          <Image
            src={
              'https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp'
            }
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <ForgetPasswordForm />
    </AuthWrapperOne>
  );
}
