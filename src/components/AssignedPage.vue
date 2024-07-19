<!-- Deze component is ingevoegd in de ExploreContainer zodat er middels een card 
doorgeklikt kan worden naar de toegewezen inspecties -->

<template>
  <router-link to="/toegewezen-inspecties" class="card">
    <ion-icon 
      :icon="clipboard" 
      class="icon" 
      aria-hidden="true"
    ></ion-icon>
    <ion-text>
      <h2 class="cardHeader">Toegewezen</h2>
    </ion-text>
  </router-link>
</template>

<script setup lang="ts">
  import { clipboard } from "ionicons/icons";
  import { 
    IonIcon, 
    IonText 
  } from "@ionic/vue";
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>