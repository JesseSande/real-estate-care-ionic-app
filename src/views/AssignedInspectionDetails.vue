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

                        <!-- Schade opnemen -->
                        <ion-item>
                            <ion-checkbox v-model="options.damageInspection" slot="start" id="damageInspectionCheckbox"></ion-checkbox>
                            <ion-label><strong>Schade opnemen</strong></ion-label>
                        </ion-item>
                        <div v-if="options.damageInspection">

                            <!-- Locatie (tekstveld, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Locatie</ion-label>
                                <ion-input v-model="inspectionDetails.damageLocation" id="damageLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Nieuwe schade (radio ja/nee, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Nieuwe schade</ion-label>
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

                            <!-- Soort schade (keuzelijst, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Soort schade</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.damageType" id="damageTypeSelect" placeholder="Selecteer soort schade">
                                    <ion-select-option value="moedwillig">Moedwillig</ion-select-option>
                                    <ion-select-option value="slijtage">Slijtage</ion-select-option>
                                    <ion-select-option value="geweld">Geweld</ion-select-option>
                                    <ion-select-option value="normaal gebruik">Normaal gebruik</ion-select-option>
                                    <ion-select-option value="calamiteit">Calamiteit</ion-select-option>
                                    <ion-select-option value="anders">Anders</ion-select-option>
                                </ion-select>
                            </ion-item>

                            <!-- Datum (input met datum keuze, niet verplicht) --> 
                            <ion-item>
                                <ion-label position="stacked">Datum</ion-label>
                                <ion-datetime-button class="visibleDatetimeButton" datetime="datetime"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime id="datetime"></ion-datetime>
                                </ion-modal>
                            </ion-item>

                            <!-- Acute actie vereist (radio ja/nee, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Acute actie vereist</ion-label>
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

                            <!-- Omschrijving (tekstveld, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Omschrijving</ion-label>
                                <ion-textarea v-model="inspectionDetails.damageDescription" id="damageDescriptionInput" placeholder="Voer omschrijving in"></ion-textarea>
                            </ion-item>

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

                            <!-- Locatie (tekstveld, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Locatie</ion-label>
                                <ion-input v-model="inspectionDetails.maintenanceLocation" id="maintenanceLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Soort onderhoud (keuzelijst, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Soort onderhoud</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.maintenanceType" id="maintenanceTypeSelect" placeholder="Selecteer soort onderhoud">
                                    <ion-select-option value="schilderwerk">Schilderwerk</ion-select-option>
                                    <ion-select-option value="houtrot">Houtrot</ion-select-option>
                                    <ion-select-option value="elektra">Elektra</ion-select-option>
                                    <ion-select-option value="leidingwerk">Leidingwerk</ion-select-option>
                                    <ion-select-option value="beglazing">Beglazing</ion-select-option>
                                </ion-select>
                            </ion-item>

                            <!-- Acute actie vereist (radio ja/nee, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Acute actie vereist</ion-label>
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

                            <!-- Kostenindicatie (keuzelijst, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Kostenindicatie</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.maintenanceCostEstimate" id="maintenanceCostEstimateSelect" placeholder="Selecteer kostenindicatie">
                                    <ion-select-option value="0-500">0-500</ion-select-option>
                                    <ion-select-option value="500-1500">500-1500</ion-select-option>
                                    <ion-select-option value="1500+">1500+</ion-select-option>
                                </ion-select>
                            </ion-item>

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

                            <!-- Locatie (tekstveld, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Locatie</ion-label>
                                <ion-input v-model="inspectionDetails.installationLocation" id="installationLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Soort installatie (keuzelijst, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Soort installatie</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.installationType" id="installationTypeSelect" placeholder="Selecteer soort installatie">
                                    <ion-select-option value="koeling">Koeling</ion-select-option>
                                    <ion-select-option value="verwarming">Verwarming</ion-select-option>
                                    <ion-select-option value="luchtverversing">Luchtverversing</ion-select-option>
                                    <ion-select-option value="elektra">Elektra</ion-select-option>
                                    <ion-select-option value="beveiliging">Beveiliging</ion-select-option>
                                </ion-select>
                            </ion-item>

                            <!-- Gemelde storingen (tekstveld, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Gemelde storingen</ion-label>
                                <ion-textarea v-model="inspectionDetails.reportedMalfunction" id="reportedMalfunctionInput" placeholder="Voer gemelde storingen in"></ion-textarea>
                            </ion-item>

                            <!-- Testprocedure (link naar knowledgebase item) -->
                            <ion-item>
                                <ion-label position="stacked">Testprocedure</ion-label>
                                <ion-button class="visibleButton" @click="goToKnowledgebaseItem('testProcedure')" id="testProcedureLink">Bekijk testprocedure</ion-button>
                            </ion-item>

                            <!-- Goedgekeurd (radio ja/nee, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Goedgekeurd</ion-label>
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
                            <ion-item>
                                <ion-label position="stacked">Locatie aangetroffen modificatie</ion-label>
                                <ion-input v-model="inspectionDetails.modificationLocation" id="modificationLocationInput" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Uitgevoerd door (radio keuzeopties, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Uitgevoerd door</ion-label>
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

                            <!-- Beschrijving (tekstveld (area), verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Beschrijving modificatie</ion-label>
                                <ion-textarea v-model="inspectionDetails.modificationDescription" id="modificationDescriptionInput" placeholder="Voer beschrijving in"></ion-textarea>
                            </ion-item>

                            <!-- Te ondernemen actie (keuzelijst, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Te ondernemen actie</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.actionRequired" id="actionRequiredSelect" placeholder="Selecteer actie">
                                    <ion-select-option value="accepteren">Accepteren</ion-select-option>
                                    <ion-select-option value="laten keuren">Laten keuren</ion-select-option>
                                    <ion-select-option value="laten verwijderen">Laten verwijderen</ion-select-option>
                                    <ion-select-option value="laten aanpassen en keuren">Laten aanpassen en keuren</ion-select-option>
                                </ion-select>
                            </ion-item>

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
                <ion-button class="visibleButton" @click="confirmCompleteInspection">Inspectie afronden</ion-button>
            </div>

            <!-- Bevestigingspopup voor het verwijderen van foto's -->
            <ion-alert
                :is-open="showDeleteAlert"
                header="Foto verwijderen"
                message="Weet je zeker dat je deze foto wilt verwijderen?"
                :buttons="alertCancelConfirmButtons"
            ></ion-alert>

            <!-- Bevestigingspopup voor het afronden van de inspectie -->
            <ion-alert
                :is-open="showCompleteAlert"
                header="Inspectie afgerond"
                message="De inspectie is succesvol afgerond."
                :buttons="alertOkButton"
            ></ion-alert>
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
        IonIcon 
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
        inspection.value = inspectionStore.assignedInspections.find((insp) => insp.id == id);
        console.log('Selected inspection:', inspection.value);

        options.value = {
            damageInspection: false,
            maintenanceInspection: false,
            installationInspection: false,
            modificationInspection: false
        };

        switch (inspection.value.type) {
            case 'schade':
                options.value.damageInspection = true;
                break;
            case 'onderhoud':
                options.value.maintenanceInspection = true;
                break;
            case 'installatie':
                options.value.installationInspection = true;
                break;
            case 'modificatie':
                options.value.modificationInspection = true;
                break;
            default:
                break;
        }
    });

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

    const confirmCompleteInspection = () => {
        console.log('Confirm complete inspection clicked');
    
        const inspectionDetailsToStore = {
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

        inspectionStore.completeInspection(inspection.value.id, inspectionDetailsToStore);
        showCompleteAlert.value = true;
    };

    const goToKnowledgebaseItem = (id) => {
        router.push(`/knowledgebase-details/${id}`);
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
</style>