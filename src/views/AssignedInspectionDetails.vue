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
                            <ion-checkbox v-model="options.damageRecording" slot="start"></ion-checkbox>
                            <ion-label><strong>Schade opnemen</strong></ion-label>
                        </ion-item>
                        <div v-if="options.damageRecording">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Locatie</ion-label>
                                <ion-input v-model="inspectionDetails.damageLocation" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Nieuwe schade (radio ja/nee, verplicht) -->
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

                            <!-- Soort schade (keuzelijst, verplicht) -->
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

                            <!-- Datum (input met datum keuze, verplicht) --> 
                            <ion-item>
                                <ion-label position="stacked">Datum</ion-label>
                                <ion-datetime-button class="visibleDatetimeButton" datetime="datetime"></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime id="datetime"></ion-datetime>
                                </ion-modal>
                            </ion-item>

                            <!-- Acute actie vereist (radio ja/nee, verplicht) -->
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

                            <!-- Omschrijving (tekstveld, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Omschrijving</ion-label>
                                <ion-textarea v-model="inspectionDetails.damageDescription" placeholder="Voer omschrijving in"></ion-textarea>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('damageRecording')">Maak of upload een foto</ion-button>
                                <ul>
                                    <li v-for="(photo, index) in photos.damageRecording" :key="index">
                                        {{ photo.fileName }}
                                        <ion-button fill="clear" @click="confirmDeletePhoto('damageRecording', index)">
                                            <ion-icon :icon="trash"></ion-icon>
                                        </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>
                

                        <!-- Achterstallig onderhoud opnemen -->
                        <ion-item>
                            <ion-checkbox v-model="options.maintenanceRecording" slot="start"></ion-checkbox>
                            <ion-label><strong>Achterstallig onderhoud opnemen</strong></ion-label>
                        </ion-item>
                        <div v-if="options.maintenanceRecording">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Locatie</ion-label>
                                <ion-input v-model="inspectionDetails.maintenanceLocation" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Soort onderhoud (keuzelijst, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Soort onderhoud</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.maintenanceType" placeholder="Selecteer soort onderhoud">
                                    <ion-select-option value="schilderwerk">Schilderwerk</ion-select-option>
                                    <ion-select-option value="houtrot">Houtrot</ion-select-option>
                                    <ion-select-option value="elektra">Elektra</ion-select-option>
                                    <ion-select-option value="leidingwerk">Leidingwerk</ion-select-option>
                                    <ion-select-option value="beglazing">Beglazing</ion-select-option>
                                </ion-select>
                            </ion-item>

                            <!-- Acute actie vereist (radio ja/nee, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Acute actie vereist</ion-label>
                                <ion-radio-group v-model="inspectionDetails.maintenanceImmediateActionRequired">
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

                            <!-- Kostenindicatie (keuzelijst, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Kostenindicatie</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.maintenanceCostEstimate" placeholder="Selecteer kostenindicatie">
                                    <ion-select-option value="0-500">0-500</ion-select-option>
                                    <ion-select-option value="500-1500">500-1500</ion-select-option>
                                    <ion-select-option value="1500+">1500+</ion-select-option>
                                </ion-select>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('maintenanceRecording')">Maak of upload een foto</ion-button>
                                <ul>
                                    <li v-for="(photo, index) in photos.maintenanceRecording" :key="index">
                                        {{ photo.fileName }}
                                        <ion-button fill="clear" @click="confirmDeletePhoto('maintenanceRecording', index)">
                                            <ion-icon :icon="trash"></ion-icon>
                                        </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>
                

                        <!-- Technische installaties inspecteren -->
                        <ion-item>
                            <ion-checkbox v-model="options.installationInspection" slot="start"></ion-checkbox>
                            <ion-label><strong>Technische installaties inspecteren</strong></ion-label>
                        </ion-item>
                        <div v-if="options.installationInspection">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Locatie</ion-label>
                                <ion-input v-model="inspectionDetails.installationLocation" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Soort installatie (keuzelijst, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Soort installatie</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.installationType" placeholder="Selecteer soort installatie">
                                    <ion-select-option value="koeling">Koeling</ion-select-option>
                                    <ion-select-option value="verwarming">Verwarming</ion-select-option>
                                    <ion-select-option value="luchtverversing">Luchtverversing</ion-select-option>
                                    <ion-select-option value="elektra">Elektra</ion-select-option>
                                    <ion-select-option value="beveiliging">Beveiliging</ion-select-option>
                                </ion-select>
                            </ion-item>

                            <!-- Gemelde storingen (tekstveld, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Gemelde storingen</ion-label>
                                <ion-textarea v-model="inspectionDetails.reportedMalfunction" placeholder="Voer gemelde storingen in"></ion-textarea>
                            </ion-item>

                            <!-- Testprocedure (link naar knowledgebase item) -->
                            <ion-item>
                                <ion-label position="stacked">Testprocedure</ion-label>
                                <ion-button class="visibleButton" @click="goToKnowledgebaseItem('testProcedure')">Bekijk testprocedure</ion-button>
                            </ion-item>

                            <!-- Goedgekeurd (radio ja/nee, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Goedgekeurd</ion-label>
                                <ion-radio-group v-model="inspectionDetails.approved">
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

                            <!-- Opmerkingen (tekstveld (area), niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Opmerkingen</ion-label>
                                <ion-textarea v-model="inspectionDetails.installationComments" placeholder="Voer opmerkingen in"></ion-textarea>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('installationInspection')">Maak of upload een foto</ion-button>
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
                            <ion-checkbox v-model="options.modificationInventory" slot="start"></ion-checkbox>
                            <ion-label><strong>Modificaties inventariseren</strong></ion-label>
                        </ion-item>
                        <div v-if="options.modificationInventory">

                            <!-- Huidige documentatie (link naar pdf) -->
                            <ion-item>
                                <ion-label position="stacked">Bestaande situatie en gedocumenteerde modificaties</ion-label>
                                <ion-button class="visibleButton" href="/pdf/Documentatie_modificatie_Kennedylaan198.pdf" target="_blank">Bekijk documentatie</ion-button>
                            </ion-item>

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Locatie aangetroffen modificatie</ion-label>
                                <ion-input v-model="inspectionDetails.modificationLocation" placeholder="Voer locatie in"></ion-input>
                            </ion-item>

                            <!-- Uitgevoerd door (radio keuzeopties, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Uitgevoerd door</ion-label>
                                <ion-radio-group v-model="inspectionDetails.performedBy">
                                    <ion-item lines="none">
                                        <ion-label>Huurder</ion-label>
                                        <ion-radio slot="start" value="huurder"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Aannemer</ion-label>
                                        <ion-radio slot="start" value="aannemer"></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Onbekend</ion-label>
                                        <ion-radio slot="start" value="onbekend"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>

                            <!-- Beschrijving (tekstveld (area), verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Beschrijving modificatie</ion-label>
                                <ion-textarea v-model="inspectionDetails.modificationDescription" placeholder="Voer beschrijving in"></ion-textarea>
                            </ion-item>

                            <!-- Te ondernemen actie (keuzelijst, verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Te ondernemen actie</ion-label>
                                <ion-select interface="popover" v-model="inspectionDetails.actionRequired" placeholder="Selecteer actie">
                                    <ion-select-option value="accepteren">Accepteren</ion-select-option>
                                    <ion-select-option value="laten keuren">Laten keuren</ion-select-option>
                                    <ion-select-option value="laten verwijderen">Laten verwijderen</ion-select-option>
                                    <ion-select-option value="laten aanpassen en keuren">Laten aanpassen en keuren</ion-select-option>
                                </ion-select>
                            </ion-item>

                            <!-- Opmerkingen (tekstveld (area), niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Opmerkingen</ion-label>
                                <ion-textarea v-model="inspectionDetails.modificationComments" placeholder="Voer opmerkingen in"></ion-textarea>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button class="visibleButton" @click="presentPhotoOptions('modificationInventory')">Maak of upload een foto</ion-button>
                                <ul>
                                    <li v-for="(photo, index) in photos.modificationInventory" :key="index">
                                        {{ photo.fileName }}
                                        <ion-button fill="clear" @click="confirmDeletePhoto('modificationInventory', index)">
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
        damageRecording: [],
        maintenanceRecording: [],
        installationInspection: [],
        modificationInventory: []
    });

    const fileInputs = {
        damageRecording: ref(null),
        maintenanceRecording: ref(null),
        installationInspection: ref(null),
        modificationInventory: ref(null)
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
            damageRecording: false,
            maintenanceRecording: false,
            installationInspection: false,
            modificationInventory: false
        };

        switch (inspection.value.type) {
            case 'schade':
                options.value.damageRecording = true;
                break;
            case 'onderhoud':
                options.value.maintenanceRecording = true;
                break;
            case 'installatie':
                options.value.installationInspection = true;
                break;
            case 'modificatie':
                options.value.modificationInventory = true;
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
        inspectionStore.completeInspection(inspection.value.id);
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