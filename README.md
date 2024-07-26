# Een gemoderniseerde app voor RealEstateCare
RealEstateCare – een (fictieve) dienstverlener die woningen onderhoudt, verbetert en inspecteert voor o.a. woningcoöperaties en vastgoedontwikkelaars – streeft naar modernisering van hun dienstverlening door de huidige webapplicatie te vervangen met een single page mobiele app. Ik heb deze fictieve case mogen uitwerken ter afronding van de module front-end frameworks van mijn opleiding tot Front-end developer. De opdracht was een uitdagende maar leuke ervaring. Het eindresultaat zal verre van perfect zijn in de ogen van een ervaren developer, maar hoe dan ook ben ik trots op wat ik heb neergezet als mijn allereerste prototype voor een mobiele app. 

## Inhoud README
In deze README geef ik relevante informatie over de uitwerking van mijn prototype, een beschrijving van mijn proces, keuzes die ik heb gemaakt en eventuele functionaliteiten die nog niet werken zoals gewenst. Ook geef ik een korte verantwoording over het al dan niet hebben kunnen toepassen van security, usability, accessibility en style guides/best practices.

### Inhoudsopgave
 - Beschrijving van de opdracht
 - Opbouw van de app
 - Functionaliteiten prototype
 - Prototype bekijken
 - Verantwoording security
 - Verantwoording usability
 - Verantwoording accessibility
 - Verantwoording style guides/best practices
 - Procesbeschrijving
 - Afsluiting

##   Beschrijving van de opdracht
De deliverables van deze opdracht waren een debriefing met een onderbouwing voor de gekozen frameworks, en een werkend prototype voor de case. Het technisch ontwerp van de uiteindelijke applicatie alsmede de gewenste vormgeving (van de hoofdpagina) en huisstijl waren gegeven in de briefing van de case. De omschrijving van de eindopdracht bood aanvullende informatie over de vereisten van het prototype voor deze case. 

## Opbouw van de app 
De app is een SPA met een touch interface, gemaakt met Vue.js (Vue3) en Ionic en bevat de volgende onderdelen:
 - Inlogscherm (simulatie van 2 way authentication) 
 - Hoofdpagina volgens briefing 'indicatieve vormgeving dashboard', indeling met header (klikbaar logo, notificaties, instellingen) en tabs:  
	 - Tab 1: actieve taak (toegewezen inspecties, afgeronde inspecties, kennisbase, instellingen)
	 - Tab 2: zoeken
	 - Tab 3: informatie.

**Toegewezen inspecties**: overzicht van inspecties die uitgevoerd dienen te worden, alsook de mogelijkheid om deze uit te voeren. Er zijn 4 typen inspecties (schade opnemen, achterstallig onderhoud opnemen, technische installaties inspecteren, modificaties inventariseren) ieder met eigen opties die ingevuld dienen te worden. 

**Afgeronde inspecties**: overzicht van inspecties die zijn uitgevoerd, waarmee de details van de inspectie inzichtelijk worden en indien nodig aangepast (bewerkt) kunnen worden. 

**Kennisbase**: kenniscentrum met alle relevante bestanden m.b.t. de inspecties. 

**Instellingen**: o.a. accountgegevens en gebruikersvoorkeuren. 

## Functionaliteiten prototype
De focus voor deze opdracht lag op de 4 schermen binnen de tab actieve taak en de navigatie daartussen middels routing. Gezien het een prototype is, zijn nog niet alle functionaliteiten uitgewerkt. Dit is een overzicht van functionaliteiten die nog niet of niet volledig zijn uitgewerkt: 
 - **Loginscherm**: dit scherm is een simulatie van een 2 way authentication met demo accountgegevens en een demo verificatiecode en is daarmee geen officieel werkend loginscherm. 
 - **Zoeken**: de zoekbalk is toegevoegd en hier kan in getypt worden, maar er kan nog geen daadwerkelijke zoekopdracht worden uitgevoerd.
 - **Informatie**: deze pagina bevat fictieve content. 
 - **Notificaties**: deze pagina bevat 2 fictieve, statische meldingen. 
 - **Instellingen**: de dark/light modus en uitlogknop werken, maar verdere instellingen zoals het wijzigen van accountgegevens of het instellen van voorkeuren voor meldingen werkt nog niet. De gebruiker krijgt bij het klikken op een van deze opties een alert met de melding dat deze functionaliteit nog niet is uitgewerkt. Het doel van deze pagina voor dit prototype is met name laten zien wat er mogelijk is. 
 - **Toegewezen/afgeronde inspecties**: er zijn 5 inspecties in de externe database toegevoegd die uitgevoerd dienen te worden. Het prototype is zo ingesteld dat wanneer deze opnieuw wordt opgestart, de inspecties worden gereset naar de beginsituatie, zodat er altijd inspecties aanwezig zijn om de app mee te testen. 
 - **Kennisbase**: er zijn 3 fictieve onderdelen toegevoegd aan de kennisbase, waarvan de inhoud ook fictief en vooral ter illustratie is.

Daarnaast heb ik 2 functionaliteiten toegevoegd die niet in de opdracht omschreven waren, maar die ik wel een goede toevoeging vond aan de gebruiksvriendelijkheid: 
 - **Terug knop**: wanneer je door de schermen navigeert en als het ware 'een laag dieper' gaat, verschijnt er in de headerbalk een terug knop waarmee je terug kan gaan naar je vorige scherm. In 90% van de gevallen werkt deze goed. Er zit echter nog een kleine bug in bij met name de stap van het afronden van een inspectie: je kan dan namelijk ook terug en dan ga je terug naar de uitvoer van je inspectie, maar kan je deze niet opnieuw afronden (want deze is al geregistreerd als afgerond). 
 - **Kennisbase items**: voor de kennisbase heb ik voor een ietwat andere UX gekozen dan in het technisch ontwerp aangegeven. In overleg met de focusgroep (een neutrale partij die vanuit gebruikersperspectief haar mening gaf) bleek het een fijnere gebruikerservaring als de informatie van de kennisbank als daadwerkelijke onderdelen van de app geïntegreerd zouden zijn, waar nodig eventueel nog met aanvullingen van (externe) linkjes of PDFs. De kennisbase onderdelen heb ik daarom geïntegreerd in de app als een soort klikbare 'modules', wat professioneler oogt dan enkel een losse lijst aan PDF-bestanden. Deze modules kunnen in de uiteindelijke app aan de achterkant worden samengesteld met daarin relevante linkjes en bestanden zoals in het voorbeeld van de Testprocedures. 

### Overige tekortkomingen / verbeterpunten
Mijn werk kan op de volgende manieren nog verbeterd worden: 
 - Wanneer je een inspectie bewerkt en de wijzigingen opslaat, komt een alert in beeld dat de wijzigingen succesvol zijn opgeslagen. Echter wanneer je nogmaals de inspectie bewerkt, worden de wijzigingen wel opgeslagen, maar komt de alert niet meer in beeld. Na meerdere pogingen is het me nog niet gelukt om deze alert wel zichtbaar te krijgen. Dit is dus nog een bug. 
 - De views AssignedInspectionDetails.vue en EditInspection.vue bevatten op dit moment nog veel herhalende code. Het zou daarom beter zijn om gebruik te maken van herbruikbare componenten, wellicht via een herbruikbare form component (bijv. InspectionForm.vue) die dan gebruikt wordt in de genoemde views. Echter na meerdere onsuccesvolle pogingen om dit werkend te krijgen, heb ik besloten mijn uitwerking te houden op de werkende, maar wat minder nette oplossing waar de code op twee plaatsen blijft staan. Qua onderhoud en doorontwikkeling is dit voor de developer(s) uiteraard niet ideaal. 
 - Ik heb 1 probleemmelding in mijn vite.config.js bestand (standaard toegevoegd bestand, zelf geen wijzigingen in aangebracht). Dit bestand is standaard toegevoegd aan het project en aangezien ik niets met testen heb gedaan op dit moment heb ik deze probleemmelding onbehandeld gelaten. Ik heb dit stukje code uitgecomment.
 -  Bij het uitvoeren danwel bewerken van een inspectie komen er afhankelijk van het type browser in de console log een aantal verborgen problemen/warnings in beeld, echter zijn deze warnings niet consistent aanwezig in alle browsers en heb ik ook de oorzaak niet kunnen herleiden of het probleem kunnen oplossen. Ik verwacht dat dit vanuit het Ionic framework komt. 
 - Eventueel via media queries specifieke instellingen uitwerken voor verschillende schermgroottes. Echter is de app nu zonder media queries ook al goed te gebruiken op verschillende schermgroottes. 
 - Verbeterpunten die in de verantwoording op security, usability, accessibility en style guides/best practices hieronder zijn genoemd. 

## Prototype bekijken
Het prototype kan uitgeprobeerd worden via: [https://real-estate-care-jvds.netlify.app/](https://real-estate-care-jvds.netlify.app/).

Alternatief is om het prototype via de GitHub repository te clonen (main branch), in te stellen en te bezichtigen via de localhost. Dit is de link naar mijn GitHub repository: [https://github.com/JesseSande/real-estate-care-ionic-app](https://github.com/JesseSande/real-estate-care-ionic-app). 

 ### Simulatie inloggegevens
 - Gebruikersnaam: demoaccount
 - Wachtwoord: demodemo123
 - Verificatiecode: 123456

## Verantwoording security
A.d.h.v. [blog TatvaSoft](https://www.tatvasoft.com/blog/vue-js-best-practices/):
 - Ik heb geen non-trusted templates gebruikt. 
 - Vue zorgt dat content en attribute bindings automatisch geescaped worden.
 - Ionic heeft basis sanitization ingebouwd (maar is geen allesomvattende oplossing).
 - Ik heb geen v-html gebruikt. 
 - Met npm audit zijn 0 vulnerabilities gevonden. 
 - Er wordt een algemene foutmelding gegeven bij verkeerde inloggegevens. 
 - Verbeterpunt: er zijn verder niet bewust specifieke sanitization stappen of veiligheids/validatie bibliotheken doorgevoerd. 

## Verantwoording usability
A.d.h.v. [de 10 heuristieken van Jacob Nielsen](https://www.uxfactor.nl/10-vuistregels-voor-gebruiksvriendelijkheid/):

**1. Zichtbaarheid van systeemstatus**
   - De tabbar toont met kleurverschillen de actieve tab.
   - Verplichte velden bij inspecties worden gemarkeerd. Bij ontbrekende invoer krijgt de gebruiker een alert, gekleurde en gekaderde markeringen.
   - Een alert bevestigt het afronden van inspecties of opslaan van wijzigingen.
   - Niet-werkende functionaliteiten tonen een alert bij interactie.

**2. Match tussen systeem en de echte wereld**
   - Bekende iconen voor o.a. instellingen, meldingen, zoekfunctie en verwijderen.
   - Buttons hebben tekst die de functie van de button beschrijft.
   - Verplichte velden zijn gemarkeerd met "(verplicht)" in plaats van een *.

**3. Controle en vrijheid**
   - Terug-knop voor eenvoudig navigeren.
   - Alerts bieden annuleeropties.
   - Bevestiging gevraagd vóór het verwijderen van foto's.

**4. Consistentie en standaarden**
   - Consistente view-opbouw met zichtbare headers.
   - Knoppen hebben een herkenbare look.
   - Consistente terminologie, zoals 'inspectie'.
   - Radio buttons zijn rond gestijld en checkboxes vierkant.
   - Foutmeldingen zijn rood.

**5. Fout preventie**
   - Validatie voor verplichte velden bij inspecties.
   - Verbeterpunt: (placeholder-)instructies kunnen het invullen vergemakkelijken.
   - Verbeterpunt: extra alert vóór definitief afronden van inspecties.

**6. Herkenning in plaats van herinnering**
   - Consistente opbouw van inspectiepagina’s.
   - Inspectie bewerk scherm lijken visueel op inspectie uitvoer scherm voor herkenbaarheid.

**7. Flexibiliteit en efficiëntie**
   - Dark/light modus werkt.
   - Voor prototype nog niet uitgewerkt: verdere personalisatie-opties voor gebruikers.

**8. Stijlvol en minimalistisch design**
   - Hoofdacties direct toegankelijk via het hoofdscherm.
   - Kennisbank onderverdeeld in 'modules' op onderwerp om informatie-overload te voorkomen.
   - Consistent kleurpalet zonder overbodige elementen.

**9. Help gebruikers fouten herkennen, opsporen en herstellen**
   - Visuele handvatten bij fouten bij afronden/bewerken van een inspectie. 

**10. Hulp en documentatie**
   - Informatiepagina. Voor prototype is deze pagina inhoudelijk nog niet uitgewerkt. 
   - Zoekpagina met zoekbalk. Voor prototype is deze functionaliteit nog niet werkend gemaakt.
   - Kennisbank met relevante documenten en informatie. Voor prototype nog met fictieve content. 
   - Verwijzingen naar testprocedures bij inspecties en documentatie bij modificaties. Voor prototype nog met fictieve content. 

## Verantwoording accessibility
A.d.h.v. [WCAG2.1 Niveau A](https://digitaaltoegankelijk.nl/wcag-uitgelegd/): 
 - Voldoet aan: 1.1.1, 1.1.3, 1.3.3, 2.1.2, 2.2.2, 2.3.1, 2.4.2, 2.4.4, 2.5.1, 2.5.2, 2.5.3, 3.1.1, 3.2.1, 3.2.2, 3.3.1, 3.3.2, 4.1.1, 4.1.2. 
 - Voldoet grotendeels aan: 1.3.2 (a.), 1.4.1 (b.). 
 - Voldoet niet (voldoende) aan: 2.1.1 (c.), 2.4.1 (d.), 2.4.3 (e.).
 - Niet van toepassing: 1.2.1, 1.1.2, 1.1.3, 1.4.2, 2.1.4, 2.1.1, 2.5.4.

(a.) Niet geoptimaliseerd voor schermlezer.
(b.) De gecheckte inspectie optie bij het uitvoeren/bewerken van een inspectie levert misschien verwarring op dat het een knop is bij zwart/wit filter. Ook is het kleurcontrast niet overal voldoende, echter is dit ook een beperking van de huisstijl van RealEstateCare. 
(c.) De lijst van toegewezen en afgeronde inspecties en kennisbase items zijn nog niet met toetsenbord te selecteren.
(d.) Skip-links zijn niet toegevoegd. 
(e.) Zie (c.). 


## Verantwoording style guides/best practices
A.d.h.v. [blog TatvaSoft](https://www.tatvasoft.com/blog/vue-js-best-practices/) en [vuejs.org](https://vuejs.org/style-guide/): 
 - Key v-for is gebruikt met ": key”.
 - Voor custom events is in lijn met Vue3 mogelijkheden en JavaScript conventies ([bron](https://eslint.vuejs.org/rules/custom-event-name-casing.html)) gekozen voor camelCase. 
 - Namen van components zijn in PascalCase en bestaan uit meer dan 1 woord en geen afkortingen. 
 - De npm packages zijn up to date. 
 - Er is geen mix van v-for en v-if op hetzelfde element. 
 - Prefix 'The' is aan header, tabbar en tabs componenten gegeven, aangezien deze maar één keer per pagina gebruikt worden.
 - De shorthand is gebruikt voor built-in directives die een shorthand bieden zoals v-bind (:) en v-on (@).
 - Er is gebruik gemaakt van de VueRouter. 
 - Scoped style is gebruikt binnen componenten. 
 - Elementen met meer dan 2 attributen zijn per attribuut op een aparte regel gezet. 
 - Attribuutwaarden staat tussen quotes (""). 
 - Volgorde binnen componenten (`<template></template>`, `<script></script>`, `<style></style>`) is consistent toegepast. 
 - Binnen scoped style zoveel mogelijk gebruik gemaakt van class selectors i.p.v. element selectors. 
 - Verbeterpunt: code opschonen en refactoring. Dit heb ik op sommige plekken zoals de header en tabbar wel toegepast, maar binnen sommige componenten zit nog wel herhalende code. Dit kan nog verder geoptimaliseerd worden. Ook kan er nog meer gebruik gemaakt worden van componenten. 
 - Verbeterpunt: gebruikmaken van commit berichten en [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). 

## Procesbeschrijving
Voor de uitwerking van deze opdracht heb ik gekozen om Vue3 en Ionic te gebruiken. De onderbouwing hiervoor is te vinden in mijn debriefing. Ik ben begonnen met het uitwerken van de basis layout, d.w.z. het aanpassen van de look van de tabs, het uitwerken van de header en de basis leggen voor de 4 schermen in de hoofdpagina middels componenten. Dit was allemaal nog onderdeel van de eerste twee feedbackopdrachten. Voor de derde feedbackopdracht ben ik toen aan de slag gegaan met het maken van een JSON bestand met mock-up data voor 5 inspecties, welke ik vervolgens via een web API met My JSON Server beschikbaar heb gemaakt voor de applicatie. Dit is ook het punt waarop ik een GitHub repository heb aangemaakt en hier in versies ben gaan werken waarin ik per versie (branch) een afgebakend stuk functionaliteit verder ontwikkelde. Hierna ben ik de verdere functionaliteiten zoals vereist voor de eindopdracht gaan uitwerken, te beginnen bij het (simulatie) loginscherm. Voor efficiënter inrichten van de code ben ik gaan werken met herbruikbare componenten voor de header en de tabbar. Vervolgens heb ik de fictieve notificaties uitgewerkt, het logo in de header klikbaar gemaakt (terug naar hoofdpagina ‘actieve taak’) en de pagina’s zoeken en informatie uitgewerkt (met fictieve content). Toen ben ik de instellingen pagina gaan uitwerken, waarbij ik met name aandacht heb besteed aan de dark/light modus zodat deze een fijne gebruikerservaring oplevert. Functionaliteiten die ik nog niet heb uitgewerkt heb ik wel klikbaar gemaakt, zodat het prototype wel als werkend voelt voor de gebruiker. Er zit dan bijvoorbeeld een alert achter waaruit duidelijk wordt dat de functionaliteit nog niet verder is uitgewerkt. Ook de kennisbase heb ik uitgewerkt met 3 fictieve onderdelen, waarbij er bij de Testprocedures een voorbeeld PDF geopend kan worden. Vervolgens ben ik de toegewezen inspecties gaan uitwerken, namelijk dat je deze kunt aanklikken, dat één van de 4 opties al is aangevinkt o.b.v. het type inspectie, en dat alle vereiste invoervelden (incl. camera m.b.v. capacitor en capacitor camera) erin staan. Later heb ik ook nog validatie van verplichte velden toegevoegd. Ik heb uitgewerkt dat bij het afronden van een inspectie een alert box in beeld komt dat de inspectie succesvol is afgerond en dat daarna automatisch doorverwezen wordt naar de afgeronde inspecties pagina. Ik heb voor de nette afwerking ook toegevoegd dat wanneer er geen toegewezen inspecties of geen afgeronde inspecties zijn, dit als tekst wordt aangegeven aan de gebruiker, zodat deze weet dat de pagina wel goed geladen is. Ik heb de afgeronde inspecties andersom gesorteerd dan de toegewezen inspecties, d.w.z. bij de toegewezen inspecties staat de oudste bovenaan (meest urgent om op te pakken) en bij de afgeronde inspecties staat de oudste onderaan (meest recente het makkelijkst erbij kunnen pakken). De afgeronde inspecties heb ik klikbaar gemaakt om de details in te kunnen zien. Voor state management ben ik gaan werken met stores, een service (asynchroon) en Pinia. Het doorgeven van de details van de invoer bij toegewezen inspecties naar de details bij de afgeronde inspecties was een opdracht waar ik meerdere pogingen voor nodig had voordat ik het werkend had gekregen, maar uiteindelijk is het gelukt. Ook heb ik een terugknop toegevoegd voor fijne navigatie wanneer de gebruiker een laag dieper in een bepaald onderdeel zit en makkelijk terug wil naar het vorige scherm zonder altijd via het hoofdscherm te moeten. Gaandeweg heb ik de router aangepast naar wat nodig was om de navigatie naar wens in te richten. Zo ook voor de laatste functionaliteit die ik heb gerealiseerd, het bewerken van een afgeronde inspectie. Hiervoor heb ik een nieuwe view aangemaakt zodat alles netjes gescheiden blijft. Een belangrijk verbeterpunt hierin is verder nog het refactoren van code en beter gebruik maken van herbruikbare componenten in de uitvoer//inzien details/bewerk inspectie onderdelen, waar zich nu nog veel herhalende code bevindt. Voor beide heb ik diverse pogingen gedaan, maar toen het mij na lange tijd nog niet gelukt was, heb ik besloten te settelen voor een minder ideale maar in ieder geval werkende uitwerking. Toen alle functionaliteiten voor het prototype en de vereisten van de eindopdracht uitgewerkt waren, ben ik de code gaan optimaliseren, gericht op het verbeteren van security, usability, accessibility en naleving van best practices/styleguides. Hierbij heb ik ook getest in hoeverre mijn prototype voldoet aan de 10 heuristieken van Jacob Nielsen en de WCAG2.1 richtlijnen (de conclusie hiervan vond je eerder in deze README). Tot slot ben ik alle resterende fouten uit de code, gericht op valide implementatie van Typescript, eruit gaan werken en heb ik een _redirects bestand toegevoegd zodat ik mijn site kon deployen via Netlify, wat uiteindelijk gelukt is. Gedurende het proces ben ik tegen veel fouten en problemen aangelopen. Ik heb ChatGPT4o gebruikt als trouwe sparringpartner die mij hielp problemen te begrijpen en oplossingen te vinden of om mij überhaupt op weg te helpen. Ik heb vragen gesteld, voorbeelden laten uitwerken en ook voorbeelden van externe internetpagina’s aangedragen als input om tot het beste resultaat te komen. Dit alles heeft geleid tot het prototype wat u nu live kunt uitproberen.

## Afsluiting
Deze uitwerking is gemaakt door Jesse van de Sande (juli 2024).
