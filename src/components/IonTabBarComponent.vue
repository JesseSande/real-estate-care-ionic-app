<template>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab1" href="/tabs/tab1">
                    <ion-icon class="tabIcon" aria-hidden="true" :icon="build"/>
                    <ion-label>Actieve taak</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab2" href="/tabs/tab2">
                    <ion-icon class="tabIcon" aria-hidden="true" :icon="search" />
                    <ion-label>Zoeken</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab3" href="/tabs/tab3">
                    <ion-icon class="tabIcon" aria-hidden="true" :icon="informationCircle" />
                    <ion-label>Informatie</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
</template>

<script setup lang="ts">
    import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
    import { informationCircle, search, build, notifications, settings } from 'ionicons/icons';
</script>

<style scoped>
    @import '../theme/styles.css';
    @import '../theme/variables.css';
</style>