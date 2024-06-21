// Code m.b.v. Chat-GPT4o

export async function fetchInspections() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/JesseSande/REC-inspections-database/db');
        const data = await response.json();
      
        // Controleer of data een object is met een inspections array
        if (data && Array.isArray(data.inspections)) {
            return data.inspections;
        } else {
            console.error('Expected an object with an inspections array but got:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching inspections:', error);
        return [];
    }
}
  