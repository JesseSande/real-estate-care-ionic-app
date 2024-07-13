import { defineStore } from 'pinia';

export const useKnowledgebaseStore = defineStore('knowledgebase', {
    state: () => ({
        items: []
    }),
    actions: {
        async fetchKnowledgebaseItems() {
        try {
            const response = await fetch('https://my-json-server.typicode.com/JesseSande/REC-inspections-database/knowledgebaseItems');
            const data = await response.json();
            console.log('Knowledgebase Items:', data);
            this.items = data;
        } catch (error) {
            console.error('Error fetching knowledgebase items:', error);
        }
        },
        async fetchKnowledgebaseItem(id) {
            try {
                const response = await fetch(`https://my-json-server.typicode.com/JesseSande/REC-inspections-database/knowledgebaseItems/${id}`);
                const item = await response.json();
                console.log('Knowledgebase Item:', item);
                return item;
            } catch (error) {
                console.error('Error fetching knowledgebase item:', error);
            }
        }
    }
});
