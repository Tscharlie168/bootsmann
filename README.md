# Bootsmann

Eigenständige Web-App (PWA) mit Schifffahrtsplänen für den Bodensee.

Bootsmann war ursprünglich Teil des [Lotse](https://1a-lotse.de)-Projekts
und wurde daraus gelöst. Lotse bleibt komplett unabhängig und
unbeeinflusst von der Weiterentwicklung von Bootsmann – kein Code-Sharing,
keine gemeinsame Weiterentwicklung.

## Funktionen

- **Ausflugsschiffe** (`bsb-fahrplan.html`) – Verbindungsplaner, Schweiz-Reiter,
  Live-Karte mit berechneten Schiffspositionen (auch über die Startseiten-
  Kachel „Karte" direkt erreichbar), Hinweise-Tab
- **Autofähre** (`autofaehre.html`) – Konstanz–Meersburg
- **Katamaran** (`katamaran.html`) – Konstanz–Friedrichshafen, eigener
  Betreiber (Katamaran-Reederei Bodensee), eigener Fahrplan
- **Nächste Abfahrt** – zeigt automatisch die nächste Schiffsabfahrt ab
  dem nächstgelegenen Hafen (mischt BSB- und Katamaran-Abfahrten bei
  Konstanz/Friedrichshafen nach Uhrzeit)
- **Mehrsprachigkeit** – Deutsch, Englisch, Französisch, Niederländisch
  (`i18n.js`), Sprachumschalter oben rechts im Header auf allen Seiten
- **PWA** – installierbar, offline nutzbar per Service Worker (`sw.js`)

## Struktur

| Datei | Zweck |
|-------|-------|
| `index.html` | Startseite mit Kacheln und Nächste-Abfahrt |
| `i18n.js` | Übersetzungen (DE/EN/FR/NL) – genutzt von allen vier Seiten |
| `bsb-fahrplan.html` | Fahrplan der Ausflugsschiffe, inkl. Live-Karte |
| `autofaehre.html` | Fahrplan der Autofähre Konstanz–Meersburg |
| `katamaran.html` | Fahrplan des Katamaran Konstanz–Friedrichshafen |
| `fahrplan-daten.js` | Gemeinsame BSB-Kursdaten (Häfen, Koordinaten, Kurse, Gültigkeitslogik) – genutzt von `index.html` und `bsb-fahrplan.html` |
| `katamaran-daten.js` | Gemeinsame Katamaran-Kursdaten – genutzt von `index.html`, `bsb-fahrplan.html` und `katamaran.html` |
| `sw.js` | Service Worker (Offline-Cache) |
| `bootsmann.webmanifest` | PWA-Manifest |
| `bootsmann-icon-*.png` | App-Symbole |

Fahrplan-/Kursdaten **nur** in `fahrplan-daten.js` bzw. `katamaran-daten.js`
ändern, nicht in den einzelnen Seiten duplizieren – sonst laufen sie
auseinander.

## Hosting

Statische Seite, ausgelegt für GitHub Pages aus dem Repo-Root
(`https://tscharlie168.github.io/bootsmann/`). Alle Pfade sind relativ,
`scope` und `start_url` sind `./`.

## Entwicklung

Lokal genügt ein einfacher Webserver, z. B.:

```sh
python3 -m http.server 8000
# dann http://localhost:8000/ öffnen
```

> Bei jeder Änderung an den im Service Worker gecachten Dateien die
> Versionsnummer in `sw.js` (`const CACHE = 'bootsmann-vN'`) um eins erhöhen.

Siehe `CLAUDE.md` für den verbindlichen Arbeitsablauf (main als einzige
Datenquelle, PR-Workflow) sowie `STRATEGIE-APP-STORE.md`,
`PRODUKT-IDEEN.md` und `KATAMARAN-DATEN.md` für den laufenden
Diskussions- und Umsetzungsstand.

Angaben ohne Gewähr.
