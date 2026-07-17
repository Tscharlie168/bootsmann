/* Bootsmann – Service Worker (v95) – Stand: 17. Juli 2026
   Neu gegenüber v94:
   - Kachel-Untertitel "Obersee & Bregenz" und "Überlinger See / Untersee /
     Schweiz" jetzt beide "Ausflugsschiffe (Weiße Flotte)". Untertitel der
     Fähre-Kachel "Bodensee Fähre" → "Bodensee Autofähre". Seitentitel von
     bsb-fahrplan.html (beide Bereiche teilen sich die Seite) von
     "BSB Schifffahrt" zu "Weiße Flotte" geändert, zweifarbig wie gehabt.
   Neu gegenüber v93:
   - Kachel-Beschriftungen auf der Startseite angepasst: "Ausflüge West"
     zeigt jetzt oben "Überlinger See / Untersee / Schweiz", unten
     "Ausflugsschiffe und Kursschiffe" (Name "Ausflüge West" nirgends mehr
     angezeigt, i18n-Key tile_bsb entfernt). Bei den beiden unteren
     Kacheln (Bodensee Fähre, Schnellschiff-Katamaran) Titel und
     Untertitel getauscht: die Strecke (mit Pfeil) ist jetzt der fette
     Titel, der Produktname der kleine Untertitel.
   Neu gegenüber v92:
   - Tab-Leiste ("Obersee & Bregenz" / "Überlinger See / Untersee /
     Schweiz") auf bsb-fahrplan.html komplett entfernt. Beide Bereiche
     sind jetzt ausschließlich über ihre eigene Home-Kachel erreichbar
     (?tab=planer bzw. ?tab=schweiz), ein Umschalten innerhalb der Seite
     ist nicht mehr vorgesehen. Die Von/Nach-Hafenauswahl im planer-Tab
     bleibt unverändert (weiterhin alle vier Seebereiche wählbar).
     Ungenutzte i18n-Keys tab_schweiz/tab_hinweise entfernt.
   Neu gegenüber v91:
   - Neue 4. Kachel "Obersee & Bregenz" über "Ausflüge West" auf der
     Startseite (gleiches Schiffs-Icon, Untertitel "Ausflugsschiffe/
     Kursschiffe"), führt zu bsb-fahrplan.html?tab=planer. "Ausflüge West"
     führt jetzt gezielt zu ?tab=schweiz statt zum Default-Tab.
   - Dabei Bug gefunden und behoben: bsb-fahrplan.html unterstützte die
     URL-Parameter ?tab=planer/?tab=schweiz bisher gar nicht (nur karte/
     hinweise/bodenseekarte), wurde beim Aufruf still ignoriert und landete
     immer auf dem Default-Tab "planer" – jetzt ergänzt.
   Neu gegenüber v90:
   - Home-Kachel "BSB Schifffahrt" umbenannt in "Ausflüge West" (nur die
     Kachel auf der Startseite; der Seitentitel auf bsb-fahrplan.html
     bleibt unverändert "BSB Schifffahrt").
   Neu gegenüber v89:
   - Doppelpfeil (↔) in den Kachel-Untertiteln von Fähre/Katamaran auf der
     Startseite vergrößert (17px statt geerbter 13px), da er zuvor kaum
     zu erkennen war. Dafür die Untertitel-Keys auf data-i18n-html
     umgestellt (Pfeil in eigenem .arrow-Span).
   Neu gegenüber v88:
   - Seitentitel auf katamaran.html von "Katamaran" zu "Schnellschiff-
     Katamaran" geändert, zweifarbig (weiß + Cyan) wie bei den anderen
     Unterseiten (BSB Schifffahrt, Bodensee Fähre). CSS-Selektor dafür von
     generischem "h1 span" auf ".hl"-Klasse vereinheitlicht, analog zu
     autofaehre.html/bsb-fahrplan.html. Ungenutzten i18n-Key "tile_kat"
     (alle 4 Sprachen) entfernt, da nur noch tile_kat_home (Startseite)
     gebraucht wird.
   Neu gegenüber v87:
   - Untertitel der Fähre- und Katamaran-Kachel auf der Startseite gekürzt:
     "Pendelverkehr Konstanz – Meersburg" → "Konstanz ↔ Meersburg" (analog
     Katamaran), Doppelpfeil statt Wort "Pendelverkehr" und Gedankenstrich.
   Neu gegenüber v86:
   - Die drei Fahrzeug-Kacheln ("Womit wollen Sie fahren?") auf der
     Startseite von nebeneinander (Grid) auf übereinander (Liste im
     Tile-Row-Stil wie die Informationen-Liste) umgestellt, jeweils mit
     Untertitel: BSB Schifffahrt – Überlinger See/Untersee/Schweiz,
     Bodensee Fähre – Pendelverkehr Konstanz–Meersburg, Katamaran jetzt
     "Schnellschiff-Katamaran" – Pendelverkehr Friedrichshafen–Konstanz
     (eigener i18n-Key nur für die Home-Kachel, katamaran.html-Überschrift
     bleibt unverändert "Katamaran").
   Neu gegenüber v85:
   - Das Feld "Nächster Hafen" + "Nächste Abfahrt" ganz oben auf der
     Startseite komplett entfernt (samt zugehöriger i18n-Keys, CSS-Klassen
     und JS-Funktionen). Die Routing-Funktion lebt jetzt ausschließlich in
     der Kachel "Route zum nächstgelegenen Hafen" in der Informationen-Liste.
     Die Startseite geht direkt vom Header zu den Fahrzeug-Kacheln über.
   Neu gegenüber v84:
   - Neue Kachel "Route zum nächstgelegenen Hafen" ganz oben in der
     Informationen-Liste auf der Startseite (an der Stelle der entfernten
     Bodenseekarte-Kachel). Tippen ermittelt wie gehabt den nächstgelegenen
     Hafen über den Standort und öffnet direkt die Google-Maps-Route –
     dieselbe Funktion, die schon oben auf der Startseite existiert.
   Neu gegenüber v83:
   - Kachel "Bodenseekarte" aus der Informationen-Liste auf der Startseite
     entfernt (samt i18n-Key). Die Seite/der Tab dahinter
     (bsb-fahrplan.html?tab=bodenseekarte) bleibt technisch bestehen, ist
     aber nirgends mehr verlinkt.
   Neu gegenüber v82:
   - Bodenseekarte: programmatisch aus Geodaten gezeichnete SVG-Karte durch
     ein von Hand gezeichnetes Bild des Auftraggebers ersetzt (bodenseekarte.
     webp, 1600px, ~110 KB, aus einer 4700px/5,2 MB-Ausgangsdatei verkleinert
     und komprimiert). Löst das Beschriftungs-Kollisionsproblem endgültig,
     da alle Namen schon fertig im Bild stehen. Pan/Zoom-Logik dafür entfernt
     (nicht mehr nötig bei einem fertigen Bild statt einer Zeichenfläche),
     Vollbild-Umschaltung bleibt erhalten. Live-Karte unverändert.
   Neu gegenüber v81:
   - Bugfix Schweiz-Tab (Überlinger See/Untersee/Schweiz): "Ziel wählen"-
     Ergebnisliste (Hin- und Rückfahrt) zeigte für heute immer den ganzen
     Tagesfahrplan, auch bereits abgefahrene Kurse. Jetzt wie im Haupt-
     Fahrplaner: vergangene Abfahrten für heute ausgeblendet, mit Hinweis
     "Vergangene Abfahrten sind ausgeblendet."
   Neu gegenüber v80:
   - Bugfix "Rückfahrt heute/am"-Karte im Haupt-Fahrplaner: zeigte bisher immer
     die spätestmögliche Rückfahrt des Tages an, auch wenn die angezeigte
     Hinfahrt erst NACH deren Abfahrt ankommt (z.B. Langenargen→Stein am Rhein:
     Hinfahrt kommt 16:52 an, "letzte Rückfahrt" stand mit 11:15 Uhr drin -
     längst nicht mehr erreichbar). Neue rote Warnbox statt der irreführenden
     Info-Box, wenn keine der angezeigten Hinfahrten rechtzeitig vor Abfahrt
     der letzten Rückfahrt ankommt.
   Neu gegenüber v79:
   - Schweiz-Tab: Hinweistext gekürzt, sinngemäß erhalten ("teils nur wenige
     Verbindungen am Tag" statt eigenem Absatz dazu).
   Neu gegenüber v78:
   - BSB-Seite, Tab "Überlinger See / Untersee / Schweiz": gelber Hinweiskasten
     ("Wählen Sie zuerst den Zielort...") jetzt oben vor "Ziel wählen" statt
     darunter. Die Ziel-Chips sind jetzt nach Seebereich farblich hinterlegt
     (Grün/Beige/Lila, dieselben Farben wie im Von/Nach-Auswahldialog), damit
     die Zuordnung zu Überlinger See/Untersee/Schweizer Ufer auf einen Blick
     erkennbar ist.
   Neu gegenüber v77:
   - Bodenseekarte: Ortsnamen-Beschriftung komplett entfernt (weder Häfen-
     noch Bereichsnamen). Die Kollisionsvermeidung für dicht beieinander-
     liegende Namen erwies sich als unverhältnismäßig aufwändig und
     fehleranfällig, ohne zuverlässig überlappungsfrei zu werden. Karte
     zeigt jetzt nur noch die Seefläche eingefärbt nach Bereich (Obersee,
     Überlinger See, Untersee, Schweizer Ufer) plus Hafenpunkte zur
     Orientierung - die Namen stehen bereits in der Von/Nach-Auswahl.
   Neu gegenüber v76:
   - Bodenseekarte, Feinschliff nach Rückmeldung mit Screenshots:
     Ortsnamen überlappten sich teils stark (z.B. Konstanz/Gottlieben,
     Mainau/Meersburg, Langenargen/Kressbronn/Nonnenhorn, Rorschach/
     Staad/Altenrhein) und Schaffhausen war oben links am Kartenrand
     abgeschnitten. Beschriftung läuft jetzt strahlenförmig vom
     Häfen-Mittelpunkt nach außen (wie Speichen, angelehnt an die
     Referenzgrafik) mit einfacher Kollisionsvermeidung: bei
     Überlappung wird zunächst die Seite gespiegelt, dann der Abstand
     vergrößert; bleibt keine Position ganz frei, wird die mit der
     kleinsten Überlappungsfläche gewählt. Zusätzlich zählen auch die
     Hafenpunkte selbst als Hindernis, damit kein Name auf einem
     fremden Punkt landet. Kartenrand-Anker (Schaffhausen) drehen bei
     drohendem Abschneiden zur Kartenmitte um; Anfangs-Zuschnitt der
     Karte etwas großzügiger gepolstert.
   - "CH"-Kennzeichen vor "Schweizer Ufer" entfernt (Flag-Emoji kam auf
     manchen Geräten nur als Text "CH" statt als Flagge an).
   - Bereichsnamen (Obersee/Überlinger See/Untersee/Schweizer Ufer) ohne
     weiße Textumrandung – reine Farbe ist besser lesbar. Die Namen
     Überlinger See/Untersee zusätzlich weiter nach außen verschoben.
   Neu gegenüber v75:
   - Startseite: die 3 Info-Kacheln (Bodenseekarte/Live-Positionskarte/
     Hinweise) waren als 3-Spalten-Raster zu dominant im Vergleich zu
     den 3 Haupt-Kacheln darüber. Zurück zum schmalen Zeilen-Muster
     (Icon links, Name, Chevron rechts), volle Breite, untereinander
     gestapelt – neue `.tiles-stack`/`.tile-row`-Klassen. Neue
     Überschrift "Informationen" darüber, analog zu "Womit wollen Sie
     fahren?" über den Haupt-Kacheln.
   Neu gegenüber v74 (Schritt 3 von 3 der BSB-Tab-Umstrukturierung):
   - Neue "Bodenseekarte": Orientierungskarte, erreichbar über
     bsb-fahrplan.html?tab=bodenseekarte und neue dritte Startseiten-
     Kachel (links neben Live-Positionskarte/Hinweise). Zeigt alle 31
     wählbaren Häfen beschriftet, Seefläche nach Obersee/Überlinger
     See/Untersee eingefärbt (exakt dieselben Farben wie in der
     Von/Nach-Auswahl, Wiedererkennungswert), Schweizer Grenze
     gestrichelt, große Bereichsnamen direkt auf der Karte (Obersee,
     Überlinger See, Untersee, 🇨🇭 Schweizer Ufer), Positionen nach
     Rückmeldung noch in freie Wasserflächen verschoben statt über
     Ortsnamen – bewusst OHNE
     Routenlinien oder Schiffe (Unterschied zur Live-Positionskarte).
     Zoombar/verschiebbar wie die Live-Karte (eigener State, damit die
     Live-Karte unberührt bleibt), inkl. Vollbild-Button. Eigene
     Neuzeichnung aus unseren Geodaten (COORDS/Seeumrisse), keine
     Übernahme aus dem gedruckten VSU-Fahrplan. Startansicht auf den
     tatsächlichen Hafen-Bereich zugeschnitten statt der vollen
     Zeichenfläche (Bugfix während der Umsetzung: die erste Fassung
     verzerrte die Startansicht auf das Hochkant-Seitenverhältnis des
     Kartenfensters und schnitt dadurch die Obersee-Hälfte ab).
   - Bugfix beim Bau der neuen Kacheln: einzelne lange Wörter ohne
     Leerzeichen ("Bodenseekarte", "Live-Positionskarte") wurden in der
     3er-Kachelreihe abgeschnitten statt umzubrechen. Schriftgröße der
     Kacheln von 20px auf 17px reduziert (hyphens:auto lieferte in
     Tests keine zuverlässige Silbentrennung), damit alle Labels ohne
     Abschneiden zweizeilig passen.
   Neu gegenüber v73 (Schritt 2 von 3 der BSB-Tab-Umstrukturierung):
   - BSB-Seite, Tab "Überlinger See / Untersee / Schweiz": Ziel-Liste um
     5 deutsche Ziele erweitert (Unteruhldingen, Dingelsdorf, Überlingen,
     Radolfzell, Iznang) – vorher nur Schweizer/Untersee-Grenzorte.
     "Praktische Hinweise"-Box zeigt Ausweis-/Grenze-Tipps jetzt nur noch
     bei tatsächlich Schweizer Zielen (REGION_SCHWEIZ-Check); VSU-Card-
     und Rückweg-Tipp bleiben immer sichtbar. Überschrift von "Praktisch
     beim Schweiz-Ausflug" auf neutrales "Praktische Hinweise" geändert.
   Neu gegenüber v72 (Schritt 1 von 3 der BSB-Tab-Umstrukturierung):
   - BSB-Seite: Tab-Leiste von 3 auf 2 Reiter reduziert. "Verbindung"
     heißt jetzt "Obersee & Bregenz" (unveränderte Funktion), "Schweiz"
     heißt jetzt "Überlinger See / Untersee / Schweiz" (Funktion noch
     unverändert, Erweiterung um Überlinger-See-/Untersee-Ziele folgt in
     Schritt 2). "Hinweise" ist kein eigener Tab mehr, aber weiterhin per
     Deep-Link bsb-fahrplan.html?tab=hinweise erreichbar (eigener Titel
     "BSB Hinweise", keine Tab-Leiste, gleiches Muster wie die Karte).
   - Startseite: "Live-Positionskarte"-Kachel ist jetzt halbbreit, neue
     Kachel "Hinweise" daneben (führt zum neuen Deep-Link). Neue
     `.tiles-half`-CSS-Klasse (2-spaltiges Grid). Dritte Kachel
     "Bodenseekarte" folgt in Schritt 3.
   - Textstellen mit altem Tab-Namen "Verbindung"/"Schweiz" korrigiert
     (Sondertage-Tipp, SBS-Ziel-ohne-Verbindung-Hinweis).
   Neu gegenüber v71:
   - Bugfix Caching-Strategie: i18n.js, fahrplan-daten.js und
     katamaran-daten.js liefen bisher unter "Cache-zuerst" (wie Icons/
     Manifest) statt "Netz-zuerst" (wie die HTML-Seiten). Dadurch konnte
     ein Browser mit noch nicht aktualisiertem Service Worker eine ganz
     frische HTML-Seite (Netz-zuerst) mit einem veralteten, gecachten
     i18n.js kombinieren – sichtbar z. B. als roher i18n-Key-Name
     ("pl_empty_sbs_switch_html") statt übersetztem Text, wenn ein
     Release HTML- und i18n.js-Änderungen im selben Schritt bringt (was
     hier die Regel ist). Diese drei Kern-Skripte laufen jetzt wie die
     HTML-Seiten auf Netz-zuerst, sodass sie immer zur gerade
     ausgelieferten HTML-Version passen. Cache bleibt nur Offline-
     Fallback. Icons/Manifest bleiben bewusst Cache-zuerst (ändern sich
     praktisch nie, Vorteil: schnelleres Laden).
   Neu gegenüber v70:
   - BSB-Seite, Verbindung-Tab: Bei "Keine direkte Verbindung" zu einem
     Schweizer SBS-Ziel (z. B. Rorschach) steht jetzt ein zusätzlicher
     Hinweis zwischen den beiden bestehenden Texten: "Klicken Sie oben
     auf SCHWEIZ, um alle Verbindungen dorthin zu sehen." (neuer
     i18n-Key pl_empty_sbs_switch_html, SCHWEIZ großgeschrieben passend
     zum Tab-Label).
   Neu gegenüber v69:
   - BSB-Seite, Schweiz-Tab: Anleitungstext komplett ersetzt (neuer
     Wortlaut vom Auftraggeber, jetzt Sie-Form statt du-Form, zwei
     Absätze mit <br><br> getrennt).
   Neu gegenüber v68:
   - BSB-Seite: Abstandsproblem beim BSB-Link-Kasten strukturell gelöst
     statt nur Werte nachzujustieren (v68-Fix war noch nicht
     ausreichend, 21px blieb spürbar größer als die übrigen ~14px-
     Abstände). Ursache war, dass der Kasten als persistentes Element
     außerhalb von .lg-panel lag. Jetzt wird er direkt in jeder
     Tab-Funktion (planerHTML/schweizHTML/karteHTML/hinweiseHTML) als
     normales Geschwisterelement eingebettet – dadurch exakt 14px
     Abstand wie alle anderen Übergänge, auf allen vier Tabs (inkl.
     Live-Karte, bisher nicht separat geprüft). Neue gemeinsame
     Helper-Funktion bsbExtLinkHTML(margin).
   Neu gegenüber v67:
   - BSB-Seite, Verbindung/Schweiz-Tab: Abstand zwischen letzter Karte
     im Panel und dem persistenten BSB-Link-Kasten war deutlich größer
     als sonstige Kartenabstände (35px statt ~14-20px), weil sich
     Karten-Margin, Panel-Innenabstand und der eigene obere Rand des
     Kastens addiert haben. Oberen Rand des Kastens auf 0 gesetzt
     (jetzt 21px Gesamtabstand).
   Neu gegenüber v66:
   - BSB-Seite, Hinweise-Tab: BSB-Link-Kasten steht jetzt oberhalb von
     "Impressum & Datenschutz" statt darunter. Umgesetzt, indem der
     Kasten dort direkt in hinweiseHTML() eingebettet wird (statt der
     persistenten Version), die persistente Version wird auf dem
     Hinweise-Tab ausgeblendet, bleibt aber auf Verbindung/Schweiz
     unverändert sichtbar.
   Neu gegenüber v65:
   - BSB-Seite: neuer Hinweis-Kasten mit Link zur offiziellen BSB-Seite
     (bsb.de) für aktuelle Störungen/Kursausfälle/Sonderfahrten – analog
     zum bereits bestehenden Muster bei Autofähre (Stadtwerke Konstanz)
     und Katamaran (Katamaran-Reederei). Persistent unterhalb von
     "Nächste Abfahrt"/"Schweiz"/"Hinweise", auf allen drei Tabs
     sichtbar. Grund: Bootsmann kann/darf bsb.de nicht automatisiert
     nach Störungsmeldungen durchsuchen (kein Backend, fragil, rechtlich
     heikel) – der klare Verweis auf die offizielle Quelle ist der
     etablierte Lösungsweg dieser App.
   Neu gegenüber v64:
   - Startseite: Rückfahrt-Hinweisfeld von gelb/cremefarben auf Weiß mit
     hellgrauer Schrift umgestellt (weniger alarmierend, da reine Info
     statt Warnung).
   - Startseite: Nächster-Hafen-Kachel kompakter – Route-Button etwas
     kleiner (Padding 9px/14px -> 7px/13px), Abstand bis zur Trennlinie
     vor "Nächste Abfahrt" verkleinert (14px -> 10px).
   Neu gegenüber v63:
   - BSB-Seite: Titel/Überschrift "BSB Fahrplan" -> "BSB Schifffahrt"
     (Tab-Titel, <title>, H1), passend zur Startseiten-Kachel.
   - Schweiz-Tab: Anleitungstext von hellblauer (.lg-info) auf gelbe/
     cremefarbene (.lg-note) Optik umgestellt.
   - Bodensee Fähre und Katamaran: neue Rückfahrt-Hinweis-Box am Ende
     der Seite (unter der Abfahrten-Karte). Zeigt die letzte Abfahrt des
     Tages in Gegenrichtung – cremefarben mit "ist schon vorbei", wenn
     sie in der Vergangenheit liegt, sonst blau mit der Uhrzeit. Reuse
     der bestehenden ruf_*-i18n-Texte von der BSB-Seite plus zwei neuen
     Keys ohne Ankunftszeit (ruf2_info_heute_html/ruf2_info_am_html).
     Bugfix während der Umsetzung: collect()-Aufruf mit zu kleinem
     Limit (n=50) hätte bei der Autofähre (>50 Abfahrten/Tag an
     Meersburg) die späten Abendfahrten abgeschnitten und eine falsche
     "letzte Abfahrt" gezeigt – auf n=300 erhöht.
   Neu gegenüber v62:
   - Startseite: "Positionskarte" umbenannt in "Live-Positionskarte".
     Schriftgröße der 3er-Kachelreihe (BSB Schifffahrt/Bodensee Fähre/
     Katamaran) auf 20px erhöht, gleich groß wie die Live-Positionskarte-
     Kachel (vorher 16px) – dabei Grid-Overflow-Bug gefixt (min-width:0
     auf .tile, sonst hätte "Katamaran" die Spalte gesprengt).
     Rückfahrt-Hinweis-Kachel neu gestaltet: Icon entfernt, cremefarbene
     Notiz-Optik wie die bestehende "Rückfahrt vorbei"-Box auf der
     BSB-Seite (neue `.ruf-note`-Klasse ersetzt `.ruf-card`/`.ruf-ico`/
     `.ruf-text`).
   Neu gegenüber v61:
   - Startseite: 4 Hauptkacheln umgebaut. "BSB Fahrplan" heißt jetzt
     "BSB Schifffahrt". Die 3 Kacheln BSB Schifffahrt/Bodensee Fähre/
     Katamaran stehen nun in einer Dreier-Reihe. Die Karte-Kachel steht
     jetzt separat unterhalb der Rückfahrt-Hinweis-Kachel, über die volle
     Breite, mit neuem Label "Positionskarte" (statt "Karte"). Neue
     `.tile-wide`-CSS-Klasse.
   Neu gegenüber v60:
   - Startseite: Machbarkeits-Check ("Zu Fuß schaffst du diese Abfahrt
     vermutlich nicht mehr" / "Knapp") aus der Nächste-Abfahrt-Karte
     entfernt. Beruhte auf derselben unzuverlässigen Luftlinien-Gehzeit
     wie die in v60 entfernte Anzeige – eine falsche "du schaffst es
     noch"-Warnung wäre hier besonders riskant gewesen (Boot verpasst).
     distKm(), gehminuten(), GEHZEIT_MAX sowie die i18n-Keys
     warn_missed/warn_tight (alle 4 Sprachen) entfernt, da nun ungenutzt.
   Neu gegenüber v59:
   - Startseite: Gehzeit-Anzeige ("ca. X Gehmin. entfernt" + Alternativ-
     hafen) komplett entfernt. Auch nach dem enableHighAccuracy-Fix in
     v59 war die Angabe laut Praxistest des Auftraggebers weiterhin
     falsch (App: 2 Min., Google Maps: 11 Min.). Entscheidung: lieber
     keine Angabe als eine unzuverlässige – der Route-Button (führt
     korrekt zum Anleger) deckt die Wegfindung bereits ab. Zugehörige
     tote i18n-Keys (ca_prefix, gehmin_suffix, alt_label,
     gehmin_paren_suffix) und die nun ungenutzte naechsteHaefen()-
     Funktion entfernt.
   Neu gegenüber v58:
   - Startseite: Bugfix Gehzeit-Berechnung ("X Gehmin. entfernt"). Die
     Geolocation-Abfrage lief bisher ohne enableHighAccuracy und mit bis
     zu 5 Min. altem Cache (anders als bei BSB/Karte, wo bereits
     enableHighAccuracy:true genutzt wird) – dadurch konnte eine grobe
     WLAN-/Funkzellen-Ortung statt echtem GPS verwendet werden, was zu
     einer falschen Ausgangsposition und damit falscher Gehzeit führte
     (Praxisfall: App zeigte 2 Min., echter Fußweg laut Google Maps 11
     Min.). Jetzt einheitlich enableHighAccuracy:true, maximumAge 60s.
     Zusätzlich "ca." vor der Gehzeit ergänzt, da es weiterhin eine
     Luftlinien-Schätzung ist, kein echtes Routing.
   Neu gegenüber v57:
   - Startseite: Route-Button zeigt jetzt exakt auf den Anleger. Vorher
     nutzte er die groben COORDS-Koordinaten (nur für die
     Nächster-Hafen-Erkennung gedacht) direkt als Google-Maps-Ziel, was
     den Pin spürbar neben den tatsächlichen Anleger setzen konnte. Jetzt
     wird der Hafenname als Suchbegriff ("Schiffsanlegestelle <Ort>
     Bodensee") an Google Maps übergeben, das den Anleger selbst korrekt
     auflöst.
   Neu gegenüber v56:
   - BSB Fahrplan (Verbindung-Tab): Button "Nächsten Hafen verwenden" und
     die Merken-Funktion (Stern-Button + gespeicherte Favoriten-Chips)
     entfernt – erklärungsbedürftig, und der nächste Hafen ist über die
     Startseite ohnehin schon verfügbar. Zugehörige tote i18n-Keys in
     allen 4 Sprachen bereinigt (pl_naechster_hafen_btn, pl_merken_btn,
     pl_gemerkt_btn, pl_loc_unsupported, pl_loc_far, pl_loc_unavailable,
     pl_loc_erkannt).
   Neu gegenüber v55:
   - Startseite: Reihenfolge geändert – Nächster-Hafen-Kachel bleibt oben,
     danach die Überschrift "Womit wollen Sie fahren?" über den 4 Kacheln,
     danach erst die Rückfahrt-Hinweis-Kachel (vorher zwischen
     Nächster-Hafen-Kachel und den 4 Kacheln).
   Neu gegenüber v54:
   - Startseite: neue Kachel "Verfügbare Rückfahrten werden direkt bei
     den Hinfahrt-Zeiten angezeigt." mit eigenem Doppelpfeil-Icon,
     zwischen der Nächster-Hafen-Kachel und den 4 Kacheln.
   - Bugfix: Nächster-Hafen-Kachel + neue Rückfahrt-Kachel stehen jetzt
     tatsächlich vor den 4 Kacheln (in PR #59 fälschlich als bereits
     erledigt beschrieben, aber nie umgesetzt – jetzt nachgeholt).
   Neu gegenüber v53:
   - Startseite: Hafenname ("Langenargen") nutzt jetzt exakt dieselbe
     Schrift/Stärke wie der Zieltext neben der Uhrzeit ("nach Lindau")
     – vorher nur gleiche Größe, aber andere Schriftart (Barlow
     Condensed statt Inter) und anderes Gewicht (700 statt 600).
   Neu gegenüber v52:
   - Fähre und Katamaran: Hinweis "Vergangene Abfahrten sind
     ausgeblendet." wieder entfernt (Entscheidung zurückgenommen) –
     der Nutzer kann die Uhrzeit selbst wählen, keine Erklärung nötig.
     Bleibt bei BSB weiterhin bestehen.
   Neu gegenüber v51:
   - Katamaran: "· Fahrzeit 52 Min." aus der Abfahrten-Überschrift
     entfernt (weniger zu lesen).
   - Startseite: Hafenname (z. B. "Langenargen") von 22px auf 18px –
     jetzt gleich groß wie der Zieltext neben der Uhrzeit.
   Neu gegenüber v50:
   - Fähre und Katamaran zeigen jetzt ebenfalls den Hinweis "Vergangene
     Abfahrten sind ausgeblendet.", wenn welche gefiltert wurden – wie
     schon bei BSB, wortgleich.
   Neu gegenüber v49:
   - Startseite: "Nächster Hafen" und "Nächste Abfahrt" zu einer Kachel
     zusammengefasst, direkt unter dem Header (Kacheln rutschen dafür
     nach unten). Nächster Hafen jetzt mit explizitem Namen, Gehzeit und
     einem Route-Button (Google-Maps-Routenlink). Macht Kernaufgabe 4
     ("Nächster Hafen") aus dem Mini-Produkttest sichtbarer.
   Neu gegenüber v48:
   - Startseite: Wetter-Kachel komplett entfernt (Open-Meteo/BigDataCloud
     nicht mehr genutzt) – Fokus liegt jetzt ausschließlich auf den fünf
     Kernaufgaben (Nächste Abfahrt, Route planen, Heute zurückkommen,
     Nächster Hafen, Fähre/Kursschiff unterscheiden). Datenschutz-,
     Haftungs- und Urheberrechtstexte entsprechend bereinigt. Live-Karte
     bleibt als eigenständiges Feature bestehen.
   Neu gegenüber v47:
   - Mehrsprachigkeit (DE/EN/FR/NL) jetzt auch auf dem BSB-Fahrplan
     (Verbindung, Schweiz, Hinweise, Live-Karte): Sprachumschalter im
     Header, alle Texte übersetzt. Fahrplandaten (fahrplan-daten.js)
     enthalten jetzt nur noch Übersetzungsschlüssel statt fertigem
     Text für die zwei Sonderfahrten-Warnungen (umstieg_am in
     i18n.js) – bleibt dadurch weiterhin ein reiner Datenaustausch.
     Damit sind alle vier Seiten der App vollständig mehrsprachig.
   Neu gegenüber v46:
   - Mehrsprachigkeit (DE/EN/FR/NL) jetzt auch auf Autofähre und
     Katamaran: Sprachumschalter im Header, alle Texte übersetzt
     (Richtung, Abfahrten, Hinweise, Footer/Impressum).
   Neu gegenüber v45:
   - Mehrsprachigkeit (DE/EN/FR/NL), Start mit der Startseite: neue
     eigenständige Datei i18n.js (Wörterbuch + Sprachumschalter, ganz
     getrennt von den Fahrplan-Dateien). Sprachumschalter (Flagge +
     Kürzel) oben rechts im Header, Auswahl in localStorage gespeichert
     und seitenübergreifend gültig. BSB/Fähre/Katamaran folgen.
   Neu gegenüber v44:
   - Hinweise-Tab: Disclaimer-Text zentriert. Impressum & Datenschutz
     ist jetzt zum Aufklappen (details/summary) statt dauerhaft offen.
   Neu gegenüber v43:
   - Hinweise-Tab: Disclaimer-Text ("Daten aus dem VSU-Fahrplan...") von
     12px auf 15px, wie "Angaben ohne Gewähr" auf allen Seiten.
   Neu gegenüber v42:
   - Schweiz-Tab: Hilfetext gekürzt (kein "in der Schweiz"/Fettung bei
     "Ziel", kein "das Angebot ist begrenzt", kein "(meist am
     Folgetag)").
   Neu gegenüber v41:
   - Schweiz-Tab: neuer Hilfetext unter der Ziel-Auswahl, erklärt das
     Prinzip (erst Ziel wählen, dann selbst den passenden Abfahrtsort
     nach Uhrzeit/Anreise auswählen; gilt auch für die Rückfahrt).
   Neu gegenüber v40:
   - Verbindung-Tab: Hinweistext "Vergangene Abfahrten für heute sind
     ausgeblendet." zu "Vergangene Abfahrten sind ausgeblendet." gekürzt.
   Neu gegenüber v39:
   - Kurzaufenthalt-Warnung ("Bei Hinfahrt ... bleiben dir bis zur
     nächsten Rückfahrt nur rund X Minuten vor Ort.") aus der
     Rückfahrt-Karte entfernt – bewusste Entscheidung, unnötig.
   Neu gegenüber v38:
   - "Rückfahrt heute"-Karte gilt jetzt auch an künftigen Tagen (nach
     "Nächster Tag"): Titel/Text zeigen dann "Rückfahrt am [Datum]"
     statt "Rückfahrt heute"; die Warnung "ist schon vorbei" erscheint
     weiterhin nur am aktuellen Tag.
   Neu gegenüber v37:
   - Bugfix "Nächsten Hafen verwenden": wenn der erkannte Standort mit
     dem bereits gewählten Ziel-Hafen übereinstimmt, wird jetzt die
     Richtung getauscht statt Von=Nach auf denselben Hafen zu setzen
     (verhinderte vorher eine unsinnige Route wie "Bregenz → Bregenz"
     samt Falschmeldung in der Rückfahrt-heute-Karte).
   Neu gegenüber v36:
   - "Angaben ohne Gewähr" auf allen vier Seiten vereinheitlicht:
     zentriert (fehlte bei Fähre/Katamaran) und 15px (BSB war bei
     11,5px, jetzt wie überall sonst).
   Neu gegenüber v35:
   - Autofähre: "Angaben ohne Gewähr" im Footer ohne Punkt am Ende
     (einheitlich mit Startseite/BSB).
   - Katamaran: Unterzeile im Kopf von "Sommerfahrplan gültig bis
     04.10.2026" auf "Saison 2026 · 1. Apr – 4. Okt" geändert (wie bei
     BSB/Fähre). Fußzeile gekürzt auf "Angaben ohne Gewähr · Betreiber:
     Katamaran-Reederei Bodensee GmbH & Co.KG." (Saisondaten dort
     entfernt, stehen jetzt oben).
   Neu gegenüber v34:
   - Startseite: Zielort in der "Nächste Abfahrt"-Kachel (.lg-dep-route,
     z. B. "nach Bregenz") von 17px auf 18px erhöht.
   - Autofähre: Unterzeile im Kopf von "Nächste Abfahrten · rund um die
     Uhr" auf "Saison 2026 · 27. Mär – 4. Okt" geändert (wie bei BSB).
     Fußzeile gekürzt auf nur noch "Angaben ohne Gewähr." (Saisondaten/
     Überfahrtzeit dort entfernt, stehen jetzt oben).
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

const CACHE = 'bootsmann-v95';
const SHELL = [
  './',
  './index.html',
  './bsb-fahrplan.html',
  './autofaehre.html',
  './katamaran.html',
  './fahrplan-daten.js',
  './katamaran-daten.js',
  './i18n.js',
  './bootsmann.webmanifest',
  './bootsmann-icon-180.png',
  './bootsmann-icon-192.png',
  './bootsmann-icon-512.png',
  './bodenseekarte.webp'
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
  // i18n.js/fahrplan-daten.js/katamaran-daten.js muessen IMMER zur gerade
  // ausgelieferten HTML-Version passen (neue Texte/Kurse erscheinen oft im
  // selben Release wie HTML-Aenderungen). Cache-zuerst wuerde hier veraltete
  // Uebersetzungs-Keys/Fahrplandaten neben frischem HTML ausliefern koennen
  // (z. B. i18n-Key erscheint als Rohtext statt uebersetzt). Deshalb wie
  // Seiten behandeln: Netz zuerst, Cache nur als Offline-Fallback.
  const istKernSkript = /\/(i18n|fahrplan-daten|katamaran-daten)\.js$/.test(url.pathname);

  if (istSeite || istKernSkript) {
    // Seite/Kernskript unter eigenem, sauberem Schluessel ablegen (ohne ?lat=..&lng=..)
    const pageKey =
      url.pathname.endsWith('/bsb-fahrplan.html')      ? './bsb-fahrplan.html'      :
      url.pathname.endsWith('/autofaehre.html')        ? './autofaehre.html'        :
      url.pathname.endsWith('/katamaran.html')         ? './katamaran.html'         :
      url.pathname.endsWith('/i18n.js')                ? './i18n.js'                :
      url.pathname.endsWith('/fahrplan-daten.js')       ? './fahrplan-daten.js'      :
      url.pathname.endsWith('/katamaran-daten.js')      ? './katamaran-daten.js'     : './index.html';
    // zuerst Netz (frischer Stand), bei Offline die passende Kopie
    e.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(pageKey, copy)).catch(() => {});
        return resp;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true }).then(hit => hit || (istSeite ? caches.match('./index.html') : undefined))
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
