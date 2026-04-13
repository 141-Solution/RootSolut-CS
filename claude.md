Du bist ein erfahrener Full-Stack-Entwickler mit Fokus auf moderne Webanwendungen. Deine Aufgabe ist es, eine vollständige Webanwendung für Ahnenforschung zu erstellen.

## Technische Anforderungen

* Verwende **Next.js (App Router, aktuelle Version)** als Framework
* Nutze **TypeScript**
* Styling mit **Tailwind CSS**
* Optional: UI-Komponentenbibliothek (z. B. shadcn/ui)
* Serverseitige Verarbeitung (Node.js) für Dateizugriff
* Strukturierter, sauberer und wartbarer Code

## Kernfunktionalität

Die Anwendung soll **GEDCOM-Dateien** (Standardformat für genealogische Daten) aus einem lokalen Ordner einlesen, parsen und die enthaltenen Familiendaten übersichtlich darstellen.

### GEDCOM Anforderungen

* Implementiere einen Parser für GEDCOM-Dateien
* Lade automatisch alle `.ged` Dateien aus einem definierten Verzeichnis (z. B. `/data/gedcom`)
* Extrahiere:

  * Personen (Name, Geburtsdatum, Sterbedatum)
  * Familienbeziehungen (Eltern, Kinder, Ehepartner)
* Stelle die Daten strukturiert dar (z. B. Baumansicht oder Listenansicht)

## Seiten / Rubriken

### 1. Chronologie

* Zeige wichtige Ereignisse in zeitlicher Reihenfolge
* Filter nach Personen oder Familien
* Optional: Timeline-Komponente

### 2. Aus der Tageslöhnerei

* Blog-/Artikelbereich
* Inhalte können statisch sein (Markdown oder JSON)
* Darstellung einzelner Beiträge und Übersichtsliste

### 3. Kontaktformular

* Formular mit:

  * Name
  * E-Mail
  * Nachricht
* Validierung (Client + Server)
* API-Route zum Verarbeiten der Anfrage
* Optional: Versand per E-Mail (z. B. via Nodemailer)

### 4. Weitere Anforderungen

* Navigation zwischen den Seiten
* Responsives Design (mobilfreundlich)
* Saubere Ordnerstruktur (z. B. `/app`, `/components`, `/lib`, `/data`)
* Wiederverwendbare Komponenten

## Bonus (falls möglich)

* Interaktive Darstellung eines Stammbaums
* Suchfunktion für Personen
* Mehrsprachigkeit (i18n)

## Ausgabeformat

* Gib den vollständigen Projektcode aus
* Strukturiere nach Dateien (mit Dateinamen als Überschrift)
* Verwende sinnvolle Kommentare im Code
* Stelle sicher, dass das Projekt direkt lauffähig ist

## Ziel

Eine funktionale, moderne und erweiterbare Ahnenforschungs-Webseite mit Fokus auf GEDCOM-Datenverarbeitung.
