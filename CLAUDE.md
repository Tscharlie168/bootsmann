# Bootsmann – Hinweise für Claude Code

## Immer zuerst synchronisieren

Bevor Code-Änderungen an diesem Repo begonnen werden: `git fetch origin main`
ausführen und prüfen, ob der aktuelle Arbeits-Branch hinter `origin/main`
zurückliegt (`git log HEAD..origin/main`). Grund: An Bootsmann arbeiten
öfter mehrere Claude-Code-Sessions parallel bzw. nacheinander; Branches
sind Momentaufnahmen und bekommen von bereits gemergten PRs nichts mit.
Bei Rückstand vor Beginn neuer Arbeit erst gegen `main` rebasen bzw. den
Stand abgleichen, um Duplikate/Konflikte mit bereits gemergten Features
zu vermeiden (ist schon einmal passiert: eine eigene "Nächste Abfahrt"-
Kachel wurde gebaut, obwohl auf `main` längst eine bessere, generische
Version existierte).

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
