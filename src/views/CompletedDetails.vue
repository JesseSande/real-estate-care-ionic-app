<!-- Via deze component wordt het overzicht aan afgeronde inspecties zichtbaar -->

<template>
  <ion-page>
    <TheHeader />
    <ion-content>
      <h1>Afgeronde inspecties</h1>
      <div v-if="sortedCompletedInspections.length === 0">
        <p>Er zijn geen afgeronde inspecties.</p>
      </div>
      <ion-list lines="none" v-else>
        <ion-item 
          class="inspectionListItem"
          :detail="true" 
          v-for="inspection in sortedCompletedInspections" 
          :key="inspection.id" 
          @click="selectInspection(inspection)">
          <ion-label class="inspectionInformationLabel">
            <h2 class="inspectionDateHeader">{{ inspection.date }}</h2>
            <h3 class="inspectionTypeHeader">{{ inspection.type }}</h3>
            <p class="inspectionLocationText">{{ inspection.location }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <TheTabBar />
  </ion-page>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { useInspectionStore } from "@/stores/inspectionStore";
  import { 
    IonPage, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel 
  } from "@ionic/vue";
  import TheHeader from "@/components/TheHeader.vue";
  import TheTabBar from "@/components/TheTabBar.vue";
  import { Inspection } from "@/types/types";

  const router = useRouter();
  const inspectionStore = useInspectionStore();

  // Afgeronde inspecties gesorteerd van meest recent naar minst recent
  const sortedCompletedInspections = computed<Inspection[]>(() => {
    return [...inspectionStore.completedInspections].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  const selectInspection = (inspection: Inspection) => {
    router.push(`/afgeronde-inspecties/${inspection.id}`);
  };
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";

  .inspectionListItem {
    margin: 0.625rem 0;
    padding: 0.625rem;
    border: 1px solid var(--ion-color-firstcolor);
    border-radius: 4px; 
  }
  
  .inspectionInformationLabel {
    margin: 0.625rem;
  }

  .inspectionDateHeader, .inspectionLocationText {
    color: var(--ion-color-secondcolor);
    margin: 0;
  }

  .inspectionDateHeader {
    margin: 0;
  }

  .inspectionTypeHeader {
    margin: 0.5rem 0;
    font-size: 1.25rem;
    font-weight: bold;
  }
</style>