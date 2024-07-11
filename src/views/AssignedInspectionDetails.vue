<template>
    <ion-page>
        <IonHeaderComponent />
        <ion-content>
            <h1>Inspectie Details</h1>
            <div v-if="inspection">
                <p><strong>Locatie:</strong> {{ inspection.location }}</p>
                <p><strong>Datum:</strong> {{ inspection.date }}</p>
                <p><strong>Type:</strong> {{ inspection.type }}</p>

                <!-- Controleer of options beschikbaar zijn voordat ze worden gerenderd -->
                <div v-if="options">
                    <!-- Opties voor inspectie -->
                    <ion-list>
                        <ion-item>
                            <ion-checkbox v-model="options.damageRecording" slot="start"></ion-checkbox>
                            <ion-label>Schade opnemen</ion-label>
                        </ion-item>
                        <div v-if="options.damageRecording">
                            <ion-item>
                                <ion-label position="stacked">Locatie</ion-label>
                                <ion-input v-model="inspectionDetails.damageLocation" placeholder="Voer locatie in"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">Nieuwe schade</ion-label>
                                <ion-radio-group v-model="inspectionDetails.newDamage">
                                    <ion-item lines="none">
                                        <ion-label>Ja</ion-label>
                                        <ion-radio slot="start" value="ja"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Nee</ion-label>
                                        <ion-radio slot="start" value="nee"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">Soort schade</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.damageType" placeholder="Selecteer soort schade">
                                    <ion-select-option value="moedwillig">Moedwillig</ion-select-option>
                                    <ion-select-option value="slijtage">Slijtage</ion-select-option>
                                    <ion-select-option value="geweld">Geweld</ion-select-option>
                                    <ion-select-option value="normaal gebruik">Normaal gebruik</ion-select-option>
                                    <ion-select-option value="calamiteit">Calamiteit</ion-select-option>
                                    <ion-select-option value="anders">Anders</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">Datum</ion-label>
                                <ion-datetime-button class="visibleDatetimeButton" datetime="datetime"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime id="datetime"></ion-datetime>
                                </ion-modal>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">Acute actie vereist</ion-label>
                                <ion-radio-group v-model="inspectionDetails.immediateActionRequired">
                                    <ion-item lines="none">
                                        <ion-label>Ja</ion-label>
                                        <ion-radio slot="start" value="ja"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Nee</ion-label>
                                        <ion-radio slot="start" value="nee"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">Omschrijving</ion-label>
                                <ion-textarea v-model="inspectionDetails.damageDescription" placeholder="Voer omschrijving in"></ion-textarea>
                            </ion-item>
                        </div>
                    </ion-list>
                </div>
                <ion-button class="visibleButton" @click="completeInspection">Inspectie afronden</ion-button>
            </div>
     </ion-content>
    <!--<IonTabsComponent />-->
    </ion-page>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useInspectionStore } from '@/stores/inspectionStore';
    import { 
        IonPage, 
        IonContent, 
        IonList, 
        IonItem, 
        IonLabel, 
        IonCheckbox, 
        IonButton, 
        IonInput, 
        IonSelect, 
        IonSelectOption, 
        IonDatetime,
        IonDatetimeButton, 
        IonModal,
        IonTextarea, 
        IonRadio, 
        IonRadioGroup 
    } from '@ionic/vue';
    import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
    import IonTabsComponent from '@/components/IonTabsComponent.vue';

    const route = useRoute();
    const inspectionStore = useInspectionStore();
    const inspection = ref(null);

    const options = ref(null);
    const inspectionDetails = ref({
        damageLocation: '',
        newDamage: false,
        damageType: '',
        damageDate: '',
        immediateActionRequired: false,
        damageDescription: ''
    });

    onMounted(() => {
        const id = route.params.id;
        inspection.value = inspectionStore.assignedInspections.find((insp) => insp.id == id);
        console.log('Selected inspection:', inspection.value);  // Voeg deze regel toe voor debugging

        // Initialiseer options nadat de inspectie is gevonden
        options.value = {
            damageRecording: false,
            maintenanceRecording: false,
            installationInspection: false,
            modificationInventory: false
        };
    });

    const completeInspection = () => {
        // Logica om de inspectie als afgerond te markeren
        alert('Inspectie afgerond!');
    };
</script>

<style scoped>
    @import '../theme/styles.css';
    @import '../theme/variables.css';

    h1, h2 {
        margin: 20px 0;
    }

    p, ion-item {
        margin: 1rem 0;
    }

    .visibleButton {
        margin-top: 20px;
    }

    /*Checkbox stylen zodat het ook lijkt op een checkbox (vierkant) i.p.v. een radio button (rond). O.b.v. https://ionicframework.com/docs/api/checkbox */
    ion-checkbox {
        --size: 1.5rem;
        --checkbox-background-checked: var(--ion-color-firstcolor);
    }

    ion-checkbox::part(container) {
        border-radius: 6px;
        border: 2px solid var(--ion-color-firstcolor);
    }

    /*Radio stylen zodat het ook lijkt op een radio button. O.b.v. https://ionicframework.com/docs/api/radio */
    ion-radio {
        --border-radius: 4px;
        --inner-border-radius: 4px;

        --color: white;
        --color-checked: var(--ion-color-firstcolor);
    }

    ion-radio.ios::part(container) {
        width: 1.5rem;
        height: 1.5rem;

        border: 2px solid var(--ion-color-firstcolor);
        border-radius: 50%;
    }

    .radio-checked.ios::part(container) {
        border-color: var(--ion-color-firstcolor);
    }

    .visibleDatetimeButton {
        padding: 1rem;
    }
</style>
