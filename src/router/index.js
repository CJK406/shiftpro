import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes/index'


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {

  const isPublic = to.meta.public
  const isNotLoggedIn = localStorage.getItem('user')
  
  if (!isPublic && !isNotLoggedIn) {
    return next({
      name: 'Login'
    })
  }

  return next()
})

export default router
