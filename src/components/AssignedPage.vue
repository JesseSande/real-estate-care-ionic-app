<template>
  <router-link to="/assigned-details" class="card">
    <ion-icon :icon="clipboard" class="icon"></ion-icon>
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
