'use client';

import { Button, PinCode } from 'rizzui';
import { Form } from '@core/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { Link } from '@/i18n/routing';
import { routes } from '@/config/routes';
type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-10">
          <PinCode
            variant="outline"
            setValue={(value) => setValue('otp', String(value))}
            size="lg"
            className="lg:justify-start"
          />
          <Link
            href={routes.auth.signIn1}
          >
            <Button
              className="w-full mt-10 text-base font-medium"
              type="submit"
              size="lg"
            >
              Verify OTP
            </Button>
          </Link>
          <div className="">
            <Button
              className="-mt-4 w-full p-0 text-base font-medium text-primary underline lg:inline-flex lg:w-auto"
              type="submit"
              variant="text"
            >
              Resend OTP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}
