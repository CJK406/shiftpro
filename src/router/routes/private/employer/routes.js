



const routes = [
  {
    path: '/employer',
    name: 'EmployerLayout',
    component: () => import(/* webpackChunkName: "EmployerLayout" */ '@/layout/EmployerLayout'),
    children: [
      {
        path: 'dashboard',
        name: 'EmployerDashboard',
        component: () => import(/* webpackChunkName: "EmployerDashboard" */ '@/views/employer/Dashboard') 
      },
      {
        path: 'network',
        name: 'EmployerNetwork',
        component: () => import(/* webpackChunkName: "EmployerNetwork" */ '@/views/employer/Network'),
        redirect: {
          name: 'EmployerNetworkInbox'
        },
        children: [
          {
            path: 'sent',
            name: 'EmployerNetworkSent',
            component: () => import(/* webpackChunkName: "EmployerNetworkSent" */ '@/views/employer/Network/Sent')
          },
          {
            path: 'inbox',
            name: 'EmployerNetworkInbox',
            component: () => import(/* webpackChunkName: "EmployerNetworkInbox" */ '@/views/employer/Network/Inbox')
          }
        ]
      },
      {
        path: 'shifts',
        name: 'EmployerShifts',
        component: () => import(/* webpackChunkName: "EmployerShifts" */ '@/views/employer/Shifts'),
        redirect: {
          name: 'EmployerYourShifts'
        },
        children: [
          {
            path: 'your-shifts',
            name: 'EmployerYourShifts',
            component: () => import(/* webpackChunkName: "EmployerYourShifts" */ '@/views/employer/Shifts/YourShift') 
          },
          {
            path: 'applicant',
            name: 'EmployerShiftApplicants',
            component: () => import(/* webpackChunkName: "EmployerShiftApplicants" */ '@/views/employer/Shifts/Applicant') 
          },
          // {
          //   path: 'staffu-search',
          //   name: 'EmployerStaffSearch',
          //   component: () => import(/* webpackChunkName: "EmployerStaffSearch" */ '@/views/employer/Shifts/StaffSearch') 
          // },
          {
            path: 'direct-offers',
            name: 'EmployerDirectOffers',
            component: () => import(/* webpackChunkName: "EmployerDirectOffers" */ '@/views/employer/Shifts/DirectOffer') 
          },
          {
            path: 'history',
            name: 'EmployerShiftsHistory',
            component: () => import(/* webpackChunkName: "EmployerShiftsHistory" */ '@/views/employer/Shifts/History') 
          }
        ]
      },
      {
        path: 'profile',
        name: 'EmployerProfile',
        component: () => import(/* webpackChunkName: "CandidateProfile" */ '@/views/employer/Profile'),
        redirect: {
          name: 'EmployerProfileAppearence'
        },
        children: [
          {
            path: 'profile_appearence',
            name: 'EmployerProfileAppearence',
            component: () => import( '@/views/employer/Profile/ProfileAppearence'),
          },
          {
            path: 'manage_location',
            name: 'EmployerProfileLocations',
            component: () => import('@/views/employer/Profile/Locations'),
          },

          
          {
            path: 'your_availability',
            name: 'EmployerYourAvailabilty',
            component: () => import(/* webpackChunkName: "CandidateYourAvailabilty" */ '@/views/employer/Profile/YourAvailability'),
          },
          {
            path: 'subscription',
            name: 'EmployerProfileSubscription',
            component: () => import(/* webpackChunkName: "CandidateProfileSubscription" */ '@/views/employer/Profile/Subscription'),
          },
          {
            path: 'security',
            name: 'EmployerProfileSecurity',
            component: () => import(/* webpackChunkName: "CandidateProfileSecurity" */ '@/views/employer/Profile/Security'),
          },
          {
            path: 'bank_detail',
            name: 'EmployerProfileBankDetails',
            component: () => import(/* webpackChunkName: "CandidateProfileBankDetails" */ '@/views/employer/Profile/Bank_details'),
          },

          
        ]
      },
      {
        path: 'finance',
        name: 'EmployerFinance',
        component: () => import(/* webpackChunkName: "EmployerFinance" */ '@/views/employer/Finance'),
        redirect: {
          name: 'EmployerPaymentPending'
        },
        children: [
         
          {
            path: 'payment',
            name: 'EmployerPaymentPending',
            component: () => import(/* webpackChunkName: "EmployerPaymentPending" */ '@/views/employer/Finance/PaymentPending'),
          },
          {
            path: 'payment-history',
            name: 'EmployerPaymentHistory',
            component: () => import(/* webpackChunkName: "EmployerPaymentHistory" */ '@/views/employer/Finance/PaymentHistory'),
          },
          {
            path: 'bank-details',
            name: 'EmployerBankDetails',
            component: () => import(/* webpackChunkName: "EmployerBankDetails" */ '@/views/employer/Finance/BankDetails'),
          }
        
        ]
      },
      {
        path: 'timesheet',
        name: 'EmployerTimesheet',
        component: () => import(/* webpackChunkName: "EmployerTimesheet" */ '@/views/employer/Timesheet'),
        redirect: {
          name: 'EmployerPendingTimesheet'
        },
        children: [
          {
            path: 'pending-timesheet',
            name: 'EmployerPendingTimesheet',
            component: () => import(/* webpackChunkName: "EmployerPendingTimesheet" */ '@/views/employer/Timesheet/PendingTimesheet'),
          },
          {
            path: 'complete-timesheet',
            name: 'EmployerCompleteTimesheet',
            component: () => import(/* webpackChunkName: "EmployerCompleteTimesheet" */ '@/views/employer/Timesheet/CompleteTimesheet'),
          }
        
        ]
      },
    ]
  }
]

export default routes