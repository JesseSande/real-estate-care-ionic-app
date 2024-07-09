<template>
  <router-link to="/instellingen-details" class="card">
    <ion-icon :icon="settings" class="icon"></ion-icon>
    <h2>Instellingen</h2>
  </router-link>
</template>

<script setup lang="ts">
  import { settings } from 'ionicons/icons';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>
