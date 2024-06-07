import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  },
  { //Eerste geschreven m.b.v. ChatGPT, de rest op dezelfde manier zelf toegevoegd.
    path: '/afgerond-details',
    component: () => import('@/views/AfgerondDetails.vue')
  },
  { 
    path: '/instellingen-details',
    component: () => import('@/views/InstellingenDetails.vue')
  },
  { 
    path: '/kennisbase-details',
    component: () => import('@/views/KennisbaseDetails.vue')
  },
  { 
    path: '/toegewezen-details',
    component: () => import('@/views/ToegewezenDetails.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
