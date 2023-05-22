import { useCategoriesStore } from '@/stores/categories';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/Mainview.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/genitor',
      name: 'genitor',
      component: () => import('@/views/GenitorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/views/ResultView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isLogged = localStorage.getItem('isLogged')

  if (requiresAuth && !isLogged) next('/login')
  else next()
})

export default router
