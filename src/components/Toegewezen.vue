<template>
  <router-link to="/toegewezen-details" class="card">
    <ion-icon :icon="clipboard" class="icon"></ion-icon>
    <ion-text>
      <h2>Toegewezen</h2>
    </ion-text>
  </router-link>
</template>

<script setup lang="ts">
  import { clipboard } from 'ionicons/icons';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  h2 {
    color: var(--ion-text-color);
  }
</style>
