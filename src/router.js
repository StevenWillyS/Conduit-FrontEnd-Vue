import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/tag/:tag',
        },
        {
          path: '/my-feed'
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/SignUp.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/Setting.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import ('./views/Editor.vue'),
      children: [
        {
          path: ':slug',
          name: 'slug'
        }
      ]
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      children: [
        {
          path: 'favorites',
          name: 'favorites'
        }
      ]
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('./views/ArticleDetail.vue')
    }
  ]
})
