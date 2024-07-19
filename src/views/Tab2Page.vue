<!-- Tweede tab in de opbouw van de applicatie, ofwel Zoeken -->

<template>
  <ion-page>
    <ion-header>
      <TheHeader />
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar 
        class="searchBar" 
        placeholder="Zoeken"
      ></ion-searchbar>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts"> 
  import { 
    IonPage, 
    IonHeader,  
    IonContent, 
    IonSearchbar 
  } from "@ionic/vue";
  import { defineComponent } from "vue";
  import TheHeader from "@/components/TheHeader.vue";
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";

  .searchBar {
    --background: var(--ion-searchbar-background);
    --color: var(--ion-searchbar-color);
    margin: 0.75rem 0;
}
</style>