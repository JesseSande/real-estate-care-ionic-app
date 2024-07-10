<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <h1>Toegewezen inspecties</h1>
      <ion-list>
        <ion-item v-for="inspection in sortedInspections" :key="inspection.id" @click="selectInspection(inspection)">
          <ion-label>
            <h2>{{ inspection.date.toLocaleString() }}</h2>
            <p>{{ inspection.location }} - {{ inspection.type }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <AssignedInspectionDetails v-if="selectedInspection" :inspection="selectedInspection" />
    </ion-content>
    <!--<IonTabsComponent />-->
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { fetchAssignedInspections } from '@/services/inspectionService';  // Importeer de juiste functie
  import Inspection from '@/models/Inspection';

  const inspections = ref([]);
  const selectedInspection = ref(null);

  const sortedInspections = computed(() =>
    inspections.value.sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  onMounted(async () => {
    const data = await fetchAssignedInspections();  // Gebruik de juiste functie
    if (Array.isArray(data)) {
        inspections.value = data.map(item => new Inspection(item));
    } else {
        console.error('Expected an array but got:', data);
    }
  });

  const selectInspection = (inspection) => {
    selectedInspection.value = inspection;
  };
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';


  ion-list {
    margin: 1rem 0;
  }

  ion-item {
    --border-radius: 0.5rem;
    --background: var(--ion-card-background);
    --box-shadow: var(--ion-card-box-shadow);
    margin: 0.5rem 0;
  }

  ion-label h2 {
    color: var(--ion-color-secondcolor);
    margin: 0;
  }

  ion-label p {
    margin: 0;
  }
</style>