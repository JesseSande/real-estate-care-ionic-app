/* Code in template en in script m.b.v. Chat-GPT4o */

<template>
    <div>
        <h1>Uitgevoerde inspecties</h1>
        <ul>
            <li v-for="inspection in sortedInspections" :key="inspection.id" @click="selectInspection(inspection)">
                <strong>{{ inspection.date.toLocaleString() }}</strong> - {{ inspection.location }} - {{ inspection.type }}
            </li>
        </ul>
        <CompletedInspectionDetails v-if="selectedInspection" :inspection="selectedInspection" />
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { fetchCompletedInspections } from '@/services/inspectionService';
    import Inspection from '@/models/Inspection';
    import CompletedInspectionDetails from '@/components/CompletedInspectionDetails.vue';

    const inspections = ref([]);
    const selectedInspection = ref(null);

    const sortedInspections = computed(() =>
        inspections.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    );

    onMounted(async () => {
        const data = await fetchCompletedInspections();
        if (Array.isArray(data)) {
            inspections.value = data.map(item => new Inspection(item));
        } else {
            console.error('Expected an array but got:', data);
        }
    });

    const selectInspection = (inspection) => {
        selectedInspection.value = inspection;
    };
</script>

<style scoped>
    @import '../theme/styles.css';
    @import '../theme/variables.css';

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0.625rem 0;
        padding: 0.625rem;
        border: 1px solid var(--ion-color-firstcolor);
        border-radius: 4px;
    }
</style>