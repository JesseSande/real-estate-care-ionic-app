<!-- Code m.b.v. ChatGPT4o. Doel van het component is het gebruik van v-html vermijden -->

<template>
  <div>
    <component 
        v-for="(block, index) in blocks" 
        :is="block.tag" 
        :key="index" 
        v-bind="block.attrs">
            <ContentRenderer 
                v-if="block.children" 
                :blocks="block.children" />
                    {{ block.text }}
    </component>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  blocks: {
    type: Array,
    required: true,
  },
});
</script>