// Deze store beheert de status en functionaliteiten voor het ophalen van kennisbankartikelen binnen de applicatie

import { defineStore } from "pinia";

export const useKnowledgebaseStore = defineStore("knowledgebase", {
    state: () => ({
        // Lijst om kennisbankartikelen op te slaan
        items: []
    }),
    actions: {
        // Haalt alle kennisbankartikelen op uit de externe database
        async fetchKnowledgebaseItems() {
            try {
                const response = await fetch("https://my-json-server.typicode.com/JesseSande/REC-inspections-database/knowledgebaseItems");
                const data = await response.json();
                console.log("Knowledgebase Items:", data);
                this.items = data;
            } catch (error) {
                console.error("Error fetching knowledgebase items:", error);
            }
        },
        // Haalt een specifiek kennisbankartikel op aan de hand van een ID
        async fetchKnowledgebaseItem(id) {
            try {
                const response = await fetch(`https://my-json-server.typicode.com/JesseSande/REC-inspections-database/knowledgebaseItems/${id}`);
                const item = await response.json();
                console.log("Knowledgebase Item:", item);
                return item;
            } catch (error) {
                console.error("Error fetching knowledgebase item:", error);
            }
        }
    }
});