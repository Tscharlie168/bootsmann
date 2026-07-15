# Bootsmann – Hinweise für Claude Code

## Seitenstruktur der App (verbindlich)

Das ist die festgelegte Struktur von Bootsmann – neue Features werden in
diese Struktur eingeordnet, nicht als zusätzliche Top-Level-Seiten daneben:

- **Hauptseite** (`index.html`) mit 4 Kacheln: BSB, Fähre, Katamaran, Karte
- **BSB** (`bsb-fahrplan.html`) hat drei Unterseiten/Tabs: Verbindung,
  Schweiz, Hinweise
- **Fähre** (`autofaehre.html`) ist eine Seite
- **Katamaran** (`katamaran.html`) ist eine Seite
- **Karte** ist eine Seite (Live-Karte, per Tab in `bsb-fahrplan.html?tab=karte`
  erreichbar)

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

**Ursache gefunden und behoben (14.07.2026)**: Der eigentliche Grund für
den veralteten Ausgangsstand war, dass der **Default-Branch des
GitHub-Repos** monatelang auf einem alten Setup-Branch
(`claude/bootsmann-repo-setup-2hqkvr`, ~40 Commits hinter `main`) stand
statt auf `main`. Neue Sessions/Klone orientieren sich am Default-Branch
– das ist die vermutliche Wurzel des Problems, nicht (nur) parallel
laufende Sessions. Der Default-Branch wurde inzwischen auf `main`
umgestellt und alle 15 toten, bereits gemergten Branches gelöscht. Trotzdem
gilt die Regel unten weiter uneingeschränkt – zur Sicherheit, falls der
Default-Branch je wieder falsch gesetzt wird oder aus einem alten Fork/
einer alten Session heraus gearbeitet wird.

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

**GitHub Pages**: Die Live-Seite (`https://tscharlie168.github.io/bootsmann/`)
wird aus `main` (Root-Verzeichnis) gebaut – das war schon immer korrekt
eingestellt und ist nicht die Fehlerquelle gewesen.

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

## Typografie-Konsistenz über alle Seiten hinweg

Wenn Schriftgröße, Schriftart, Farbe oder ähnliche Style-Werte auf einer
Seite geändert werden (z. B. `.foot`, `.notice`/Hinweis-Boxen, `.dir button
b`/`small`, Überschriften-Größen, `.dep .t`/`.meta`), automatisch – ohne
Nachfrage – auf allen vier Seiten (`index.html`, `bsb-fahrplan.html`,
`autofaehre.html`, `katamaran.html`) prüfen, ob dieselbe/eine analoge Klasse
dort denselben Wert hat. Bei Differenzen aktiv Rückmeldung geben (welche
Seite weicht mit welchem Wert ab), statt die Änderung nur auf der
angefragten Seite umzusetzen und die anderen unangetastet zu lassen. Ziel:
einheitliches Erscheinungsbild über die ganze App, nicht nur auf der
gerade bearbeiteten Seite.

## Vorlage-basierte Änderungen: selbst gegenprüfen statt nur technisch testen

Wenn eine neue Seite/ein neuer Abschnitt von einer bestehenden Seite
kopiert wird (z. B. neue Fahrplan-Seite nach Muster von `autofaehre.html`),
reicht ein technischer Test (lädt die Seite, keine JS-Fehler, Screenshot)
NICHT aus. Zusätzlich vor dem Abschluss aktiv gegen die Geschwisterseiten
prüfen:
- Passt jedes Text-/Label-Detail inhaltlich zum neuen Kontext, oder ist es
  nur unverändert mitkopiert (z. B. zwei Buttons mit demselben generischen
  Label statt echter unterscheidender Angaben)?
- Sind alle mitkopierten CSS-Variablen/Klassen tatsächlich noch in
  Gebrauch, oder bleiben Leichen aus der Vorlage zurück?
- Folgt Überschriften-Hierarchie/Wortwahl demselben Muster wie auf den
  anderen Seiten der App (z. B. Produktname vs. Strecke als große
  Überschrift)?
Das ist mehrfach nicht passiert und musste vom Auftraggeber nachträglich
gefunden werden ("Kopierreste") – kostet unnötig Zeit und Nerven auf
beiden Seiten. Diese Kontrolle aktiv selbst machen, bevor das Ergebnis
präsentiert wird.

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
