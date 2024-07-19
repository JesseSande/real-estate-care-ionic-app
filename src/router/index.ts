import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import LoginPage from "../components/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/actieve-taak"
      },
      {
        path: "actieve-taak",
        component: () => import("@/views/Tab1Page.vue")
      },
      {
        path: "zoeken",
        component: () => import("@/views/Tab2Page.vue")
      },
      {
        path: "informatie",
        component: () => import("@/views/Tab3Page.vue")
      }
    ]
  },
  { // Eerste geschreven m.b.v. ChatGPT, de rest op dezelfde manier zelf toegevoegd
    path: "/toegewezen-inspecties",
    component: () => import("@/views/AssignedDetails.vue")
  },
  {
    path: "/toegewezen-inspecties/:id",
    component: () => import("@/views/AssignedInspectionDetails.vue")
  },
  {
    path: "/afgeronde-inspecties",
    component: () => import("@/views/CompletedDetails.vue")
  },
  {
    path: "/afgeronde-inspecties/:id",
    component: () => import("@/views/CompletedInspectionDetails.vue")
  },
  {
    path: "/meldingen",
    component: () => import("@/views/NotificationsDetails.vue")
  },
  {
    path: "/instellingen",
    component: () => import("@/views/SettingsDetails.vue")
  },
  {
    path: "/kennisbase",
    component: () => import("@/views/KnowledgebaseDetails.vue")
  }, 
  {
    path: "/kennisbase/:id",
    component: () => import("@/views/KnowledgebaseItemDetails.vue")
  },
  {
    path: "/inspectie-bewerken/:id",
    component: () => import("@/views/EditInspection.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Router Guard - m.b.t. ChatGPT4o
router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;