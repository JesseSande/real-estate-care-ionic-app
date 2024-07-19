<!-- Basis voor de tab opbouw van de applicatie -->

<template>
  <ion-page>
    <TheTabs />
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage } from "@ionic/vue";
  import TheTabs from "@/components/TheTabs.vue";
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>