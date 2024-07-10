import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import Login from '../components/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
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
    path: '/completed-details',
    component: () => import('@/views/CompletedDetails.vue')
  },
  { 
    path: '/settings-details',
    component: () => import('@/views/SettingsDetails.vue')
  },
  { 
    path: '/knowledgebase-details',
    component: () => import('@/views/KnowledgebaseDetails.vue')
  },
  { 
    path: '/assigned-details',
    component: () => import('@/views/AssignedDetails.vue')
  },
  {
    path: '/notifications-details',
    component: () => import('@/views/NotificationsDetails.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Router Guard - m.b.t. ChatGPT4o
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;