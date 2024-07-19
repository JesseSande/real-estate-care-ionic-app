<!--Inhoud van ion-content, import ref en const notifications van deze meldingen pagina zijn uitgewerkt 
met ChatGPT4o. Dit is een simulatie van inhoud en is intentioneel geen werkende inhoud.-->

<template>
    <ion-page>
        <TheHeader />
        <ion-content>
            <h1>Meldingen</h1> 
            <ion-list> 
                <ion-item 
                    v-for="notification in notifications" 
                    :key="notification.id">
                        <ion-label>
                            <h2 class="notificationTitleHeader">{{ notification.title }}</h2>
                            <p class="notificationMessageText">{{ notification.message }}</p>
                        </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        <TheTabBar />
    </ion-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { 
        IonPage, 
        IonContent, 
        IonList, 
        IonItem, 
        IonLabel 
    } from '@ionic/vue';
    import TheHeader from '@/components/TheHeader.vue';
    import TheTabBar from '@/components/TheTabBar.vue';

    const notifications = ref([
        { id: 1, title: 'Melding 1', message: 'Dit is de eerste fictieve melding.' },
        { id: 2, title: 'Melding 2', message: 'Dit is de tweede fictieve melding.' },
    ]);
</script>

<style scoped>
    @import "../theme/styles.css";
    @import "../theme/variables.css";

    .notificationMessageText {
        color: var(--ion-color-secondcolor) !important;
    }
</style>