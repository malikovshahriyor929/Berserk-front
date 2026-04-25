'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PiEye, PiEyeSlash, PiSpinnerGap, PiWarningCircle } from 'react-icons/pi';

const schema = z.object({
  email: z.string().email("To'g'ri email kiriting"),
  password: z.string().min(1, 'Parol kiritilishi shart'),
});

type FormValues = z.infer<typeof schema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setServerError(
          result.error === 'CredentialsSignin'
            ? "Email yoki parol noto'g'ri"
            : result.error
        );
      } else {
        window.location.href = '/';
      }
    } catch {
      setServerError('Serverga ulanishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Server error */}
      {serverError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <PiWarningCircle className="mt-0.5 shrink-0 text-lg text-red-500" />
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="email@example.com"
          disabled={isLoading}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50 disabled:opacity-70
            ${errors.email
              ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400'
              : 'border-gray-200 focus:border-[#112855] focus:ring-1 focus:ring-[#112855]'
            }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Parol
        </label>
        <div className="relative">
          <input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isLoading}
            className={`w-full rounded-xl border px-4 py-3 pr-11 text-sm outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50 disabled:opacity-70
              ${errors.password
                ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-gray-200 focus:border-[#112855] focus:ring-1 focus:ring-[#112855]'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? (
              <PiEyeSlash className="text-lg" />
            ) : (
              <PiEye className="text-lg" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#112855] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B1E40] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <PiSpinnerGap className="animate-spin text-lg" />
            Kirish...
          </>
        ) : (
          'Kirish'
        )}
      </button>
    </form>
  );
}
