<!-- Deze component is ingevoegd in de ExploreContainer zodat er middels een card 
doorgeklikt kan worden naar de kennisbase -->

<template>
  <router-link to="/kennisbase" class="card">
    <ion-icon 
      :icon="folder" 
      class="icon" 
      aria-hidden="true"
    ></ion-icon>
    <ion-text>
      <h2 class="cardHeader">Kennisbase</h2>
    </ion-text>
  </router-link>
</template>

<script setup lang="ts">
  import { folder } from "ionicons/icons";
  import { 
    IonIcon, 
    IonText 
  } from "@ionic/vue";
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>