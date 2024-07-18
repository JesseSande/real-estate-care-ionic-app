<template>
    <ion-page>
        <IonHeaderComponent />
        <ion-content>
            <h1>Inspectie Details</h1>
            <div v-if="inspection">
                <p><strong>Locatie:</strong> {{ inspection.location }}</p>
                <p><strong>Datum:</strong> {{ inspection.date }}</p>
                <p><strong>Type:</strong> {{ inspection.type }}</p>

                <h2>Inspectie aanpassen:</h2>
                <!-- Controleer of options beschikbaar zijn voordat ze worden gerenderd -->
                <div v-if="options">
                    <!-- Opties voor inspectie -->
                    <ion-list>

                        <!-- Schade opnemen -->
                        <ion-item>
                            <ion-checkbox v-model="options.damageInspection" slot="start" id="damageInspectionCheckbox"></ion-checkbox>
                            <ion-label><strong>Schade opnemen</strong></ion-label>
                        </ion-item>
                        <div v-if="options.damageInspection">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.damageLocation}">
                                <ion-label position="stacked">Locatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input v-model="inspectionDetails.damageLocation" id="damageLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>
                            <p v-if="errors.damageLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Nieuwe schade (radio ja/nee, verplicht) -->
                            <ion-item :class="{'input-error': errors.newDamage}">
                                <ion-label position="stacked">Nieuwe schade<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group v-model="inspectionDetails.newDamage" id="newDamageRadioGroup">
                                    <ion-item lines="none">
                                        <ion-label>Ja</ion-label>
                                        <ion-radio slot="start" id="newDamageYes" value="ja"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Nee</ion-label>
                                        <ion-radio slot="start" id="newDamageNo" value="nee"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.newDamage" class="error-message">Dit veld is verplicht.</p>

                            <!-- Soort schade (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.damageType}">
                                <ion-label position="stacked">Soort schade<span class="required"> (verplicht)</span></ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.damageType" id="damageTypeSelect" placeholder="Selecteer soort schade">
                                    <ion-select-option value="moedwillig">Moedwillig</ion-select-option>
                                    <ion-select-option value="slijtage">Slijtage</ion-select-option>
                                    <ion-select-option value="geweld">Geweld</ion-select-option>
                                    <ion-select-option value="normaal gebruik">Normaal gebruik</ion-select-option>
                                    <ion-select-option value="calamiteit">Calamiteit</ion-select-option>
                                    <ion-select-option value="anders">Anders</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <p v-if="errors.damageType" class="error-message">Dit veld is verplicht.</p>

                            <!-- Datum (input met datum keuze, verplicht) --> 
                            <ion-item :class="{'input-error': errors.damageDate}">
                                <ion-label position="stacked">Datum<span class="required"> (verplicht)</span></ion-label>
                                <ion-datetime-button class="visibleDatetimeButton" datetime="datetime"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime v-model="inspectionDetails.damageDate" id="datetime"></ion-datetime>
                                </ion-modal>
                            </ion-item>
                            <p v-if="errors.damageDate" class="error-message">Dit veld is verplicht.</p>

                            <!-- Acute actie vereist (radio ja/nee, verplicht) -->
                            <ion-item :class="{'input-error': errors.immediateActionRequired}">
                                <ion-label position="stacked">Acute actie vereist<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group v-model="inspectionDetails.immediateActionRequired" id="immediateActionRadioGroup">
                                    <ion-item lines="none">
                                        <ion-label>Ja</ion-label>
                                        <ion-radio slot="start" id="immediateActionYes" value="ja"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Nee</ion-label>
                                        <ion-radio slot="start" id="immediateActionNo" value="nee"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.immediateActionRequired" class="error-message">Dit veld is verplicht.</p>

                            <!-- Omschrijving (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.damageDescription}">
                                <ion-label position="stacked">Omschrijving<span class="required"> (verplicht)</span></ion-label>
                                <ion-textarea v-model="inspectionDetails.damageDescription" id="damageDescriptionInput" placeholder="Voer omschrijving in"></ion-textarea>
                            </ion-item>
                            <p v-if="errors.damageDescription" class="error-message">Dit veld is verplicht.</p>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('damageInspection')" id="damagePhotoUpload">Maak of upload een foto</ion-button>
                                <ul>
                                    <li v-for="(photo, index) in photos.damageInspection" :key="index">
                                        {{ photo.fileName }}
                                        <ion-button fill="clear" @click="confirmDeletePhoto('damageInspection', index)">
                                            <ion-icon :icon="trash"></ion-icon>
                                        </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>
                

                        <!-- Achterstallig onderhoud opnemen -->
                        <ion-item>
                            <ion-checkbox v-model="options.maintenanceInspection" slot="start" id="maintenanceInspectionCheckbox"></ion-checkbox>
                            <ion-label><strong>Achterstallig onderhoud opnemen</strong></ion-label>
                        </ion-item>
                        <div v-if="options.maintenanceInspection">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.maintenanceLocation}">
                                <ion-label position="stacked">Locatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input v-model="inspectionDetails.maintenanceLocation" id="maintenanceLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>
                            <p v-if="errors.maintenanceLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Soort onderhoud (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.maintenanceType}">
                                <ion-label position="stacked">Soort onderhoud<span class="required"> (verplicht)</span></ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.maintenanceType" id="maintenanceTypeSelect" placeholder="Selecteer soort onderhoud">
                                    <ion-select-option value="schilderwerk">Schilderwerk</ion-select-option>
                                    <ion-select-option value="houtrot">Houtrot</ion-select-option>
                                    <ion-select-option value="elektra">Elektra</ion-select-option>
                                    <ion-select-option value="leidingwerk">Leidingwerk</ion-select-option>
                                    <ion-select-option value="beglazing">Beglazing</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <p v-if="errors.maintenanceType" class="error-message">Dit veld is verplicht.</p>

                            <!-- Acute actie vereist (radio ja/nee, verplicht) -->
                            <ion-item :class="{'input-error': errors.maintenanceImmediateActionRequired}">
                                <ion-label position="stacked">Acute actie vereist<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group v-model="inspectionDetails.maintenanceImmediateActionRequired" id="maintenanceImmediateActionRadioGroup">
                                    <ion-item lines="none">
                                        <ion-label>Ja</ion-label>
                                        <ion-radio slot="start" id="maintenanceImmediateActionYes" value="ja"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Nee</ion-label>
                                        <ion-radio slot="start" id="maintenanceImmediateActionNo" value="nee"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.maintenanceImmediateActionRequired" class="error-message">Dit veld is verplicht.</p>

                            <!-- Kostenindicatie (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.maintenanceCostEstimate}">
                                <ion-label position="stacked">Kostenindicatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.maintenanceCostEstimate" id="maintenanceCostEstimateSelect" placeholder="Selecteer kostenindicatie">
                                    <ion-select-option value="0-500">0-500</ion-select-option>
                                    <ion-select-option value="500-1500">500-1500</ion-select-option>
                                    <ion-select-option value="1500+">1500+</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <p v-if="errors.maintenanceCostEstimate" class="error-message">Dit veld is verplicht.</p>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('maintenanceInspection')">Maak of upload een foto</ion-button>
                                <ul>
                                    <li v-for="(photo, index) in photos.maintenanceInspection" :key="index">
                                        {{ photo.fileName }}
                                        <ion-button fill="clear" @click="confirmDeletePhoto('maintenanceInspection', index)" id="maintenancePhotoUpload">
                                            <ion-icon :icon="trash"></ion-icon>
                                        </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>
                

                        <!-- Technische installaties inspecteren -->
                        <ion-item>
                            <ion-checkbox v-model="options.installationInspection" slot="start" id="installationInspectionCheckbox"></ion-checkbox>
                            <ion-label><strong>Technische installaties inspecteren</strong></ion-label>
                        </ion-item>
                        <div v-if="options.installationInspection">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.installationLocation}">
                                <ion-label position="stacked">Locatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input v-model="inspectionDetails.installationLocation" id="installationLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>
                            <p v-if="errors.installationLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Soort installatie (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.installationType}">
                                <ion-label position="stacked">Soort installatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.installationType" id="installationTypeSelect" placeholder="Selecteer soort installatie">
                                    <ion-select-option value="koeling">Koeling</ion-select-option>
                                    <ion-select-option value="verwarming">Verwarming</ion-select-option>
                                    <ion-select-option value="luchtverversing">Luchtverversing</ion-select-option>
                                    <ion-select-option value="elektra">Elektra</ion-select-option>
                                    <ion-select-option value="beveiliging">Beveiliging</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <p v-if="errors.installationType" class="error-message">Dit veld is verplicht.</p>

                            <!-- Gemelde storingen (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.reportedMalfunction}">
                                <ion-label position="stacked">Gemelde storingen<span class="required"> (verplicht)</span></ion-label>
                                <ion-textarea v-model="inspectionDetails.reportedMalfunction" id="reportedMalfunctionInput" placeholder="Voer gemelde storingen in"></ion-textarea>
                            </ion-item>
                            <p v-if="errors.reportedMalfunction" class="error-message">Dit veld is verplicht.</p>

                            <!-- Testprocedure (link naar knowledgebase item) -->
                            <ion-item>
                                <ion-label position="stacked">Testprocedure</ion-label>
                                <ion-button class="visibleButton" @click="goToKnowledgebaseItem('testProcedure')" id="testProcedureLink">Bekijk testprocedure</ion-button>
                            </ion-item>

                            <!-- Goedgekeurd (radio ja/nee, verplicht) -->
                            <ion-item :class="{'input-error': errors.approved}">
                                <ion-label position="stacked">Goedgekeurd<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group v-model="inspectionDetails.approved" id="approvedRadioGroup">
                                    <ion-item lines="none">
                                        <ion-label>Ja</ion-label>
                                        <ion-radio slot="start" id="approvedYes" value="ja"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Nee</ion-label>
                                        <ion-radio slot="start" id="approvedNo" value="nee"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.approved" class="error-message">Dit veld is verplicht.</p>

                            <!-- Opmerkingen (tekstveld (area), niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Opmerkingen</ion-label>
                                <ion-textarea v-model="inspectionDetails.installationComments" id="installationCommentsInput" placeholder="Voer opmerkingen in"></ion-textarea>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('installationInspection')" id="installationPhotoUpload">Maak of upload een foto</ion-button>
                                <ul>
                                    <li v-for="(photo, index) in photos.installationInspection" :key="index">
                                        {{ photo.fileName }}
                                        <ion-button fill="clear" @click="confirmDeletePhoto('installationInspection', index)">
                                            <ion-icon :icon="trash"></ion-icon>
                                        </ion-button>
                                    </li>
                                </ul>
                            </ion-item>                            
                        </div>


                        <!-- Modificaties inventariseren -->
                        <ion-item>
                            <ion-checkbox v-model="options.modificationInspection" slot="start" id="modificationInspectionCheckbox"></ion-checkbox>
                            <ion-label><strong>Modificaties inventariseren</strong></ion-label>
                        </ion-item>
                        <div v-if="options.modificationInspection">

                            <!-- Huidige documentatie (link naar pdf) -->
                            <ion-item>
                                <ion-label position="stacked">Bestaande situatie en gedocumenteerde modificaties</ion-label>
                                <ion-button class="visibleButton" href="/pdf/Documentatie_modificatie_Kennedylaan198.pdf" target="_blank" id="modificationDocumentationLink">Bekijk documentatie</ion-button>
                            </ion-item>

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.modificationLocation}">
                                <ion-label position="stacked">Locatie aangetroffen modificatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input v-model="inspectionDetails.modificationLocation" id="modificationLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>
                            <p v-if="errors.modificationLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Uitgevoerd door (radio keuzeopties, verplicht) -->
                            <ion-item :class="{'input-error': errors.performedBy}">
                                <ion-label position="stacked">Uitgevoerd door<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group v-model="inspectionDetails.performedBy" id="performedByRadioGroup">
                                    <ion-item lines="none">
                                        <ion-label>Huurder</ion-label>
                                        <ion-radio slot="start" id="performedByTenant" value="huurder"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Aannemer</ion-label>
                                        <ion-radio slot="start" id="performedByContractor" value="aannemer"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Onbekend</ion-label>
                                        <ion-radio slot="start" id="performedByUnknown" value="onbekend"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.performedBy" class="error-message">Dit veld is verplicht.</p>

                            <!-- Beschrijving (tekstveld (area), verplicht) -->
                            <ion-item :class="{'input-error': errors.modificationDescription}">
                                <ion-label position="stacked">Beschrijving modificatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-textarea v-model="inspectionDetails.modificationDescription" id="modificationDescriptionInput" placeholder="Voer beschrijving in"></ion-textarea>
                            </ion-item>
                            <p v-if="errors.modificationDescription" class="error-message">Dit veld is verplicht.</p>

                            <!-- Te ondernemen actie (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.actionRequired}">
                                <ion-label position="stacked">Te ondernemen actie<span class="required"> (verplicht)</span></ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.actionRequired" id="actionRequiredSelect" placeholder="Selecteer actie">
                                    <ion-select-option value="accepteren">Accepteren</ion-select-option>
                                    <ion-select-option value="laten keuren">Laten keuren</ion-select-option>
                                    <ion-select-option value="laten verwijderen">Laten verwijderen</ion-select-option>
                                    <ion-select-option value="laten aanpassen en keuren">Laten aanpassen en keuren</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <p v-if="errors.actionRequired" class="error-message">Dit veld is verplicht.</p>

                            <!-- Opmerkingen (tekstveld (area), niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Opmerkingen</ion-label>
                                <ion-textarea v-model="inspectionDetails.modificationComments" id="modificationCommentsInput" placeholder="Voer opmerkingen in"></ion-textarea>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('modificationInspection')" id="modificationPhotoUpload">Maak of upload een foto</ion-button>
                                <ul>
                                    <li v-for="(photo, index) in photos.modificationInspection" :key="index">
                                        {{ photo.fileName }}
                                        <ion-button fill="clear" @click="confirmDeletePhoto('modificationInspection', index)">
                                            <ion-icon :icon="trash"></ion-icon>
                                        </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>

                    </ion-list>                        
                </div>
                <ion-button class="visibleButton" @click="saveInspectionUpdates">Wijzigingen opslaan</ion-button>
            </div>

            <!-- Bevestigingspopup voor het verwijderen van foto's -->
            <ion-alert
                :is-open="showDeleteAlert"
                header="Foto verwijderen"
                message="Weet je zeker dat je deze foto wilt verwijderen?"
                :buttons="alertCancelConfirmButtons"
            ></ion-alert>

            <!-- Bevestigingspopup voor het opslaan van de wijzigingen -->
            <ion-alert
                :is-open="showCompleteAlert"
                header="Wijzigingen opgeslagen"
                message="De wijzigingen zijn succesvol opgeslagen."
                :buttons="alertOkButton"
            ></ion-alert>

            <!-- Validatie invoer melding dat niet alle verplichte velden zijn ingevuld -->
            <ion-toast
                :is-open="showValidationError"
                message="Vul alle verplichte velden in."
                duration="2000"
                color="danger"
                @did-dismiss="showValidationError = false"
            ></ion-toast>
        </ion-content>
    <IonTabBarComponent />
    </ion-page>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useInspectionStore } from '@/stores/inspectionStore';
    import { ImageOutline, trash } from 'ionicons/icons';
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
        IonRadioGroup,
        IonAlert,
        IonIcon,
        IonToast 
    } from '@ionic/vue';
    import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
    import IonTabBarComponent from '@/components/IonTabBarComponent.vue';
    import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

    const route = useRoute();
    const router = useRouter();
    const inspectionStore = useInspectionStore();
    const inspection = ref(null);
    const showCompleteAlert = ref(false);
    const showDeleteAlert = ref(false);
    const showValidationError = ref(false);
    const errors = ref({});

    const deleteIndex = ref(null);
    const currentCategory = ref(null);

    const photos = ref({
        damageInspection: [],
        maintenanceInspection: [],
        installationInspection: [],
        modificationInspection: []
    });

    const fileInputs = {
        damageInspection: ref(null),
        maintenanceInspection: ref(null),
        installationInspection: ref(null),
        modificationInspection: ref(null)
    };

    const options = ref(null);
    const inspectionDetails = ref({
        damageLocation: '',
        newDamage: false,
        damageType: '',
        damageDate: '',
        immediateActionRequired: false,
        damageDescription: '',
        maintenanceLocation: '',
        maintenanceType: '',
        maintenanceImmediateActionRequired: false,
        maintenanceCostEstimate: '',
        installationLocation: '',
        installationType: '',
        reportedMalfunction: '',
        approved: false,
        installationComments: '',
        modificationLocation: '',
        performedBy: '',
        modificationDescription: '',
        actionRequired: '',
        modificationComments: ''
    });

    onMounted(() => {
        const id = route.params.id;
        console.log('Route ID:', id); // Log de route ID
        inspection.value = inspectionStore.completedInspections.find((insp) => insp.id == id);
        console.log('Selected inspection for editing:', inspection.value); // Log de geselecteerde inspectie

        if (!inspection.value) {
            console.error('Inspectie niet gevonden');
            return;
        }

        options.value = {
            damageInspection: false,
            maintenanceInspection: false,
            installationInspection: false,
            modificationInspection: false
        };

        if (inspection.value) {
            // Stel de opties in op basis van de bestaande inspectiegegevens
            options.value.damageInspection = !!inspection.value.details.damageInspection;
            options.value.maintenanceInspection = !!inspection.value.details.maintenanceInspection;
            options.value.installationInspection = !!inspection.value.details.installationInspection;
            options.value.modificationInspection = !!inspection.value.details.modificationInspection;

            // Vul de inspectieDetails met de bestaande gegevens
            inspectionDetails.value = {
                damageLocation: inspection.value.details.damageInspection?.location || '',
                newDamage: inspection.value.details.damageInspection?.newDamage || false,
                damageType: inspection.value.details.damageInspection?.damageType || '',
                damageDate: inspection.value.details.damageInspection?.damageDate || '',
                immediateActionRequired: inspection.value.details.damageInspection?.immediateActionRequired || false,
                damageDescription: inspection.value.details.damageInspection?.damageDescription || '',
                maintenanceLocation: inspection.value.details.maintenanceInspection?.location || '',
                maintenanceType: inspection.value.details.maintenanceInspection?.maintenanceType || '',
                maintenanceImmediateActionRequired: inspection.value.details.maintenanceInspection?.immediateActionRequired || false,
                maintenanceCostEstimate: inspection.value.details.maintenanceInspection?.costEstimate || '',
                installationLocation: inspection.value.details.installationInspection?.location || '',
                installationType: inspection.value.details.installationInspection?.installationType || '',
                reportedMalfunction: inspection.value.details.installationInspection?.reportedMalfunction || '',
                approved: inspection.value.details.installationInspection?.approved || false,
                installationComments: inspection.value.details.installationInspection?.comments || '',
                modificationLocation: inspection.value.details.modificationInspection?.modificationLocation || '',
                performedBy: inspection.value.details.modificationInspection?.performedBy || '',
                modificationDescription: inspection.value.details.modificationInspection?.modificationDescription || '',
                actionRequired: inspection.value.details.modificationInspection?.actionRequired || '',
                modificationComments: inspection.value.details.modificationInspection?.modificationComments || ''
            };

            // Controleer en initialiseer damageDate als deze niet bestaat of niet geldig is
            if (!inspectionDetails.value.damageDate || !isValidISODateString(inspectionDetails.value.damageDate)) {
                inspectionDetails.value.damageDate = new Date().toISOString(); // Standaard naar huidige datum en tijd in ISO 8601 formaat
            }

            // Vul de bestaande foto's
            photos.value = {
                damageInspection: inspection.value.details.damageInspection?.photos || [],
                maintenanceInspection: inspection.value.details.maintenanceInspection?.photos || [],
                installationInspection: inspection.value.details.installationInspection?.photos || [],
                modificationInspection: inspection.value.details.modificationInspection?.photos || []
            };
        }
    });

    // Functie om te controleren of een datum een geldige ISO 8601 string is
    const isValidISODateString = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }

    const takePhoto = async () => {
        try {
            const image = await Camera.getPhoto({
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Camera,
                quality: 90,
            });
            const fileName = `photo_${Date.now()}.jpeg`;
            photos.value[currentCategory.value].push({ fileName, webPath: image.dataUrl });
            console.log('Photo taken:', image);
        } catch (error) {
            if (error.message !== 'User cancelled photos app') {
                console.error('Error taking photo:', error);
            }
        }
    };

    const handleFileUpload = (event, category) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileName = file.name;
            photos.value[category].push({ fileName, webPath: e.target.result });
        };
        reader.readAsDataURL(file);
    };

    const presentPhotoOptions = (category) => {
        currentCategory.value = category;
        takePhoto();
    };

    const alertOkButton = [
        {
            text: 'OK',
            role: 'confirm',
            handler: () => {
                console.log('OK clicked');
                router.push('/completed-details');
            }
        }
    ];

    const alertCancelConfirmButtons = [
        {
            text: 'Annuleer',
            role: 'cancel',
            handler: () => {
                console.log('Geannuleerd');
            },
        },
        {
            text: 'Verwijder',
            role: 'confirm',
            handler: () => {
                deletePhoto();
            },
        },
    ];

    const confirmDeletePhoto = (category, index) => {
        currentCategory.value = category;
        deleteIndex.value = index;
        showDeleteAlert.value = true;
    };

    const deletePhoto = () => {
        if (deleteIndex.value !== null) {
            photos.value[currentCategory.value].splice(deleteIndex.value, 1);
            deleteIndex.value = null;
            showDeleteAlert.value = false;
        }
    };

    const validateInspectionDetails = () => {
        errors.value = {};

        if (options.value.damageInspection) {
            if (!inspectionDetails.value.damageLocation) errors.value.damageLocation = true;
            if (!inspectionDetails.value.newDamage) errors.value.newDamage = true;
            if (!inspectionDetails.value.damageType) errors.value.damageType = true;
            if (!inspectionDetails.value.damageDate) errors.value.damageDate = true;
            if (!inspectionDetails.value.immediateActionRequired) errors.value.immediateActionRequired = true;
            if (!inspectionDetails.value.damageDescription) errors.value.damageDescription = true;
        }

        if (options.value.maintenanceInspection) {
            if (!inspectionDetails.value.maintenanceLocation) errors.value.maintenanceLocation = true;
            if (!inspectionDetails.value.maintenanceType) errors.value.maintenanceType = true;
            if (!inspectionDetails.value.maintenanceImmediateActionRequired) errors.value.maintenanceImmediateActionRequired = true;
            if (!inspectionDetails.value.maintenanceCostEstimate) errors.value.maintenanceCostEstimate = true;
        }

        if (options.value.installationInspection) {
            if (!inspectionDetails.value.installationLocation) errors.value.installationLocation = true;
            if (!inspectionDetails.value.installationType) errors.value.installationType = true;
            if (!inspectionDetails.value.reportedMalfunction) errors.value.reportedMalfunction = true;
            if (!inspectionDetails.value.approved) errors.value.approved = true;
        }

        if (options.value.modificationInspection) {
            if (!inspectionDetails.value.modificationLocation) errors.value.modificationLocation = true;
            if (!inspectionDetails.value.performedBy) errors.value.performedBy = true;
            if (!inspectionDetails.value.modificationDescription) errors.value.modificationDescription = true;
            if (!inspectionDetails.value.actionRequired) errors.value.actionRequired = true;
        }

        return Object.keys(errors.value).length === 0;
    };

    const saveInspectionUpdates = () => {
        if (!validateInspectionDetails()) {
            showValidationError.value = true;
            return;
        }

        const updatedDetails = {
            damageInspection: options.value.damageInspection ? {
                location: inspectionDetails.value.damageLocation,
                newDamage: inspectionDetails.value.newDamage,
                damageType: inspectionDetails.value.damageType,
                damageDate: inspectionDetails.value.damageDate,
                immediateActionRequired: inspectionDetails.value.immediateActionRequired,
                damageDescription: inspectionDetails.value.damageDescription,
                photos: photos.value.damageInspection
            } : null,
            maintenanceInspection: options.value.maintenanceInspection ? {
                location: inspectionDetails.value.maintenanceLocation,
                maintenanceType: inspectionDetails.value.maintenanceType,
                immediateActionRequired: inspectionDetails.value.maintenanceImmediateActionRequired,
                costEstimate: inspectionDetails.value.maintenanceCostEstimate,
                photos: photos.value.maintenanceInspection
            } : null,
            installationInspection: options.value.installationInspection ? {
                location: inspectionDetails.value.installationLocation,
                installationType: inspectionDetails.value.installationType,
                reportedMalfunction: inspectionDetails.value.reportedMalfunction,
                approved: inspectionDetails.value.approved,
                comments: inspectionDetails.value.installationComments,
                photos: photos.value.installationInspection
            } : null,
            modificationInspection: options.value.modificationInspection ? {
                modificationLocation: inspectionDetails.value.modificationLocation,
                performedBy: inspectionDetails.value.performedBy,
                modificationDescription: inspectionDetails.value.modificationDescription,
                actionRequired: inspectionDetails.value.actionRequired,
                modificationComments: inspectionDetails.value.modificationComments,
                photos: photos.value.modificationInspection
            } : null
        };

        inspectionStore.updateInspection(inspection.value.id, updatedDetails);
        showCompleteAlert.value = true;
    };

    const goToKnowledgebaseItem = (id) => {
        router.push(`/knowledgebase-details/${id}`);
    };
</script>

<style scoped>
    @import '../theme/styles.css';
    @import '../theme/variables.css';

    h1 {
        margin: 20px 0;
    }

    h2 {
        margin: 20px 0 0 0;
        color: var(--ion-color-firstcolor);
    }

    p, ion-item {
        margin: 1rem 0;
    }

    .visibleButton {
        margin: 1rem 0;
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

    /*Radio stijlen zodat het ook lijkt op een radio button. O.b.v. https://ionicframework.com/docs/api/radio */
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

    /*Datum invoer stijlen*/
    .visibleDatetimeButton {
        padding: 1rem;
    }

    /* Bewijsmateriaal foto ruimte toevoegen */
    .bewijsmateriaalFoto {
        margin-bottom: 1rem;
    }

    /* Stijlen voor de foto lijst en verwijderknop */
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5rem 0;
        padding: 0.5rem;
        border: 1px solid var(--ion-color-firstcolor);
        border-radius: 4px;
        background-color: #f9f9f9;
    }

    ion-icon {
        color: var(--ion-color-firstcolor);
        cursor: pointer;
    }

    /* Invoer validatie */
    .required {
        color: rgb(200, 199, 204);
    }

    .input-error {
        --highlight-height: 0;
        border: 1px solid red;
    }

    .error-message {
        color: #f00;
        font-size: 0.8rem;
        margin: 0.5rem 0 0;
    }
</style>