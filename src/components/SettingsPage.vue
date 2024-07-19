<!-- Deze component is ingevoegd in de ExploreContainer zodat er middels een card 
doorgeklikt kan worden naar de instellingen -->

<template>
  <router-link to="/instellingen" class="card">
    <ion-icon 
      :icon="settings" 
      class="icon" 
      aria-hidden="true"
    ></ion-icon>
    <ion-text>
      <h2 class="cardHeader">Instellingen</h2>
    </ion-text>
  </router-link>
</template>

<script setup lang="ts">
  import { settings } from "ionicons/icons";
  import { 
    IonIcon, 
    IonText 
  } from "@ionic/vue";
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>