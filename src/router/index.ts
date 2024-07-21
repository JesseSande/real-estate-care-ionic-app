import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import TabsPage from "../views/TabsPage.vue";
import Tab1Page from "../views/Tab1Page.vue";
import Tab2Page from "../views/Tab2Page.vue";
import Tab3Page from "../views/Tab3Page.vue";
import AssignedDetails from "../views/AssignedDetails.vue";
import AssignedInspectionDetails from "../views/AssignedInspectionDetails.vue";
import CompletedDetails from "../views/CompletedDetails.vue";
import CompletedInspectionDetails from "../views/CompletedInspectionDetails.vue";
import NotificationsDetails from "../views/NotificationsDetails.vue";
import SettingsDetails from "../views/SettingsDetails.vue";
import KnowledgebaseDetails from "../views/KnowledgebaseDetails.vue";
import KnowledgebaseItemDetails from "../views/KnowledgebaseItemDetails.vue";
import EditInspection from "../views/EditInspection.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "FirstPage",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/tabs/",
    name: "TabsPage",
    component: TabsPage,
    children: [
      {
        path: "",
        name: "ActieveTaakRedirect",
        redirect: "/tabs/actieve-taak"
      },
      {
        path: "actieve-taak",
        name: "ActieveTaak", 
        component: Tab1Page
      },
      {
        path: "zoeken",
        name: "Zoeken",
        component: Tab2Page
      },
      {
        path: "informatie",
        name: "Informatie",
        component: Tab3Page
      }
    ]
  },
  { 
    path: "/toegewezen-inspecties",
    name: "ToegewezenInspecties",
    component: AssignedDetails
  },
  {
    path: "/toegewezen-inspecties/:id",
    name: "ToegewezenInspectiesId",
    component: AssignedInspectionDetails
  },
  {
    path: "/afgeronde-inspecties",
    name: "AfgerondeInspecties",
    component: CompletedDetails
  },
  {
    path: "/afgeronde-inspecties/:id",
    name: "AfgerondeInspectiesId",
    component: CompletedInspectionDetails
  },
  {
    path: "/meldingen",
    name: "Meldingen",
    component: NotificationsDetails
  },
  {
    path: "/instellingen",
    name: "Instellingen",
    component: SettingsDetails
  },
  {
    path: "/kennisbase",
    name: "Kennisbase",
    component: KnowledgebaseDetails
  }, 
  {
    path: "/kennisbase/:id",
    name: "KennisbaseId",
    component: KnowledgebaseItemDetails
  },
  {
    path: "/inspectie-bewerken/:id",
    name: "InspectieBewerkenId",
    component: EditInspection
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