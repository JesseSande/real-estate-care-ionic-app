<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <h1>{{ knowledgebaseItem.title }}</h1>
      <div v-html="knowledgebaseItem.content"></div>
    </ion-content>
    <IonTabBarComponent />
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useKnowledgebaseStore } from '@/stores/knowledgebaseStore';
  import { IonPage, IonContent } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import IonTabBarComponent from '@/components/IonTabBarComponent.vue';

  const route = useRoute();
  const knowledgebaseStore = useKnowledgebaseStore();
  const knowledgebaseItem = ref({ title: '', content: '' });

  onMounted(async () => {
    const id = route.params.id;
    knowledgebaseItem.value = await knowledgebaseStore.fetchKnowledgebaseItem(id);
  });
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  h1 {
    margin: 20px 0;
  }

  p {
    white-space: pre-line;
  }
</style>
