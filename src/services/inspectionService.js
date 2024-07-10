// Code m.b.v. Chat-GPT4o

export async function fetchCompletedInspections() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/JesseSande/REC-inspections-database/completedInspections');
        const data = await response.json();

        // Controleer of data een array is
        if (Array.isArray(data)) {
            return data;
        } else {
            console.error('Expected an array but got:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching completed inspections:', error);
        return [];
    }
}

export async function fetchAssignedInspections() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/JesseSande/REC-inspections-database/assignedInspections');
        const data = await response.json();

        // Controleer of data een array is
        if (Array.isArray(data)) {
            return data;
        } else {
            console.error('Expected an array but got:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching assigned inspections:', error);
        return [];
    }
}




  