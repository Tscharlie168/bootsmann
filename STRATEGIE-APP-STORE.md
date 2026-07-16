# Bootsmann – App-Store-Strategie (Notizen, Stand 14.07.2026)

Arbeitsdokument aus der Strategie-Diskussion zu Marketing, Vertrieb und Preis
für Bootsmann. Wird laufend fortgeschrieben. Kein offizieller Beschluss,
sondern Gedächtnisstütze für den aktuellen Entscheidungsstand.

## Ausgangslage

- Bootsmann ist eine statische PWA (HTML/CSS/JS, kein Backend), gehostet auf
  GitHub Pages (`tscharlie168.github.io/bootsmann/`).
- Ursprünglich als kostenloses Whitelabel-Tool für Hotels gedacht, inzwischen
  vollständig zur eigenständigen Endkunden-App umgebaut (Hotel-Branding
  entfernt, README aktualisiert, Stand 14.07.2026).
- Neues Ziel: eigenständiger Verkauf über App Store/Play Store an
  Endkunden rund um den Bodensee, für kleines Geld.
- Datenquellen: ausschließlich eigene statische Fahrplandaten (VSU-Fahrplan
  2026, Stand 11/2025, muss saisonal von Hand gepflegt werden) – die
  Wetter-Kachel (Open-Meteo/BigDataCloud) wurde am 15.07.2026 entfernt, da
  sie zu keiner der fünf Kernaufgaben aus dem Mini-Produkttest gehört.

## Getroffene Entscheidungen

1. **Vertriebsweg**: Nur noch Store-App verkaufen. Die freie PWA wird
   offline genommen bzw. nicht mehr beworben – keine parallele Gratisversion,
   um Kannibalisierung zu vermeiden.
   - Konsequenz: Store-Suche (ASO) ist der einzige unbezahlte
     Entdeckungsweg, da die bisherige Gratis-PWA als organischer
     Marketingkanal (Google-Suche) entfällt.
2. **Preismodell** (aktualisiert 14.07.2026 – ersetzt frühere reine
   Einmalkauf-Empfehlung):
   - **Saison 2026**: sehr günstig oder kostenlos im Store, da nur noch
     kurze Restsaison verfügbar (Einführungsangebot).
   - **Ab 2027**: kleiner Grundpreis, jährliche kostenpflichtige
     Aktualisierung (Nutzer kauft die Fahrplan-Aktualisierung pro Saison
     nach). Wer für mehrere Jahre im Voraus zahlt (z. B. 10 Jahre), zahlt
     einen höheren Betrag, aber günstiger pro Jahr als bei jährlichem
     Einzelkauf – oder ähnliches Modell, Details noch offen.
   - **Technische Implikation**: erfordert In-App-Kauf/Abo-Logik
     (Apple StoreKit non-renewing subscription oder mehrere IAP-Produkte
     für 1 Jahr / mehrere Jahre; Google Play Billing entsprechend) im
     Wrapper – mehr Aufwand als ein reiner statischer Einmalkauf-Listing,
     aber ohne eigenes Backend machbar, da beide Stores Kaufstatus/Ablauf
     selbst verwalten.
   - Begründung fürs Modell: keine laufenden Serverkosten, aber laufender
     eigener Pflegeaufwand für die saisonalen Fahrplandaten soll auch
     laufend vergütet werden, statt nur einmalig beim Erstkauf.
3. **Rechtsform**: Verkauf über die Firma, Rechtsform **Einzelunternehmen /
   eingetragener Kaufmann (e.K.)**. Bisher stand im Impressum eine
   Privatperson (Udo Maier) – **muss vor Store-Einreichung auf die
   e.K.-Angaben umgestellt werden** (Firmenname mit "e.K.", Inhaber,
   Registergericht + HRA-Nummer, ggf. USt-IdNr.).
4. **Store-Erfahrung**: Erster App-/Play-Store-Auftritt der Firma – keine
   bestehenden Entwickler-Accounts, alles muss neu eingerichtet werden.
5. **Zeithorizont**: Ziel Launch noch Saison 2026 (Stand heute: 14.07.2026,
   Hochsaison). Realistisch eher zweite Saisonhälfte
   (August/September) als "sofort", wegen Account-Setup und Store-Review.
6. **Budget**: Noch offen, hängt vom erwarteten Ertrag ab (siehe
   Ertragsindikation unten).
7. **Reichweite/Marketing**: Start bei null, keine bestehenden Kontakte
   oder Kanäle.

## Zielgruppe (Empfehlung)

- **Kernzielgruppe**: Tagestouristen und Kurzurlauber, die im Moment des
  Bedarfs (vor Ort am Bodensee) im Store nach "Bodensee Fähre" oder
  "Schiff Fahrplan" suchen – höchste Kaufbereitschaft.
- **Sekundär**: Wiederkehrer/Zweitwohnsitzbesitzer – kleinere, loyalere
  Gruppe, gute Weiterempfehlung.
- **Nachrangig**: Einheimische/Pendler – geringe Zahlungsbereitschaft, aber
  wertvoll für Bewertungen/Mundpropaganda.

## Wettbewerbsanalyse (Rechercheergebnis)

- **Keine offizielle App von BSB** (Ausflugsschiffe) oder der Autofähre
  Konstanz–Meersburg (Stadtwerke Konstanz) gefunden – nur PDF-Fahrpläne auf
  den Webseiten. Echte Marktlücke für "live nächste Abfahrt".
- Vergleichbare Bodensee-Apps sind alle **kostenlos** und bedienen andere
  Nischen:
  - *Bodensee Navigator* – Seekarte/Wasserstand für Bootsführer, 40k+
    Downloads, 4,7★, gratis.
  - *Bodensee Radweg App* – für Radfahrer, gratis.
  - *Bodensee Card PLUS* – Rabattkarte, kein eigenes App, nur digitales
    Ticket.
- Fazit: Markt ist an kostenlose Bodensee-Apps gewöhnt → niedriger
  Einstiegspreis wichtig, echte Nische aber unbesetzt.

## Grobe Ertragsindikation (Größenordnung, keine Prognose)

- ca. 20 Mio. Übernachtungen/Jahr im Gesamtraum Bodensee (D/A/CH).
- Ohne bezahlte Werbung, nur organische Store-Suche: realistisch niedrige
  drei- bis vierstellige Downloads/Saison zu erwarten.
- Beispielrechnung: 1.000 Käufe × 3 € ≈ 3.000 € brutto in der ersten
  Saison, abzüglich 15–30 % Store-Provision.

## Laufende Kosten – Übersicht

| Posten | Kosten | Häufigkeit |
|---|---|---|
| Apple Developer Program | ~99 $/Jahr | jährlich, Pflicht |
| Google Play Developer | 25 $ | einmalig |
| Android-Wrapper (TWA) | ~0 € | einmalig, selbst machbar (Bubblewrap/PWABuilder) |
| iOS-Wrapper (WKWebView) | 0 € (falls eigener Mac/Xcode) bis ~300–800 € (falls Freelancer/Cloud-Build) | einmalig |
| Fahrplan-Datenpflege | 0 € Cash, aber wiederkehrender Zeitaufwand | jährlich (Saisonwechsel) |
| Hosting (GitHub Pages) | 0 € | laufend |

Kein Grund für laufende Serverkosten, da alles statisch/clientseitig bleibt.

## Größtes Zeitrisiko: D-U-N-S-Nummer

Apple (Organization-Account) und Google Play (Business-Account) verlangen
eine D-U-N-S-Nummer zur Firmenverifizierung. Falls die e.K. noch keine hat,
dauert die kostenlose Beantragung bei Dun & Bradstreet erfahrungsgemäß
1–4 Wochen. Das ist der wahrscheinliche Flaschenhals für den Zeitplan
"noch diese Saison" – sollte als Erstes angestoßen werden.

## Steuerliches (zur Beruhigung)

Bei Verkäufen über App Store/Play Store treten Apple/Google in der EU als
Reseller auf (Agency-Modell) und führen die Umsatzsteuer gegenüber dem
Endkunden ab – nicht die Firma direkt. Auszahlung erfolgt nach Abzug der
Store-Provision.

## Ergänzungen aus externer Einschätzung (14.07.2026)

- Konkreterer Bezugswert als Übernachtungszahlen: Weiße Flotte 2024 ≈
  2,869 Mio. Fahrgäste – bessere Grundlage für Zielgruppengröße/
  Ertragsschätzung als die grobe Übernachtungszahl.
- **Physische Distributionskanäle** (ohne Whitelabel-Modell, nur als
  Empfehlung/QR-Code): Hotels, Ferienwohnungen, Campingplätze,
  Tourist-Infos, Häfen.
- **Mehrsprachigkeit** als offener Risikopunkt (internationale Gäste am
  Bodensee) – bisher nicht geplant, sollte mit bedacht werden.
- Positionierungsvorschlag fürs Store-Listing/ASO: „der einfachste
  digitale Fahrzeiten-Assistent für den Bodensee".

## Offene Punkte / nächste Schritte

- [ ] Impressum von Privatperson auf e.K. umstellen (benötigt: genauer
      Firmenname, HRA-Nummer, Registergericht, ggf. USt-IdNr.)
- [x] README.md aktualisiert (Hotel-Bezug entfernt, Stand 14.07.2026)
- [ ] Prüfen, ob die e.K. bereits eine D-U-N-S-Nummer hat; falls nicht,
      sofort beantragen
- [ ] Konkrete Checkliste mit Zeitplan für Store-Launch erstellen
- [ ] Budget-Entscheidung treffen, sobald Ertragserwartung konkreter ist
