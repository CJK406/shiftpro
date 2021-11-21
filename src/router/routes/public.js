
import PublicLayout from '@/layout/PublicLayout'

import Login from '@/views/public/Login'
import Register from '@/views/public/Register'
import Pricing from '@/views/public/Pricing'

const routes = [
  {
    path: '/',
    name: 'PublicLayout',
    component: PublicLayout,
    children: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'pricing',
        name: 'Pricing',
        component: Pricing
      }
    ]
  }
]

export default routes.map(route => {
  const meta = {
    public: true,
    onlyLoggedOut: true
  }
  return {
    ...route,
    meta
  }
})