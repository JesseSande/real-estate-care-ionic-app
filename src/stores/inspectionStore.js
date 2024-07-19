import { defineStore } from "pinia";

export const useInspectionStore = defineStore("inspection", {
  state: () => ({
    assignedInspections: [],
    completedInspections: []
  }),
  actions: {
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
    completeInspection(inspectionId, details) {
      const index = this.assignedInspections.findIndex(inspection => inspection.id === inspectionId);
      if (index !== -1) {
        const completedInspection = {
          ...this.assignedInspections[index],
          details: details
        };
        this.assignedInspections.splice(index, 1);
        this.completedInspections.push(completedInspection);
        console.log("Completed Inspections:", this.completedInspections);
      }
    },
    updateInspection(inspectionId, updatedDetails) {
      const index = this.completedInspections.findIndex(inspection => inspection.id === inspectionId);
      if (index !== -1) {
        this.completedInspections[index].details = updatedDetails;
        console.log("Updated Completed Inspection:", this.completedInspections[index]);
      }
    },
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
