<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <!--<ExploreContainer name="Tab 2 page" />-->
      <p>Hier komt straks een zoekfunctie</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { notifications, settings } from 'ionicons/icons';
  import ExploreContainer from '@/components/ExploreContainer.vue';
</script>

<style scoped>
  ion-content {
    --padding-start: 20px;
    --padding-end: 20px;
  }
</style>