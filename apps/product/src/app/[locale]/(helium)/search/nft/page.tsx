import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import NFTSearchPageView from '@/app/shared/explore-courses';
import NFTDrawer from '@/app/shared/explore-courses/courses-drawer';

const pageHeader = {
  title: 'Search & Filters',
  breadcrumb: [
    {
      name: 'Pages',
    },
    {
      href: routes.searchAndFilter.realEstate,
      name: 'Search & Filters',
    },
    {
      name: 'NFT',
    },
  ],
};

export default function NFTPage() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <NFTDrawer />
      </PageHeader>
      <NFTSearchPageView />
    </div>
  );
}
