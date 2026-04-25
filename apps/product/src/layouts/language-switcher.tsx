"use client";
import RUFlagIcon from "@core/components/icons/language/RUFlag";
import UZFlagIcon from "@core/components/icons/language/UZFlag";
import USFlagIcon from "@core/components/icons/language/USFlag";
import { Select } from "rizzui";
import cn from "@core/utils/class-names";
import { useLocale } from "next-intl";
import { JSX, useState, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

type LocaleOptionsType = {
  label: string;
  value: Locale;
  icon: ({ ...props }: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const localeOptions = [
  {
    label: 'English - EN',
    value: 'en',
    icon: USFlagIcon,
  },
  {
    label: 'Uzbek - UZ',
    value: 'uz',
    icon: UZFlagIcon,
  },
  {
    label: 'Russian - RU',
    value: 'ru',
    icon: RUFlagIcon,
  },
];

export default function LanguageSwitcher({
  className,
  iconClassName,
  selectClassName,
}: {
  className?: string;
  iconClassName?: string;
  selectClassName?: string;
}) {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [_, startTransition] = useTransition();
  const selectedLocale = localeOptions.filter(
    (item) => item.value.toLowerCase() === locale.toLowerCase()
  );
  const [selected, setSelected] = useState(selectedLocale[0]);

  function handleChange(op: LocaleOptionsType) {
    setSelected(op);
    startTransition(() => {
      router.replace(`${pathname}`, { locale: op.value });
    });
  }

  return (
    <Select
      size="sm"
      value={selected}
      className={cn("w-auto", className)}
      onChange={handleChange}
      options={localeOptions}
      dropdownClassName="w-40"
      suffixClassName={iconClassName}
      selectClassName={cn(
        "ring-0 border-none shadow backdrop-blur-md dark:bg-gray-100",
        selectClassName
      )}
      displayValue={(op: LocaleOptionsType) => renderDisplayValue(op)}
      getOptionDisplayValue={(op: LocaleOptionsType) =>
        renderOptionDisplayValue(op)
      }
    />
  );
}

function renderDisplayValue(op: LocaleOptionsType) {
  const Icon = op.icon;
  return <>{Icon && <Icon className="size-5" />}</>;
}

function renderOptionDisplayValue(op: LocaleOptionsType) {
  const Icon = op.icon;
  return (
    <div className="flex items-center gap-3">
      {Icon && <Icon className="size-5" />}
      <span>{op.label}</span>
    </div>
  );
}
