<!-- Deze component is aan alle views toegevoegd zodat overal de header zichtbaar is -->

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="primary">
        <ion-button 
          @click="goToNotifications"
          aria-label="meldingen">
            <ion-icon 
              slot="icon-only" 
              :icon="notifications"
            ></ion-icon>
        </ion-button>
        <ion-button 
          @click="goToSettings"
          aria-label="instellingen">
            <ion-icon 
              slot="icon-only" 
              :icon="settings"
            ></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="secondary">
        <img 
          @click="goToHome" 
          src="@/assets/logo REC-1.7.png" 
          alt="logo Real Estate Care" 
          width="275px"
        >
      </ion-buttons>
    </ion-toolbar>
    <ion-toolbar class="subHeader">
      <ion-buttons slot="start">
        <ion-back-button
          class="generalBackButton" 
          text="Terug"
        ></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
  import { 
    notifications, 
    settings 
  } from "ionicons/icons";
  import { 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonBackButton, 
    IonIcon 
  } from "@ionic/vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const goToHome = () => {
    router.push("/tabs/actieve-taak");
  };

  const goToNotifications = () => {
    router.push("/meldingen");
  };

  const goToSettings = () => {
    router.push("/instellingen");
  };
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";

  .subHeader {
    background-color: var(--ion-color-fourthcolor) !important;
  }

  .generalBackButton {
    padding: 0 0 0 1rem;
  }
</style>