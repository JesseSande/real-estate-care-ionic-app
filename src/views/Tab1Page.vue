<template>
  <ion-page>
    <ion-header>
      <TheHeader />
    </ion-header>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts"> 
  import { 
    IonPage, 
    IonHeader,  
    IonContent 
  } from '@ionic/vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import TheHeader from '@/components/TheHeader.vue';
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>