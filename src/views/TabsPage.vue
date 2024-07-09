<template>
  <ion-page>
    <IonHeaderComponent />
    <IonTabsComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import IonTabsComponent from '@/components/IonTabsComponent.vue';
  import { IonPage } from '@ionic/vue';
</script>

<style>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>