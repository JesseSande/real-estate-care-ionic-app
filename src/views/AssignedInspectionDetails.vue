<!-- Via deze component worden de details zichtbaar van de toegewezen inspectie die is aangeklikt.
Hiermee kan de aangeklikte toegewezen inspectie worden uitgevoerd. -->

<template>
    <ion-page>
        <TheHeader />
        <ion-content>
            <h1>Inspectie Details</h1>
            <div v-if="inspection">
                <!-- Algemene details van de inspectie -->
                <p><strong>Locatie:</strong> {{ inspection.location }}</p>
                <p><strong>Datum:</strong> {{ inspection.date }}</p>
                <p><strong>Type:</strong> {{ inspection.type }}</p>

                <h2>Inspectie uitvoeren:</h2>
                <!-- Controleer of options beschikbaar zijn voordat ze worden gerenderd -->
                <div v-if="options">
                    <!-- Opties voor inspectie -->
                    <ion-list>

                        <!-- Schade opnemen -->
                        <ion-item>
                            <ion-checkbox 
                                v-model="options.damageInspection" 
                                slot="start" 
                                id="damageInspectionCheckbox"
                            ></ion-checkbox>
                            <ion-label><strong>Schade opnemen</strong></ion-label>
                        </ion-item>
                        <div v-if="options.damageInspection">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.damageLocation}">
                                <ion-label position="stacked">Locatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input 
                                    v-model="inspectionDetails.damageLocation" 
                                    id="damageLocationInput" 
                                    placeholder="Voer locatie in"
                                ></ion-input>
                            </ion-item>
                            <p v-if="errors.damageLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Nieuwe schade (radio ja/nee, verplicht) -->
                            <ion-item :class="{'input-error': errors.newDamage}">
                                <ion-label position="stacked">Nieuwe schade<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group 
                                    v-model="inspectionDetails.newDamage" 
                                    id="newDamageRadioGroup">
                                    <ion-item lines="none">
                                        <ion-label>Ja</ion-label>
                                        <ion-radio 
                                            slot="start" 
                                            id="newDamageYes" 
                                            value="ja"
                                        ></ion-radio>
                                    </ion-item>
                                    <ion-item lines="none">
                                        <ion-label>Nee</ion-label>
                                        <ion-radio 
                                            slot="start" 
                                            id="newDamageNo" 
                                            value="nee"
                                        ></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.newDamage" class="error-message">Dit veld is verplicht.</p>

                            <!-- Soort schade (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.damageType}">
                                <ion-label position="stacked">Soort schade<span class="required"> (verplicht)</span></ion-label>
                                <ion-select interface="popover" 
                                    v-model="inspectionDetails.damageType" 
                                    id="damageTypeSelect" 
                                    placeholder="Selecteer soort schade">
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
                                <ion-label position="stacked">Datum uitgevoerd<span class="required"> (verplicht)</span></ion-label>
                                <ion-datetime-button 
                                    class="visibleDatetimeButton" 
                                    datetime="damageDate"
                                ></ion-datetime-button>
                                <ion-modal :keep-contents-mounted="true">
                                    <ion-datetime 
                                        v-model="inspectionDetails.damageDate" 
                                        id="damageDate"
                                    ></ion-datetime>
                                </ion-modal>
                            </ion-item>
                            <p v-if="errors.damageDate" class="error-message">Dit veld is verplicht.</p>

                            <!-- Acute actie vereist (radio ja/nee, verplicht) -->
                            <ion-item :class="{'input-error': errors.immediateActionRequired}">
                                <ion-label position="stacked">Acute actie vereist<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group 
                                    v-model="inspectionDetails.immediateActionRequired" 
                                    id="damageImmediateActionRadioGroup">
                                        <ion-item lines="none">
                                            <ion-label>Ja</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="damageImmediateActionYes" 
                                                value="ja"
                                            ></ion-radio>
                                        </ion-item>
                                        <ion-item lines="none">
                                            <ion-label>Nee</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="damageImmediateActionNo" 
                                                value="nee"
                                            ></ion-radio>
                                        </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.immediateActionRequired" class="error-message">Dit veld is verplicht.</p>

                            <!-- Omschrijving (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.damageDescription}">
                                <ion-label position="stacked">Omschrijving<span class="required"> (verplicht)</span></ion-label>
                                <ion-textarea 
                                    v-model="inspectionDetails.damageDescription" 
                                    id="damageDescriptionInput" 
                                    placeholder="Voer omschrijving in"
                                ></ion-textarea>
                            </ion-item>
                            <p v-if="errors.damageDescription" class="error-message">Dit veld is verplicht.</p>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button 
                                    class="visibleButton" 
                                    @click="presentPhotoOptions('damageInspection')" 
                                    id="damagePhotoUpload"
                                >Maak of upload een foto</ion-button>
                                <ul class="photoList">
                                    <li 
                                        v-for="(photo, index) in photos.damageInspection" 
                                        :key="index"
                                        class="photoListItem">
                                            {{ photo.fileName }}
                                            <ion-button 
                                                fill="clear" 
                                                @click="confirmDeletePhoto('damageInspection', index)"
                                                id="damagePhotoDelete">
                                                    <ion-icon 
                                                        class="trashIcon"
                                                        :icon="trash"
                                                        aria-label="verwijderen"
                                                    ></ion-icon>
                                            </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>
                

                        <!-- Achterstallig onderhoud opnemen -->
                        <ion-item>
                            <ion-checkbox 
                                v-model="options.maintenanceInspection" 
                                slot="start" 
                                id="maintenanceInspectionCheckbox"
                            ></ion-checkbox>
                            <ion-label><strong>Achterstallig onderhoud opnemen</strong></ion-label>
                        </ion-item>
                        <div v-if="options.maintenanceInspection">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.maintenanceLocation}">
                                <ion-label position="stacked">Locatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input 
                                    v-model="inspectionDetails.maintenanceLocation" 
                                    id="maintenanceLocationInput" 
                                    placeholder="Voer locatie in"
                                ></ion-input>
                            </ion-item>
                            <p v-if="errors.maintenanceLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Soort onderhoud (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.maintenanceType}">
                                <ion-label position="stacked">Soort onderhoud<span class="required"> (verplicht)</span></ion-label>
                                <ion-select 
                                    interface="popover" 
                                    v-model="inspectionDetails.maintenanceType" 
                                    id="maintenanceTypeSelect" 
                                    placeholder="Selecteer soort onderhoud">
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
                                <ion-radio-group 
                                    v-model="inspectionDetails.maintenanceImmediateActionRequired" 
                                    id="maintenanceImmediateActionRadioGroup">
                                        <ion-item lines="none">
                                            <ion-label>Ja</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="maintenanceImmediateActionYes" 
                                                value="ja"
                                            ></ion-radio>
                                        </ion-item>
                                        <ion-item lines="none">
                                            <ion-label>Nee</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="maintenanceImmediateActionNo" 
                                                value="nee"
                                            ></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.maintenanceImmediateActionRequired" class="error-message">Dit veld is verplicht.</p>

                            <!-- Kostenindicatie (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.maintenanceCostEstimate}">
                                <ion-label position="stacked">Kostenindicatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-select 
                                    interface="popover" 
                                    v-model="inspectionDetails.maintenanceCostEstimate" 
                                    id="maintenanceCostEstimateSelect" 
                                    placeholder="Selecteer kostenindicatie">
                                        <ion-select-option value="0-500">0-500</ion-select-option>
                                        <ion-select-option value="500-1500">500-1500</ion-select-option>
                                        <ion-select-option value="1500+">1500+</ion-select-option>
                                </ion-select>
                            </ion-item>
                            <p v-if="errors.maintenanceCostEstimate" class="error-message">Dit veld is verplicht.</p>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button 
                                    class="visibleButton" 
                                    @click="presentPhotoOptions('maintenanceInspection')"
                                    id="maintenancePhotoUpload"
                                >Maak of upload een foto</ion-button>
                                <ul class="photoList">
                                    <li 
                                        v-for="(photo, index) in photos.maintenanceInspection" 
                                        :key="index"
                                        class="photoListItem">
                                            {{ photo.fileName }}
                                            <ion-button 
                                                fill="clear" 
                                                @click="confirmDeletePhoto('maintenanceInspection', index)" 
                                                id="maintenancePhotoDelete">
                                                    <ion-icon 
                                                        class="trashIcon"
                                                        :icon="trash"
                                                        aria-label="verwijderen"
                                                    ></ion-icon>
                                            </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>
                

                        <!-- Technische installaties inspecteren -->
                        <ion-item>
                            <ion-checkbox 
                                v-model="options.installationInspection" 
                                slot="start" 
                                id="installationInspectionCheckbox"
                            ></ion-checkbox>
                            <ion-label><strong>Technische installaties inspecteren</strong></ion-label>
                        </ion-item>
                        <div v-if="options.installationInspection">

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.installationLocation}">
                                <ion-label position="stacked">Locatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input 
                                    v-model="inspectionDetails.installationLocation" 
                                    id="installationLocationInput" 
                                    placeholder="Voer locatie in"
                                ></ion-input>
                            </ion-item>
                            <p v-if="errors.installationLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Soort installatie (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.installationType}">
                                <ion-label position="stacked">Soort installatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-select 
                                    interface="popover" 
                                    v-model="inspectionDetails.installationType" 
                                    id="installationTypeSelect" 
                                    placeholder="Selecteer soort installatie">
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
                                <ion-textarea 
                                    v-model="inspectionDetails.reportedMalfunction" 
                                    id="reportedMalfunctionInput" 
                                    placeholder="Voer gemelde storingen in"
                                ></ion-textarea>
                            </ion-item>
                            <p v-if="errors.reportedMalfunction" class="error-message">Dit veld is verplicht.</p>

                            <!-- Testprocedure (link naar knowledgebase item) -->
                            <ion-item>
                                <ion-label position="stacked">Testprocedure</ion-label>
                                <ion-button 
                                    class="visibleButton" 
                                    @click="goToKnowledgebaseItem('testProcedure')" 
                                    id="testProcedureLink"
                                >Bekijk testprocedures</ion-button>
                            </ion-item>

                            <!-- Goedgekeurd (radio ja/nee, verplicht) -->
                            <ion-item :class="{'input-error': errors.approved}">
                                <ion-label position="stacked">Goedgekeurd<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group 
                                    v-model="inspectionDetails.approved" 
                                    id="installationApprovedRadioGroup">
                                        <ion-item lines="none">
                                            <ion-label>Ja</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="installationApprovedYes" 
                                                value="ja"
                                            ></ion-radio>
                                        </ion-item>
                                        <ion-item lines="none">
                                            <ion-label>Nee</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="installationApprovedNo" 
                                                value="nee"
                                            ></ion-radio>
                                        </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.approved" class="error-message">Dit veld is verplicht.</p>

                            <!-- Opmerkingen (tekstveld (area), niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Opmerkingen</ion-label>
                                <ion-textarea 
                                    v-model="inspectionDetails.installationComments" 
                                    id="installationCommentsInput" 
                                    placeholder="Voer opmerkingen in"
                                ></ion-textarea>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button 
                                    class="visibleButton" 
                                    @click="presentPhotoOptions('installationInspection')" 
                                    id="installationPhotoUpload"
                                >Maak of upload een foto</ion-button>
                                <ul class="photoList">
                                    <li 
                                        v-for="(photo, index) in photos.installationInspection" 
                                        :key="index"
                                        class="photoListItem">
                                            {{ photo.fileName }}
                                            <ion-button 
                                                fill="clear" 
                                                @click="confirmDeletePhoto('installationInspection', index)"
                                                id="installationPhotoDelete">
                                                    <ion-icon 
                                                        class="trashIcon"
                                                        :icon="trash"
                                                        aria-label="verwijderen"
                                                    ></ion-icon>
                                            </ion-button>
                                    </li>
                                </ul>
                            </ion-item>                            
                        </div>


                        <!-- Modificaties inventariseren -->
                        <ion-item>
                            <ion-checkbox 
                                v-model="options.modificationInspection" 
                                slot="start" 
                                id="modificationInspectionCheckbox"
                            ></ion-checkbox>
                            <ion-label><strong>Modificaties inventariseren</strong></ion-label>
                        </ion-item>
                        <div v-if="options.modificationInspection">

                            <!-- Huidige documentatie (link naar pdf) -->
                            <ion-item>
                                <ion-label position="stacked">Bestaande situatie en gedocumenteerde modificaties</ion-label>
                                <ion-button 
                                    class="visibleButton" 
                                    href="/pdf/Documentatie_modificatie_Kennedylaan198.pdf" 
                                    target="_blank" 
                                    id="modificationDocumentationLink"
                                >Bekijk documentatie</ion-button>
                            </ion-item>

                            <!-- Locatie (tekstveld, verplicht) -->
                            <ion-item :class="{'input-error': errors.modificationLocation}">
                                <ion-label position="stacked">Locatie aangetroffen modificatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-input 
                                    v-model="inspectionDetails.modificationLocation" 
                                    id="modificationLocationInput" 
                                    placeholder="Voer locatie in"
                                ></ion-input>
                            </ion-item>
                            <p v-if="errors.modificationLocation" class="error-message">Dit veld is verplicht.</p>

                            <!-- Uitgevoerd door (radio keuzeopties, verplicht) -->
                            <ion-item :class="{'input-error': errors.performedBy}">
                                <ion-label position="stacked">Uitgevoerd door<span class="required"> (verplicht)</span></ion-label>
                                <ion-radio-group 
                                    v-model="inspectionDetails.performedBy" 
                                    id="modificationPerformedByRadioGroup">
                                        <ion-item lines="none">
                                            <ion-label>Huurder</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="modificationPerformedByTenant" 
                                                value="huurder"
                                            ></ion-radio>
                                        </ion-item>
                                        <ion-item lines="none">
                                            <ion-label>Aannemer</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="modificationPerformedByContractor" 
                                                value="aannemer"
                                            ></ion-radio>
                                        </ion-item>
                                        <ion-item lines="none">
                                            <ion-label>Onbekend</ion-label>
                                            <ion-radio 
                                                slot="start" 
                                                id="modificationPerformedByUnknown" 
                                                value="onbekend"
                                            ></ion-radio>
                                        </ion-item>
                                </ion-radio-group>
                            </ion-item>
                            <p v-if="errors.performedBy" class="error-message">Dit veld is verplicht.</p>

                            <!-- Beschrijving (tekstveld (area), verplicht) -->
                            <ion-item :class="{'input-error': errors.modificationDescription}">
                                <ion-label position="stacked">Beschrijving modificatie<span class="required"> (verplicht)</span></ion-label>
                                <ion-textarea 
                                    v-model="inspectionDetails.modificationDescription" 
                                    id="modificationDescriptionInput" 
                                    placeholder="Voer beschrijving in"
                                ></ion-textarea>
                            </ion-item>
                            <p v-if="errors.modificationDescription" class="error-message">Dit veld is verplicht.</p>

                            <!-- Te ondernemen actie (keuzelijst, verplicht) -->
                            <ion-item :class="{'input-error': errors.actionRequired}">
                                <ion-label position="stacked">Te ondernemen actie<span class="required"> (verplicht)</span></ion-label>
                                <ion-select 
                                    interface="popover" 
                                    v-model="inspectionDetails.actionRequired" 
                                    id="modificationActionRequiredSelect" 
                                    placeholder="Selecteer actie">
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
                                <ion-textarea 
                                    v-model="inspectionDetails.modificationComments" 
                                    id="modificationCommentsInput" 
                                    placeholder="Voer opmerkingen in"
                                ></ion-textarea>
                            </ion-item>

                            <!-- Bewijsmateriaal (foto) uploaden (button met keuze foto maken of uploaden, niet verplicht) -->
                            <ion-item>
                                <ion-label position="stacked">Bewijsmateriaal</ion-label>
                                <ion-button 
                                    class="visibleButton" 
                                    @click="presentPhotoOptions('modificationInspection')" 
                                    id="modificationPhotoUpload"
                                >Maak of upload een foto</ion-button>
                                <ul class="photoList">
                                    <li 
                                        v-for="(photo, index) in photos.modificationInspection" 
                                        :key="index"
                                        class="photoListItem">
                                            {{ photo.fileName }}
                                            <ion-button 
                                                fill="clear" 
                                                @click="confirmDeletePhoto('modificationInspection', index)"
                                                id="modificationPhotoDelete">
                                                    <ion-icon 
                                                        class="trashIcon"
                                                        :icon="trash"
                                                        aria-label="verwijderen"
                                                    ></ion-icon>
                                            </ion-button>
                                    </li>
                                </ul>
                            </ion-item>
                        </div>

                    </ion-list>                        
                </div>
                <ion-button 
                    class="visibleButton" 
                    @click="confirmCompleteInspection"
                >Inspectie afronden</ion-button>
            </div>

            <!-- Bevestigingspopup voor het verwijderen van fotos -->
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

            <!-- Validatie invoer melding dat niet alle verplichte velden zijn ingevuld -->
            <ion-toast
                :is-open="showValidationError"
                message="Vul alle verplichte velden in."
                duration="2000"
                color="danger"
                @did-dismiss="showValidationError = false"
            ></ion-toast>
        </ion-content>
    <!--<TheTabBar />-->
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
        ImageOutline, 
        trash 
    } from "ionicons/icons";
    import { 
        IonPage, 
        IonContent, 
        IonList, 
        IonItem, 
        IonCheckbox,
        IonLabel,  
        IonInput,
        IonRadioGroup, 
        IonRadio, 
        IonSelect, 
        IonSelectOption, 
        IonDatetimeButton,
        IonModal,
        IonDatetime, 
        IonTextarea,
        IonButton, 
        IonIcon, 
        IonAlert,
        IonToast 
    } from "@ionic/vue";
    import TheHeader from "@/components/TheHeader.vue";
    //import TheTabBar from "@/components/TheTabBar.vue";
    import { 
        Camera, 
        CameraResultType, 
        CameraSource 
    } from "@capacitor/camera";

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
        damageLocation: "",
        newDamage: false,
        damageType: "",
        damageDate: "",
        immediateActionRequired: false,
        damageDescription: "",
        maintenanceLocation: "",
        maintenanceType: "",
        maintenanceImmediateActionRequired: false,
        maintenanceCostEstimate: "",
        installationLocation: "",
        installationType: "",
        reportedMalfunction: "",
        approved: false,
        installationComments: "",
        modificationLocation: "",
        performedBy: "",
        modificationDescription: "",
        actionRequired: "",
        modificationComments: ""
    });

    // Haal inspectiegegevens op bij het laden van de component
    onMounted(() => {

        console.log('Component Mounted')
        
        const id = route.params.id;
        inspection.value = inspectionStore.assignedInspections.find((insp) => insp.id == id);
        console.log("Selected inspection:", inspection.value);

        // Stel de opties in op basis van de bestaande inspectiegegevens
        options.value = {
            damageInspection: false,
            maintenanceInspection: false,
            installationInspection: false,
            modificationInspection: false
        };

        switch (inspection.value.type) {
            case "schade":
                options.value.damageInspection = true;
                break;
            case "onderhoud":
                options.value.maintenanceInspection = true;
                break;
            case "installatie":
                options.value.installationInspection = true;
                break;
            case "modificatie":
                options.value.modificationInspection = true;
                break;
            default:
                break;
        }

        // Controleer en initialiseer damageDate als deze niet bestaat of niet geldig is
        if (!inspectionDetails.value.damageDate) {
            inspectionDetails.value.damageDate = new Date().toISOString(); // Standaard naar huidige datum en tijd in ISO 8601 formaat
        }
    });

    // Foto maken met de camera
    const takePhoto = async () => {
        try {
            const image = await Camera.getPhoto({
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Camera,
                quality: 90,
            });
            const fileName = `photo_${Date.now()}.jpeg`;
            photos.value[currentCategory.value].push({ fileName, webPath: image.dataUrl });
            console.log("Photo taken:", image);
        } catch (error) {
            if (error.message !== "User cancelled photos app") {
                console.error("Error taking photo:", error);
            }
        }
    };

    // Bestand uploaden
    const handleFileUpload = (event, category) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileName = file.name;
            photos.value[category].push({ fileName, webPath: e.target.result });
        };
        reader.readAsDataURL(file);
    };

    // Foto-opties presenteren
    const presentPhotoOptions = (category) => {
        currentCategory.value = category;
        takePhoto();
    };

    // Configuratie van alert knoppen
    const alertOkButton = [
        {
            text: "OK",
            role: "confirm",
            handler: () => {
                console.log("OK clicked");
                router.push("/afgeronde-inspecties");
            }
        }
    ];

    const alertCancelConfirmButtons = [
        {
            text: "Annuleer",
            role: "cancel",
            handler: () => {
                console.log("Geannuleerd");
            },
        },
        {
            text: "Verwijder",
            role: "confirm",
            handler: () => {
                deletePhoto();
            },
        },
    ];

    // Het verwijderen van een foto bevestigen
    const confirmDeletePhoto = (category, index) => {
        currentCategory.value = category;
        deleteIndex.value = index;
        showDeleteAlert.value = true;
    };

    // Foto verwijderen
    const deletePhoto = () => {
        if (deleteIndex.value !== null) {
            photos.value[currentCategory.value].splice(deleteIndex.value, 1);
            deleteIndex.value = null;
            showDeleteAlert.value = false;
        }
    };

    // Inspectiegegevens valideren
    const validateInspectionDetails = () => {
        errors.value = {};

        const isValidISODateString = (dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        }

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

    // Afronding inspectie bevestigen en gegevens opslaan
    const confirmCompleteInspection = () => {
        if (!validateInspectionDetails()) {
            showValidationError.value = true;
            return;
        }
    
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

    // Doorverwijzing naar kennisbase item
    const goToKnowledgebaseItem = (id) => {
        router.push(`/kennisbase/${id}`);
    };
</script>

<style scoped>
    @import "../theme/styles.css";
    @import "../theme/variables.css";

    p, ion-item {
        margin: 1rem 0;
    }

    .visibleButton {
        margin: 1rem 0;
    }

    /* Checkbox stylen zodat het ook lijkt op een checkbox (vierkant) i.p.v. een radio button (rond). 
    O.b.v. https://ionicframework.com/docs/api/checkbox */
    ion-checkbox {
        --size: 1.5rem;
        --checkbox-background-checked: var(--ion-color-firstcolor);
    }

    ion-checkbox::part(container) {
        border-radius: 6px;
        border: 2px solid var(--ion-color-firstcolor);
    }

    /* Radio stylen zodat het ook lijkt op een radio button. 
    O.b.v. https://ionicframework.com/docs/api/radio */
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

    /* Datum invoer stylen */
    .visibleDatetimeButton {
        padding: 1rem;
    }

    /* Bewijsmateriaal foto ruimte toevoegen */
    .bewijsmateriaalFoto {
        margin-bottom: 1rem;
    }

    /* Stijlen voor de foto lijst en verwijderknop */
    .photoList {
        list-style-type: none;
        padding: 0;
    }

    .photoListItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5rem 0;
        padding: 0.5rem;
        border: 1px solid var(--ion-color-firstcolor);
        border-radius: 4px;
        background-color: var(--ion-background-color);
    }

    .trashIcon {
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