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
  import { ref, onMounted, computed } from "vue";
  import { useRoute } from "vue-router";
  import { useKnowledgebaseStore } from "@/stores/knowledgebaseStore";
  import { IonPage, IonContent } from "@ionic/vue";
  import TheHeader from "@/components/TheHeader.vue";
  import TheTabBar from "@/components/TheTabBar.vue";
  import ContentRenderer from "@/components/ContentRenderer.vue";
  import { Block } from '@/types/types';

  const route = useRoute();
  const knowledgebaseStore = useKnowledgebaseStore();
  const knowledgebaseItem = ref<{ title: string; content: string }>({ title: "", content: "" });

  onMounted(async () => {
    const id = route.params.id as string;
    knowledgebaseItem.value = await knowledgebaseStore.fetchKnowledgebaseItem(id);
  });

  // Content parsen in een gestructureerd format
  const parsedContent = computed<Block[]>(() => parseContent(knowledgebaseItem.value.content));

  // Functie om content in blokken te parsen
  function parseContent(content: string): Block[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const blocks: Block[] = [];
    doc.body.childNodes.forEach((node) => {
      blocks.push(parseNode(node as HTMLElement));
    });
    return blocks;
  }

  // Functie om individuele nodes te parsen
  function parseNode(node: HTMLElement): Block {
    const block: Block = {
      tag: node.nodeName.toLowerCase(),
      text: node.textContent,
      attrs: {},
      children: [],
    };

    if (node.attributes) {
      Array.from(node.attributes).forEach((attr) => {
        block.attrs[attr.name] = attr.value;
      });
    }

    if (node.childNodes) {
      node.childNodes.forEach((childNode) => {
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          block.children.push(parseNode(childNode as HTMLElement));
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
