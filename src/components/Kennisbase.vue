<template>
  <router-link to="/kennisbase-details" class="card">
    <ion-icon :icon="folder" class="icon"></ion-icon>
    <h2>Kennisbase</h2>
  </router-link>
</template>

<script setup lang="ts">
    import { folder } from 'ionicons/icons';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
</style>
