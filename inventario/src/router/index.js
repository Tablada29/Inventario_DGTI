import Vue from 'vue'
import VueRouter from 'vue-router'
import InicioView from '../views/InicioView.vue'
import EquiposView from '../views/EquiposView.vue'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //name: 'inicio',
    component: InicioView
  },
  {
    path: '/login',
    //name: 'inicio',
    component: LoginView
  },
  {
    path: '/equipos',
   // name: 'equipos',
    component: EquiposView
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
