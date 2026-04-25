import AdvisorProfile from '@/app/shared/profile/advisor-profile';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Profile'),
};

export default function ProfilePage() {
  return (
    <AdvisorProfile />
  );
}
