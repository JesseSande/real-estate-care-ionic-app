//import { defineStore } from "pinia";
//export const useInspectionStore = defineStore('inspectionsss', {
  //  state: () => {
    //    return{
            // state/data in deze store
      //  }
    //},
    //actions: {
        // actions zijn de 'functies/methods' van de store
    //},
   // getters: {
        // getters zijn de 'computed properties' van de store
    //}
//})

// src/stores/inspectionStore.ts

import { defineStore } from 'pinia';

export const useInspectionStore = defineStore('inspection', {
  state: () => ({
    assignedInspections: [],
    completedInspections: []
  }),
  actions: {
    async fetchAssignedInspections() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/JesseSande/REC-inspections-database/assignedInspections');
        const data = await response.json();
        console.log('Assigned Inspections:', data);  
        this.assignedInspections = data;
      } catch (error) {
        console.error('Error fetching assigned inspections:', error);
      }
    },
    async fetchCompletedInspections() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/JesseSande/REC-inspections-database/completedInspections');
        const data = await response.json();
        console.log('Completed Inspections:', data);  
        this.completedInspections = data;
      } catch (error) {
        console.error('Error fetching completed inspections:', error);
      }
    },
    completeInspection(inspectionId) {
      const index = this.assignedInspections.findIndex(inspection => inspection.id === inspectionId);
      if (index !== -1) {
        const [completedInspection] = this.assignedInspections.splice(index, 1);
        this.completedInspections.push(completedInspection);
      }
    }
  }
});

