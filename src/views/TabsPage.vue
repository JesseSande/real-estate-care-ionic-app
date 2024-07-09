<template>
  <ion-page>
    <IonHeaderComponent />
    <IonTabsComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import IonTabsComponent from '@/components/IonTabsComponent.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>