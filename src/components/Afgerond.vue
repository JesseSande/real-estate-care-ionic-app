<template>
  <router-link to="/afgerond-details" class="card">
    <ion-icon :icon="checkmarkCircle" class="icon"></ion-icon>
    <p>Afgerond</p>
  </router-link>
</template>

<script setup lang="ts">
    import { checkmarkCircle } from 'ionicons/icons';
</script>

<style scoped>
@import '../theme/styles.css';
</style>
