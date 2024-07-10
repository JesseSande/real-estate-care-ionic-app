<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <CompletedInspectionList />
    </ion-content>
    <!--<IonTabsComponent />-->
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { fetchCompletedInspections } from '@/services/inspectionService';  // Importeer de juiste functie
  import Inspection from '@/models/Inspection';

  const inspections = ref([]);
  const selectedInspection = ref(null);

  const sortedInspections = computed(() =>
    inspections.value.sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  onMounted(async () => {
    const data = await fetchCompletedInspections();  // Gebruik de juiste functie
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
</style>