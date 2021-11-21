import candidateRoutes from './private/candidate/routes'
import employerRoutes from './private/employer/routes'


const routes = candidateRoutes.concat(employerRoutes)

export default routes.map(route => {
  return {
    ...route,
    meta: {
      public: false
    }
  }
})