<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content :fullscreen="true">
      <h1>Toegewezen inspecties</h1>
      <ion-list lines="none">
        <ion-item detail="true" v-for="inspection in assignedInspections" :key="inspection.id" @click="selectInspection(inspection)">
          <ion-label>
            <h2>{{ inspection.date }}</h2>
            <h3>{{ inspection.type }}</h3>
            <p>{{ inspection.location }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <IonTabBarComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useInspectionStore } from '@/stores/inspectionStore';
  import { useRouter } from 'vue-router';
  import { IonPage, IonContent, IonList, IonItem, IonLabel, IonToolbar, IonButtons, IonBackButton } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import IonTabBarComponent from '@/components/IonTabBarComponent.vue';

  const inspectionStore = useInspectionStore();
  const assignedInspections = ref([]);
  const router = useRouter();

  onMounted(async () => {
    await inspectionStore.fetchAssignedInspections();
    assignedInspections.value = inspectionStore.assignedInspections;
  });

  const selectInspection = (inspection) => {
    router.push(`/assigned-details/${inspection.id}`);
  };
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  
  h1 {
    margin: 20px 0;
  }

  ion-item {
    margin: 0.625rem 0;
    padding: 0.625rem;
    border: 1px solid var(--ion-color-firstcolor);
    border-radius: 4px; 
  }
  
  ion-label {
    margin: 0.625rem;
  }

  ion-label h2, p {
    color: var(--ion-color-secondcolor);
    margin: 0;
  }

  ion-label h2 {
    margin: 0;
  }

  ion-label h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
    font-weight: bold;
  }
</style>