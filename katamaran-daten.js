/* Bootsmann – Katamaran Konstanz–Friedrichshafen: eigener Betreiber
   (Katamaran-Reederei Bodensee GmbH & Co.KG), eigener Fahrplan, getrennt
   von fahrplan-daten.js (BSB-Ausflugsschiffe). Wird von katamaran.html,
   index.html (Nächste-Abfahrt-Kachel) und bsb-fahrplan.html (Live-Karte)
   gemeinsam genutzt. Änderungen an den Kat-Kursdaten NUR hier vornehmen. */
"use strict";

/* Sommerfahrplan 2026 (Aushang der-katamaran.de), 52 Min. Fahrzeit. */
var KAT_SEASON_START = "2026-04-01", KAT_SEASON_END = "2026-10-04";
var KAT_EXCEPT_FRUEH = {"2026-06-04": 1};          // Fronleichnam: keine 07/08-Uhr-Fahrten
var KAT_EXCEPT_ABENDKAT = {"2026-07-18": 1, "2026-08-08": 1}; // Seehasenfest/Seenachtsfest: kein AbendKAT
var KAT_EXCEPT_KN20 = {"2026-08-08": 1};           // Seenachtsfest: KN-Abfahrt 20 Uhr entfällt
var KAT_PORTS = {
  kn: {lat: 47.659, lng: 9.178, name: "Konstanz"},
  fn: {lat: 47.651, lng: 9.480, name: "Friedrichshafen"}
};

function katPad(n) { return (n < 10 ? "0" : "") + n; }
function katIso(d) { return d.getFullYear() + "-" + katPad(d.getMonth() + 1) + "-" + katPad(d.getDate()); }

function katDepartsKN(dow, dStr) {
  var h = [];
  if (dow >= 1 && dow <= 5 && !KAT_EXCEPT_FRUEH[dStr]) h.push(7, 8);
  for (var i = 9; i <= 18; i++) h.push(i);
  if (dow === 5 || dow === 6 || dow === 0) { h.push(19); if (!KAT_EXCEPT_KN20[dStr]) h.push(20); }
  if ((dow === 5 || dow === 6) && !KAT_EXCEPT_ABENDKAT[dStr]) h.push(22);
  return h;
}
function katDepartsFN(dow, dStr) {
  var h = [];
  if (dow >= 1 && dow <= 5 && !KAT_EXCEPT_FRUEH[dStr]) h.push(7, 8);
  for (var i = 9; i <= 18; i++) h.push(i);
  if (dow === 5 || dow === 6 || dow === 0) h.push(19, 20);
  if ((dow === 5 || dow === 6) && !KAT_EXCEPT_ABENDKAT[dStr]) h.push(21);
  return h;
}

/* Nächste n Abfahrten ab jetzt. dir: "kn" (ab Konstanz) oder "fn" (ab Friedrichshafen). */
function katNextDepartures(dir, n) {
  var res = [], now = new Date();
  for (var off = 0; off < 3 && res.length < n; off++) {
    var d = new Date(now.getTime()); d.setDate(d.getDate() + off); d.setHours(0, 0, 0, 0);
    var dStr = katIso(d);
    if (dStr < KAT_SEASON_START || dStr > KAT_SEASON_END) continue;
    var hours = (dir === "kn" ? katDepartsKN : katDepartsFN)(d.getDay(), dStr);
    hours.forEach(function (h) {
      var dep = new Date(d.getTime()); dep.setHours(h, 0, 0, 0);
      if (dep.getTime() >= now.getTime()) res.push(dep);
    });
  }
  return res.slice(0, n);
}

/* Live-Positionen (lineare Interpolation zwischen Abfahrt und Ankunft, wie
   schiffePositionen() in fahrplan-daten.js/bsb-fahrplan.html) für die Karte.
   Liefert lat/lng plus die rohen Endpunkte (_from/_to); die Blickrichtung
   berechnet die aufrufende Seite selbst (dort steht karteXY/fahrtwinkel
   zur Verfügung), damit diese Datei ohne Kartencode auskommt. */
function katamaranPositionen() {
  var now = new Date();
  var dStr = katIso(now);
  if (dStr < KAT_SEASON_START || dStr > KAT_SEASON_END) return [];
  var dow = now.getDay();
  var nowMinVal = now.getHours() * 60 + now.getMinutes();
  var out = [];
  var kn = [KAT_PORTS.kn.lat, KAT_PORTS.kn.lng], fn = [KAT_PORTS.fn.lat, KAT_PORTS.fn.lng];
  function add(fromP, toP, depHours, vonName, bisName) {
    depHours.forEach(function (h) {
      var depMin = h * 60, arrMin = depMin + 52;
      if (nowMinVal < depMin || nowMinVal > arrMin) return;
      var frac = (nowMinVal - depMin) / 52;
      out.push({
        kat: true,
        lat: fromP[0] + (toP[0] - fromP[0]) * frac,
        lng: fromP[1] + (toP[1] - fromP[1]) * frac,
        von: vonName, bis: bisName,
        _from: fromP, _to: toP
      });
    });
  }
  add(kn, fn, katDepartsKN(dow, dStr), "Konstanz", "Friedrichshafen");
  add(fn, kn, katDepartsFN(dow, dStr), "Friedrichshafen", "Konstanz");
  return out;
}
