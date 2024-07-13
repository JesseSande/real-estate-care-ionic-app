<template>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
            <IonTabBarComponent />
    </ion-tabs>
</template>

<script setup lang="ts">
    import { IonTabs, IonRouterOutlet } from '@ionic/vue';
    import IonTabBarComponent from '@/components/IonTabBarComponent.vue';
</script>

<style scoped>
    @import '../theme/styles.css';
    @import '../theme/variables.css';
</style>