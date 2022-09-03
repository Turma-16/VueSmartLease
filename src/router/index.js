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
      path: '/funcionariosEmProjeto/:projetoId',
      name: 'funcionariosEmProjeto',
      component: () => import('../views/FuncionariosEmProjetoView.vue')
    },
    {
      path: '/Relatorios',
      name: 'relatorios',
      component: () => import('../views/RelatoriosView.vue')
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/ReservasView.vue')
    }
  ]
})

export default router
