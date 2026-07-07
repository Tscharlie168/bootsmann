# Bootsmann

Eigenständige Web-App (PWA) mit Schifffahrtsplänen für den Bodensee –
Gäste-Service vom Seehotel Uferglück.

Bootsmann war ursprünglich Teil des [Lotse](https://1a-lotse.de)-Projekts
(im Unterordner `lotse/bootsmann/`) und wird hier als unabhängiges Tool
weiterentwickelt. Lotse behält seine eigene Fahrplan-Funktion; beide Tools
entwickeln sich getrennt voneinander.

## Funktionen

- **Ausflugsschiffe** (`bsb-fahrplan.html`) – Kursschiffe auf dem See
- **Autofähre** (`autofaehre.html`) – Konstanz–Meersburg
- **Wetter** – 3-Tage-Vorschau (Open-Meteo) auf der Startseite
- **PWA** – installierbar, offline nutzbar per Service Worker (`sw.js`)

## Struktur

| Datei | Zweck |
|-------|-------|
| `index.html` | Startseite mit Wetter und Kacheln |
| `bsb-fahrplan.html` | Fahrplan der Ausflugsschiffe |
| `autofaehre.html` | Fahrplan der Autofähre Konstanz–Meersburg |
| `sw.js` | Service Worker (Offline-Cache) |
| `bootsmann.webmanifest` | PWA-Manifest |
| `bootsmann-icon-*.png` | App-Symbole |

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

Angaben ohne Gewähr.
