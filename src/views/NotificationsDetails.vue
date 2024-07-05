<!--Inhoud van ion-content, import ref en const notifications van deze meldingen pagina zijn uitgewerkt 
met ChatGPT4o. Dit is een simulatie van inhoud en is intentioneel geen werkende inhoud.-->

<template>
    <ion-page>
        <IonHeaderComponent />
        <ion-content> 
            <ion-list> 
                <ion-item v-for="notification in notifications" :key="notification.id">
                    <ion-label>
                        <h2>{{ notification.title }}</h2>
                        <p>{{ notification.message }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        <IonTabsComponent />
    </ion-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
    import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
    import IonTabsComponent from '@/components/IonTabsComponent.vue';

    const notifications = ref([
        { id: 1, title: 'Melding 1', message: 'Dit is de eerste melding.' },
        { id: 2, title: 'Melding 2', message: 'Dit is de tweede melding.' },
    ]);
</script>



