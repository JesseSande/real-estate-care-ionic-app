<!-- Derde tab in de opbouw van de applicatie, ofwel Informatie -->

<template>
  <ion-page>
    <ion-header>
      <TheHeader />
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Informatie</h1>
      <p>Dit is een informatiepagina. 
      Op deze pagina wordt in de uiteindelijke app belangrijke informatie over de app genoemd.
      Bijvoorbeeld contactgegevens over de beheerder van de app. 
      In deze demoversie is dat nog niet het geval.</p>
      <p>Deze demoversie van de Real Estate Care case is gemaakt door Jesse van de Sande.</p>
      <p>Versie: juli 2024</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { 
    IonPage, 
    IonHeader, 
    IonContent 
  } from '@ionic/vue';
  import TheHeader from '@/components/TheHeader.vue';
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>