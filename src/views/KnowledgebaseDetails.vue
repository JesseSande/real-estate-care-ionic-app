<!-- Via deze component wordt het overzicht van de kennisbase zichtbaar -->

<template>
  <ion-page>
    <TheHeader />
    <ion-content :fullscreen="true">
      <h1>Kennisbase</h1>
      <ion-list lines="none">
        <ion-item
          class="knowledgebaseItemOverview" 
          :detail="true" 
          v-for="item in knowledgebaseItems" 
          :key="item.id" 
          @click="selectItem(item)">
            <ion-label>
              <h2 class="knowledgebaseItemTitle">{{ item.title }}</h2>
            </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <TheTabBar />
  </ion-page>
</template>

<script setup lang="ts">
  import { 
    ref, 
    computed, 
    onMounted 
  } from "vue";
  import { useKnowledgebaseStore } from "@/stores/knowledgebaseStore";
  import { useRouter } from "vue-router";
  import { 
    IonPage, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel 
  } from "@ionic/vue";
  import TheHeader from "@/components/TheHeader.vue";
  import TheTabBar from "@/components/TheTabBar.vue";

  interface KnowledgebaseItem {
    id: string;
    title: string;
  }

  const knowledgebaseStore = useKnowledgebaseStore();
  const router = useRouter();

  // Haalt alle kennisbase artikelen op zodra de component is gemounted 
  onMounted(async () => {
    await knowledgebaseStore.fetchKnowledgebaseItems();
  });

  const knowledgebaseItems = computed(() => knowledgebaseStore.items);

  const selectItem = (item: KnowledgebaseItem) => {
    router.push(`/kennisbase/${item.id}`);
  };
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";

  .knowledgebaseItemOverview {
    margin: 0.625rem 0;
    padding: 0.625rem;
    border: 1px solid var(--ion-color-firstcolor);
    border-radius: 4px; 
  }
  
  .knowledgebaseItemTitle {
    color: var(--ion-text-color);
    margin: 0;
  }
</style>
