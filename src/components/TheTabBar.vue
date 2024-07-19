<!-- Deze component is aan alle views toegevoegd zodat overal de tabbar zichtbaar is -->

<template>
    <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/actieve-taak">
            <ion-icon 
                class="tabIcon" 
                aria-hidden="true" 
                :icon="build"
            />
            <ion-label>Actieve taak</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/tabs/zoeken">
            <ion-icon 
                class="tabIcon" 
                aria-hidden="true" 
                :icon="search"
            />
            <ion-label>Zoeken</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/informatie">
            <ion-icon 
                class="tabIcon" 
                aria-hidden="true" 
                :icon="informationCircle" 
            />
            <ion-label>Informatie</ion-label>
        </ion-tab-button>
    </ion-tab-bar>
</template>

<script setup lang="ts">
    import { 
        build,
        search,
        informationCircle
    } from "ionicons/icons";    
    import { 
        IonTabBar, 
        IonTabButton, 
        IonIcon, 
        IonLabel 
    } from "@ionic/vue";
</script>

<style scoped>
    @import "../theme/styles.css";
    @import "../theme/variables.css";
</style>