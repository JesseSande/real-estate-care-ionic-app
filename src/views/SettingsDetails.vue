<!-- Via deze component worden de instellingen zichtbaar. Code m.b.t. de dark mode toggle is 
afkomstig van: https://ionicframework.com/docs/theming/dark-mode --> 

<template>
  <ion-page>
    <TheHeader />
    <ion-content>
      <h1>Instellingen</h1>
      <ion-grid 
        class="settingsGrid" 
        :fixed="true">
          <ion-row class="centeredRow">
            <ion-col class="firstColumn">
              <h2>Accountgegevens</h2>
            </ion-col>
            <ion-col class="secondColumn">
              <ion-button 
                id="oopsAlertSettings" 
                fill="clear"
              >Wijzigen</ion-button>
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
      <img 
        class="profilePicture" 
        src="@/assets/headshot-silhouette-clipart.png" 
        alt="Profielfoto demo account"
      >
      <h4>Gebruikersnaam</h4>
      <p>Demo Account</p>
      <h4>E-mailadres</h4>
      <p>demo@email.com</p>
      <hr>
      <h2>Accountinstellingen</h2>
      <ion-list :inset="true">
        <ion-item class="settingsListItem">
          <ion-toggle 
            :checked="paletteToggle" 
            @ionChange="toggleChange($event)" 
            justify="space-between"
          >Donkere modus</ion-toggle>
        </ion-item>
        <ion-item class="settingsListItem" 
          id="oopsAlertNotifications" 
          button="true"
        >Meldingen</ion-item>
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
      <ion-button 
        class="visibleButton" 
        expand="block" 
        @click="logout"
      >Uitloggen</ion-button>
    </ion-content>
    <TheTabBar />
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
    IonButton,
    IonAlert,   
    IonList, 
    IonItem, 
    IonToggle 
  } from '@ionic/vue';
  import type { ToggleCustomEvent } from '@ionic/vue';
  import TheHeader from '@/components/TheHeader.vue';
  import TheTabBar from '@/components/TheTabBar.vue';

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const paletteToggle = ref(false);

  // Gebruik matchMedia om de gebruikersvoorkeur te checken
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Toevoegen of verwijderen van de "ion-palette-dark" class op het html element
  const toggleDarkPalette = (shouldAdd) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  };

  // Aan- of uitzetten van de toggle en de palet updaten gebaseerd op isDark
  const initializeDarkPalette = (isDark) => {
    paletteToggle.value = isDark;
    toggleDarkPalette(isDark);
  };

  // Initialiseer het donkere palet gebaseerd op de initiële waarde van de prefers-color-scheme media query
  initializeDarkPalette(prefersDark.matches);

  // Event listener voor veranderingen aan de prefers-color-scheme media query
  prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

  // Event listener voor het aan- of uitzetten van de toggle voor het donkere palet
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkPalette(ev.detail.checked);
  };
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
  
  .settingsListItem {
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
  
  #oopsAlertSettings {
    text-decoration: underline;
    color: var(--ion-color-firstcolor);
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
</style>