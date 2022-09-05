import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/equipamentos',
      name: 'equipamentos',
      component: () => import('../views/EquipamentosView.vue')
    },
    {
      path: '/funcionarios',
      name: 'funcionarios',
      component: () => import('../views/FuncionariosView.vue')
    },
    {
      path: '/projetos',
      name: 'projetos',
      component: () => import('../views/ProjetosView.vue')
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: () => import('../views/RelatoriosView.vue')
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/ReservasView.vue')
    },
    {
      path: '/ProjetoCadastro',
      name: 'cadastroProjeto',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProjetoCadastro.vue')
    }
  ]
})

export default router
