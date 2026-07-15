/* Bootsmann – Übersetzungen (i18n)
   Eigenständige Datei, komplett getrennt von den Fahrplan-Dateien
   (fahrplan-daten.js, katamaran-daten.js). Jährliches Fahrplan-Update
   betrifft nur jene zwei Dateien, nie diese hier.

   Prinzip: I18N[sprache][schlüssel] = Text. t(key) liefert den Text der
   aktuell gewählten Sprache (Fallback: Deutsch, dann der Key selbst).
   Orts-/Hafennamen werden NICHT übersetzt (Eigennamen). */
"use strict";

var I18N_LANGS=["de","en","fr","nl"];
var I18N_DEFAULT="de";
var I18N_STORAGE_KEY="bootsmann_lang";
var I18N_FLAGS={de:"🇩🇪",en:"🇬🇧",fr:"🇫🇷",nl:"🇳🇱"};

function i18nGetLang(){
  try{
    var saved=localStorage.getItem(I18N_STORAGE_KEY);
    if(saved && I18N_LANGS.indexOf(saved)!==-1) return saved;
  }catch(e){}
  return I18N_DEFAULT;
}
function i18nSetLang(code){
  if(I18N_LANGS.indexOf(code)===-1) return;
  try{ localStorage.setItem(I18N_STORAGE_KEY,code); }catch(e){}
}
/* Wie t(), ersetzt aber {platzhalter} im Text mit Werten aus vals. */
function tf(key,vals){
  var s=t(key);
  return s.replace(/\{(\w+)\}/g,function(_,k){ return (vals && vals[k]!=null) ? vals[k] : ""; });
}
function t(key){
  var lang=i18nGetLang();
  var dict=I18N[lang];
  if(dict && Object.prototype.hasOwnProperty.call(dict,key)) return dict[key];
  var def=I18N[I18N_DEFAULT];
  if(def && Object.prototype.hasOwnProperty.call(def,key)) return def[key];
  return key;
}
/* HTML des Sprachumschalters (Flagge + Kürzel), gleich auf allen Seiten. */
function i18nSwitcherHTML(){
  var cur=i18nGetLang();
  var h='<div class="lg-lang" id="lg-lang">';
  for(var i=0;i<I18N_LANGS.length;i++){
    var code=I18N_LANGS[i];
    h+='<button type="button" class="'+(code===cur?"is-on":"")+'" data-lang="'+code+'" aria-label="'+code.toUpperCase()+'"><span class="flag">'+I18N_FLAGS[code]+'</span><span class="code">'+code.toUpperCase()+'</span></button>';
  }
  h+='</div>';
  return h;
}
/* Klick-Handler für den Umschalter verdrahten; lädt die Seite neu,
   damit alle dynamisch erzeugten Texte (Fahrpläne etc.) neu in der
   gewählten Sprache aufgebaut werden. */
function i18nInitSwitcher(){
  var el=document.getElementById("lg-lang");
  if(!el) return;
  var btns=el.querySelectorAll("button");
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener("click",function(){
      i18nSetLang(this.getAttribute("data-lang"));
      location.reload();
    });
  }
}
/* Statische Texte im HTML anhand data-i18n / data-i18n-html Attributen
   ersetzen. data-i18n-html erlaubt einfache Formatierung (<b>) im Text. */
function i18nApplyStatic(){
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    el.textContent=t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function(el){
    el.innerHTML=t(el.getAttribute("data-i18n-html"));
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(function(el){
    var pairs=el.getAttribute("data-i18n-attr").split(",");
    for(var i=0;i<pairs.length;i++){
      var p=pairs[i].split(":");
      el.setAttribute(p[0],t(p[1]));
    }
  });
  document.title=t("doc_title");
  document.documentElement.lang=i18nGetLang();
}

var I18N={
  de:{
    doc_title:"Bootsmann · Bodensee",
    h1_prefix:"Willkommen am",
    h1_lake:"Bodensee",
    tile_bsb:"BSB Fahrplan",
    tile_faehre:"Bodensee Fähre",
    tile_kat:"Katamaran",
    tile_karte:"Karte",
    wx_loading:"Wetter wird geladen …",
    wx_fail:"Wetter gerade nicht verfügbar.",
    wx_in:"jetzt in",
    wx_clear:"klar", wx_mostly_clear:"heiter", wx_cloudy:"wolkig", wx_overcast:"bedeckt",
    wx_fog:"Nebel", wx_drizzle:"Nieselregen", wx_rain:"Regen", wx_snow:"Schnee",
    wx_showers:"Schauer", wx_snow_showers:"Schneeschauer", wx_thunder:"Gewitter", wx_unknown:"—",
    near_you_fallback:"Ihrer Nähe",
    next_dep:"Nächste Abfahrt",
    next_dep_from:"Nächste Abfahrt ab",
    fahrplan_loading:"Fahrplan wird geladen …",
    gehmin_suffix:" Gehmin. entfernt",
    alt_label:" · Alternative: ",
    gehmin_paren_suffix:" Gehmin.)",
    nach_prefix:"nach ",
    morgen:"morgen",
    warn_missed:"Zu Fuß (~{min} Min) schaffst du diese Abfahrt vermutlich nicht mehr.",
    warn_tight:"Knapp – am besten gleich losgehen (~{min} Min zu Fuß).",
    next_after_prefix:"danach ",
    time_unit:" Uhr",
    out_of_season:"Außerhalb der Saison (3. Apr – 18. Okt) keine Fahrten.",
    no_more_trips:"Gerade keine weiteren Fahrten hinterlegt.",
    rechtliches_lbl:"Rechtliches",
    impressum_h:"Impressum",
    impressum_html:"<p>Angaben gemäß § 5 DDG</p><p>Udo Maier<br>Alfred-Weiß-Str. 2<br>88085 Langenargen<br>Deutschland</p><p>Kontakt: E-Mail info@udo-maier.de</p><p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Udo Maier (Anschrift wie oben).</p>",
    datenschutz_h:"Datenschutzerklärung",
    datenschutz_html:"<p><b>Verantwortlicher:</b> Udo Maier, Alfred-Weiß-Str. 2, 88085 Langenargen, info@udo-maier.de</p><p><b>Kurz gesagt:</b> Bootsmann hat keine Benutzerkonten, setzt keine Cookies, zeigt keine Werbung und verfolgt Ihr Verhalten nicht.</p><p><b>Standort:</b> Wenn Sie es erlauben, ermittelt die App Ihren Standort, um das Wetter für Ihren Ort zu zeigen und den nächstgelegenen Hafen für Ausflugsschiffe/Autofähre vorzuschlagen. Der Standort wird dafür an Open-Meteo (Wetter) sowie an BigDataCloud (Ortsname) übertragen. Er wird nicht dauerhaft gespeichert. Erteilen Sie keine Erlaubnis, zeigt die App ersatzweise das Wetter für Langenargen.</p><p><b>Eingebundene Bausteine (CDN):</b> Für die Schrift lädt die App Schriftarten vom Google-Dienst fonts.googleapis.com nach. Dabei wird technisch bedingt Ihre IP-Adresse an Google übertragen, teils in die USA (Drittland).</p><p><b>Hosting:</b> Die App liegt auf GitHub Pages (GitHub Inc., USA). Beim Abruf können technisch notwendige Daten wie die IP-Adresse in Server-Protokollen anfallen.</p><p><b>Ihre Rechte:</b> Sie haben nach DSGVO das Recht auf Auskunft, Berichtigung und Löschung. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.</p><p style=\"font-size:14px\">Hinweis: Dies ist eine in einfacher Sprache gehaltene Fassung. Für volle rechtliche Sicherheit empfiehlt sich eine anwaltlich geprüfte Datenschutzerklärung.</p>",
    haftung_h:"Haftungsausschluss",
    haftung_html:"<p><b>Wetterdaten</b> (Open-Meteo) sind Vorhersagen ohne Gewähr für Richtigkeit und Aktualität.</p><p><b>Fahrplanangaben</b> (Ausflugsschiffe, Autofähre) sind persönlich zusammengestellte Hilfen ohne Gewähr; maßgeblich sind die Angaben der jeweiligen Betreiber (BSB, Stadtwerke Konstanz).</p><p><b>Notrufnummern:</b> Bitte vor Nutzung prüfen, dass die hinterlegten Telefonnummern für Ihr Land korrekt sind. Im Notfall wählen Sie den europaweiten Notruf 112.</p>",
    urheber_h:"Urheberrecht",
    urheber_html:"<p>© 2026 Udo Maier. Eigene Texte und Gestaltung dieser App sind urheberrechtlich geschützt.</p><p>Wetterdaten: © Open-Meteo.com, verfügbar unter der Lizenz CC BY 4.0.</p><p>Kartendarstellung (Bodensee-Umriss): vereinfachte Küstenlinie, abgeleitet aus OpenStreetMap-Daten, © OpenStreetMap-Mitwirkende, verfügbar unter der Open Database License (ODbL).</p>",
    footer_disclaimer:"Angaben ohne Gewähr"
  },
  en:{
    doc_title:"Bootsmann · Lake Constance",
    h1_prefix:"Welcome to",
    h1_lake:"Lake Constance",
    tile_bsb:"BSB Timetable",
    tile_faehre:"Lake Constance Ferry",
    tile_kat:"Catamaran",
    tile_karte:"Map",
    wx_loading:"Loading weather …",
    wx_fail:"Weather currently unavailable.",
    wx_in:"now in",
    wx_clear:"clear", wx_mostly_clear:"mostly clear", wx_cloudy:"cloudy", wx_overcast:"overcast",
    wx_fog:"fog", wx_drizzle:"drizzle", wx_rain:"rain", wx_snow:"snow",
    wx_showers:"showers", wx_snow_showers:"snow showers", wx_thunder:"thunderstorm", wx_unknown:"—",
    near_you_fallback:"your area",
    next_dep:"Next departure",
    next_dep_from:"Next departure from",
    fahrplan_loading:"Loading timetable …",
    gehmin_suffix:" min walk away",
    alt_label:" · Alternative: ",
    gehmin_paren_suffix:" min walk)",
    nach_prefix:"to ",
    morgen:"tomorrow",
    warn_missed:"On foot (~{min} min) you probably won't make this departure anymore.",
    warn_tight:"Tight – best head out now (~{min} min on foot).",
    next_after_prefix:"then ",
    time_unit:"",
    out_of_season:"No sailings outside the season (3 Apr – 18 Oct).",
    no_more_trips:"No further departures currently listed.",
    rechtliches_lbl:"Legal",
    impressum_h:"Legal notice",
    impressum_html:"<p>Information according to German law (§ 5 DDG)</p><p>Udo Maier<br>Alfred-Weiß-Str. 2<br>88085 Langenargen<br>Germany</p><p>Contact: email info@udo-maier.de</p><p>Responsible for content under German law (§ 18(2) MStV): Udo Maier (address as above).</p>",
    datenschutz_h:"Privacy Policy",
    datenschutz_html:"<p><b>Controller:</b> Udo Maier, Alfred-Weiß-Str. 2, 88085 Langenargen, Germany, info@udo-maier.de</p><p><b>In short:</b> Bootsmann has no user accounts, sets no cookies, shows no ads, and does not track your behaviour.</p><p><b>Location:</b> If you allow it, the app determines your location to show the weather for your area and suggest the nearest harbour for excursion boats/car ferry. Your location is sent to Open-Meteo (weather) and BigDataCloud (place name) for this purpose. It is not stored permanently. If you don't grant permission, the app shows the weather for Langenargen instead.</p><p><b>Embedded components (CDN):</b> For the typeface, the app loads fonts from the Google service fonts.googleapis.com. This technically transmits your IP address to Google, in part to the USA (a non-EU country).</p><p><b>Hosting:</b> The app is hosted on GitHub Pages (GitHub Inc., USA). Technically necessary data such as the IP address may be recorded in server logs when accessed.</p><p><b>Your rights:</b> Under GDPR you have the right to access, rectification and erasure. Please contact the email address above for this.</p><p style=\"font-size:14px\">Note: This is a plain-language version. For full legal certainty, a lawyer-reviewed privacy policy is recommended.</p>",
    haftung_h:"Disclaimer",
    haftung_html:"<p><b>Weather data</b> (Open-Meteo) are forecasts provided without guarantee of accuracy or timeliness.</p><p><b>Timetable information</b> (excursion boats, car ferry) is a personally compiled aid provided without guarantee; the information from the respective operators (BSB, Stadtwerke Konstanz) is authoritative.</p><p><b>Emergency numbers:</b> Please check before use that the listed phone numbers are correct for your country. In an emergency, dial the Europe-wide emergency number 112.</p>",
    urheber_h:"Copyright",
    urheber_html:"<p>© 2026 Udo Maier. Original texts and design of this app are protected by copyright.</p><p>Weather data: © Open-Meteo.com, available under the CC BY 4.0 licence.</p><p>Map (Lake Constance outline): simplified coastline, derived from OpenStreetMap data, © OpenStreetMap contributors, available under the Open Database Licence (ODbL).</p>",
    footer_disclaimer:"All information without guarantee"
  },
  fr:{
    doc_title:"Bootsmann · lac de Constance",
    h1_prefix:"Bienvenue au",
    h1_lake:"lac de Constance",
    tile_bsb:"Horaires BSB",
    tile_faehre:"Ferry du lac de Constance",
    tile_kat:"Catamaran",
    tile_karte:"Carte",
    wx_loading:"Chargement de la météo …",
    wx_fail:"Météo indisponible pour le moment.",
    wx_in:"actuellement à",
    wx_clear:"dégagé", wx_mostly_clear:"plutôt dégagé", wx_cloudy:"nuageux", wx_overcast:"couvert",
    wx_fog:"brouillard", wx_drizzle:"bruine", wx_rain:"pluie", wx_snow:"neige",
    wx_showers:"averses", wx_snow_showers:"averses de neige", wx_thunder:"orage", wx_unknown:"—",
    near_you_fallback:"votre région",
    next_dep:"Prochain départ",
    next_dep_from:"Prochain départ de",
    fahrplan_loading:"Chargement des horaires …",
    gehmin_suffix:" min à pied",
    alt_label:" · Alternative : ",
    gehmin_paren_suffix:" min à pied)",
    nach_prefix:"vers ",
    morgen:"demain",
    warn_missed:"À pied (~{min} min), tu ne rattraperas probablement plus ce départ.",
    warn_tight:"Juste à temps – mieux vaut partir tout de suite (~{min} min à pied).",
    next_after_prefix:"puis ",
    time_unit:"",
    out_of_season:"Hors saison (3 avr. – 18 oct.), aucune traversée.",
    no_more_trips:"Aucun autre départ n'est actuellement enregistré.",
    rechtliches_lbl:"Mentions légales",
    impressum_h:"Mentions légales",
    impressum_html:"<p>Informations selon le droit allemand (§ 5 DDG)</p><p>Udo Maier<br>Alfred-Weiß-Str. 2<br>88085 Langenargen<br>Allemagne</p><p>Contact : e-mail info@udo-maier.de</p><p>Responsable du contenu selon le droit allemand (§ 18 al. 2 MStV) : Udo Maier (adresse ci-dessus).</p>",
    datenschutz_h:"Politique de confidentialité",
    datenschutz_html:"<p><b>Responsable :</b> Udo Maier, Alfred-Weiß-Str. 2, 88085 Langenargen, Allemagne, info@udo-maier.de</p><p><b>En bref :</b> Bootsmann n'a pas de comptes utilisateurs, ne pose pas de cookies, n'affiche pas de publicité et ne suit pas votre comportement.</p><p><b>Localisation :</b> Si vous l'autorisez, l'application détermine votre position pour afficher la météo de votre lieu et proposer le port le plus proche pour les bateaux d'excursion/le ferry. La position est transmise à Open-Meteo (météo) et à BigDataCloud (nom du lieu) à cette fin. Elle n'est pas conservée durablement. Sans autorisation, l'application affiche la météo de Langenargen à la place.</p><p><b>Composants intégrés (CDN) :</b> Pour la police d'écriture, l'application charge des polices depuis le service Google fonts.googleapis.com. Cela transmet techniquement votre adresse IP à Google, en partie vers les États-Unis (pays tiers).</p><p><b>Hébergement :</b> L'application est hébergée sur GitHub Pages (GitHub Inc., États-Unis). Des données techniquement nécessaires comme l'adresse IP peuvent être enregistrées dans les journaux du serveur lors de l'accès.</p><p><b>Vos droits :</b> Selon le RGPD, vous avez le droit d'accès, de rectification et de suppression. Adressez-vous pour cela à l'adresse e-mail mentionnée ci-dessus.</p><p style=\"font-size:14px\">Remarque : ceci est une version en langage simplifié. Pour une pleine sécurité juridique, une politique de confidentialité vérifiée par un avocat est recommandée.</p>",
    haftung_h:"Clause de non-responsabilité",
    haftung_html:"<p><b>Données météo</b> (Open-Meteo) : prévisions fournies sans garantie d'exactitude ni d'actualité.</p><p><b>Horaires</b> (bateaux d'excursion, ferry) : aide personnelle compilée sans garantie ; les informations des exploitants respectifs (BSB, Stadtwerke Konstanz) font foi.</p><p><b>Numéros d'urgence :</b> veuillez vérifier avant utilisation que les numéros indiqués sont corrects pour votre pays. En cas d'urgence, composez le numéro d'urgence européen 112.</p>",
    urheber_h:"Droits d'auteur",
    urheber_html:"<p>© 2026 Udo Maier. Les textes et la conception de cette application sont protégés par le droit d'auteur.</p><p>Données météo : © Open-Meteo.com, disponibles sous licence CC BY 4.0.</p><p>Carte (contour du lac de Constance) : littoral simplifié, dérivé de données OpenStreetMap, © contributeurs d'OpenStreetMap, disponibles sous la licence Open Database (ODbL).</p>",
    footer_disclaimer:"Informations sans garantie"
  },
  nl:{
    doc_title:"Bootsmann · Bodenmeer",
    h1_prefix:"Welkom aan het",
    h1_lake:"Bodenmeer",
    tile_bsb:"BSB Dienstregeling",
    tile_faehre:"Bodenmeer Veerboot",
    tile_kat:"Catamaran",
    tile_karte:"Kaart",
    wx_loading:"Weer wordt geladen …",
    wx_fail:"Weer momenteel niet beschikbaar.",
    wx_in:"nu in",
    wx_clear:"helder", wx_mostly_clear:"licht bewolkt", wx_cloudy:"bewolkt", wx_overcast:"zwaar bewolkt",
    wx_fog:"mist", wx_drizzle:"motregen", wx_rain:"regen", wx_snow:"sneeuw",
    wx_showers:"buien", wx_snow_showers:"sneeuwbuien", wx_thunder:"onweer", wx_unknown:"—",
    near_you_fallback:"uw omgeving",
    next_dep:"Volgende afvaart",
    next_dep_from:"Volgende afvaart vanaf",
    fahrplan_loading:"Dienstregeling wordt geladen …",
    gehmin_suffix:" min lopen",
    alt_label:" · Alternatief: ",
    gehmin_paren_suffix:" min lopen)",
    nach_prefix:"naar ",
    morgen:"morgen",
    warn_missed:"Te voet (~{min} min) haal je deze afvaart waarschijnlijk niet meer.",
    warn_tight:"Krap – beter nu meteen vertrekken (~{min} min te voet).",
    next_after_prefix:"daarna ",
    time_unit:"",
    out_of_season:"Buiten het seizoen (3 apr – 18 okt) geen vaarten.",
    no_more_trips:"Op dit moment geen verdere afvaarten bekend.",
    rechtliches_lbl:"Juridisch",
    impressum_h:"Colofon",
    impressum_html:"<p>Gegevens volgens Duits recht (§ 5 DDG)</p><p>Udo Maier<br>Alfred-Weiß-Str. 2<br>88085 Langenargen<br>Duitsland</p><p>Contact: e-mail info@udo-maier.de</p><p>Verantwoordelijk voor de inhoud volgens Duits recht (§ 18 lid 2 MStV): Udo Maier (adres zoals boven).</p>",
    datenschutz_h:"Privacyverklaring",
    datenschutz_html:"<p><b>Verantwoordelijke:</b> Udo Maier, Alfred-Weiß-Str. 2, 88085 Langenargen, Duitsland, info@udo-maier.de</p><p><b>Kort gezegd:</b> Bootsmann heeft geen gebruikersaccounts, plaatst geen cookies, toont geen advertenties en volgt uw gedrag niet.</p><p><b>Locatie:</b> Als u dat toestaat, bepaalt de app uw locatie om het weer voor uw plaats te tonen en de dichtstbijzijnde haven voor uitstapboten/autoveer voor te stellen. De locatie wordt daarvoor doorgestuurd naar Open-Meteo (weer) en BigDataCloud (plaatsnaam). Ze wordt niet permanent opgeslagen. Geeft u geen toestemming, dan toont de app in plaats daarvan het weer voor Langenargen.</p><p><b>Ingebonden onderdelen (CDN):</b> Voor het lettertype laadt de app lettertypen van de Google-dienst fonts.googleapis.com. Daarbij wordt technisch gezien uw IP-adres naar Google verzonden, deels naar de VS (derde land).</p><p><b>Hosting:</b> De app staat op GitHub Pages (GitHub Inc., VS). Bij het opvragen kunnen technisch noodzakelijke gegevens zoals het IP-adres in serverlogs terechtkomen.</p><p><b>Uw rechten:</b> Volgens de AVG heeft u recht op inzage, correctie en verwijdering. Neem daarvoor contact op via bovenstaand e-mailadres.</p><p style=\"font-size:14px\">Let op: dit is een versie in eenvoudige taal. Voor volledige juridische zekerheid wordt een door een jurist gecontroleerde privacyverklaring aanbevolen.</p>",
    haftung_h:"Aansprakelijkheidsuitsluiting",
    haftung_html:"<p><b>Weergegevens</b> (Open-Meteo) zijn voorspellingen zonder garantie op juistheid en actualiteit.</p><p><b>Dienstregelingen</b> (uitstapboten, autoveer) zijn persoonlijk samengestelde hulpmiddelen zonder garantie; bepalend zijn de gegevens van de betreffende exploitanten (BSB, Stadtwerke Konstanz).</p><p><b>Alarmnummers:</b> controleer voor gebruik of de vermelde telefoonnummers correct zijn voor uw land. Bel in noodgevallen het Europese alarmnummer 112.</p>",
    urheber_h:"Auteursrecht",
    urheber_html:"<p>© 2026 Udo Maier. Eigen teksten en vormgeving van deze app zijn auteursrechtelijk beschermd.</p><p>Weergegevens: © Open-Meteo.com, beschikbaar onder de CC BY 4.0-licentie.</p><p>Kaartweergave (omtrek Bodenmeer): vereenvoudigde kustlijn, afgeleid van OpenStreetMap-data, © OpenStreetMap-bijdragers, beschikbaar onder de Open Database License (ODbL).</p>",
    footer_disclaimer:"Gegevens zonder garantie"
  }
};
