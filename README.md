# Die Schwiesselmänner – Familienchronik & Ahnenforschung

> Entwickelt von **[141-Solution](https://github.com/141-Solution)** im Auftrag von **Christian Schwiesselmann**

Eine moderne Webanwendung zur Ahnenforschung der Familie Schwiesselmann, erstellt mit **Next.js 15**, **TypeScript** und **Tailwind CSS**.

---

## Funktionen

- **GEDCOM-Parser** – lädt und verarbeitet `.ged`-Dateien automatisch aus `data/gedcom/`
- **Stammbaum** – Personensuche, Vorfahrenansicht, Familien und Kinder
- **Chronologie** – vollständige schriftliche Chronik der Schwießelmänner
- **Aus der Tageslöhnerei** – Digitalisiertes Dokument eines Verwandten
- **Kontakt** – Kontaktformular mit client- und serverseitiger Validierung sowie optionalem E-Mail-Versand via Nodemailer
- Responsives, mobiloptimiertes Design in erdigen Farbtönen (Grün / Braun / Orange)

---

## Technologie-Stack

| Bereich      | Technologie                                   |
|--------------|-----------------------------------------------|
| Framework    | Next.js 15 (App Router)                       |
| Sprache      | TypeScript 5                                  |
| Styling      | Tailwind CSS 4                                |
| Schriften    | Cormorant Garamond · Source Sans 3 (Google)   |
| E-Mail       | Nodemailer 8                                  |
| Datenformat  | GEDCOM 5.5                                    |

---

## Projektstruktur

```
/
├── data/
│   ├── gedcom/          # GEDCOM-Dateien hier ablegen
│   
├── src/
│   ├── app/             # Next.js App-Router-Seiten & API-Routen
│   │   ├── page.tsx             # Startseite
│   │   ├── chronologie/         # Chronologie-Seite
│   │   ├── stammbaum/           # Stammbaum-Seite
│   │   ├── tagesloehnerei/      # Blog / Artikel
│   │   ├── kontakt/             # Kontakt-Seite
│   │   └── api/contact/         # API-Route für das Kontaktformular
│   ├── components/      # Wiederverwendbare UI-Komponenten
│   └── lib/             # GEDCOM-Parser, Artikel-Loader
└── ...
```

---

## Erste Schritte

**Voraussetzung:** Node.js ≥ 20

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Produktionsserver starten
npm start
```

Die Anwendung läuft standardmäßig unter `http://localhost:3000`.

---

## GEDCOM-Daten

Beliebige `.ged`-Dateien einfach im Ordner `data/gedcom/` ablegen. Die Anwendung erkennt und verarbeitet sie automatisch beim nächsten Serverstart. Personen, Familien, Geburts- und Sterbedaten sowie Ortsangaben werden im Stammbaum und in der Chronologie-Ansicht dargestellt.

---

## Kontaktformular & E-Mail

Die API-Route (`src/app/api/contact/route.ts`) verarbeitet Formular-Einsendungen. Um den tatsächlichen E-Mail-Versand zu aktivieren, `.env.local.example` nach `.env.local` kopieren und die SMTP-Zugangsdaten eintragen:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=ihre@email.de
SMTP_PASS=ihrpasswort
MAIL_TO=empfaenger@email.de
```

---

## Lizenz

Dieses Projekt ist proprietär. Details siehe [LICENSE](LICENSE).

---

## Impressum

Entwickelt von **141-Solution** im Auftrag von **Christian Schwiesselmann**.  
© 2025–2026 Christian Schwiesselmann. Alle Rechte vorbehalten.
