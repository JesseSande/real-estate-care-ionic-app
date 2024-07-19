<template>
  <router-link to="/completed-details" class="card">
    <ion-icon :icon="checkmarkCircle" class="icon"></ion-icon>
    <ion-text>
      <h2 class="cardHeader">Afgerond</h2>
    </ion-text>
  </router-link>
</template>

<script setup lang="ts">
  import { checkmarkCircle } from "ionicons/icons";
  import { 
    IonIcon, 
    IonText 
  } from "@ionic/vue";
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>