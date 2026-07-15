# Bootsmann – Produkt-Ideenliste (Stand 14.07.2026)

Eingereicht vom Auftraggeber, hier aufgelistet zum gemeinsamen Durcharbeiten.
Status je Punkt: **offen** (noch nicht entschieden/umgesetzt).

## 1. Sprachen (gestaffelte Einführung)

**Entscheidung (15.07.2026)**: Alle vier Sprachen gleichzeitig einziehen
(nicht gestaffelt), Rest erst bei belegtem Bedarf. Technischer Aufbau:
eigenständige Datei `i18n.js` (Wörterbuch pro Sprache + `t()`/`tf()`-
Hilfsfunktionen + Sprachumschalter-Baustein), komplett getrennt von den
Fahrplan-Dateien – jährliches Fahrplan-Update bleibt ein reiner
Dateiaustausch ohne Berührung mit der Sprachlogik. Sprachwahl wird in
`localStorage` gespeichert und gilt seitenübergreifend. Umschalter:
Flagge + Kürzel (🇩🇪 DE · 🇬🇧 EN · 🇫🇷 FR · 🇳🇱 NL), oben rechts im
Header. Orts-/Hafennamen bleiben unübersetzt (Eigennamen).

| Prio | Sprache | Begründung | Status |
|---|---|---|---|
| 1 – Muss rein | Deutsch | Kernsprache Bodensee D/A/CH, offizielle Orts-/Hafennamen | **Erledigt (15.07.2026)** – alle vier Seiten (Startseite, BSB-Fahrplan, Fähre, Katamaran) |
| 1 – Muss rein | Englisch | Internationale Standardsprache | **Erledigt (15.07.2026)** – alle vier Seiten (Startseite, BSB-Fahrplan, Fähre, Katamaran) |
| 2 – Sehr sinnvoll | Französisch | Nähe Schweiz/Frankreich; lokale Daten Überlingen: ausländische Gäste dominiert von CH/FR ([Quelle](https://www.ueberlingen-bodensee.de/geschaeftsbericht)) | **Erledigt (15.07.2026)** – alle vier Seiten (Startseite, BSB-Fahrplan, Fähre, Katamaran) |
| 2 – Sehr sinnvoll | Niederländisch | Wichtiger Auslandsmarkt laut Statistischem Landesamt BW, v. a. Camping-/Familientourismus ([Quelle](https://www.statistik-bw.de/presse/pressemitteilungen/pressemitteilung/tourismus-in-baden-wuerttemberg-erreicht-2019-neue-hoechstwerte/)) | **Erledigt (15.07.2026)** – alle vier Seiten (Startseite, BSB-Fahrplan, Fähre, Katamaran) |
| 3 – später prüfen | Italienisch | Relevant, aber nachrangig | offen |
| 3 – später prüfen | Tschechisch/Polnisch | Nur bei belegtem Bedarf durch Nutzungsdaten/Partner | offen |

## 2. Produkt schärfen – Kernjob statt Feature-Ausweitung

**Leitsatz**: „Ich will schnell wissen, welches Schiff für mich jetzt oder
heute sinnvoll ist." Die App soll diesen einen Job extrem gut lösen statt
immer mehr zu können.

### Fünf Kernfunktionen (Soll-Zustand)

1. **Nächste Abfahrt** – **Erledigt (15.07.2026).** Nächster Hafen,
   nächste Abfahrt, Richtung/Ziel, Ankunftszeit und Machbarkeits-Check
   ("Knapp – am besten gleich losgehen" bzw. "schaffst du vermutlich
   nicht mehr") sind jetzt in der Startseiten-Kachel enthalten.
2. **Route planen** – **Entscheidung (15.07.2026): erledigt/OK so.** Nur
   BSB braucht einen Verbindungsplaner (betrifft die Urlauber mit
   längeren Strecken); Autofähre und Katamaran haben kurze, einfache
   Fahrzeiten und brauchen keinen eigenen Planer.
3. **Heute noch zurückkommen** – **Erledigt (15.07.2026).** Im
   BSB-Verbindungsplaner (Reiter "Verbindung") erscheint unter der
   Hinfahrt-Ergebnisliste eine Karte "Rückfahrt heute" (nur am aktuellen
   Tag): letzte Rückfahrt des Tages, Warnung falls sie schon vorbei ist,
   Warnung bei sehr kurzer Aufenthaltsdauer bis zur nächsten Rückfahrt
   nach der ersten Hinfahrt. Bewusst als eine zusammenfassende Karte
   statt pro-Zeile-Anzeige (Entscheidung des Auftraggebers).
4. **Nächster Hafen** – per Standort, mit Entfernung, Gehzeit, nächsten
   Abfahrten ab dort, alternative Häfen in der Nähe. **In Arbeit
   (15.07.2026).**
5. **Fähre vs. Kursschiff vs. Katamaran** – klare Kennzeichnung im
   Ergebnis statt langer Erklärung (z. B. „Fähre: fährt häufig, schnelle
   Überfahrt" / „Kursschiff: Ausflugsfahrt, seltener" / „Letzte Fahrt
   beachten"). **Entscheidung (15.07.2026): Autofähre bleibt bewusst
   außen vor** (kurze Fahrzeit Konstanz–Meersburg, für dieses Feature
   uninteressant) – nur Kursschiff/Katamaran werden unterschieden.

### Explizit NICHT (vorerst keine Feature-Ausweitung)

Restauranttipps, komplette Wetter-App, Eventkalender, Hotelbuchung,
Sehenswürdigkeiten, Gamification, Nutzerkonten, Community-Bewertungen.

### Golden-Path-Test (Zielerlebnis)

1. App öffnen
2. Ort wird erkannt/erfragt
3. Sofort nächste sinnvolle Fahrt sichtbar
4. Rückfahrt-heute-Check möglich
5. Verständnis Fähre/Kursschiff/Katamaran auf einen Blick

## Nächste Schritte

- [x] Katamaran-Fahrplan integriert (siehe `KATAMARAN-DATEN.md`)
- [ ] Punkte der Reihe nach durchgehen/abarbeiten (Reihenfolge mit
      Auftraggeber klären)
