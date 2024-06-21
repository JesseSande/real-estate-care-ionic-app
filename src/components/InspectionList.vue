/* Code in template en in script m.b.v. Chat-GPT4o */

<template>
    <div>
        <h1>Uitgevoerde inspecties</h1>
        <ul>
            <li v-for="inspection in sortedInspections" :key="inspection.id" @click="selectInspection(inspection)">
                <strong>{{ inspection.date.toLocaleString() }}</strong> - {{ inspection.location }} - {{ inspection.type }}
            </li>
        </ul>
        <InspectionDetails v-if="selectedInspection" :inspection="selectedInspection" />
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { fetchInspections } from '@/services/inspectionService';
    import Inspection from '@/models/Inspection';
    import InspectionDetails from '@/components/InspectionDetails.vue';

    const inspections = ref([]);
    const selectedInspection = ref(null);

    const sortedInspections = computed(() =>
        inspections.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    );

    onMounted(async () => {
        const data = await fetchInspections();
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
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid rgb(0,170,162);
        border-radius: 4px;
        color: rgb(41,52,57);
    }

    h1 {
        color: rgb(41,52,57);
    }
</style>