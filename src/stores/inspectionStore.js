// Deze store store beheert de status en functionaliteiten voor het ophalen, bijwerken en resetten 
// van toegewezen en voltooide inspecties binnen de applicatie. M.b.v. Chat-GPT4o stapsgewijs uitgewerkt

import { defineStore } from "pinia";

export const useInspectionStore = defineStore("inspection", {
  // Initialiseer de state met lege lijsten voor toegewezen en voltooide inspecties
  state: () => ({
    assignedInspections: [],
    completedInspections: []
  }),
  actions: {
    // Haal toegewezen inspecties op uit de externe database
    async fetchAssignedInspections() {
      try {
        const response = await fetch("https://my-json-server.typicode.com/JesseSande/REC-inspections-database/assignedInspections");
        const data = await response.json();
        console.log("Assigned Inspections:", data);
        this.assignedInspections = data;
      } catch (error) {
        console.error("Error fetching assigned inspections:", error);
      }
    },
    // Haal voltooide inspecties op uit de externe database
    async fetchCompletedInspections() {
      try {
        const response = await fetch("https://my-json-server.typicode.com/JesseSande/REC-inspections-database/completedInspections");
        const data = await response.json();
        console.log("Completed Inspections:", data);
        this.completedInspections = data;
      } catch (error) {
        console.error("Error fetching completed inspections:", error);
      }
    },
    // Verplaats een toegewezen inspectie naar voltooide inspecties en voeg details toe
    completeInspection(inspectionId, details) {
      const index = this.assignedInspections.findIndex(inspection => inspection.id === inspectionId);
      if (index !== -1) {
        const completedInspection = {
          ...this.assignedInspections[index],
          details: details
        };
        // Verwijder de inspectie uit toegewezen inspecties en voeg deze toe aan voltooide inspecties
        this.assignedInspections.splice(index, 1);
        this.completedInspections.push(completedInspection);
        console.log("Completed Inspections:", this.completedInspections);
      }
    },
    // Werk de details bij van een voltooide inspectie
    updateInspection(inspectionId, updatedDetails) {
      const index = this.completedInspections.findIndex(inspection => inspection.id === inspectionId);
      if (index !== -1) {
        this.completedInspections[index].details = updatedDetails;
        console.log("Updated Completed Inspection:", this.completedInspections[index]);
      }
    },
    // Reset de data naar de standaardinspecties vanuit een lokaal JSON-bestand zodat het prototype gebruikt kan blijven worden
    async resetData() {
      try {
        const response = await fetch("/defaultInspections.json");
        const data = await response.json();
        console.log("Default Inspections:", data);
        this.assignedInspections = data.assignedInspections;
        this.completedInspections = data.completedInspections;
      } catch (error) {
        console.error("Error resetting data:", error);
      }
    }
  }
});
