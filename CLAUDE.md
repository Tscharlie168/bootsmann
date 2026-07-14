# Bootsmann – Hinweise für Claude Code

## Wo die aktuellen Daten liegen (verbindlich, keine Ausnahmen)

Die **einzige Quelle der Wahrheit** für den Live-Stand von Bootsmann ist
`origin/main` im Repo `Tscharlie168/bootsmann`. Kein anderer Branch, keine
lokale Kopie, kein Gedächtnis aus einer früheren Session zählt. Wer hier
arbeitet, ohne das zu prüfen, verschwendet nachweislich Zeit – das ist
schon mehrfach passiert (z. B. eine eigene "Nächste Abfahrt"-Kachel
gebaut, obwohl auf `main` längst eine bessere, generische Version
existierte; einmal musste ein kompletter Branch per `git reset --hard
origin/main` neu aufgesetzt werden, weil er auf einem veralteten Stand
gebaut war).

**Vor JEDER Code-Änderung, ausnahmslos, als allererster Schritt:**
1. `git fetch origin main`
2. `git log HEAD..origin/main` bzw. `git merge-base --is-ancestor origin/main HEAD` prüfen
3. Bei Rückstand: erst gegen `main` synchronisieren (rebasen oder, bei
   stark abweichendem/veraltetem Branch, `git reset --hard origin/main`
   und die eigene Arbeit sauber neu aufbauen), bevor irgendetwas Neues
   begonnen wird.

Das gilt unabhängig davon, wie lange die Session schon läuft oder was in
einer früheren Nachricht dieser Konversation über den Datei-Stand gesagt
wurde – der Stand kann sich durch andere, parallel laufende Sessions
jederzeit geändert haben. Im Zweifel lieber einmal zu oft fetchen.

## PR-Workflow: mergen oder nachfragen, nicht offen herumliegen lassen

Nach einer Code-Änderung PR erstellen und dann **entweder automatisch
mergen, oder vorher nachfragen** – nicht den PR einfach offen stehen
lassen und stillschweigend auf eine separate "ja, mergen"-Bestätigung
warten. Faustregel:
- Kleine, eindeutige, risikoarme Änderung (Text/Wording, offensichtlicher
  Bugfix, Fortsetzung eines bereits abgestimmten Musters): PR erstellen
  und direkt selbst mergen, danach kurz Bescheid geben, was gemacht wurde.
- Größere/mehrdeutige Änderung (neue Funktion, Architekturentscheidung,
  Preis-/Rechtstext, etwas mit unklarer Absicht): vor dem Umsetzen
  nachfragen statt einfach loszulegen.

## Projektabgrenzung: Lotse

Bootsmann war ursprünglich Teil des Lotse-Projekts (1a-lotse.de) und wurde
daraus gelöst. Entscheidung: **Lotse bleibt komplett unabhängig und
unbeeinflusst von der Weiterentwicklung von Bootsmann.** Kein Code-Sharing,
keine gemeinsame Weiterentwicklung – voller Fokus liegt auf Bootsmann als
eigenständigem, über App Store/Play Store zu vermarktendem Produkt für den
Bodensee.

## Weitere Notizen

Siehe `STRATEGIE-APP-STORE.md` (Marketing/Preise/Vertrieb), `PRODUKT-IDEEN.md`
(Sprachen, Kern-Feature-Fokus) und `KATAMARAN-DATEN.md` (Katamaran-Fahrplan-
Rohdaten und Integrationsstand) für den laufenden Diskussions- und
Umsetzungsstand.
