<template>
  <router-link to="/settings-details" class="card">
    <ion-icon :icon="settings" class="icon"></ion-icon>
    <ion-text>
      <h2>Instellingen</h2>
    </ion-text>
  </router-link>
</template>

<script setup lang="ts">
  import { settings } from 'ionicons/icons';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  h2 {
    color: var(--ion-text-color);
  }
</style>