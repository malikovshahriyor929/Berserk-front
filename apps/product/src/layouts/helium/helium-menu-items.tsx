import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  PiAirplaneTilt,
  PiApplePodcastsLogo,
  PiArrowsOut,
  PiArrowsOutLineHorizontalBold,
  PiBellSimpleRinging,
  PiBinoculars,
  PiBriefcase,
  PiBrowser,
  PiCalendarDuotone,
  PiCalendarPlus,
  PiCaretCircleUpDown,
  PiChartBar,
  PiChartLineUp,
  PiChartPieSlice,
  PiChatCenteredDots,
  PiClipboardText,
  PiCodesandboxLogoDuotone,
  PiCreditCard,
  PiCurrencyCircleDollarFill,
  PiCurrencyDollar,
  PiEnvelopeSimpleOpen,
  PiFeather,
  PiFolder,
  PiFolderLock,
  PiFolderUser,
  PiGridFour,
  PiHammer,
  PiHeadset,
  PiHourglassSimple,
  PiHouseLine,
  PiListNumbers,
  PiLockKey,
  PiMapPinLine,
  PiNewspaperClippingDuotone,
  PiNoteBlank,
  PiPackage,
  PiPokerChip,
  PiPresentationChart,
  PiPushPinDuotone,
  PiRocketLaunch,
  PiScales,
  PiShapes,
  PiShapesBold,
  PiShapesDuotone,
  PiShieldCheck,
  PiShootingStar,
  PiShoppingCart,
  PiSparkleDuotone,
  PiSquaresFour,
  PiStack,
  PiStairs,
  PiSteps,
  PiTable,
  PiUser,
  PiUserCircle,
  PiUserGear,
  PiUserPlus,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.dashboard,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'Executive',
  //   href: routes.executive.dashboard,
  //   icon: <PiBriefcase />,
  // },
  // {
  //   name: 'Project',
  //   href: routes.project.dashboard,
  //   icon: <PiClipboardText />,
  // },
  // {
  //   name: 'CRM',
  //   href: routes.crm.dashboard,
  //   icon: <PiFolderUser />,
  // },
  // {
  //   name: 'Affiliate',
  //   href: routes.affiliate.dashboard,
  //   icon: <PiChartPieSlice />,
  // },
  // {
  //   name: 'Store Analytics',
  //   href: routes.storeAnalytics.dashboard,
  //   icon: <PiPresentationChart />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Bidding',
  //   href: routes.bidding.dashboard,
  //   icon: <PiScales />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Social Media',
  //   href: routes.socialMedia.dashboard,
  //   icon: <PiSparkleDuotone />,
  // },
  // {
  //   name: 'Job Board',
  //   href: routes.jobBoard.dashboard,
  //   icon: <PiShapes />,
  // },
  // {
  //   name: 'Financial',
  //   href: routes.financial.dashboard,
  //   icon: <PiCurrencyCircleDollarFill />,
  // },
  // {
  //   name: 'Logistics',
  //   href: routes.logistics.dashboard,
  //   icon: <PiPackage />,
  // },
  // {
  //   name: 'E-Commerce',
  //   href: routes.eCommerce.dashboard,
  //   icon: <PiShoppingCart />,
  // },
  // {
  //   name: 'Analytics',
  //   href: routes.analytics,
  //   icon: <PiChartBar />,
  // },
  // {
  //   name: 'Support',
  //   href: routes.support.dashboard,
  //   icon: <PiHeadset />,
  // },
  // {
  //   name: 'Podcast',
  //   href: routes.podcast.dashboard,
  //   icon: <PiApplePodcastsLogo />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'E-Commerce',
  //   href: '#',
  //   icon: <PiShoppingCart />,
  //   dropdownItems: [
  //     {
  //       name: 'Products',
  //       href: routes.eCommerce.products,
  //       badge: '',
  //     },
  //     {
  //       name: 'Product Details',
  //       href: routes.eCommerce.productDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Product',
  //       href: routes.eCommerce.createProduct,
  //     },
  //     {
  //       name: 'Edit Product',
  //       href: routes.eCommerce.ediProduct(DUMMY_ID),
  //     },
  //     {
  //       name: 'Categories',
  //       href: routes.eCommerce.categories,
  //     },
  //     {
  //       name: 'Create Category',
  //       href: routes.eCommerce.createCategory,
  //     },
  //     {
  //       name: 'Edit Category',
  //       href: routes.eCommerce.editCategory(DUMMY_ID),
  //     },
  //     {
  //       name: 'Orders',
  //       href: routes.eCommerce.orders,
  //     },
  //     {
  //       name: 'Order Details',
  //       href: routes.eCommerce.orderDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Order',
  //       href: routes.eCommerce.createOrder,
  //     },
  //     {
  //       name: 'Edit Order',
  //       href: routes.eCommerce.editOrder(DUMMY_ID),
  //     },
  //     {
  //       name: 'Reviews',
  //       href: routes.eCommerce.reviews,
  //     },
  //     {
  //       name: 'Shop',
  //       href: routes.eCommerce.shop,
  //     },
  //     {
  //       name: 'Cart',
  //       href: routes.eCommerce.cart,
  //     },
  //     {
  //       name: 'Checkout & Payment',
  //       href: routes.eCommerce.checkout,
  //     },
  //   ],
  // },
  // {
  //   name: 'Logistics',
  //   href: '#',
  //   icon: <PiPackage />,
  //   dropdownItems: [
  //     {
  //       name: 'Shipment List',
  //       href: routes.logistics.shipmentList,
  //     },
  //     {
  //       name: 'Shipment Details',
  //       href: routes.logistics.shipmentDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Shipment',
  //       href: routes.logistics.createShipment,
  //     },
  //     {
  //       name: 'Edit Shipment',
  //       href: routes.logistics.editShipment(DUMMY_ID),
  //     },
  //     {
  //       name: 'Customer Profile',
  //       href: routes.logistics.customerProfile,
  //     },
  //     {
  //       name: 'Tracking',
  //       href: routes.logistics.tracking(DUMMY_ID),
  //     },
  //   ],
  // },
  // {
  //   name: 'Job Feeds',
  //   href: routes.jobBoard.jobFeed,
  //   icon: <PiShapesDuotone />,
  // },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.appointmentList,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'Point of Sale',
  //   href: routes.pos.index,
  //   icon: <PiCreditCard />,
  // },
  // {
  //   name: 'Image Viewer',
  //   href: routes.imageViewer,
  //   icon: <PiCodesandboxLogoDuotone />,
  // },
  // label start
  // {
  //   name: 'Search & Filters',
  // },
  // // label end
  // {
  //   name: 'Real Estate',
  //   href: routes.searchAndFilter.realEstate,
  //   icon: <PiHouseLine />,
  // },
  // {
  //   name: 'Flight Booking',
  //   href: routes.searchAndFilter.flight,
  //   icon: <PiAirplaneTilt />,
  // },
  // {
  //   name: 'NFT',
  //   href: routes.searchAndFilter.nft,
  //   icon: <PiPokerChip />,
  // },
  // // label end
  // // label start
  // {
  //   name: 'Widgets',
  // },
  // // label end
  // {
  //   name: 'Cards',
  //   href: routes.widgets.cards,
  //   icon: <PiSquaresFour />,
  // },
  // {
  //   name: 'Icons',
  //   href: routes.widgets.icons,
  //   icon: <PiFeather />,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUp />,
  // },
  // // {
  // //   name: 'Banners',
  // //   href: routes.widgets.banners,
  // //   icon: <PiImage />,
  // // },
  // {
  //   name: 'Maps',
  //   href: routes.widgets.maps,
  //   icon: <PiMapPinLine />,
  // },
  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGear />,
  // },
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRinging />,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  //   icon: <PiUser />,
  // },
  // {
  //   name: 'Newsletter',
  //   href: routes.forms.newsletter,
  //   icon: <PiEnvelopeSimpleOpen />,
  // },
  // {
  //   name: 'Multi Step',
  //   href: routes.multiStep,
  //   icon: <PiSteps />,
  // },
  // {
  //   name: 'Multi Step 2',
  //   href: routes.multiStep2,
  //   icon: <PiStairs />,
  // },
  // {
  //   name: 'Payment Checkout',
  //   href: routes.eCommerce.checkout,
  //   icon: <PiCreditCard />,
  // },
  // // label start
  // {
  //   name: 'Tables',
  // },
  // // label end
  // {
  //   name: 'Basic',
  //   href: routes.tables.basic,
  //   icon: <PiGridFour />,
  // },
  // {
  //   name: 'Collapsible',
  //   href: routes.tables.collapsible,
  //   icon: <PiCaretCircleUpDown />,
  // },
  // {
  //   name: 'Enhanced',
  //   href: routes.tables.enhanced,
  //   icon: <PiTable />,
  // },
  // {
  //   name: 'Sticky Header',
  //   href: routes.tables.stickyHeader,
  //   icon: <PiBrowser />,
  // },
  // {
  //   name: 'Pagination',
  //   href: routes.tables.pagination,
  //   icon: <PiListNumbers />,
  // },
  // {
  //   name: 'Search',
  //   href: routes.tables.search,
  //   icon: <PiHourglassSimple />,
  // },
  // {
  //   name: 'Resizable',
  //   href: routes.tables.resizable,
  //   icon: <PiArrowsOutLineHorizontalBold />,
  // },
  // {
  //   name: 'Pinning',
  //   href: routes.tables.pinning,
  //   icon: <PiPushPinDuotone />,
  // },
  // {
  //   name: 'Drag & Drop',
  //   href: routes.tables.dnd,
  //   icon: <PiArrowsOut />,
  // },
  // // label start
  // {
  //   name: 'Pages',
  // },
  // {
  //   name: 'Profile',
  //   href: routes.profile,
  //   icon: <PiUserCircle />,
  // },
  // {
  //   name: 'Welcome',
  //   href: routes.welcome,
  //   icon: <PiShootingStar />,
  // },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunch />,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  //   icon: <PiFolderLock />,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  //   icon: <PiBinoculars />,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  //   icon: <PiHammer />,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  //   icon: <PiNoteBlank />,
  // },

  // // label start
  // {
  //   name: 'Authentication',
  // },
  // // label end
  // {
  //   name: 'Sign Up',
  //   href: '#',
  //   icon: <PiUserPlus />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Sign up',
  //       href: routes.auth.signUp1,
  //     },
  //     {
  //       name: 'Vintage Sign up',
  //       href: routes.auth.signUp2,
  //     },
  //     {
  //       name: 'Trendy Sign up',
  //       href: routes.auth.signUp3,
  //     },
  //     {
  //       name: 'Elegant Sign up',
  //       href: routes.auth.signUp4,
  //     },
  //     {
  //       name: 'Classic Sign up',
  //       href: routes.auth.signUp5,
  //     },
  //   ],
  // },
  // {
  //   name: 'Sign In',
  //   href: '#',
  //   icon: <PiShieldCheck />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Sign in',
  //       href: routes.auth.signIn1,
  //     },
  //     {
  //       name: 'Vintage Sign in',
  //       href: routes.auth.signIn2,
  //     },
  //     {
  //       name: 'Trendy Sign in',
  //       href: routes.auth.signIn3,
  //     },
  //     {
  //       name: 'Elegant Sign in',
  //       href: routes.auth.signIn4,
  //     },
  //     {
  //       name: 'Classic Sign in',
  //       href: routes.auth.signIn5,
  //     },
  //   ],
  // },
  // {
  //   name: 'Forgot Password',
  //   href: '#',
  //   icon: <PiLockKey />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Forgot password',
  //       href: routes.auth.forgotPassword1,
  //     },
  //     {
  //       name: 'Vintage Forgot password',
  //       href: routes.auth.forgotPassword2,
  //     },
  //     {
  //       name: 'Trendy Forgot password',
  //       href: routes.auth.forgotPassword3,
  //     },
  //     {
  //       name: 'Elegant Forgot password',
  //       href: routes.auth.forgotPassword4,
  //     },
  //     {
  //       name: 'Classic Forgot password',
  //       href: routes.auth.forgotPassword5,
  //     },
  //   ],
  // },
  // {
  //   name: 'OTP Pages',
  //   href: '#',
  //   icon: <PiChatCenteredDots />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern OTP page',
  //       href: routes.auth.otp1,
  //     },
  //     {
  //       name: 'Vintage OTP page',
  //       href: routes.auth.otp2,
  //     },
  //     {
  //       name: 'Trendy OTP page',
  //       href: routes.auth.otp3,
  //     },
  //     {
  //       name: 'Elegant OTP page',
  //       href: routes.auth.otp4,
  //     },
  //     {
  //       name: 'Classic OTP page',
  //       href: routes.auth.otp5,
  //     },
  //   ],
  // },

  // label start
  {
    name: 'Dashboard',
  },
  // label end

  {
    name: 'Overview',
    href: '/',
    icon: <PiChartPieSlice />,
  },
  // label start
  {
    name: 'Students',
  },
  // label end

  {
    name: 'My Students',
    href: routes.myStudents.myAssignedStudents,
    icon: <PiFolderUser />,
    // dropdownItems: [
    //   {
    //     name: 'All Students',
    //     href: routes.myStudents.allStudents,
    //   },
    //   {
    //     name: 'My Assigned Students',
    //     href: routes.myStudents.myAssignedStudents,
    //   },
    // ],
  },
  {
    name: 'Assessments',
    href: '#',
    icon: <PiShapes />,
    dropdownItems: [
      {
        name: 'Rubric Scoring',
        href: routes.assessments.rubric,
      },
      {
        name: 'Assessment History',
        href: routes.assessments.history,
      },
    ],
  },
  {
    name: 'Tasks & Reminders',
    href: '#',
    icon: <PiCalendarPlus />,
    dropdownItems: [
      {
        name: 'Progress Overview',
        href: routes.tasks.overview,
      },
      {
        name: 'Tasks Board',
        href: routes.tasks.taskBoard,
      },
      {
        name: 'All Tasks',
        href: routes.tasks.allTasks,
      },
      // {
      //   name: 'Assign Task',
      //   href: routes.tasks.assignTask,
      // },
    ],
  },
  //label start
  { name: 'Schedules and Events' },
  //label end
  {
    name: 'Sessions & Calendar',
    href: routes.schedules.calendar,
    icon: <PiClipboardText />,
    // dropdownItems: [
      // {
      //   name: 'Calendar View',
      //   href: routes.schedules.calendar,
      // },
      // {
      //   name: 'Create Session',
      //   href: routes.schedules.createSession,
      // },
      // {
      //   name: ' Attendance Tracker',
      //   href: routes.schedules.attendance,
      // },
    // ],
  },
  {
    name: 'Analytics & Reports',
    href: '#',
    icon: <PiChartBar />,
    dropdownItems: [
      {
        name: 'Readiness Summary',
        href: routes.analyticsReports.readinessDashboard,
      },
      {
        name: 'At-risk Tracker',
        href: routes.analyticsReports.atRiskTracker,
      },
    ],
  },
  {
    name: 'Messages & Notifications',
    href: routes.messages.inbox,
    icon: <PiEnvelopeSimpleOpen />
    // dropdownItems: [
      // {
      //   name: 'Dashboard',
      //   href: routes.messages.dashboard,
      // },
    //   {
    //     name: 'Inbox',
    //     href: routes.messages.inbox,
    //   },
    //   {
    //     name: 'Broadcast',
    //     href: routes.messages.broadcast,
    //   },
    // ],
  },

  {
    name: 'Explore Courses',
    href: routes.courses.allCourses,
    icon: <PiStack />
    // dropdownItems: [
      // {
      //   name: 'Statistics',
      //   href: routes.courses.dashboard,
      // },
      // {
      //   name: 'All Courses',
      //   href: routes.courses.allCourses,
      // },
      // {
      //   name: 'Add Course',
      //   href: routes.courses.addCourse,
      // },
    // ],
  },

  // label start
  {
    name: 'Templates & FAQs',
  },
  // label end
  {
    name: 'Resources',
    href: '/',
    icon: <PiFolder />,
    dropdownItems: [
      {
        name: 'Guidelines',
        href: routes.resources.guidelines,
      },
      {
        name: 'Rubric Templates',
        href: routes.resources.rubricTemplates,
      },
      {
        name: 'Advisor FAQs',
        href: routes.resources.faqs,
      },
    ],
  },
  {
    name: 'Help & Support',
    icon: <PiHeadset />,
    href: routes.support.main,
  },
];
