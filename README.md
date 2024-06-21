## Versie voor opdracht 3 openen om feedback te geven
- Gebruik hiervoor branch RED-opdr3-branch i.p.v. main
  
## Reflectie logboek
- Ik heb een JSON bestand aangemaakt om de mock-up inspecties toe te voegen. Binnen dit bestand heb ik 5 mock-up inspecties aangemaakt, een van ieder type inspectie, en een dubbele voor schade opnemen. 
- Locatie heb ik geïnterpreteerd als het adres waarop de inspectie heeft plaatsgevonden. Alles wat voor alle typen inspecties geldt, zoals locatie en tijd, heb ik eerst weergegeven. Alles wat specifiek is voor het type inspectie, alsmede de optionele foto’s, staat in “details”. 
- Voor de datum/tijd notatie heb ik gekozen om de tijd in Nederland (CEST) aan te geven volgens ISO 8601-formaat met een tijdzone-offset van +02:00. 
- Na afronden van het JSON bestand heb ik deze gevalideerd via https://jsonlint.com/. 
- Ik heb een repository aangemaakt op GitHub (REC-inspections-database) waarin ik het bestand db.json heb toegevoegd, zodat deze uiteindelijk voor de API gebruikt kan worden. Ik heb MyJSONServer gebruikt > https://my-json-server.typicode.com/JesseSande/REC-inspections-database/db. 
- Vervolgens ben ik een nieuwe component aan gaan maken om de inspectielijst te tonen. Eerdere componenten en views heb ik Nederlandse benaming gegeven, vanaf nu ben ik overgestapt op Engelse benamingen. Componentbenaming is in PascalCase volgens de style guide. Ik heb twee componenten aangemaakt: InspectionList.vue en InspectionDetails.vue. Verder is ook een model folder aangemaakt met daarin het datamodel Inspection.js, en een service folder met daarin de service inspectionService.js. Code die ik m.b.v. Chat-GPT heb samengesteld staat vernoemd in het desbetreffende bestand. Ook foutmeldingen heb ik met behulp van Chat-GPT en andere bronnen van het internet verholpen. 
- Tot slot de styling aangepast naar de huisstijl. 
- De pagina met de inspecties wordt nu nog getoond ‘op’ de andere onderdelen van de app (waarmee ik bedoel, de andere gemaakte onderdelen zijn nu niet te zien). Als ik het goed heb begrepen uit de opdracht, wordt dit in de volgende opdracht verder afgemaakt. Er wordt nu in de mock-up data verwezen naar pdf’s en foto’s die er in werkelijkheid nog niet zijn. 
- To do's: Later nog aanpassen en ook de Style Guide checken (bijv PascalCase voor component benamingen).

## Note
- Ik weet dat dit nog niet een officiële/juiste opzet is voor een Read Me file in een werkelijk project, maar heb voor deze opdracht deze ruimte gebruikt om wat algemene notities te delen.  
