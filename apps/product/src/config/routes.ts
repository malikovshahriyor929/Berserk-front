export const routes = {
  eCommerce: {
    dashboard: '/ecommerce',
    products: '/ecommerce/products',
    createProduct: '/ecommerce/products/create',
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: '/ecommerce/orders',
    createOrder: '/ecommerce/orders/create',
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: '/ecommerce/reviews',
    shop: '/ecommerce/shop',
    cart: '/ecommerce/cart',
    checkout: '/ecommerce/checkout',
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
  searchAndFilter: {
    realEstate: '/search/real-estate',
    nft: '/search/nft',
    flight: '/search/flight',
  },
  logistics: {
    dashboard: '/logistics',
    shipmentList: '/logistics/shipments',
    customerProfile: '/logistics/customer-profile',
    createShipment: '/logistics/shipments/create',
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  appointment: {
    dashboard: '/appointment',
    appointmentList: '/appointment/list',
  },
  crm: {
    dashboard: '/crm',
  },
  affiliate: {
    dashboard: 'https://isomorphic-dnd.vercel.app',
  },
  storeAnalytics: {
    dashboard: '/store-analytics',
  },
  bidding: {
    dashboard: '/bidding',
  },
  executive: {
    dashboard: '/executive',
  },
  project: {
    dashboard: '/project',
  },
  socialMedia: {
    dashboard: '/social-media',
  },
  jobBoard: {
    dashboard: '/job-board',
    jobFeed: '/job-board/feed',
  },
  analytics: '/analytics',
  financial: {
    dashboard: '/financial',
  },
  podcast: {
    dashboard: '/podcast',
  },
  file: {
    dashboard: '/file',
    manager: '/file-manager',
    upload: '/file-manager/upload',
    create: '/file-manager/create',
  },
  pos: {
    index: '/point-of-sale',
  },
  eventCalendar: '/event-calendar',
  rolesPermissions: '/roles-permissions',

  //Customized routes
  dashboard: {
    overview: '/dashboard/overview',
  },
  myStudents: {
    allStudents: '/mystudents/allstudents',
    myAssignedStudents: '/mystudents/my-assigned-students',
    addStudent: '/mystudents/add-student',
    details: (id: string) => `/mystudents/${id}`,
    edit: (id: string) => `/mystudents/${id}/edit`,
  },
  assessments: {
    rubric: '/assessments/rubrics',
    testScores: '/assessments/test-scores',
    history: '/assessments/history',
  },
  schedules: {
    calendar: '/schedules/calendar',
    createSession: '/schedules/create-session',
    attendance: '/schedules/attendance',
    sessionAttendanceDetails: (id: string) => `/schedules/attendance/${id}/details`,
  },
  tasks: {
    overview: '/tasks/overview',
    taskBoard: '/tasks/task-board',
    assignTask: '/tasks/assign-task',
    allTasks: '/tasks/all-tasks',
    edit: (id: string) => `/tasks/${id}/edit`,
  },
  analyticsReports: {
    readinessDashboard: '/analytics-reports/readiness-dashboard',
    atRiskTracker: '/analytics-reports/at-risk-tracker',
  },
  messages: {
    dashboard: '/messages',
    inbox: '/messages/inbox',
    broadcast: '/messages/inbox',
    systemNotifications: '/messages/inbox',
    messagesCategory: (category: string) => `/messages/inbox/${category}`,
    messageDetails: (id: string) => `/messages/inbox/${id}`,
    snippets: '/messages/snippets',
    createSnippet: '/messages/snippets/create',
    viewSnippet: (id: string) => `/messages/snippets/${id}`,
    editSnippet: (id: string) => `/messages/snippets/${id}/edit`,
    templates: '/messages/templates',
    createTemplate: '/messages/templates/create',
    viewTemplate: (id: string) => `/messages/templates/${id}`,
    editTemplate: (id: string) => `/messages/templates/${id}/edit`,
  },
  profile: '/profile',

  courses: {
    // dashboard: '/courses',
    allCourses: '/courses/all-courses',
    courseDetails: (id: string) => `/courses/${id}`,
    courseLearning: (id: string) => `/courses/${id}/learn`,
    courseLessonDetails: (id: string, lessonId: string) => `/courses/${id}/learn/${lessonId}`,
    // assignCourse: '/courses/assign-course',
    // addCourse: '/courses/add-course',
  },

  settings: {
    profileSettings: '/profile-settings',
    notificationSettings: '/profile-settings/notification',
    passwordSettings: '/profile-settings/password',
  },
  resources: {
    guidelines: '/resources/guidelines',
    rubricTemplates: '/resources/rubric-templates',
    faqs: '/resources/advisor-faqs',
  },
  support: {
    main: '/support',
  },

  // Custom routes end

  imageViewer: '/image-viewer',
  widgets: {
    cards: '/widgets/cards',
    icons: '/widgets/icons',
    charts: '/widgets/charts',
    maps: '/widgets/maps',
    banners: '/widgets/banners',
  },
  tables: {
    basic: '/tables/basic',
    collapsible: '/tables/collapsible',
    enhanced: '/tables/enhanced',
    pagination: '/tables/pagination',
    search: '/tables/search',
    stickyHeader: '/tables/sticky-header',
    resizable: '/tables/resizable',
    pinning: '/tables/pinning',
    dnd: '/tables/dnd',
  },
  multiStep: '/multi-step',
  multiStep2: '/multi-step-2',

  emailTemplates: '/email-templates',
  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp1: '/auth/sign-up-1',
    signUp2: '/auth/sign-up-2',
    signUp3: '/auth/sign-up-3',
    signUp4: '/auth/sign-up-4',
    signUp5: '/auth/sign-up-5',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn4: '/auth/sign-in-4',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword4: '/auth/forgot-password-4',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp4: '/auth/otp-4',
    otp5: '/auth/otp-5',
  },
  signIn: '/signin',
};
