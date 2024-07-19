ExploreContainer.vue:
<template>
  <div class="grid-container">
    <AssignedPage />
    <CompletedPage />
    <KnowledgebasePage />
    <SettingsPage />
  </div>
</template>

<script setup lang="ts">
  defineProps({
    name: String,
  });

  import AssignedPage from "@/components/AssignedPage.vue";
  import CompletedPage from "@/components/CompletedPage.vue";
  import KnowledgebasePage from "@/components/KnowledgebasePage.vue";
  import SettingsPage from "@/components/SettingsPage.vue";
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";

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