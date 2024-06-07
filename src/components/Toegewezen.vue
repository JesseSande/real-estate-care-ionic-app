<template>
  <router-link to="/toegewezen-details" class="card">
    <ion-icon :icon="clipboard" class="icon"></ion-icon>
    <p>Toegewezen</p>
  </router-link>
</template>

<script setup lang="ts">
    import { clipboard } from 'ionicons/icons';
</script>

<style scoped>
@import '../theme/styles.css';
</style>
