<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button>
            <ion-icon slot="icon-only" :icon="notifications"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="settings"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <img src="@/assets/logo REC-1.7.png" alt="logo-afbeelding" width="275px">
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <p>Details van instellingen komen hier.</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { notifications, settings } from 'ionicons/icons';
  import ExploreContainer from '@/components/ExploreContainer.vue';
</script>