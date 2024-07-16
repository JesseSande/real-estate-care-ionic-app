<template>
  <ion-page>
    <ion-header>
      <IonHeaderComponent />
    </ion-header>
    <ion-content :fullscreen="true">
      
      <ExploreContainer name="Tab 1 page" />
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { notifications, settings } from 'ionicons/icons';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>