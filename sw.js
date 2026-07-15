/* Bootsmann – Service Worker (v34) – Stand: 15. Juli 2026
   Neu gegenüber v33:
   - "Rückfahrt heute": die neutrale Info-Zeile ("Letzte Rückfahrt heute
     ab X: HH Uhr") steht jetzt auch in einem Kasten (neue Klasse
     .lg-info, dezentes Hellblau statt des gelben Warn-Kastens).
   Neu gegenüber v32:
   - Ziel-Text neben der Uhrzeit in der "Nächste Abfahrt"-Kachel
     (z. B. "nach Friedrichshafen") auf 17px erhöht. Richtungs-Buttons
     ("ab Konstanz"/"ab Meersburg"/"ab Friedrichshafen") bei Autofähre
     und Katamaran ebenfalls auf 17px.
   Neu gegenüber v31:
   - Hinweistexte von 16px auf 15px reduziert (16px war zu groß) –
     betrifft alle in v30/v31 vergrößerten Stellen auf allen vier Seiten.
   Neu gegenüber v30:
   - Gleiche Schriftvergrößerung (16px) jetzt auch auf Startseite,
     Autofähre und Katamaran angewendet: Wetter-/Hafen-Hinweise,
     Nächste-Abfahrt-Kachel, Rechtliches-Texte, Fußzeilen, Meta-Text bei
     Abfahrten, "Nebensaison"-Hinweise.
   Neu gegenüber v29:
   - BSB-Fahrplan: Hinweistexte (z. B. "Vergangene Abfahrten für heute
     sind ausgeblendet.") von 13/13,5px auf 16px vergrößert – besser
     lesbar unterwegs/in der Sonne.
   Neu gegenüber v28:
   - BSB-Fahrplan (Verbindung-Tab): neue Karte "Rückfahrt heute" unter
     der Hinfahrt-Ergebnisliste (nur am aktuellen Tag) – zeigt die letzte
     Rückfahrt des Tages, warnt wenn sie schon vorbei ist oder die
     Aufenthaltsdauer bei der ersten Hinfahrt sehr kurz wäre.
   Neu gegenüber v27:
   - Gehzeit-/Machbarkeits-Anzeige wird ab 60 Gehminuten (~5 km)
     ausgeblendet statt absurde Werte wie "484 Gehmin." zu zeigen (Fall:
     Standort weit vom See entfernt, aber innerhalb der 66-km-Schwelle
     für "nächster Hafen").
   Neu gegenüber v26:
   - "Nächste Abfahrt"-Kachel wieder vereinfacht: Ankunftszeit und
     Restzeit-Countdown ("in X Min") wieder entfernt, zu viel auf
     einmal. Der Machbarkeits-Check ("Knapp"/"schaffst du vermutlich
     nicht mehr") bleibt, "morgen"-Hinweis bleibt zur Unterscheidung.
   Neu gegenüber v25:
   - "Nächste Abfahrt"-Kachel: Ankunftszeit ergänzt ("nach Friedrichshafen
     · an 10:52 Uhr") sowie ein Machbarkeits-Check, der die Gehzeit zum
     Hafen mit der Restzeit bis zur Abfahrt vergleicht ("Knapp" bzw.
     "schaffst du vermutlich nicht mehr").
   Neu gegenüber v24:
   - "Nächste Abfahrt"-Kachel: Gehzeit zum nächsten Hafen ergänzt sowie
     ein Alternativhafen in der Nähe (falls einer innerhalb von 8 km
     liegt), z. B. "9 Gehmin. entfernt · Alternative: Bregenz (14 Gehmin.)".
   Neu gegenüber v23:
   - "Nächste Abfahrt"-Kachel: Überschrift nennt jetzt explizit den
     nächstgelegenen Hafen ("Nächste Abfahrt ab Langenargen" statt nur
     "Nächste Abfahrt"), Hafenname in der Zeile darunter dadurch entfernt
     (war redundant).
   Neu gegenüber v22:
   - Wetter-Kachel gekürzt: 3-Tage-Vorschau (Heute/Morgen/Übermorgen)
     entfernt, stattdessen Tageshöchst-/Tiefsttemperatur direkt neben
     der aktuellen Temperatur. Nutzer verlassen sich für Mehrtages-
     Prognosen ohnehin meist auf eine eigene Wetter-App.
   Neu gegenüber v21:
   - Kopfzeilen gestrafft: Wort "Bodensee" aus den Unterzeilen von BSB
     Fahrplan und Live-Karte entfernt. Katamaran-Seite: Eyebrow-Zeile
     über der Überschrift entfernt, Untertext zeigt jetzt "Sommerfahrplan
     gültig bis 04.10.2026".
   Neu gegenüber v20:
   - Katamaran-Seite: Überschrift zeigt jetzt "Katamaran" (Produktname),
     Strecke Konstanz–Friedrichshafen steht in der kleinen Eyebrow-Zeile.
   Neu gegenüber v19:
   - Live-Karte: Untertext zu "Schiffspositionen laut Fahrplan" geändert.
   Neu gegenüber v18:
   - BSB-Fahrplan-Fußzeile gekürzt: "Persönlicher Planer · kein
     offizieller Fahrplan" entfernt, nur noch "Angaben ohne Gewähr".
   Neu gegenüber v17:
   - Karte-Direkteinstieg (von der Startseiten-Kachel): eigener Titel
     "Live-Karte" statt "BSB Fahrplan", Tab-Leiste (Verbindung/Schweiz/
     Hinweise) dort ausgeblendet, da sie zum Planer gehört, nicht zur
     Karte.
   Neu gegenüber v16:
   - Katamaran-Seite: nicht angeforderte Preisliste wieder entfernt.
   Neu gegenüber v15:
   - Katamaran Konstanz–Friedrichshafen ergänzt: eigene Seite
     (katamaran.html), eigene Startseiten-Kachel, eigene Kursdaten in
     der neuen gemeinsamen Datei katamaran-daten.js (analog
     fahrplan-daten.js), Katamaran-Positionen in Lila auf der Live-Karte,
     und Einbindung in die "Nächste Abfahrt"-Kachel bei Standort
     Konstanz/Friedrichshafen.
   - Karte ist jetzt zusätzlich direkt über eine eigene Startseiten-
     Kachel erreichbar (bsb-fahrplan.html?tab=karte); der Karte-Tab in
     der BSB-Seiten-Navigation selbst wurde entfernt (nur noch
     Verbindung/Schweiz/Hinweise dort).
   Neu gegenüber v11:
   - Startseite: "Im Notfall"-Feld durch "Nächste Abfahrt" ersetzt (ab
     nächstgelegenem Hafen, große Uhrzeit im selben Kartenstil). Dazu
     die Fahrplan-Daten/Gültigkeitslogik aus bsb-fahrplan.html in die
     neue gemeinsame Datei fahrplan-daten.js ausgelagert, damit
     Startseite und Fahrplan-Seite dieselben Kursdaten nutzen statt
     zwei Kopien pflegen zu müssen.
   Neu gegenüber v10:
   - BSB-Fahrplan: Bestätigungstext "Standort übernommen: XY" entfernt,
     wenn der Hafen von der Startseite übernommen wird - die Auswahl
     selbst passiert weiterhin, nur ohne Hinweiszeile.
   Neu gegenüber v9:
   - Feinschliff Startseite/Hinweise: Abschnittstitel "Unterwegs auf dem
     See" und Kachel-Unterzeilen entfernt, Kachel-Beschriftung und
     Kopfbereich-Abstand leicht nachjustiert; Hinweise-Tab um "An Bord"
     und "Tickets & Tarif" gekürzt (zu offiziell wirkende Inhalte).
   Neu gegenüber v8:
   - Startseiten-Kacheln umbenannt ("BSB Fahrplan" / "Bodensee Fähre",
     jeweils mit vertauschter Klein-/Fettzeile), Wartezeit-am-Hafen-
     Feld (Webcam-Link) auf der Autofähre-Seite komplett entfernt.
   Neu gegenüber v7:
   - Umstellung vom Hotel-Whitelabel auf eigenständige Endkunden-App:
     Hotel-Branding (Name, Rezeption) entfernt, Startseite/Fahrplan-
     Seiten heißen jetzt "Bootsmann"/"Bodensee Fähre", diverse
     Erklärtexte gekürzt (Schweiz-Hinweis, Wartezeit-Hafen-Text).
   Neu gegenüber v6:
   - Karte: Vollbild-Modus ergänzt; Info zum ausgewählten Schiff (Von →
     Bis) liegt jetzt direkt auf der Karte statt darunter (wie bei Lotse).
   Neu gegenüber v5:
   - Flotten-Bildergalerie (Fotos/Baujahr/Länge/Tiefgang aller Schiffe)
     wieder entfernt: eigenständige Entscheidung für Bootsmann (bläht als
     Base64-Fotos die Seite auf gut 1 MB auf), Lotse behält die Galerie.
   - Impressum, Datenschutzerklärung, Haftungsausschluss und Urheberrecht
     ergänzt (Startseite sowie Hinweise auf den Fahrplan-Seiten).
   Neu gegenüber v4:
   - Fahrplan der Ausflugsschiffe (bsb-fahrplan.html) aus dem Lotse-
     Projekt übernommen: Nebensaison-Fahrzeiten, neuer "Karte"-Tab mit
     aktuellen Schiffspositionen (aus dem Fahrplan berechnet, keine
     Live-Ortung), echte Bodensee-Silhouette mit Zoom/Pan, sowie eine
     einklappbare Flotten-Übersicht mit Foto/Baujahr/Länge/Tiefgang zu
     allen 33 Schiffen der Bodensee-Reedereien.
   Eigenständige App: Schifffahrtspläne am Bodensee (Ausflugsschiffe,
   Autofähre) plus Wetter.

   Grundprinzip:
   - Jede Seite wird unter ihrem EIGENEN Schlüssel gespeichert.
   - Die Seite kommt zuerst frisch aus dem Netz (Updates erscheinen
     automatisch), nur ohne Internet greift die gespeicherte Kopie.
     Symbole & Manifest kommen zuerst aus dem Speicher. Fremde Dienste
     (Wetter, Karten) immer aus dem Netz.
   Wichtig: Die Zahl in CACHE bei jeder Änderung an den SHELL-Dateien um
   eins erhöhen, damit alte gespeicherte Kopien sauber ersetzt werden. */

const CACHE = 'bootsmann-v34';
const SHELL = [
  './',
  './index.html',
  './bsb-fahrplan.html',
  './autofaehre.html',
  './katamaran.html',
  './fahrplan-daten.js',
  './katamaran-daten.js',
  './bootsmann.webmanifest',
  './bootsmann-icon-180.png',
  './bootsmann-icon-192.png',
  './bootsmann-icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Wetter/Karten o. Ä. nie abfangen

  const istSeite = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (istSeite) {
    // Seite unter ihrem eigenen, sauberen Schlüssel ablegen (ohne ?lat=..&lng=..)
    const pageKey =
      url.pathname.endsWith('/bsb-fahrplan.html') ? './bsb-fahrplan.html' :
      url.pathname.endsWith('/autofaehre.html')   ? './autofaehre.html'   :
      url.pathname.endsWith('/katamaran.html')    ? './katamaran.html'    : './index.html';
    // zuerst Netz (frischer Stand), bei Offline die passende Kopie
    e.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(pageKey, copy)).catch(() => {});
        return resp;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html'))
      )
    );
    return;
  }

  // Übrige eigene Dateien (Symbole, Manifest): zuerst Kopie, sonst Netz
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return resp;
    }))
  );
});
