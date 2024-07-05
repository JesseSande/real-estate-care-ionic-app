<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <p>Details van afgeronde taken komen hier.</p>
      <InspectionList />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import InspectionList from '@/components/InspectionList.vue';
</script>

<style scoped>
  ion-content {
    --padding-start: 20px;
    --padding-end: 20px;
  }
</style>