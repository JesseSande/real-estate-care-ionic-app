<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="primary">
        <ion-button @click="goToNotifications">
          <ion-icon slot="icon-only" :icon="notifications"></ion-icon>
        </ion-button>
        <ion-button @click="goToSettings">
          <ion-icon slot="icon-only" :icon="settings"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="secondary">
        <img @click="goToHome" src="@/assets/logo REC-1.7.png" alt="logo-afbeelding" width="275px">
      </ion-buttons>
    </ion-toolbar>
    <ion-toolbar class="subHeader">
      <ion-buttons slot="start">
        <ion-back-button text="Terug"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonButtons, IonButton, IonBackButton, IonIcon } from '@ionic/vue';
  import { notifications, settings, caretBack } from 'ionicons/icons';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goToHome = () => {
    router.push('/tabs/tab1');
  };

  const goToNotifications = () => {
    router.push('/notifications-details');
  };

  const goToSettings = () => {
    router.push('/settings-details');
  };
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  ion-toolbar.subHeader {
    background-color: var(--ion-color-fourthcolor) !important;
  }

  ion-back-button {
    padding: 0 0 0 1rem;
  }
</style>