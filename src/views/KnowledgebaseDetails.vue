<template>
  <ion-page>
    <IonHeaderComponent />
    <ion-content>
      <h1>Kennisbase</h1>
      <ion-list>
        <ion-item button @click="loadPDF('/pdf/case_Real_Estate_Care.pdf')">
          <ion-label>
            <h3>Case Real Estate Care</h3>
          </ion-label>
        </ion-item>
        <ion-item button @click="loadPDF('/pdf/huisstijl_REC.pdf')">
          <ion-label>
            <h3>Huisstijl REC</h3>
          </ion-label>
        </ion-item>
        <ion-item button @click="loadPDF('/pdf/logo_REC.pdf')">
          <ion-label>
            <h3>Logo REC</h3>
          </ion-label>
        </ion-item>
      </ion-list>
      <div v-if="pdfSrc" class="pdf-container">
        <iframe :src="pdfSrc" width="100%" height="600px"></iframe>
      </div>
    </ion-content>
    <!--<IonTabsComponent />-->
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
  import IonHeaderComponent from '@/components/IonHeaderComponent.vue';
  import IonTabsComponent from '@/components/IonTabsComponent.vue';

  import { ref } from 'vue';

  const pdfSrc = ref('');

  const loadPDF = (path: string) => {
    console.log(`Loading PDF: ${path}`); // Debug: log the path
    pdfSrc.value = path;
  };
</script>

<style scoped>
  @import '../theme/styles.css';
  @import '../theme/variables.css';

  .pdf-container {
    margin-top: 1.25rem;
  }
</style>
