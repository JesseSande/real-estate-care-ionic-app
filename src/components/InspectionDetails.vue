/* Code m.b.v. Chat-GPT4o */

<template> 
  <div v-if="inspection">
    <h2>Details van de inspectie</h2>
    <p><strong>Locatie:</strong> {{ inspection.location }}</p>
    <p><strong>Datum:</strong> {{ inspection.date.toLocaleString() }}</p>
    <p><strong>Type:</strong> {{ inspection.type }}</p>
    <div v-if="inspection.details">
      <p><strong>Beschrijving:</strong> {{ inspection.details.description }}</p>
      <p v-if="inspection.details.newDamage !== undefined"><strong>Nieuwe schade:</strong> {{ inspection.details.newDamage }}</p>
      <p v-if="inspection.details.damageType"><strong>Soort schade:</strong> {{ inspection.details.damageType }}</p>
      <p v-if="inspection.details.immediateActionRequired !== undefined"><strong>Acute actie vereist:</strong> {{ inspection.details.immediateActionRequired }}</p>
      <p v-if="inspection.details.costEstimate"><strong>Kostenindicatie:</strong> {{ inspection.details.costEstimate }}</p>
      <p v-if="inspection.details.installationType"><strong>Soort installatie:</strong> {{ inspection.details.installationType }}</p>
      <p v-if="inspection.details.reportedMalfunction"><strong>Gemelde storingen:</strong> {{ inspection.details.reportedMalfunction }}</p>
      <p v-if="inspection.details.testProcedure"><strong>Testprocedure:</strong> <a :href="inspection.details.testProcedure" target="_blank">{{ inspection.details.testProcedure }}</a></p>
      <p v-if="inspection.details.approved !== undefined"><strong>Goedgekeurd:</strong> {{ inspection.details.approved }}</p>
      <p v-if="inspection.details.performedBy"><strong>Uitgevoerd door:</strong> {{ inspection.details.performedBy }}</p>
      <p v-if="inspection.details.actionRequired"><strong>Te ondernemen actie:</strong> {{ inspection.details.actionRequired }}</p>
      <p v-if="inspection.details.comments"><strong>Opmerkingen:</strong> {{ inspection.details.comments }}</p>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    inspection: Object
  });
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';
  
  p, h2 {
    color: rgb(41,52,57);
  }
</style>
