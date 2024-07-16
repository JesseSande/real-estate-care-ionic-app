<!--Code m.b.t. de dark mode toggle is afkomstig van: https://ionicframework.com/docs/theming/dark-mode --> 

<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <h1>Instellingen</h1>
      <ion-grid class="settingsGrid" :fixed="true">
        <ion-row class="centeredRow">
          <ion-col class="firstColumn">
            <h2>Accountgegevens</h2>
          </ion-col>
          <ion-col class="secondColumn">
            <ion-button id="oopsAlertSettings" fill="clear" >Wijzigen</ion-button>
            <ion-alert
              trigger="oopsAlertSettings"
              header="Accountgegevens wijzigen"
              sub-header="Oeps&excl;"
              message="Deze functionaliteit is nog niet uitgewerkt."
              :buttons="['OK']"
            ></ion-alert>
          </ion-col>
        </ion-row>
      </ion-grid>
      <img class="profilePicture" src="@/assets/headshot-silhouette-clipart.png" alt="Profielfoto demo account">
      <h4>Gebruikersnaam</h4>
      <p>Demo Account</p>
      <h4>E-mailadres</h4>
      <p>demo@email.com</p>
      <hr>
      <h2>Accountinstellingen</h2>
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between">Donkere modus</ion-toggle>
        </ion-item>
        <ion-item id="oopsAlertNotifications" button="true">Meldingen</ion-item>
        <ion-alert
          trigger="oopsAlertNotifications"
          header="Meldingen instellen"
          sub-header="Oeps&excl;"
          message="Deze functionaliteit is nog niet uitgewerkt."
          :buttons="['OK']"
      ></ion-alert>
      </ion-list>
      <hr>
      <h2>Uitloggen</h2>
      <ion-button class="visibleButton" expand="block" @click="logout">Uitloggen</ion-button>
    </ion-content>
    <IonTabBarComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { 
    IonPage, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonList, 
    IonItem, 
    IonToggle, 
    IonButton, 
    IonIcon, 
    IonAlert 
  } from '@ionic/vue';
  import type { ToggleCustomEvent } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import IonTabsComponent from '@/components/IonTabsComponent.vue';
  import IonTabBarComponent from '@/components/IonTabBarComponent.vue';

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const paletteToggle = ref(false);

  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPalette = (shouldAdd) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (isDark) => {
    paletteToggle.value = isDark;
    toggleDarkPalette(isDark);
  };

  // Initialize the dark palette based on the initial
  // value of the prefers-color-scheme media query
  initializeDarkPalette(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

  // Listen for the toggle check/uncheck to toggle the dark palette
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkPalette(ev.detail.checked);
  };
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
  
  h2 {
    color: var(--ion-color-firstcolor);
  }
  
  ion-item {
    --margin: 0px;
    font-size: 1.25rem;
  }

  .profilePicture {
    height: 3.75rem;
    border-radius: 50%;
  }

  .visibleButton {
    margin: 1rem;
  }

  /* Styling rij van h2 kop Accountgegevens */
  .settingsGrid {
    width: 100%;
    padding: 0;
    margin: -1.25rem 0 0 0;
  }

  .centeredRow {
    display: flex;
    align-items: center;
  }

  .firstColumn {
    text-align: left;
    padding: 0;
  }

  .secondColumn {
    text-align: right;
    padding: 0;
  }

  #oopsAlertSettings {
    text-decoration: underline;
    color: var(--ion-color-firstcolor);
  }
</style>