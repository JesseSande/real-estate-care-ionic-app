<!-- Via deze component worden de details van het knowledgebase item waarop is geklikt zichtbaar --> 

<template>
  <ion-page>
    <TheHeader />
    <ion-content>
      <h1>{{ knowledgebaseItem.title }}</h1>
      <ContentRenderer :blocks="parsedContent" />
    </ion-content>
    <TheTabBar />
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useKnowledgebaseStore } from '@/stores/knowledgebaseStore';
  import { IonPage, IonContent } from '@ionic/vue';
  import TheHeader from '@/components/TheHeader.vue';
  import TheTabBar from '@/components/TheTabBar.vue';
  import ContentRenderer from '@/components/ContentRenderer.vue';

  const route = useRoute();
  const knowledgebaseStore = useKnowledgebaseStore();
  const knowledgebaseItem = ref({ title: '', content: '' });

  onMounted(async () => {
    const id = route.params.id;
    knowledgebaseItem.value = await knowledgebaseStore.fetchKnowledgebaseItem(id);
  });

  // Content parsen in een gestructureerd format
  const parsedContent = computed(() => parseContent(knowledgebaseItem.value.content));

  // Functie om content in blokken te parsen
  function parseContent(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const blocks = [];
    doc.body.childNodes.forEach((node) => {
      blocks.push(parseNode(node));
    });
    return blocks;
  }

  // Functie om individuele nodes te parsen
  function parseNode(node) {
    const block = {
      tag: node.nodeName.toLowerCase(),
      text: node.textContent,
      attrs: {},
      children: [],
    };

    if (node.attributes) {
      for (const attr of node.attributes) {
        block.attrs[attr.name] = attr.value;
      }
    }

    if (node.childNodes) {
      node.childNodes.forEach((childNode) => {
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          block.children.push(parseNode(childNode));
        }
      });
    }

    return block;
  }
</script>

<style scoped>
  @import "../theme/styles.css";
  @import "../theme/variables.css";
</style>
