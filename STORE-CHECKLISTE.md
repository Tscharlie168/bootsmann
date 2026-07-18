# Bootsmann – Checkliste Play Store & App Store (Stand 18.07.2026)

Konkrete, abhakbare Checkliste für den Weg von der aktuellen PWA
(`tscharlie168.github.io/bootsmann/`) zu echten Store-Einträgen bei
Google Play und Apple App Store. Ergänzt/konkretisiert die
Entscheidungen aus `STRATEGIE-APP-STORE.md` (dort steht das "Warum",
hier das "Wie/Wann"). Reihenfolge = empfohlene Bearbeitungsreihenfolge,
nicht zwingend – Punkte mit 🔴 sind Langläufer/Blocker und sollten
zuerst angestoßen werden.

## Phase 0 – Blocker zuerst anstoßen (lange Vorlaufzeit)

- [ ] 🔴 **D-U-N-S-Nummer** für die e.K. bei Dun & Bradstreet beantragen
      (kostenlos, aber 1–4 Wochen Bearbeitungszeit). Wird von Apple
      (Organization-Account) und ggf. Google Play (Business-Account)
      zur Firmenverifizierung verlangt. **Größtes Zeitrisiko im ganzen
      Projekt – zuerst erledigen.**
- [ ] 🔴 **Impressum auf e.K. umstellen**: `impressum_html` in `i18n.js`
      (aktuell Privatperson Udo Maier) auf vollständige e.K.-Angaben
      (Firmenname mit "e.K.", Inhaber, Registergericht, HRA-Nummer,
      ggf. USt-IdNr.) – Apple/Google gleichen Store-Angaben gegen das
      Impressum ab, Diskrepanzen verzögern die Freigabe.
- [ ] 🔴 **Neue Subdomain anlegen und DNS einrichten** (lt. Ankündigung
      vom 18.07.2026, Domain steht noch nicht). Wichtig: **muss vor**
      der Android-TWA-Einrichtung (Digital Asset Links, siehe unten)
      final stehen, sonst muss die Verifizierung später neu gemacht
      werden. GitHub Pages unterstützt Custom Domains nativ (CNAME-
      Datei im Repo-Root + DNS-Eintrag beim Domain-Anbieter).

## Phase 1 – Entwickler-Accounts

- [ ] **Google Play Console**: Account anlegen, 25 $ einmalige Gebühr,
      Identitätsprüfung (Google verlangt inzwischen für neue Accounts
      Ausweis-/Firmen-Verifizierung – Zeitpuffer einplanen).
- [ ] **Apple Developer Program**: Organization-Account anlegen,
      99 $/Jahr, benötigt D-U-N-S-Nummer (siehe Phase 0) und
      Legitimationsprüfung des Rechtsvertreters.
- [ ] Rollen/Zugriff klären: wer hat Zugang zu Play Console / App Store
      Connect (nur Auftraggeber, oder auch für spätere Wartung
      geteilt)?

## Phase 2 – Technisches Wrapping (PWA → Store-App)

Bootsmann ist eine reine statische PWA ohne Backend – für beide Stores
wird ein "Wrapper" gebraucht, kein Rewrite.

### Android (Trusted Web Activity – empfohlener Weg)

- [ ] Wrapper bauen mit **Bubblewrap CLI** oder **PWABuilder**
      (pwabuilder.com, browserbasiert, einfacher Einstieg) – erzeugt
      aus `bootsmann.webmanifest` automatisch ein Android-App-Bundle.
- [ ] **Signing-Key** erzeugen und sicher verwahren (Verlust = App kann
      nie wieder aktualisiert werden; Play App Signing von Google
      nutzen, um das Risiko zu entschärfen).
- [ ] **Digital Asset Links** einrichten: Datei
      `/.well-known/assetlinks.json` auf der (neuen) Domain
      veröffentlichen, die Paketname + SHA-256-Zertifikat-Fingerabdruck
      verknüpft – ohne das öffnet die App eine Browser-Adressleiste
      statt Vollbild-App-Optik.
- [ ] Zielumgebung testen: Android verlangt aktuelle **Target API
      Level**-Vorgaben für neue Einreichungen – bei Bubblewrap/
      PWABuilder i. d. R. automatisch aktuell, vor Einreichung kurz
      gegenprüfen.
- [ ] Interner Test-Track in Play Console nutzen, bevor Produktion
      freigegeben wird.

### iOS (App Store – kein TWA-Äquivalent, höheres Ablehnungsrisiko)

- [ ] Wrapper bauen mit **PWABuilder** (iOS-Paket, WKWebView-basiert)
      oder **Capacitor** (mehr Aufwand, aber mehr native Anknüpfungspunkte).
- [ ] 🔴 **Apple-Risiko einplanen**: Guideline 4.2 "Minimum
      Functionality" – Apple lehnt reine Web-Wrapper ohne erkennbaren
      App-Mehrwert öfter ab. Gegenmaßnahmen, die Bootsmann schon
      mitbringt: Offline-Nutzung per Service Worker, Standort-Feature.
      Zusätzlich erwägen: Push-Benachrichtigungen (z. B. bei
      Fahrplanänderungen) oder Home-Screen-Widget als klar "native"
      wirkendes Feature, falls die erste Einreichung abgelehnt wird.
- [ ] Braucht **Mac + Xcode** zum Signieren/Hochladen – falls kein
      eigener Mac vorhanden: Cloud-Mac-Dienst (z. B. Codemagic,
      MacStadium) oder Freelancer für den einmaligen Build-Schritt
      einplanen (im Budget der Strategie-Doc schon mit ~300–800 €
      vorgesehen).
- [ ] **TestFlight**-Beta vor der Produktions-Einreichung nutzen, um
      Abstürze/Darstellungsfehler auf echten Geräten zu finden.

## Phase 3 – Store-Listing-Inhalte (für beide Stores parallel vorbereitbar)

- [ ] **App-Icon** in Store-Auflösung: aktuell nur 180/192/512 px
      vorhanden (`bootsmann-icon-*.png`) – Apple App Store verlangt
      zusätzlich **1024×1024 px ohne Transparenz/Alpha-Kanal**, noch
      nicht vorhanden, muss ergänzt werden.
- [ ] **Screenshots** je Store und Gerätegröße (iOS: mind. 6,7"-Gerät
      Pflicht, weitere Größen empfohlen; Android: Phone-Screenshots
      Pflicht, Tablet optional) – aus der echten App erzeugen, nicht
      nur Mockups.
- [ ] **Google Play Feature-Graphic** (1024×500 px) – zusätzlich zum
      Icon erforderlich, gibt es noch nicht.
- [ ] **Kurzbeschreibung** (Play: 80 Zeichen) und **Volltext-
      Beschreibung** (Play: bis 4000 Zeichen, App Store: bis 4000
      Zeichen) – Positionierungsvorschlag aus der Strategie-Doc als
      Ausgangspunkt nutzen: „der einfachste digitale Fahrzeiten-
      Assistent für den Bodensee". Auf Deutsch und Englisch mindestens
      (evtl. auch FR/NL fürs Listing, passend zur App-Mehrsprachigkeit).
- [ ] **Datenschutzerklärung als eigenständige URL**: beide Stores
      verlangen eine direkt aufrufbare Privacy-Policy-URL im
      Formular – aktuell ist `datenschutz_html` nur ein aufklappbarer
      Abschnitt auf der Startseite; prüfen, ob ein Direktlink auf den
      Abschnitt reicht oder eine eigene Unterseite sauberer ist.
- [ ] **Altersfreigabe-Fragebogen** ausfüllen (Google: IARC-Fragebogen
      in der Console; Apple: Age-Rating-Angaben in App Store Connect) –
      bei Bootsmann unproblematisch (keine nutzergenerierten Inhalte,
      keine Werbung).
- [ ] **Datensicherheits-Angaben** (Google "Data Safety"-Formular,
      Apple "App Privacy"-Nutzungshinweise): beide fragen ab, welche
      Daten erhoben werden. Bei Bootsmann laut Datenschutzerklärung
      unkompliziert zu beantworten (keine Konten, keine Cookies, nur
      optionaler on-device-Standort ohne dauerhafte Speicherung).

## Phase 4 – Bezahlmodell / In-App-Kauf

Laut Strategie-Entscheidung: Saison 2026 günstig/kostenlos, ab 2027
Grundpreis + jährliche kostenpflichtige Fahrplan-Aktualisierung. Das
"Komoot-artige" mehrtägige Planungstool ist als **separater
In-App-Kauf** vorgesehen, sobald die App grundsätzlich läuft (siehe
Session-Notiz 18.07.2026).

- [ ] **Apple StoreKit**: Produkt(e) in App Store Connect anlegen
      (z. B. Non-Renewing Subscription pro Saison, oder mehrere
      IAP-Produkte für 1/mehrere Jahre) – erfordert vorher
      abgeschlossenen **Paid Apps Agreement** inkl. Bank-/Steuerdaten
      in App Store Connect.
- [ ] **Google Play Billing**: entsprechende Produkte in Play Console
      anlegen, gleiche Logik.
- [ ] Kauf-/Ablaufstatus wird von beiden Stores selbst verwaltet (kein
      eigenes Backend nötig) – im Wrapper/JS muss aber die Abfrage des
      Kaufstatus eingebaut werden (Billing-Library je Plattform).
- [ ] Später: separates IAP-Produkt für den mehrtägigen Planer (Phase
      nach App-Launch, siehe Bonusfrage-Antwort vom 18.07.2026).

## Phase 5 – Rechtliches / Compliance

- [ ] Impressum-Umstellung auf e.K. (siehe Phase 0, hier nochmal als
      Compliance-Punkt vor Einreichung final gegenprüfen).
- [ ] **EULA/Nutzungsbedingungen**: Apple akzeptiert seine Standard-
      EULA (kostenlos, Minimalaufwand) oder eigene Bedingungen – für
      den Start reicht die Standard-EULA.
- [ ] Haftungsausschluss/Datenschutz nochmal gegen die tatsächlichen
      Store-Berechtigungen prüfen (Standortzugriff wird jetzt über
      eine native App-Berechtigung abgefragt, nicht mehr nur Browser-
      Permission – Formulierung in `haftung_html`/`datenschutz_html`
      ggf. leicht anpassen).

## Phase 6 – Testing & Einreichung

- [ ] Vollständiger Funktionstest der gewrappten App auf echten
      Geräten (nicht nur Browser): alle vier Sprachen, Offline-Modus,
      Standortabfrage, alle vier Hauptseiten.
- [ ] Android: Interner Test-Track → geschlossener Test → Produktion.
- [ ] iOS: TestFlight-Build vor Produktions-Einreichung.
- [ ] Review-Zeiten einplanen: Google meist 1–3 Tage, Apple meist
      1–3 Tage, kann bei Erstanträgen/Account-Neueinrichtung länger
      dauern – nicht auf den letzten Drücker planen.

## Phase 7 – Nach dem Launch

- [ ] ASO (App Store Optimization) beobachten: Store-Suche ist laut
      Strategie-Doc der einzige unbezahlte Entdeckungsweg – Keywords/
      Beschreibung nach ersten Wochen ggf. nachschärfen.
- [ ] Bewertungen/Rezensionen aktiv im Blick behalten (kein Marketing-
      Budget vorgesehen, Mundpropaganda/Bewertungen sind der einzige
      organische Hebel).
- [ ] Saisonaler Fahrplan-Update-Prozess für 2027 rechtzeitig vor
      Saisonstart einplanen (betrifft `fahrplan-daten.js`/
      `katamaran-daten.js`, unabhängig vom Store-Prozess selbst).

## Offene Fragen (bitte klären, sobald relevant)

- Domain: Wie soll die neue Subdomain heißen, wann ist sie verfügbar?
- Soll das Store-Listing auch auf FR/NL erfolgen, oder erstmal nur
  DE/EN (App selbst ist ja schon vierpsrachig)?
- Wird ein eigener Mac für den iOS-Build verfügbar sein, oder soll ein
  Cloud-Build-Dienst budgetiert werden?
