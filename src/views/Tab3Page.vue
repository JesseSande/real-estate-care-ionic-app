<template>
  <ion-page>
    <ion-header>
      <IonHeaderComponent />
    </ion-header>
    <ion-content :fullscreen="true">
      <h1>Informatie</h1>
      <p>Dit is een informatiepagina. 
      Op deze pagina wordt in de uiteindelijke app belangrijke informatie over de app genoemd.
      In deze demoversie is dat niet het geval.</p>
      <p>Deze demoversie van de Real Estate Care case is gemaakt door Jesse van de Sande.</p>
      <p>Versie: juli 2024</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { notifications, settings } from 'ionicons/icons';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>