



const ROUTES_NAMES_MAP = {
  LAYOUT:           'CandidateLayout',
  DASHBOARD:        'CandidateDashboard',
  SHIFTS:           'CandidateShifts',
  OPEN_SHIFTS:      'CandidateOpenShifts',
  AGREE_SHIFTS:      'CandidateAgreedShifts',
  AVAILABILITY:     'CandidateShiftsAvailability',
  DIRECT_OFFERS:    'CandidateShiftsDirectOffers',
  HISTORY:          'CandidateShiftsHistory',
  NETWORK:          'CandidateNetwork',
  CONTACTS:         'CandidateContacts',
  MESSAGES:         'CandidateMessages',
  SENT:            'CandidateSent',

  FINANCE:          'CandidateFinance',
  PAYMENT_HISTORY:  'CandidatePaymentHistory',
  BANK_DETAILS:     'CandidateBankDetails',
  SHIFT_PRO_PERKS:  'ShiftProPerks',
  PROFILE:          'CandidateProfile',

  TIMESHEET:        'CandidateTimesheet',
  PENDING_TIMESHEET:  'CandidatePendingTimesheet',
  COMPLETE_TIMESHEET:  'CandidateCompleteTimesheet',


  PROFILE_APPEARENCE:  'CandidateProfileAppearence',
  YOUR_AVAILABILITY:  'CandidateYourAvailabilty',
  PROFILE_SUBSCRIPTION:  'CandidateProfileSubscription',
  PROFILE_SECURITY:  'CandidateProfileSecurity',
  PROFILE_BANK_DETAILS:  'CandidateProfileBankDetails',
}


// const BASE_PATH = '@/views/candidate/'
const routes = [
  {
    path: '/candidate',
    name: ROUTES_NAMES_MAP.LAYOUT,
    component: () => import(/* webpackChunkName: "CandidateLayout"  */ "@/layout/CandidateLayout"),
    children: [
      {
        path: 'dashboard',
        name: ROUTES_NAMES_MAP.DASHBOARD,
        component: () => import(/* webpackChunkName: "CandidateDashboard" */ '@/views/candidate/Dashboard')
      },
      {
        path: 'shifts',
        name: ROUTES_NAMES_MAP.SHIFTS,
        component: () => import(/* webpackChunkName: "CandidateShifts" */ '@/views/candidate/Shifts'),
        redirect: {
          name: ROUTES_NAMES_MAP.OPEN_SHIFTS
        },
        children: [
          {
            path: 'open-shifts',
            name: ROUTES_NAMES_MAP.OPEN_SHIFTS,
            component: () => import(/* webpackChunkName: "CandidateOpenShifts" */ '@/components/candidate/ShiftsTable') 
          },
          {
            path: 'agree-shifts',
            name: ROUTES_NAMES_MAP.AGREE_SHIFTS,
            component: () => import(/* webpackChunkName: "CandidateAgreedShifts" */ '@/components/candidate/ShiftsAgreedTable') 
          },
          {
            path: 'availability',
            name: ROUTES_NAMES_MAP.AVAILABILITY,
            component: () => import(/* webpackChunkName: "CandidateShiftsAvailability" */ '@/views/candidate/Shifts/Availability') 
          },
          {
            path: 'direct-offers',
            name: ROUTES_NAMES_MAP.DIRECT_OFFERS,
            component: () => import(/* webpackChunkName: "CandidateShiftsDirectOffers" */ '@/views/candidate/Shifts/DirectOffers') 
          },
          {
            path: 'history',
            name: ROUTES_NAMES_MAP.HISTORY,
            component: () => import(/* webpackChunkName: "CandidateShiftsHistory" */ '@/views/candidate/Shifts/History') 
          }
        ]
      },
      {
        path: 'network',
        name: ROUTES_NAMES_MAP.NETWORK,
        component: () => import(/* webpackChunkName: "CandidateNetwork" */ '@/views/candidate/Network'),
        redirect: {
          name: ROUTES_NAMES_MAP.MESSAGES
        },
        children: [
          {
            path: 'contacts',
            name: ROUTES_NAMES_MAP.CONTACTS,
            component: () => import(/* webpackChunkName: "CandidateContacts" */ '@/views/candidate/Network/Contacts')
          },
          {
            path: 'sent',
            name: ROUTES_NAMES_MAP.SENT,
            component: () => import(/* webpackChunkName: "CandidateSent" */ '@/views/candidate/Network/Sent')
          },
          {
            path: 'inbox',
            name: ROUTES_NAMES_MAP.MESSAGES,
            component: () => import(/* webpackChunkName: "CandidateMessages" */ '@/views/candidate/Network/Inbox')
          }
        ]
      },
      {
        path: 'finance',
        name: ROUTES_NAMES_MAP.FINANCE,
        component: () => import(/* webpackChunkName: "CandidateFinance" */ '@/views/candidate/Finance'),
        redirect: {
          name: 'CandidatePaymentPending'
        },
        children: [
          {
            path: 'payment',
            name: 'CandidatePaymentPending',
            component: () => import(/* webpackChunkName: "CandidatePaymentPending" */ '@/views/candidate/Finance/PaymentPending'),
          },
          {
            path: 'payment-history',
            name: 'CandidatePaymentHistory',
            component: () => import(/* webpackChunkName: "CandidatePaymentHistory" */ '@/views/candidate/Finance/PaymentHistory'),
          },
          {
            path: 'bank-details',
            name: ROUTES_NAMES_MAP.BANK_DETAILS,
            component: () => import(/* webpackChunkName: "CandidateBankDetails" */ '@/views/candidate/Finance/BankDetails'),
          },
          {
            path: 'perks',
            name: ROUTES_NAMES_MAP.SHIFT_PRO_PERKS,
            component: () => import(/* webpackChunkName: "CandidateShiftProPerks" */ '@/views/candidate/Finance/ShiftProPerks'),
          }
        ]
      },
      {
        path: 'timesheet',
        name: ROUTES_NAMES_MAP.TIMESHEET,
        component: () => import(/* webpackChunkName: "CandidateTimesheet" */ '@/views/candidate/Timesheet'),
        redirect: {
          name: ROUTES_NAMES_MAP.PENDING_TIMESHEET
        },
        children: [
          {
            path: 'pending-timesheet',
            name: ROUTES_NAMES_MAP.PENDING_TIMESHEET,
            component: () => import(/* webpackChunkName: "CandidatePendingTimesheet" */ '@/views/candidate/Timesheet/PendingTimesheet'),
          },
          {
            path: 'complete-timesheet',
            name: ROUTES_NAMES_MAP.COMPLETE_TIMESHEET,
            component: () => import(/* webpackChunkName: "CandidateCompleteTimesheet" */ '@/views/candidate/Timesheet/CompleteTimesheet'),
          }
        ]
      },
      {
        path: 'profile',
        name: ROUTES_NAMES_MAP.PROFILE,
        component: () => import(/* webpackChunkName: "CandidateProfile" */ '@/views/candidate/Profile'),
        redirect: {
          name: ROUTES_NAMES_MAP.PROFILE_APPEARENCE
        },
        children: [
          {
            path: 'profile_appearence',
            name: ROUTES_NAMES_MAP.PROFILE_APPEARENCE,
            component: () => import(/* webpackChunkName: "CandidateProfileAppearence" */ '@/views/candidate/Profile/ProfileAppearence'),
          },
          // {
          //   path: 'your_availability',
          //   name: ROUTES_NAMES_MAP.YOUR_AVAILABILITY,
          //   component: () => import(/* webpackChunkName: "CandidateYourAvailabilty" */ '@/views/candidate/Profile/YourAvailability'),
          // },
          {
            path: 'subscription',
            name: ROUTES_NAMES_MAP.PROFILE_SUBSCRIPTION,
            component: () => import(/* webpackChunkName: "CandidateProfileSubscription" */ '@/views/candidate/Profile/Subscription'),
          },
          {
            path: 'security',
            name: ROUTES_NAMES_MAP.PROFILE_SECURITY,
            component: () => import(/* webpackChunkName: "CandidateProfileSecurity" */ '@/views/candidate/Profile/Security'),
          },
          {
            path: 'bank_detail',
            name: ROUTES_NAMES_MAP.PROFILE_BANK_DETAILS,
            component: () => import(/* webpackChunkName: "CandidateProfileBankDetails" */ '@/views/candidate/Profile/Bank_details'),
          },

          
        ]
      }
    ]
  }
]

export default routes