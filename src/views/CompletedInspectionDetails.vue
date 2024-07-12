<template>
    <ion-page>
        <IonHeaderComponent />
        <ion-content>
            <h1>Inspectie Details</h1>
            <div v-if="inspection">
                <p><strong>Locatie:</strong> {{ inspection.location }}</p>
                <p><strong>Datum:</strong> {{ inspection.date }}</p>
                <p><strong>Type:</strong> {{ inspection.type }}</p>
                <div v-if="inspection.details">
                    <p><strong>Details:</strong></p>
                    <pre>{{ inspection.details }}</pre>
                </div>
            </div>
        </ion-content>
        <!--<IonTabsComponent />-->
    </ion-page>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useInspectionStore } from '@/stores/inspectionStore';
    import { IonPage, IonContent } from '@ionic/vue';
    import IonHeaderComponent from '@/components/IonHeaderComponent.vue';

    const route = useRoute();
    const inspectionStore = useInspectionStore();
    const inspection = ref(null);

    onMounted(() => {
        const id = route.params.id;
        inspection.value = inspectionStore.completedInspections.find((insp) => insp.id == id);
        console.log('Selected inspection:', inspection.value);
    });
</script>

<style scoped>
    @import '../theme/styles.css';
    @import '../theme/variables.css';

    h1, p {
        margin: 20px 0;
    }
</style>
