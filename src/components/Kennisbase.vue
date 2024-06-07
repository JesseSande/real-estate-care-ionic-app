<template>
  <router-link to="/kennisbase-details" class="card">
    <ion-icon :icon="folder" class="icon"></ion-icon>
    <p>Kennisbase</p>
  </router-link>
</template>

<script setup lang="ts">
    import { folder } from 'ionicons/icons';
</script>

<style scoped>
@import '../theme/styles.css';
</style>
