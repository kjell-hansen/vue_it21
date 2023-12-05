import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Hemvyn
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Vyn för kategorier
      path: '/Categories',
      name: 'Categories',
      component: () => import('../views/CategoriesView.vue')
    },
    {
      // Vy för att visa alla poster för en viss kategori
      path: '/Category/:slug',
      name: 'Category',
      component: () => import('../views/CategoryView.vue'),
      props: true
    },
    {
      // Vy för alla taggar
      path: '/Tags',
      name: 'Tags',
      component: () => import('../views/TagsView.vue')
    },
    {
      // Vy för att visa alla poster för en viss tagg
      path: '/Tag/:slug',
      name: 'Tag',
      component: () => import('../views/TagView.vue'),
      props: true
    },
    {
      // Vy för att visa alla inlägg
      path: '/Posts',
      name: 'Posts',
      component: () => import('../views/PostsView.vue')
    },
    {
      // Vy för att visa ett enskilt inlägg
      path: '/Post/:slug',
      name: 'Post',
      component: () => import('../views/PostView.vue'),
      props: true
    },
    {
      // Vy för att visa alla författare
      path: '/Authors',
      name: 'Authors',
      component: () => import('../views/AuthorsView.vue')
    },
    {
      // Vy för att visa alla inlägg för en viss författare
      path: '/Author/:slug',
      name: 'Author',
      component: () => import('../views/AuthorView.vue'),
      props: true
    }
  ]
})

export default router
