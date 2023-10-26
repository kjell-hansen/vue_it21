import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home, sweet home!'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '/kjell',
      name: 'Kjell',
      component: () => import('../views/KjellView.vue')
    },
    {
      path: '/user/:name',
      name: 'User',
      component: () => import('../views/UsersView.vue'),
      props: true,
      meta: {
        title: 'User'
      }
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NoShow.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})
router.beforeEach((to) => {
  document.title = to.meta?.title ?? 'Default Title'
})

export default router
