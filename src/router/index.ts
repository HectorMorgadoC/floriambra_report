import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../landing/Landing.vue';
import isAuthenticatedGuard from '../module/auth/guards/is-authenticated.guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ladding',
      component: Landing,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../module/auth/views/LoginView.vue'),
          
        },
        {
          path: 'menu',
          name: "menu",
          component: () => import("../module/common/components/MenuMain.vue"),
          beforeEnter: isAuthenticatedGuard,
        },
        {
          path: 'clients',
          name: 'client',
          component: () => import("../module/client/layout/ListClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'process',
          name: 'process',
          component: () => import("../module/process/layout/ListProcess.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'teams',
          name: 'team',
          component: () => import("../module/team/layout/ListTeam.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'orders',
          name: 'order',
          component: () => import("../module/order/layout/OrdersSearch.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'reports',
          name: 'report',
          component: () => import("../module/report/layout/ReportSearch.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'create_client',
          name: 'createClient',
          component: () => import("../module/client/view/CreateClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'delete_client',
          name: 'deleteClient',
          component: () => import("../module/client/view/DeleteClient.vue"),
          props: true,
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'update_client',
          name: 'updateClient',
          component: () => import("../module/client/view/UpdateClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'create_process',
          name: 'createProcess',
          component: () => import("../module/process/view//CreateProcess.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'delete_process',
          name: 'deleteProcess',
          component: () => import("../module/process/view/DeleteProcess.vue"),
          props: true,
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'update_process',
          name: 'updateProcess',
          component: () => import("../module/process/view/UpdateProcess.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'create_team',
          name: 'createTeam',
          component: () => import("../module/team/view//CreateTeam.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'delete_team',
          name: 'deleteTeam',
          component: () => import("../module/team/view/DeleteTeam.vue"),
          props: true,
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'update_team',
          name: 'updateTeam',
          component: () => import("../module/team/view/UpdateTeam.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'create_order',
          name: 'createOrder',
          component: () => import("../module/order/view//CreateOrder.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'delete_order',
          name: 'deleteOrder',
          component: () => import("../module/order/view/DeleteOrder.vue"),
          props: true,
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'update_order',
          name: 'updateOrder',
          component: () => import("../module/order/view/UpdateOrder.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'create_report',
          name: 'createReport',
          component: () => import("../module/report/view//CreateReport.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'delete_report',
          name: 'deleteReport',
          component: () => import("../module/report/view/DeleteReport.vue"),
          props: true,
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'update_report',
          name: 'updateReport',
          component: () => import("../module/report/view/UpdateReport.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'approval_report',
          name: 'approvalReport',
          component: () => import("../module/common/components/ApproveRegistration.vue"),
          beforeEnter: isAuthenticatedGuard
        }

      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../module/common/components/NotFound.vue')
    },
    {
      path: '/error-500',
      name: 'ServerError',
      component: () => import('../module/common/components/ServerError.vue')
    }
    
  ],
});

export default router;
