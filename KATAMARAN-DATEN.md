# Katamaran Konstanz–Friedrichshafen – Rohdaten Sommerfahrplan 2026

Quelle: hochgeladener PDF-Flyer "Katamaran_Sommerfahrplan_2026.pdf",
Tarifstand 01.04.2026, Änderungen vorbehalten. Noch nicht in die App
integriert – dient als Basis für die Integrationsentscheidung.

## Betreiber

**Katamaran-Reederei Bodensee GmbH & Co.KG** – eigenständiger Betreiber,
nicht identisch mit BSB (Bodensee Schiffsbetriebe) oder der Autofähre
(Stadtwerke Konstanz).

- Konstanz Hafen: Hafenstraße 6, 78462 Konstanz, Tel. 07531 363992-0,
  info@der-katamaran.de
- Friedrichshafen Hafen: Seestraße 23, 88045 Friedrichshafen,
  Tel. 07541 971090-0, info@der-katamaran.de
- Web: der-katamaran.de

## Strecke

Nur **zwei Häfen**: Konstanz (KN) ↔ Friedrichshafen (FN). Fahrzeit 52
Minuten, ganzjährig (365 Tage), Sommerfahrplan gültig 01.04.–04.10.2026
(Winterfahrplan separat auf der-katamaran.de).

## Fahrplan (Sommer 2026)

| Verkehrstag | KN ab → FN an | FN ab → KN an |
|---|---|---|
| Mo.–Fr. werktags¹ | 07:00 → 07:52 | 07:00 → 07:52 |
| Mo.–Fr. werktags¹ | 08:00 → 08:52 | 08:00 → 08:52 |
| täglich | 09:00 → 09:52 | 09:00 → 09:52 |
| täglich | 10:00 → 10:52 | 10:00 → 10:52 |
| täglich | 11:00 → 11:52 | 11:00 → 11:52 |
| täglich | 12:00 → 12:52 | 12:00 → 12:52 |
| täglich | 13:00 → 13:52 | 13:00 → 13:52 |
| täglich | 14:00 → 14:52 | 14:00 → 14:52 |
| täglich | 15:00 → 15:52 | 15:00 → 15:52 |
| täglich | 16:00 → 16:52 | 16:00 → 16:52 |
| täglich | 17:00 → 17:52 | 17:00 → 17:52 |
| täglich | 18:00 → 18:52 | 18:00 → 18:52 |
| Freitag–Sonntag | 19:00 → 19:52 | 19:00 → 19:52 |
| Freitag–Sonntag | 20:00³ → 20:52 | 20:00 → 20:52 |
| Fr. & Sa. (AbendKAT) | – | 21:00 → 21:52 |
| Fr. & Sa. (AbendKAT) | 22:00 → 22:52 | – |

Fußnoten: 1) entfällt am 04.06.2026. 2) entfällt am 18.07. (Seehasenfest)
und 08.08. (Seenachtsfest). 3) entfällt am 08.08.2026.

Takt: stündlich von 9–18 Uhr täglich, plus Frühfahrten 7/8 Uhr werktags,
plus Spätfahrten Fr–So 19/20 Uhr, plus AbendKAT Fr/Sa 21/22 Uhr im Sommer.

## Preise (Auszug, Tarifstand 01.04.2026)

| Ticket | Preis |
|---|---|
| Erwachsener – einfache Fahrt | 14,30 € |
| Erwachsener – Hin- und Rückfahrt | 27,50 € |
| Erwachsener – einfache Fahrt mit KatCard | 7,70 € |
| Mehrfahrtenkarte (5 einfache Fahrten) | 62,50 € |
| Kind (6–14) – einfache Fahrt | 6,70 € |
| Kind (6–14) – Hin- und Rückfahrt | 13,30 € |
| Familie (bis 2 Erw. + 3 Kinder) – einfache Fahrt | 35,30 € |
| Familie – Hin- und Rückfahrt | 68,30 € |
| Fahrradmitnahme (pro Fahrrad, einfache Fahrt) | 10,50 € |
| 14-Uhr-Ticket (01.05.–04.10., Hin+Rück, ab 14 Uhr) | Erw. 19,30 € / Familie 48,20 € |

Monatskarten/Jahres-Abos vorhanden (103–227 €), für die App vermutlich
nicht relevant (Zielgruppe Touristen, nicht Pendler-Abo).

## Sonderfahrten/Events Sommer 2026 (potenziell relevant für Hinweise-Tab)

- 16.–20.07.2026 Seehasenfest (Friedrichshafen), Sonderfahrten zum
  Feuerwerk am 18.07.2026
- 31.07.–09.08.2026 Kulturufer (Friedrichshafen)
- 08.08.2026 Seenachtsfest (Konstanz), Sonderfahrten ab Lindau, Meersburg,
  Friedrichshafen bis in die Nacht (Tickets nur Vorverkauf)

## Integrationsentscheidung (14.07.2026)

**Eigene Kachel/eigener Tab auf der Startseite**, gleichrangig zu
"BSB Fahrplan" und "Bodensee Fähre" – passend zur eigenständigen Reederei
und dem eigenen Tarifsystem. Muss zusätzlich in die "Nächste
Abfahrt"-Logik auf der Startseite einfließen, da Konstanz und
Friedrichshafen wichtige Häfen sind.

### Umsetzung (14.07.2026, erledigt)

- [x] Neue Kachel "Katamaran" auf `index.html` ergänzt
- [x] Eigene Fahrplan-Seite `katamaran.html` (analog `autofaehre.html`:
      Richtungswahl + kommende Abfahrten, inkl. Sommer-Sonderausnahmen
      04.06./18.07./08.08.2026)
- [x] Fahrplandaten aus der Tabelle strukturiert eingepflegt
- [x] "Karte" als eigene 4. Startseiten-Kachel (`bsb-fahrplan.html?tab=karte`),
      Karte-Tab aus der BSB-Seiten-Navigation entfernt (jetzt 3 statt 4 Tabs
      dort: Verbindung/Schweiz/Hinweise)
- [x] Katamaran erscheint auf der Live-Karte in eigener Farbe (Lila,
      `--kat:#7B4FA0`) neben den roten BSB-Kursschiffen
- [x] "Nächste Abfahrt"-Karte auf der Startseite: zeigt automatisch die
      nächste Katamaran-Abfahrt mit großer Uhrzeit, sobald der Standort
      innerhalb von ca. 3 km von Konstanz oder Friedrichshafen liegt
- [x] Mit Playwright/Chromium lokal getestet (Startseite, Katamaran-Seite,
      Karte mit aktiven Katamaran-Positionen, Nächste-Abfahrt-Karte) –
      keine JS-Fehler, Funktionalität visuell verifiziert

### Nachtrag (14.07.2026): Branch neu gegen aktuellen main-Stand aufgebaut

Der ursprüngliche Umsetzungsstand wurde auf einem veralteten Branch
gebaut (main war zwischenzeitlich schon deutlich weiter: Rebranding,
fahrplan-daten.js-Auslagerung, generische "Nächste Abfahrt", Karte-
Vollbildmodus). Branch wurde auf `origin/main` zurückgesetzt und die
Katamaran-Integration sauber neu aufgebaut, u. a.:
- Kursdaten in eigene gemeinsame Datei `katamaran-daten.js` ausgelagert
  (analog `fahrplan-daten.js`), statt in mehreren Seiten zu duplizieren
- Katamaran fließt jetzt in die bereits bestehende generische "Nächste
  Abfahrt"-Kachel ein (BSB- und Katamaran-Abfahrten werden bei Konstanz/
  Friedrichshafen nach absoluter Zeit gemischt), statt eine zweite,
  separate Karte zu duplizieren
- sw.js Cache-Version auf v16 erhöht

### Noch offen

- [ ] Sonderfahrten/Events (Seehasenfest, Kulturufer, Seenachtsfest) noch
      nicht im Hinweise-Bereich der BSB-Seite berücksichtigt
