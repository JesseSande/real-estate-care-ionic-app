<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inspectie Details</ion-title>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/toegewezen-details"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h2>Inspectie Details</h2>
      <p><strong>Locatie:</strong> {{ inspection.location }}</p>
      <p><strong>Datum:</strong> {{ inspection.date.toLocaleString() }}</p>
      <p><strong>Type:</strong> {{ inspection.type }}</p>
      <!-- Voeg hier de specifieke details van de inspectie toe -->
    </ion-content>
  </ion-page>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  inspection: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  ion-content {
    padding: 1rem;
  }
</style>
