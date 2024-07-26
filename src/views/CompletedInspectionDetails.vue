<!-- Via deze component worden de details zichtbaar van de afgeronde inspectie die is aangeklikt -->

<template>
    <ion-page>
        <TheHeader />
        <ion-content>
            <h1>Inspectie Details</h1>
            <div v-if="inspection">
                <!-- Algemene details die voor elk soort inspectie worden getoond. -->
                <p><strong>Locatie:</strong> {{ inspection.location }}</p>
                <p><strong>Datum:</strong> {{ inspection.date }}</p>
                <p><strong>Type:</strong> {{ inspection.type }}</p>
        
                <div v-if="inspection.details">
                    <!-- Details voor de inspectie schade opnemen -->
                    <div v-if="inspection.details.damageInspection">
                        <h2>Schade informatie:</h2>
                        <p><strong>Locatie:</strong> {{ inspection.details.damageInspection.location }}</p>
                        <p><strong>Nieuwe schade:</strong> {{ inspection.details.damageInspection.newDamage ? "Ja" : "Nee" }}</p>
                        <p><strong>Soort schade:</strong> {{ inspection.details.damageInspection.damageType }}</p>
                        <p><strong>Datum uitgevoerd:</strong> {{ inspection.details.damageInspection.damageDate }}</p>
                        <p><strong>Acute actie vereist:</strong> {{ inspection.details.damageInspection.immediateActionRequired ? "Ja" : "Nee" }}</p>
                        <p><strong>Omschrijving:</strong> {{ inspection.details.damageInspection.damageDescription }}</p>
                        <div v-if="inspection.details.damageInspection.photos && inspection.details.damageInspection.photos.length">
                            <p><strong>Bewijsmateriaal:</strong></p>
                            <ul class="photoList">
                                <li 
                                    class="photoListItem"
                                    v-for="(photo, index) in inspection.details.damageInspection.photos" 
                                    :key="index">
                                        <img 
                                            :src="photo.webPath" 
                                            :alt="photo.fileName" 
                                            style="max-width: 100%; height: auto;" 
                                        />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Details voor de inspectie achterstallig onderhoud opnemen -->
                    <div v-if="inspection.details.maintenanceInspection">
                        <h2>Onderhoud informatie:</h2>
                        <p><strong>Locatie:</strong> {{ inspection.details.maintenanceInspection.location }}</p>
                        <p><strong>Soort onderhoud:</strong> {{ inspection.details.maintenanceInspection.maintenanceType }}</p>
                        <p><strong>Acute actie vereist:</strong> {{ inspection.details.maintenanceInspection.immediateActionRequired ? "Ja" : "Nee" }}</p>
                        <p><strong>Kostenindicatie:</strong> {{ inspection.details.maintenanceInspection.costEstimate }}</p>
                        <div v-if="inspection.details.maintenanceInspection.photos && inspection.details.maintenanceInspection.photos.length">
                            <p><strong>Bewijsmateriaal:</strong></p>
                            <ul class="photoList">
                                <li 
                                    class="photoListItem"
                                    v-for="(photo, index) in inspection.details.maintenanceInspection.photos" 
                                    :key="index">
                                        <img 
                                            :src="photo.webPath" 
                                            :alt="photo.fileName" 
                                            style="max-width: 100%; height: auto;" 
                                        />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Details voor de inspectie technische installaties inspecteren -->
                    <div v-if="inspection.details.installationInspection">
                        <h2>Installatie informatie:</h2>
                        <p><strong>Locatie:</strong> {{ inspection.details.installationInspection.location }}</p>
                        <p><strong>Soort installatie:</strong> {{ inspection.details.installationInspection.installationType }}</p>
                        <p><strong>Gemelde storingen:</strong> {{ inspection.details.installationInspection.reportedMalfunction }}</p>
                        <p><strong>Goedgekeurd:</strong> {{ inspection.details.installationInspection.approved ? "Ja" : "Nee" }}</p>
                        <p><strong>Opmerkingen:</strong> {{ inspection.details.installationInspection.comments }}</p>
                        <div v-if="inspection.details.installationInspection.photos && inspection.details.installationInspection.photos.length">
                            <p><strong>Bewijsmateriaal:</strong></p>
                            <ul class="photoList">
                                <li 
                                    class="photoListItem"
                                    v-for="(photo, index) in inspection.details.installationInspection.photos" 
                                    :key="index">
                                        <img 
                                            :src="photo.webPath" 
                                            :alt="photo.fileName" 
                                            style="max-width: 100%; height: auto;" 
                                        />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Details voor de inspectie modificaties inventariseren --> 
                    <div v-if="inspection.details.modificationInspection">
                        <h2>Modificatie informatie:</h2>
                        <p><strong>Locatie:</strong> {{ inspection.details.modificationInspection.modificationLocation }}</p>
                        <p><strong>Uitgevoerd door:</strong> {{ inspection.details.modificationInspection.performedBy }}</p>
                        <p><strong>Beschrijving:</strong> {{ inspection.details.modificationInspection.modificationDescription }}</p>
                        <p><strong>Te ondernemen actie:</strong> {{ inspection.details.modificationInspection.actionRequired }}</p>
                        <p><strong>Opmerkingen:</strong> {{ inspection.details.modificationInspection.modificationComments }}</p>
                        <div v-if="inspection.details.modificationInspection.photos && inspection.details.modificationInspection.photos.length">
                            <p><strong>Bewijsmateriaal:</strong></p>
                            <ul class="photoList">
                                <li 
                                    class="photoListItem"
                                    v-for="(photo, index) in inspection.details.modificationInspection.photos" 
                                    :key="index">
                                        <img 
                                            :src="photo.webPath" 
                                            :alt="photo.fileName" 
                                            style="max-width: 100%; height: auto;" 
                                        />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Button om inspectie te bewerken -->
                <ion-button 
                    class="visibleButton" 
                    @click="editInspection"
                >Inspectie bewerken</ion-button>
            </div>
            <div v-else>
                <p>Geen inspectie gevonden.</p>
            </div>
        </ion-content>
        <TheTabBar />
    </ion-page>
</template>

<script setup lang="ts">
    import { 
        ref, 
        onMounted 
    } from "vue";
    import { 
        useRoute, 
        useRouter 
    } from "vue-router";
    import { useInspectionStore } from "@/stores/inspectionStore";
    import { 
        IonPage, 
        IonContent, 
        IonButton 
    } from "@ionic/vue";
    import TheHeader from "@/components/TheHeader.vue";
    import TheTabBar from "@/components/TheTabBar.vue";

    // Definieer de interfaces voor de verschillende inspectie details
    interface Photo {
        fileName: string;
        webPath: string;
    }

    interface DamageInspection {
        location: string;
        newDamage: boolean;
        damageType: string;
        damageDate: string;
        immediateActionRequired: boolean;
        damageDescription: string;
        photos: Photo[];
    }

    interface MaintenanceInspection {
        location: string;
        maintenanceType: string;
        immediateActionRequired: boolean;
        costEstimate: string;
        photos: Photo[];
    }

    interface InstallationInspection {
        location: string;
        installationType: string;
        reportedMalfunction: string;
        approved: boolean;
        comments: string;
        photos: Photo[];
    }

    interface ModificationInspection {
        modificationLocation: string;
        performedBy: string;
        modificationDescription: string;
        actionRequired: string;
        modificationComments: string;
        photos: Photo[];
    }

    interface InspectionDetails {
        damageInspection?: DamageInspection;
        maintenanceInspection?: MaintenanceInspection;
        installationInspection?: InstallationInspection;
        modificationInspection?: ModificationInspection;
    }

    interface Inspection {
        id: string;
        location: string;
        date: string;
        type: string;
        details?: InspectionDetails;
    }

    const route = useRoute();
    const router = useRouter();
    const inspectionStore = useInspectionStore();
    const inspection = ref<Inspection | null>(null);

    onMounted(() => {
        const id = route.params.id as string;
        inspection.value = inspectionStore.completedInspections.find((insp: Inspection) => insp.id == id);
        console.log("Selected inspection:", inspection.value);
    });

    const editInspection = () => {
        if (inspection.value) {
            router.push(`/inspectie-bewerken/${inspection.value.id}`);
        } else {
            console.error("No inspection selected");
        }
    };
</script>

<style scoped>
    @import "../theme/styles.css";
    @import "../theme/variables.css";

    p {
        margin: 20px 0;
    }

    .photoList {
        list-style-type: none;
        padding: 0;
    }

    .photoListItem {
        margin: 5px 0;
    }
</style>
