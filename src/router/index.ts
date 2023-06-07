import { useCategoriesStore } from '@/stores/categories'
import { createRouter, createWebHistory } from 'vue-router'

enum RoutePaths {
  Home = '/',
  Login = '/login',
  Category = '/category',
  Genitor = '/genitor',
  Results = '/results'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RoutePaths.Home,
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: RoutePaths.Login,
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: RoutePaths.Category,
      name: 'category',
      component: () => import('@/views/CategoryView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: RoutePaths.Genitor,
      name: 'genitor',
      component: () => import('@/views/GenitorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: RoutePaths.Results,
      name: 'results',
      component: () => import('@/views/ResultView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const isLogged = localStorage.getItem('isLogged')
  const store = useCategoriesStore()

  if (from.path === RoutePaths.Results) store.clearData()

  if (requiresAuth && !isLogged) next('/login')
  else next()
})

export default router
