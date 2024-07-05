<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <p>Details van instellingen komen hier.</p>
      <ion-button class="afmeldenButton" expand="block" @click="logout">Uitloggen</ion-button>
    </ion-content>
    <IonTabsComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import IonTabsComponent from '@/components/IonTabsComponent.vue';

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };
</script>

<style scoped>
  .afmeldenButton {
        margin: 15px;
        --background: rgb(0, 170, 162);
        --background-activated: rgb(92, 201, 195);
        --background-focused: rgb(92, 201, 195);
  }

  ion-content {
    --padding-start: 20px;
    --padding-end: 20px;
  }
</style>
