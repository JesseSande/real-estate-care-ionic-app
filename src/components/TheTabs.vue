<template>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <TheTabBar />
    </ion-tabs>
</template>

<script setup lang="ts">
    import { 
        IonTabs, 
        IonRouterOutlet 
    } from "@ionic/vue";
    import TheTabBar from "@/components/TheTabBar.vue";
</script>

<style scoped>
    @import "../theme/styles.css";
    @import "../theme/variables.css";
</style>