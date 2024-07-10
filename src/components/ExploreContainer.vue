ExploreContainer.vue:
<template>
  <div class="grid-container">
    <Toegewezen />
    <Afgerond />
    <Kennisbase />
    <Instellingen />
  </div>
</template>

<script setup lang="ts">
  defineProps({
    name: String,
  });

  import Toegewezen from '@/components/Toegewezen.vue';
  import Afgerond from '@/components/Afgerond.vue';
  import Kennisbase from '@/components/Kennisbase.vue';
  import Instellingen from '@/components/Instellingen.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 90%;
    gap: 1rem;
    padding-top: 1rem;
    text-align: center;
  }

  .grid-container a {
    padding: 0px;
    text-decoration: none;
  }
</style>