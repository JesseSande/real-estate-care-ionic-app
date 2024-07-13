<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content :fullscreen="true">
      <h1>Kennisbase</h1>
      <ion-list lines="none">
        <ion-item detail="true" v-for="item in knowledgebaseItems" :key="item.id" @click="selectItem(item)">
          <ion-label>
            <h2>{{ item.title }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <IonTabBarComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useKnowledgebaseStore } from '@/stores/knowledgebaseStore';
  import { useRouter } from 'vue-router';
  import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import IonTabBarComponent from '@/components/IonTabBarComponent.vue';

  const knowledgebaseStore = useKnowledgebaseStore();
  const router = useRouter();

  onMounted(async () => {
    await knowledgebaseStore.fetchKnowledgebaseItems();
  });

  const knowledgebaseItems = computed(() => knowledgebaseStore.items);

  const selectItem = (item) => {
    router.push(`/knowledgebase-details/${item.id}`);
  };
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  h1 {
    margin: 20px 0;
  }

  ion-item {
    margin: 0.625rem 0;
    padding: 0.625rem;
    border: 1px solid var(--ion-color-firstcolor);
    border-radius: 4px; 
  }
  
  ion-label h2 {
    color: var(--ion-color-secondcolor);
    margin: 0;
  }
</style>
