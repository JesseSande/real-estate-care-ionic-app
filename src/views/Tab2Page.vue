<template>
  <ion-page>
    <ion-header>
      <IonHeaderComponent />
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar class="searchBar" placeholder="Zoeken"></ion-searchbar>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/vue';
  import { notifications, settings } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  .searchBar {
    --background: var(--ion-searchbar-background);
    --color: var(--ion-searchbar-color);
    margin: 0.75rem 0;
}
</style>