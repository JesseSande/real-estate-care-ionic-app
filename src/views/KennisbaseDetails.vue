<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <p>Details van de kennisbase komen hier.</p>
    </ion-content>
    <IonTabsComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import IonTabsComponent from '@/components/IonTabsComponent.vue';
</script>

<style scoped>
  ion-content {
    --padding-start: 20px;
    --padding-end: 20px;
  }
</style>
