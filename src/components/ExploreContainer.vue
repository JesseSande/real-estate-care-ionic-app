<template>
  <!--<div id="container">
    <strong>{{ name }}</strong>
    <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
  </div>-->
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
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
}
</style>
