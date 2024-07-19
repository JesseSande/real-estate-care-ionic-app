<!-- Deze component is ingevoegd in de ExploreContainer zodat er middels een card 
doorgeklikt kan worden naar de afgeronde inspecties -->

<template>
  <router-link to="/afgeronde-inspecties" class="card">
    <ion-icon 
      :icon="checkmarkCircle" 
      class="icon" 
      aria-hidden="true"
    ></ion-icon>
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