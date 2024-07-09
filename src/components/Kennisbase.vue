<template>
  <router-link to="/kennisbase-details" class="card">
    <ion-icon :icon="folder" class="icon"></ion-icon>
    <ion-text>
      <h2>Kennisbase</h2>
    </ion-text>
  </router-link>
</template>

<script setup lang="ts">
  import { folder } from 'ionicons/icons';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  h2 {
    color: var(--ion-text-color);
  }
</style>
