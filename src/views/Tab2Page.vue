<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-searchbar class="searchBar" placeholder="Zoeken"></ion-searchbar>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/vue';
  import { notifications, settings } from 'ionicons/icons';
  import { defineComponent } from 'vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  .searchBar {
    --background: var(--ion-searchbar-background);
    --color: var(--ion-searchbar-color);
}
</style>