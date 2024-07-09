<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>

      <!--<ExploreContainer name="Tab 3 page" />-->
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
  import ExploreContainer from '@/components/ExploreContainer.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>
