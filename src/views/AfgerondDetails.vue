<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <InspectionList />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import InspectionList from '@/components/InspectionList.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>