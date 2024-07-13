ExploreContainer.vue:
<template>
  <div class="grid-container">
    <Assigned />
    <Completed />
    <Knowledgebase />
    <Settings />
  </div>
</template>

<script setup lang="ts">
  defineProps({
    name: String,
  });

  import Assigned from '@/components/Assigned.vue';
  import Completed from '@/components/Completed.vue';
  import Knowledgebase from '@/components/Knowledgebase.vue';
  import Settings from '@/components/Settings.vue';
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 95%;
    gap: 1rem;
    padding-top: 1rem;
    text-align: center;
  }

  .grid-container a {
    padding: 0px;
    text-decoration: none;
  }
</style>