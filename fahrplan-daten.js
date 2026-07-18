/* Bootsmann – gemeinsame Fahrplan-Daten und Gültigkeits-Logik
   (Häfen, Koordinaten, Kursliste, Saison-/Feiertagsregeln).
   Wird von bsb-fahrplan.html und index.html (Nächste-Abfahrt-Kachel)
   eingebunden. Änderungen an Kursdaten NUR hier vornehmen, nicht
   in den einzelnen Seiten kopieren – sonst laufen sie auseinander. */
"use strict";

var PORTS = ["Konstanz", "Mainau", "Meersburg", "Hagnau", "Immenstaad", "Friedrichshafen", "Langenargen", "Kressbronn", "Nonnenhorn", "Wasserburg", "Lindau", "Bregenz", "Kreuzlingen", "Gottlieben", "Ermatingen", "Reichenau", "Mannenbach", "Berlingen", "Gaienhofen", "Steckborn", "Hemmenhofen", "Wangen", "Mammern", "Öhningen", "Stein am Rhein", "Diessenhofen/Gailingen", "Büsingen", "Schaffhausen", "Romanshorn", "Arbon", "Rorschach", "Horn", "Uttwil", "Altnau", "Bottighofen", "Güttingen", "Staad", "Altenrhein", "Rheineck", "Radolfzell", "Iznang", "Unteruhldingen", "Dingelsdorf", "Überlingen"];
// Index 31 (Horn) ist nur Zwischenstopp auf der SBS-Strecke Rorschach–Arbon,
// wie die Untersee-Kleinstopps bewusst NICHT einzeln anwählbar (siehe SELECTABLE).
// Indizes 28–30, 32–38 sind Schweizer SBS-Häfen (kein BSB/URh-Betrieb)
var SBS_PORTS = [28, 29, 30, 32, 33, 34, 35, 36, 37, 38];
// ungefähre Hafenkoordinaten [lat,lng] für die Standort-Erkennung
var COORDS = [[47.659, 9.178], [47.705, 9.197], [47.694, 9.271], [47.685, 9.318], [47.677, 9.367], [47.651, 9.48], [47.598, 9.547], [47.586, 9.6], [47.583, 9.628], [47.56, 9.638], [47.545, 9.685], [47.504, 9.747], [47.6499, 9.1738], [47.662, 9.133], [47.672, 9.084], [47.6957, 9.0636], [47.687, 9.056], [47.692, 9.001], [47.692, 8.965], [47.666, 8.972], [47.69, 8.93], [47.687, 8.9], [47.65, 8.84], [47.663, 8.887], [47.66, 8.859], [47.69, 8.75], [47.697, 8.687], [47.696, 8.632], [47.565, 9.360], [47.514, 9.431], [47.478, 9.491], [47.494, 9.462], [47.583, 9.339], [47.586, 9.283], [47.616, 9.219], [47.599, 9.320], [47.473, 9.545], [47.487, 9.560], [47.462, 9.548], [47.741, 8.968], [47.727, 8.917], [47.716, 9.205], [47.723, 9.143], [47.769, 9.179]];
function nearestPort(lat,lng){var best=-1,bd=Infinity;for(var i=0;i<COORDS.length;i++){var dlat=lat-COORDS[i][0],dlng=(lng-COORDS[i][1])*Math.cos(lat*Math.PI/180),d=dlat*dlat+dlng*dlng;if(d<bd){bd=d;best=i;}}return {idx:best,far:Math.sqrt(bd)>0.6};}
function resolvePort(s){if(s==null)return -1;var t=String(s).trim();var num=parseInt(t,10);if(!isNaN(num)&&String(num)===t&&num>=0&&num<PORTS.length)return num;t=t.toLowerCase();for(var i=0;i<PORTS.length;i++){if(PORTS[i].toLowerCase()===t)return i;}return -1;}

// stop = [portIndex, ankunft, abfahrt]
var COURSES = [
  {"no":121,"svc":"snack","line":"obersee","stops":[[5, "9:10", "9:10"], [6, "9:35", "9:35"], [7, "9:55", "9:55"], [8, "10:05", "10:05"], [9, "10:15", "10:15"], [10, "10:35", "10:35"]]},
  {"no":141,"svc":"restaurant","line":"obersee","stops":[[10, "9:55", "9:55"], [11, "10:17", "10:17"]]},
  {"no":123,"svc":"snack","line":"obersee","stops":[[10, "11:40", "11:40"], [11, "12:02", "12:02"]]},
  {"no":111,"svc":"restaurant","line":"obersee","stops":[[0, "9:05", "9:05"], [2, "9:35", "9:45"], [3, "10:00", "10:00"], [4, "10:15", "10:15"], [5, "10:45", "10:55"], [6, "11:20", "11:20"], [7, "11:40", "11:40"], [8, "11:50", "11:50"], [9, "12:00", "12:00"], [10, "12:20", "12:25"], [11, "12:47", "12:47"]]},
  {"no":113,"svc":"restaurant","line":"obersee","stops":[[10, "13:30", "13:30"], [11, "13:52", "13:52"]]},
  {"no":131,"svc":"snack","line":"obersee","stops":[[1, "10:55", "10:55"], [2, "11:15", "11:20"], [3, "11:35", "11:35"], [4, "11:50", "11:50"], [5, "12:20", "12:20"]]},
  {"no":143,"svc":"restaurant","line":"obersee","stops":[[5, "12:30", "12:30"], [6, "12:55", "12:55"], [7, "13:15", "13:15"], [8, "13:25", "13:25"], [9, "13:35", "13:35"], [10, "13:55", "14:00"], [11, "14:22", "14:22"]]},
  {"no":115,"svc":"restaurant","line":"obersee","stops":[[10, "15:05", "15:05"], [11, "15:27", "15:27"]]},
  {"no":125,"svc":"snack","line":"obersee","stops":[[5, "14:20", "14:20"], [6, "14:45", "14:45"], [7, "15:05", "15:05"], [8, "15:15", "15:15"], [9, "15:25", "15:25"], [10, "15:45", "15:50"], [11, "16:12", "16:12"]]},
  {"no":151,"svc":"snack","line":"obersee","stops":[[0, "14:00", "14:00"], [1, "14:30", "14:30"]]},
  {"no":133,"svc":"snack","line":"obersee","stops":[[0, "15:00", "15:00"], [2, "15:30", "15:30"]]},
  {"no":145,"svc":"restaurant","line":"obersee","stops":[[5, "16:35", "16:35"], [6, "17:00", "17:00"], [7, "17:20", "17:20"], [8, "17:30", "17:30"], [9, "17:40", "17:40"], [10, "18:00", "18:05"], [11, "18:27", "18:27"]]},
  {"no":153,"svc":"snack","line":"obersee","stops":[[0, "15:15", "15:15"], [1, "15:55", "15:55"], [2, "16:15", "16:25"], [3, "16:40", "16:40"], [4, "16:55", "16:55"], [5, "17:25", "17:35"], [6, "18:00", "18:00"], [7, "18:20", "18:20"], [8, "18:30", "18:30"], [9, "18:40", "18:40"], [10, "19:00", "19:05"], [11, "19:27", "19:27"]]},
  {"no":135,"svc":"snack","line":"obersee","stops":[[0, "17:05", "17:05"], [1, "17:45", "17:45"], [2, "18:05", "18:15"], [3, "18:30", "18:30"], [4, "18:45", "18:45"], [5, "19:15", "19:15"]]},
  {"no":130,"svc":"snack","line":"obersee","stops":[[5, "9:10", "9:10"], [4, "9:40", "9:40"], [3, "9:55", "9:55"], [2, "10:10", "10:20"], [1, "10:40", "10:40"]]},
  {"no":"4000e","svc":"snack","line":"obersee","stops":[[41, "9:20", "9:20"], [1, "9:35", "9:40"], [2, "10:10", "10:20"], [0, "11:05", "11:05"]]},
  {"no":150,"svc":"snack","line":"obersee","stops":[[11, "9:20", "9:20"], [10, "9:42", "9:50"], [9, "10:10", "10:10"], [8, "10:20", "10:20"], [7, "10:30", "10:30"], [6, "10:50", "10:50"], [5, "11:15", "11:25"], [4, "11:55", "11:55"], [3, "12:10", "12:10"], [2, "12:25", "12:35"], [1, "13:00", "13:00"], [0, "13:30", "13:30"]]},
  {"no":142,"svc":"restaurant","line":"obersee","stops":[[11, "10:25", "10:25"], [10, "10:47", "10:55"], [9, "11:15", "11:15"], [8, "11:25", "11:25"], [7, "11:35", "11:35"], [6, "11:55", "11:55"], [5, "12:20", "12:20"]]},
  {"no":132,"svc":"snack","line":"obersee","stops":[[5, "12:30", "12:30"], [4, "13:00", "13:00"], [3, "13:15", "13:15"], [2, "13:30", "13:40"], [0, "14:10", "14:10"]]},
  {"no":124,"svc":"snack","line":"obersee","stops":[[11, "12:15", "12:15"], [10, "12:37", "12:50"], [9, "13:10", "13:10"], [8, "13:20", "13:20"], [7, "13:30", "13:30"], [6, "13:50", "13:50"], [5, "14:15", "14:15"]]},
  {"no":152,"svc":"snack","line":"obersee","stops":[[1, "14:35", "14:35"], [0, "15:05", "15:05"]]},
  {"no":122,"svc":"snack","line":"obersee","stops":[[11, "11:10", "11:10"], [10, "11:32", "11:32"]]},
  {"no":144,"svc":"restaurant","line":"obersee","stops":[[11, "14:30", "14:30"], [10, "14:52", "15:00"], [9, "15:20", "15:20"], [8, "15:30", "15:30"], [7, "15:40", "15:40"], [6, "16:00", "16:00"], [5, "16:25", "16:25"]]},
  {"no":134,"svc":"snack","line":"obersee","stops":[[2, "15:40", "15:40"], [1, "16:05", "16:05"], [0, "16:35", "16:35"]]},
  {"no":112,"svc":"restaurant","line":"obersee","stops":[[11, "13:00", "13:00"], [10, "13:22", "13:22"]]},
  {"no":114,"svc":"restaurant","line":"obersee","stops":[[11, "14:00", "14:00"], [10, "14:22", "14:22"]]},
  {"no":116,"svc":"restaurant","line":"obersee","stops":[[11, "15:40", "15:40"], [10, "16:02", "16:10"], [9, "16:30", "16:30"], [8, "16:40", "16:40"], [7, "16:50", "16:50"], [6, "17:10", "17:10"], [5, "17:35", "17:40"], [4, "18:10", "18:10"], [3, "18:25", "18:25"], [2, "18:40", "18:50"], [0, "19:20", "19:20"]]},
  {"no":146,"svc":"restaurant","line":"obersee","stops":[[11, "18:35", "18:35"], [10, "18:57", "18:57"]]},
  {"no":126,"svc":"snack","line":"obersee","stops":[[11, "16:25", "16:25"], [10, "16:47", "16:55"], [9, "17:15", "17:15"], [8, "17:25", "17:25"], [7, "17:35", "17:35"], [6, "17:55", "17:55"], [5, "18:20", "18:20"]]},
  {"no":528,"svc":"restaurant","line":"untersee","stops":[[12, "9:00", "9:00"], [0, "9:12", "9:12"], [13, "9:32", "9:32"], [14, "9:52", "9:52"], [15, "10:06", "10:06"], [16, "10:13", "10:13"], [17, "10:23", "10:23"], [18, "10:33", "10:33"], [19, "10:39", "10:39"], [20, "10:45", "10:45"], [21, "10:57", "10:57"], [22, "11:04", "11:04"], [23, "11:12", "11:12"], [24, "11:25", "11:30"], [25, "12:05", "12:05"], [26, "12:20", "12:20"], [27, "12:45", "12:45"]]},
  {"no":536,"svc":"restaurant","line":"untersee","stops":[[12, "11:00", "11:00"], [0, "11:12", "11:12"], [13, "11:32", "11:32"], [14, "11:52", "11:52"], [15, "12:06", "12:06"], [16, "12:13", "12:13"], [17, "12:23", "12:23"], [18, "12:33", "12:33"], [19, "12:39", "12:39"], [20, "12:45", "12:45"], [21, "12:57", "12:57"], [22, "13:04", "13:04"], [23, "13:12", "13:12"], [24, "13:25", "13:30"], [25, "14:05", "14:05"], [26, "14:20", "14:20"], [27, "14:45", "14:45"]]},
  {"no":550,"svc":"restaurant","line":"untersee","stops":[[12, "14:27", "14:27"], [0, "14:39", "14:39"], [13, "14:59", "14:59"], [14, "15:19", "15:19"], [15, "15:33", "15:33"], [16, "15:40", "15:40"], [17, "15:50", "15:50"], [18, "16:00", "16:00"], [19, "16:06", "16:06"], [20, "16:12", "16:12"], [21, "16:24", "16:24"], [22, "16:31", "16:31"], [23, "16:39", "16:39"], [24, "16:52", "16:57"], [25, "17:32", "17:32"], [26, "17:47", "17:47"], [27, "18:15", "18:15"]]},
  {"no":558,"svc":"restaurant","line":"untersee","stops":[[12, "16:27", "16:27"], [0, "16:39", "16:39"], [13, "16:59", "16:59"], [14, "17:19", "17:19"], [15, "17:33", "17:33"], [16, "17:40", "17:40"], [17, "17:50", "17:50"], [18, "18:00", "18:00"], [19, "18:06", "18:06"], [20, "18:12", "18:12"], [21, "18:24", "18:24"], [22, "18:31", "18:31"], [23, "18:39", "18:39"], [24, "18:52", "18:57"], [25, "19:32", "19:32"], [26, "19:47", "19:47"], [27, "20:15", "20:15"]]},
  {"no":525,"svc":"restaurant","line":"untersee","stops":[[27, "9:10", "9:10"], [26, "9:38", "9:38"], [25, "10:10", "10:10"], [24, "11:15", "11:15"], [23, "11:32", "11:32"], [22, "11:39", "11:39"], [21, "11:45", "11:45"], [20, "11:57", "11:57"], [19, "12:03", "12:03"], [18, "12:09", "12:09"], [17, "12:18", "12:18"], [16, "12:27", "12:27"], [15, "12:38", "12:38"], [14, "12:50", "12:50"], [13, "13:17", "13:17"], [0, "13:45", "13:45"], [12, "13:55", "13:55"]]},
  {"no":533,"svc":"restaurant","line":"untersee","stops":[[27, "11:10", "11:10"], [26, "11:38", "11:38"], [25, "12:10", "12:10"], [24, "13:15", "13:15"], [23, "13:32", "13:32"], [22, "13:39", "13:39"], [21, "13:45", "13:45"], [20, "13:57", "13:57"], [19, "14:03", "14:03"], [18, "14:09", "14:09"], [17, "14:18", "14:18"], [16, "14:27", "14:27"], [15, "14:38", "14:38"], [14, "14:50", "14:50"], [13, "15:17", "15:17"], [0, "15:45", "15:45"], [12, "15:55", "15:55"]]},
  {"no":543,"svc":"restaurant","line":"untersee","stops":[[27, "13:18", "13:18"], [26, "13:46", "13:46"], [25, "14:18", "14:18"], [24, "15:23", "15:23"], [23, "15:40", "15:40"], [22, "15:47", "15:47"], [21, "15:53", "15:53"], [20, "16:05", "16:05"], [19, "16:11", "16:11"], [18, "16:17", "16:17"], [17, "16:26", "16:26"], [16, "16:35", "16:35"], [15, "16:46", "16:46"], [14, "16:58", "16:58"], [13, "17:25", "17:25"], [0, "17:53", "17:53"], [12, "18:05", "18:05"]]},
  {"no":551,"svc":"restaurant","line":"untersee","stops":[[27, "15:18", "15:18"], [26, "15:46", "15:46"], [25, "16:18", "16:18"], [24, "17:23", "17:23"], [23, "17:40", "17:40"], [22, "17:47", "17:47"], [21, "17:53", "17:53"], [20, "18:05", "18:05"], [19, "18:11", "18:11"], [18, "18:17", "18:17"], [17, "18:26", "18:26"], [16, "18:35", "18:35"], [15, "18:46", "18:46"], [14, "18:58", "18:58"], [13, "19:25", "19:25"], [0, "19:53", "19:53"], [12, "20:05", "20:05"]]},
  // === Kreuzlingen-Schaffhausen: 3 Donnerstags-Sonderkurse, Quelle: VSU-
  // Fahrplan 2026 S. 14, nur Do, 27.6.-13.9. (line "untersee-do") ===
  {"no":527,"svc":"restaurant","line":"untersee-do","stops":[[20,"9:57","9:57"],[19,"10:03","10:03"],[18,"10:09","10:09"],[17,"10:18","10:18"],[16,"10:27","10:27"],[15,"10:38","10:38"],[14,"10:50","10:50"],[13,"11:17","11:17"],[0,"11:45","11:45"],[12,"11:55","11:55"]]},
  {"no":546,"svc":"restaurant","line":"untersee-do","stops":[[12,"12:00","12:00"],[0,"12:12","12:12"],[13,"12:32","12:32"],[14,"12:52","12:52"],[15,"13:06","13:06"],[16,"13:13","13:13"],[17,"13:23","13:23"],[18,"13:33","13:33"],[19,"13:39","13:39"],[20,"13:45","13:45"],[21,"13:57","13:57"],[22,"14:04","14:04"],[23,"14:12","14:12"],[24,"14:25","15:30"],[25,"16:05","16:05"],[26,"16:20","16:20"],[27,"16:45","16:45"]]},
  {"no":555,"svc":"restaurant","line":"untersee-do","stops":[[27,"16:50","16:50"],[26,"17:18","17:18"],[25,"17:50","17:50"],[24,"18:55","18:55"],[23,"19:12","19:12"],[22,"19:19","19:19"],[21,"19:25","19:25"],[20,"19:37","19:37"],[19,"19:43","19:43"],[18,"19:49","19:49"]]},
  // === Radolfzell ↔ Reichenau, Quelle: VSU-Fahrplan 2026 S. 14, Rundkurse,
  // Mi-So, 27.6.-13.9. (line "radolfzell") ===
  {"no":"613/614","svc":"snack","line":"radolfzell","stops":[[39,"10:00","10:00"],[40,"10:10","10:10"],[16,"10:35","10:35"],[15,"10:45","10:50"],[40,"11:15","11:15"],[39,"11:25","11:25"]]},
  {"no":"615/616","svc":"snack","line":"radolfzell","stops":[[39,"11:30","11:30"],[16,"12:00","12:00"],[15,"12:10","12:15"],[40,"12:40","12:40"],[39,"12:50","12:50"]]},
  {"no":"617/618","svc":"snack","line":"radolfzell","stops":[[39,"14:05","14:05"],[40,"14:15","14:15"],[16,"14:40","14:40"],[15,"14:50","14:55"],[40,"15:20","15:20"],[39,"15:30","15:30"]]},
  {"no":"619/620","svc":"snack","line":"radolfzell","stops":[[39,"15:35","15:35"],[40,"15:45","15:45"],[16,"16:10","16:10"],[15,"16:20","16:25"],[40,"16:50","16:50"],[39,"17:00","17:00"]]},
  // === SBS Dreiländereck – Quelle: VSU-Fahrplan 2026 S. 9, echte Kursnummern
  // (vorher standen hier erfundene 900er-Nummern aus einer anderen Quelle –
  // am 9.7.2026 gegen das offizielle PDF korrigiert). täglich Hauptsaison ===
  // Rorschach → Lindau (via Wasserburg oder Bregenz)
  {"no":302,"svc":"snack","line":"sbs","stops":[[30,"10:40","10:40"],[10,"11:40","11:40"]]},
  {"no":72,"svc":"restaurant","line":"sbs","stops":[[30,"11:25","11:25"],[11,"12:42","12:42"],[10,"13:05","13:05"]]},
  {"no":304,"svc":"snack","line":"sbs","stops":[[30,"13:05","13:05"],[9,"13:55","13:55"],[10,"14:15","14:15"]]},
  {"no":312,"svc":"restaurant","line":"sbs","stops":[[30,"14:20","14:20"],[9,"15:15","15:15"],[10,"15:40","15:40"]]},
  {"no":306,"svc":"restaurant","line":"sbs","stops":[[30,"17:05","17:05"],[9,"17:50","17:50"],[10,"18:15","18:15"]]},
  // Lindau → Rorschach
  {"no":301,"svc":"snack","line":"sbs","stops":[[10,"9:25","9:25"],[9,"9:45","9:45"],[30,"10:35","10:35"]]},
  {"no":303,"svc":"snack","line":"sbs","stops":[[10,"11:45","11:45"],[9,"12:05","12:05"],[30,"12:55","12:55"]]},
  {"no":73,"svc":"restaurant","line":"sbs","stops":[[10,"13:10","13:10"],[30,"14:06","14:06"]]},
  {"no":305,"svc":"restaurant","line":"sbs","stops":[[10,"15:50","15:50"],[30,"16:51","16:51"]]},
  {"no":313,"svc":"restaurant","line":"sbs","stops":[[10,"18:20","18:20"],[30,"19:15","19:15"]]},
  // Romanshorn/Arbon → Rorschach (morgens), über Horn
  {"no":7042,"svc":"restaurant","line":"sbs","stops":[[28,"10:20","10:20"],[29,"10:55","10:55"],[31,"11:07","11:07"],[30,"11:20","11:20"]]},
  // === Romanshorn – Arbon – Langenargen – Rorschach, Quelle: VSU-Fahrplan
  // 2026 S. 10, nur 27.6.–13.9. (line "sbs-2706") ===
  // Romanshorn/Arbon → Langenargen
  {"no":7220,"svc":"restaurant","line":"sbs-2706","stops":[[28,"08:50","08:50"],[29,"09:20","09:23"],[6,"10:05","10:10"],[30,"10:52","10:52"]]},
  {"no":7222,"svc":"restaurant","line":"sbs-2706","stops":[[28,"12:05","12:05"],[29,"12:35","12:38"],[6,"13:20","13:25"],[30,"14:07","14:07"]]},
  {"no":7223,"svc":"restaurant","line":"sbs-2706","stops":[[29,"14:38","14:38"],[6,"15:20","15:20"]]},
  // Rorschach → Horn → Arbon → Romanshorn
  {"no":7221,"svc":"restaurant","line":"sbs-2706","stops":[[30,"11:02","11:02"],[31,"11:17","11:17"],[29,"11:27","11:30"],[28,"12:00","12:00"]]},
  // Rorschach → Horn → Arbon (endet in Arbon, keine Weiterfahrt)
  {"no":7223,"svc":"restaurant","line":"sbs-2706","stops":[[30,"14:10","14:10"],[31,"14:25","14:25"],[29,"14:35","14:35"]]},
  // Arbon → Romanshorn (Rorschach/Horn ohne Halt laut Fahrplan)
  {"no":7224,"svc":"restaurant","line":"sbs-2706","stops":[[29,"16:02","16:05"],[28,"16:35","16:35"]]},
  // Rorschach → Horn → Arbon → Romanshorn (spätabends)
  {"no":7043,"svc":"restaurant","line":"sbs","stops":[[30,"19:18","19:18"],[31,"19:33","19:33"],[29,"19:43","19:43"],[28,"20:13","20:13"]]},
  // Rorschach → Immenstaad → Hagnau → Kreuzlingen (täglich)
  {"no":917,"svc":"snack","line":"sbs","stops":[[30,"09:30","09:30"],[4,"12:10","12:10"],[3,"12:30","12:30"],[12,"12:25","12:25"]]},
  // Kreuzlingen → Hagnau → Immenstaad → Rorschach (täglich)
  {"no":918,"svc":"snack","line":"sbs","stops":[[12,"15:20","15:20"],[3,"15:55","15:55"],[4,"16:05","16:05"],[30,"18:55","18:55"]]},
  // === Romanshorn – Kreuzlingen ↔ Meersburg, Quelle: VSU-Fahrplan 2026 S. 9,
  // 14.5.–4.10. (line "sbs", täglich - innerhalb unseres Saisonrahmens bis 13.9.) ===
  {"no":7040,"svc":"restaurant","line":"sbs","stops":[[28,"09:30","09:30"],[32,"09:55","09:55"],[33,"10:15","10:15"],[34,"10:35","10:35"],[12,"10:50","10:50"]]},
  {"no":7011,"svc":"restaurant","line":"sbs","stops":[[12,"10:55","10:55"],[1,"11:25","11:30"],[2,"11:50","11:50"]]},
  {"no":7044,"svc":"restaurant","line":"sbs","stops":[[28,"13:55","13:55"],[32,"14:20","14:20"],[33,"14:40","14:40"],[34,"15:00","15:00"],[12,"15:15","15:15"]]},
  {"no":7021,"svc":"restaurant","line":"sbs","stops":[[12,"15:20","15:20"],[1,"15:50","15:50"],[2,"16:15","16:15"]]},
  {"no":7012,"svc":"restaurant","line":"sbs","stops":[[2,"11:55","11:55"],[12,"12:25","12:25"]]},
  {"no":7041,"svc":"restaurant","line":"sbs","stops":[[12,"12:30","12:30"],[34,"12:45","12:45"],[33,"13:05","13:05"],[32,"13:25","13:25"],[28,"13:50","13:50"]]},
  {"no":7022,"svc":"restaurant","line":"sbs","stops":[[2,"16:20","16:20"],[12,"16:50","16:50"]]},
  {"no":7045,"svc":"restaurant","line":"sbs","stops":[[12,"16:55","16:55"],[34,"17:10","17:10"],[33,"17:30","17:30"],[32,"17:50","17:50"],[28,"18:15","18:15"]]},
  // === Rorschach ↔ Rheineck, Quelle: VSU-Fahrplan 2026 S. 10,
  // 14.5.–4.10. (line "sbs", täglich - innerhalb unseres Saisonrahmens bis 13.9.) ===
  {"no":10,"svc":"snack","line":"sbs","stops":[[30,"9:30","9:30"],[37,"10:00","10:00"],[38,"10:30","10:30"]]},
  {"no":30,"svc":"snack","line":"sbs","stops":[[30,"11:50","11:50"],[36,"12:05","12:05"],[37,"12:30","12:30"],[38,"13:00","13:00"]]},
  {"no":50,"svc":"snack","line":"sbs","stops":[[30,"14:15","14:15"],[36,"14:35","14:35"],[37,"15:00","15:00"],[38,"15:30","15:30"]]},
  {"no":20,"svc":"snack","line":"sbs","stops":[[38,"10:40","10:40"],[37,"11:10","11:10"],[30,"11:40","11:40"]]},
  {"no":40,"svc":"snack","line":"sbs","stops":[[38,"13:05","13:05"],[37,"13:35","13:35"],[30,"14:05","14:05"]]},
  {"no":60,"svc":"snack","line":"sbs","stops":[[38,"15:37","15:37"],[37,"16:07","16:07"],[36,"16:32","16:32"],[30,"16:50","16:50"]]},
  // === Romanshorn – Immenstaad – Hagnau – Altnau, Quelle: VSU-Fahrplan 2026
  // S. 11, 27.6.–13.9. Do/So (line "sbs-2706-doso") und Freitag (line "sbs-fr") ===
  {"no":7200,"svc":"snack","line":"sbs-2706-doso","stops":[[28,"09:50","09:50"],[4,"10:30","10:35"],[3,"10:50","11:02"],[33,"11:22","11:30"],[35,"11:40","11:45"],[4,"12:10","12:10"]]},
  {"no":7201,"svc":"snack","line":"sbs-2706-doso","stops":[[4,"12:15","12:15"],[3,"12:30","12:35"],[33,"12:55","13:10"],[35,"13:20","13:25"],[4,"13:50","13:50"]]},
  {"no":7202,"svc":"snack","line":"sbs-2706-doso","stops":[[4,"14:00","14:00"],[3,"14:15","14:50"],[33,"15:10","15:15"],[35,"15:25","15:30"],[4,"15:55","15:55"]]},
  {"no":7203,"svc":"snack","line":"sbs-2706-doso","stops":[[4,"16:00","16:00"],[3,"16:15","16:20"],[33,"16:40","16:45"],[35,"16:55","17:00"],[4,"17:25","17:25"]]},
  {"no":7204,"svc":"snack","line":"sbs-2706-doso","stops":[[4,"17:30","17:30"],[3,"17:45","17:50"],[33,"18:10","18:12"],[35,"18:22","18:24"],[28,"18:55","18:55"]]},
  {"no":7205,"svc":"snack","line":"sbs-fr","stops":[[28,"13:20","13:20"],[4,"14:00","14:05"],[3,"14:20","14:30"],[33,"14:50","14:55"],[35,"15:05","15:10"],[4,"15:35","15:35"]]},
  {"no":7206,"svc":"snack","line":"sbs-fr","stops":[[4,"15:40","15:40"],[3,"15:55","16:00"],[33,"16:20","16:25"],[35,"16:35","16:40"],[4,"17:05","17:05"]]},
  {"no":7207,"svc":"snack","line":"sbs-fr","stops":[[4,"17:10","17:10"],[3,"17:25","17:30"],[33,"17:50","17:55"],[35,"18:05","18:10"],[4,"18:35","18:35"]]},
  {"no":7208,"svc":"snack","line":"sbs-fr","stops":[[4,"18:40","18:40"],[3,"18:55","19:55"],[33,"20:15","20:20"],[35,"20:30","20:35"],[4,"21:00","21:00"]]},
  {"no":7209,"svc":"snack","line":"sbs-fr","stops":[[4,"21:10","21:10"],[3,"21:25","21:30"],[33,"21:50","21:52"],[35,"22:02","22:04"],[28,"22:35","22:35"]]},
  // === Konstanz ↔ Überlingen, Quelle: VSU-Fahrplan 2026 S. 7, täglich Hauptsaison
  // (line "obersee"), außer 461/462/463/464 (Fußnote 3, line "ueberlingen-fn3")
  // und 416 (Fußnote 5, nicht am 8.8., siehe exception()) ===
  // Konstanz → Überlingen
  {"no":401,"svc":"restaurant","line":"obersee","stops":[[0,"8:20","8:20"],[2,"8:50","8:50"],[1,"9:20","9:20"],[42,"9:40","9:40"],[43,"9:55","9:55"]]},
  {"no":411,"svc":"restaurant","line":"obersee","stops":[[0,"9:40","9:40"],[2,"10:10","10:20"],[1,"10:40","10:45"],[41,"10:55","10:55"],[42,"11:15","11:15"],[43,"11:30","11:30"]]},
  {"no":"4001e","svc":"snack","line":"obersee","stops":[[0,"11:15","11:15"],[1,"11:50","11:55"],[41,"12:10","12:10"]]},
  {"no":461,"svc":"snack","line":"ueberlingen-fn3","stops":[[2,"11:35","11:35"],[1,"11:55","12:05"],[41,"12:20","12:20"],[42,"12:40","12:40"],[43,"12:55","12:55"]]},
  {"no":403,"svc":"restaurant","line":"obersee","stops":[[0,"12:15","12:15"],[2,"12:45","12:55"],[1,"13:15","13:20"],[41,"13:35","13:35"],[42,"13:55","13:55"],[43,"14:10","14:10"]]},
  {"no":"4003e","svc":"snack","line":"obersee","stops":[[1,"13:40","13:40"],[41,"13:55","13:55"]]},
  {"no":463,"svc":"snack","line":"ueberlingen-fn3","stops":[[2,"14:30","14:30"],[41,"14:50","14:50"]]},
  {"no":413,"svc":"restaurant","line":"obersee","stops":[[0,"13:55","13:55"],[2,"14:25","14:35"],[1,"14:55","15:05"],[41,"15:20","15:20"],[42,"15:40","15:40"],[43,"15:55","15:55"]]},
  {"no":"4005e","svc":"snack","line":"obersee","stops":[[1,"14:35","14:35"],[41,"14:50","14:50"]]},
  {"no":"4007e","svc":"snack","line":"obersee","stops":[[1,"16:00","16:00"],[41,"16:15","16:15"]]},
  {"no":405,"svc":"restaurant","line":"obersee","stops":[[0,"16:20","16:20"],[2,"16:50","17:00"],[1,"17:20","17:25"],[41,"17:40","17:40"],[42,"18:00","18:00"],[43,"18:15","18:15"]]},
  {"no":415,"svc":"restaurant","line":"obersee","stops":[[0,"18:05","18:05"],[2,"18:35","18:45"],[1,"19:05","19:05"],[41,"19:15","19:15"],[43,"19:35","19:35"]]},
  // Überlingen → Konstanz
  {"no":402,"svc":"restaurant","line":"obersee","stops":[[43,"10:05","10:05"],[42,"10:15","10:15"],[41,"10:35","10:35"],[2,"11:20","11:35"],[0,"12:05","12:05"]]},
  {"no":412,"svc":"restaurant","line":"obersee","stops":[[43,"11:40","11:40"],[42,"11:55","11:55"],[41,"12:15","12:15"],[1,"12:30","12:40"],[2,"13:00","13:10"],[0,"13:40","13:40"]]},
  {"no":"4002e","svc":"snack","line":"obersee","stops":[[1,"13:15","13:15"],[2,"13:30","13:30"]]},
  {"no":462,"svc":"snack","line":"ueberlingen-fn3","stops":[[43,"13:10","13:10"],[42,"13:20","13:20"],[41,"13:40","13:40"],[1,"13:55","14:00"],[2,"14:20","14:20"]]},
  {"no":"4004e","svc":"snack","line":"obersee","stops":[[41,"14:10","14:10"],[1,"14:25","14:25"]]},
  {"no":404,"svc":"restaurant","line":"obersee","stops":[[43,"14:20","14:20"],[42,"14:30","14:30"],[41,"14:50","14:50"],[1,"15:05","15:10"],[2,"15:30","15:40"],[0,"16:10","16:10"]]},
  {"no":464,"svc":"snack","line":"ueberlingen-fn3","stops":[[41,"14:55","14:55"],[1,"15:10","15:15"],[2,"15:35","15:40"]]},
  {"no":"4006e","svc":"snack","line":"obersee","stops":[[41,"15:30","15:30"],[1,"15:45","15:45"]]},
  {"no":414,"svc":"restaurant","line":"obersee","stops":[[43,"16:05","16:05"],[42,"16:15","16:15"],[41,"16:35","16:35"],[1,"16:50","16:55"],[2,"17:15","17:25"],[0,"17:55","17:55"]]},
  {"no":406,"svc":"restaurant","line":"obersee","stops":[[43,"18:25","18:25"],[42,"18:35","18:35"],[41,"19:10","19:10"],[2,"19:30","19:35"],[0,"20:05","20:05"]]},
  {"no":416,"svc":"restaurant","line":"obersee","stops":[[43,"19:40","19:40"],[42,"19:50","19:50"],[2,"20:30","20:30"],[0,"21:00","21:00"]]},
  // === Konstanz ↔ Bregenz, Schnellkurse 157/158, Quelle: VSU-Fahrplan 2026
  // S. 3 (Nebensaison, Fußnote 1) und S. 5/6 (Hauptsaison, Fußnote 3):
  // 14.5.–3.7. nur Sa/So+Feiertag, 4.7.–13.9. Do–So, 14.9.–4.10. Sa/So
  // (line "obersee-schnellkurs", Gültigkeit siehe courseValidOn) ===
  {"no":157,"svc":"restaurant","line":"obersee-schnellkurs","stops":[[0,"14:40","14:40"],[1,"15:15","15:15"],[2,"15:35","15:40"],[10,"17:20","17:25"],[11,"17:47","17:47"]]},
  {"no":158,"svc":"snack","line":"obersee-schnellkurs","stops":[[11,"9:15","9:15"],[10,"9:37","9:45"],[2,"11:25","11:35"],[1,"12:00","12:00"],[0,"12:30","12:30"]]},
  // === Konstanz ↔ Überlingen, eigene Nebensaison-Kurse (andere Zeiten als
  // die Hauptsaison-Kurse gleicher Nummer!), Quelle: VSU-Fahrplan 2026 S. 4,
  // täglich 3.4.–13.5. und 14.9.–18.10. (line "ueberlingen-neben") ===
  // Konstanz → Überlingen
  {"no":411,"svc":"restaurant","line":"ueberlingen-neben","stops":[[0,"9:05","9:05"],[2,"9:35","9:45"],[1,"10:05","10:10"],[41,"10:20","10:20"],[42,"10:40","10:40"],[43,"10:55","10:55"]]},
  {"no":"4001e","svc":"snack","line":"ueberlingen-neben","stops":[[1,"9:55","9:55"],[41,"10:10","10:10"]]},
  {"no":401,"svc":"restaurant","line":"ueberlingen-neben","stops":[[0,"9:45","9:45"],[2,"10:15","10:15"]]},
  {"no":"4003e","svc":"snack","line":"ueberlingen-neben","stops":[[1,"10:45","10:45"],[41,"11:00","11:00"]]},
  {"no":"4005e","svc":"snack","line":"ueberlingen-neben","stops":[[1,"11:35","11:35"],[41,"11:50","11:50"]]},
  {"no":403,"svc":"restaurant","line":"ueberlingen-neben","stops":[[0,"11:05","11:05"],[2,"11:35","11:45"],[1,"12:05","12:10"],[41,"12:20","12:20"],[42,"12:40","12:40"],[43,"12:55","12:55"]]},
  {"no":"4007e","svc":"snack","line":"ueberlingen-neben","stops":[[1,"12:25","12:25"],[41,"12:40","12:40"]]},
  {"no":"4009e","svc":"snack","line":"ueberlingen-neben","stops":[[1,"13:15","13:15"],[41,"13:30","13:30"]]},
  {"no":413,"svc":"restaurant","line":"ueberlingen-neben","stops":[[0,"13:05","13:05"],[2,"13:35","13:45"],[1,"14:05","14:10"],[41,"14:25","14:25"],[42,"14:45","14:45"],[43,"15:00","15:00"]]},
  {"no":405,"svc":"restaurant","line":"ueberlingen-neben","stops":[[0,"15:05","15:05"],[2,"15:35","15:45"],[1,"16:05","16:10"],[41,"16:25","16:25"],[43,"16:50","16:50"]]},
  {"no":415,"svc":"restaurant","line":"ueberlingen-neben","stops":[[0,"17:05","17:05"],[2,"17:35","17:35"]]},
  // Überlingen → Konstanz
  {"no":"4000e","svc":"snack","line":"ueberlingen-neben","stops":[[41,"9:30","9:30"],[1,"9:45","9:45"]]},
  {"no":402,"svc":"restaurant","line":"ueberlingen-neben","stops":[[2,"10:25","10:25"],[0,"10:55","10:55"]]},
  {"no":"4002e","svc":"snack","line":"ueberlingen-neben","stops":[[41,"10:20","10:20"],[1,"10:35","10:35"]]},
  {"no":"4004e","svc":"snack","line":"ueberlingen-neben","stops":[[41,"11:10","11:10"],[1,"11:25","11:25"]]},
  {"no":412,"svc":"restaurant","line":"ueberlingen-neben","stops":[[43,"11:05","11:05"],[42,"11:15","11:15"],[41,"11:35","11:35"],[1,"11:45","11:50"],[2,"12:10","12:20"],[0,"12:50","12:50"]]},
  {"no":"4006e","svc":"snack","line":"ueberlingen-neben","stops":[[41,"12:00","12:00"],[1,"12:15","12:15"]]},
  {"no":"4008e","svc":"snack","line":"ueberlingen-neben","stops":[[41,"12:50","12:50"],[1,"13:05","13:05"]]},
  {"no":404,"svc":"restaurant","line":"ueberlingen-neben","stops":[[43,"13:05","13:05"],[42,"13:15","13:15"],[41,"13:35","13:35"],[1,"13:45","13:50"],[2,"14:10","14:20"],[0,"14:50","14:50"]]},
  {"no":414,"svc":"restaurant","line":"ueberlingen-neben","stops":[[43,"15:05","15:05"],[42,"15:15","15:15"],[41,"15:35","15:35"],[1,"15:50","15:55"],[2,"16:15","16:25"],[0,"16:55","16:55"]]},
  {"no":416,"svc":"restaurant","line":"ueberlingen-neben","stops":[[2,"17:40","17:40"],[0,"18:10","18:10"]]},
  {"no":406,"svc":"restaurant","line":"ueberlingen-neben","stops":[[43,"16:55","16:55"],[42,"17:10","17:10"],[1,"17:30","17:35"],[2,"18:05","18:05"],[0,"18:35","18:35"]]}
];

var WEEKDAYS = ["So","Mo","Di","Mi","Do","Fr","Sa"];
/* Gesamter navigierbarer Zeitraum: fruehester Nebensaison-Start bis spaetestes
   Nebensaison-Ende ueber alle Linien (siehe courseValidOn fuer die genauen
   Gueltigkeitsfenster je Linie/Kurs). Hauptsaison bleibt 14.5.-13.9. */
var SAISON_MIN="2026-04-03", SAISON_MAX="2026-10-18";
/* Feiertage, die in die Nebensaison-Randzeiten (Apr/Mai, Sep/Okt) fallen und
   auf Wochenend-Fahrplan schalten (Karfreitag, Ostern, Tag der Arbeit,
   Tag der Deutschen Einheit). */
var FEIERTAGE_NEBEN=["2026-04-03","2026-04-05","2026-04-06","2026-05-01","2026-10-03"];
function nebenIstSoFeiertag(dObj,dStr){ var w=dObj.getDay(); return w===0||FEIERTAGE_NEBEN.indexOf(dStr)!==-1; }
function nebenIstWeFeiertag(dObj,dStr){ var w=dObj.getDay(); return w===0||w===6||FEIERTAGE_NEBEN.indexOf(dStr)!==-1; }
function nebenIstDoSoFeiertag(dObj,dStr){ var w=dObj.getDay(); return w===0||w===4||w===5||w===6||FEIERTAGE_NEBEN.indexOf(dStr)!==-1; }
function nebenIstMiSoFeiertag(dObj,dStr){ var w=dObj.getDay(); return w===0||w>=3||FEIERTAGE_NEBEN.indexOf(dStr)!==-1; }
function pad2(n){return n<10?"0"+n:""+n;}
function todayISO(){var d=new Date();return d.getFullYear()+"-"+pad2(d.getMonth()+1)+"-"+pad2(d.getDate());}
function nowMin(){var d=new Date();return d.getHours()*60+d.getMinutes();}
function defaultDate(){var t=todayISO();if(t<SAISON_MIN)return SAISON_MIN;if(t>SAISON_MAX)return SAISON_MAX;return t;}
function toMin(t){var p=t.split(":");return (+p[0])*60+(+p[1]);}

/* warnKey/warnVals statt fertigem Text, damit die Meldung (i18n.js) je
   nach gewählter Sprache angezeigt wird - diese Datei enthält bewusst
   nur Daten, keine Sprache. */
function exception(no,fromIdx,toIdx,date){
  var FN=5;
  if(date==="2026-07-18"){
    if(no===143||no===144) return {removed:true};
    if(no===111&&fromIdx<=FN&&toIdx>FN) return {warnKey:"umstieg_am",warnVals:{date:"18.7.",port:"Friedrichshafen"}};
    if(no===116&&fromIdx>FN&&toIdx<=FN) return {warnKey:"umstieg_am",warnVals:{date:"18.7.",port:"Friedrichshafen"}};
  }
  if(date==="2026-08-08"){
    if(no===153&&toIdx===11) return {warnKey:"umstieg_am",warnVals:{date:"8.8.",port:"Lindau"}};
    if(no===150&&fromIdx>=10&&toIdx<10) return {warnKey:"umstieg_am",warnVals:{date:"8.8.",port:"Lindau"}};
    if(no===416) return {removed:true};
  }
  return {};
}

/* Nebensaison-Zusatzfenster je Kursnummer, Quelle: VSU-Fahrplan 2026 S. 3/4/8/13.
   Bei "untersee", "sbs" und "radolfzell" verkehren in der Nebensaison
   dieselben Kursnummern/Zeiten wie in der Hauptsaison, nur an weniger
   Tagen und in einem zusaetzlichen Zeitfenster - deshalb hier nur die
   Gueltigkeit erweitert, keine neuen Kurse noetig. */
var UNTERSEE_558_533={558:1,533:1};
var SBS_MEERSBURG_NR={7040:1,7011:1,7044:1,7021:1,7012:1,7041:1,7022:1,7045:1};
var SBS_RORSCHACH_LINDAU_NR={301:1,302:1,72:1,304:1,312:1,306:1,303:1,73:1,305:1,313:1,7042:1,7043:1};
var SBS_RHEINECK_NR={10:1,20:1,30:1,50:1}; // Rorschach<->Rheineck, S.10: laeuft bis 4.10. statt nur 13.9.
// Konstanz-Überlingen-Kurse: eigene Nebensaison-Zeiten unter "ueberlingen-neben",
// deshalb hier von der obersee-Nebensaison-Erweiterung ausgenommen.
var OBERSEE_UEB_ZWEIG={401:1,411:1,"4001e":1,403:1,"4003e":1,413:1,"4005e":1,"4007e":1,405:1,415:1,
  402:1,412:1,"4002e":1,"4004e":1,404:1,"4006e":1,414:1,406:1,416:1};
function courseValidOn(c,dObj,dStr){
  if(c.line==="untersee"){
    if(dStr>="2026-05-14"&&dStr<="2026-06-26") return true;
    if(dStr>="2026-05-14"&&dStr<="2026-09-13"){var w=dObj.getDay();return (w===0||w>=3);}
    // Nebensaison-Erweiterung fuer 528/536/550/558/525/533/543/551 (S. 13):
    if(UNTERSEE_558_533[c.no]){
      if((dStr>="2026-04-03"&&dStr<="2026-06-26")||(dStr>="2026-09-14"&&dStr<="2026-10-04"&&dStr!=="2026-10-03"))
        return nebenIstSoFeiertag(dObj,dStr);
      if(c.no===533&&dStr>="2026-10-05"&&dStr<="2026-10-18") return true;
      return false;
    }
    if(dStr>="2026-04-03"&&dStr<="2026-04-30") return nebenIstDoSoFeiertag(dObj,dStr);
    if(dStr>="2026-05-01"&&dStr<="2026-05-13") return true;
    if(dStr>="2026-09-14"&&dStr<="2026-10-04") return true;
    if(c.no===536&&dStr>="2026-10-05"&&dStr<="2026-10-18") return true;
    return false;
  }
  if(c.line==="radolfzell"){
    // Radolfzell-Reichenau: Mi-So, 27.06.-13.09.2026 (Hauptsaison)
    if(dStr>="2026-06-27"&&dStr<="2026-09-13"){var w2=dObj.getDay();return w2===0||w2>=3;}
    // Nebensaison-Erweiterung (S. 13): 3.4.-26.6. und 14.9.-18.10., Mi-So/Feiertag
    if((dStr>="2026-04-03"&&dStr<="2026-06-26")||(dStr>="2026-09-14"&&dStr<="2026-10-18"))
      return nebenIstMiSoFeiertag(dObj,dStr);
    return false;
  }
  if(c.line==="obersee"){
    if(dStr>="2026-05-14"&&dStr<="2026-09-13") return true; // Hauptsaison: alle Kurse taeglich
    // Nebensaison-Erweiterung (S. 3): dieselben Kursnummern, ausser den
    // Konstanz-Ueberlingen-Kursen (eigene Zeiten, siehe "ueberlingen-neben")
    if(!OBERSEE_UEB_ZWEIG[c.no] && ((dStr>="2026-04-03"&&dStr<="2026-05-13")||(dStr>="2026-09-14"&&dStr<="2026-10-18")))
      return true;
    return false;
  }
  if(c.line==="ueberlingen-neben"){
    // Konstanz <-> Ueberlingen, eigene Nebensaison-Kurse (S. 4), taeglich
    return (dStr>="2026-04-03"&&dStr<="2026-05-13")||(dStr>="2026-09-14"&&dStr<="2026-10-18");
  }
  if(c.line==="sbs"){
    if(dStr>="2026-05-14"&&dStr<="2026-09-13") return true; // Hauptsaison: alle Kurse taeglich
    // Nebensaison-Erweiterung (S. 8): dieselben Kursnummern, nur an
    // weniger Tagen in den Randzeiten
    if(SBS_MEERSBURG_NR[c.no]){
      if((dStr>="2026-04-03"&&dStr<="2026-05-10")||(dStr>="2026-10-01"&&dStr<="2026-10-18"))
        return nebenIstWeFeiertag(dObj,dStr);
      return false;
    }
    if(SBS_RORSCHACH_LINDAU_NR[c.no]){
      if((dStr>="2026-04-03"&&dStr<="2026-05-13")||(dStr>="2026-09-14"&&dStr<="2026-10-18")){
        if(nebenIstWeFeiertag(dObj,dStr)) return true;
      }
      if(dStr>="2026-09-14"&&dStr<="2026-10-02"){
        var w4=dObj.getDay(); return w4>=1&&w4<=5;
      }
      return false;
    }
    // Rorschach<->Rheineck (S.10): laeuft taeglich bis 4.10., nicht nur 13.9.
    if(SBS_RHEINECK_NR[c.no]&&dStr>="2026-09-14"&&dStr<="2026-10-04") return true;
    return false; // andere sbs-Kurse (Kreuzlingen-Hagnau u.a.): nur Hauptsaison
  }
  if(c.line==="sbs-fr"){
    // Freitags 27.06–13.09.2026
    if(dStr<"2026-06-27"||dStr>"2026-09-13") return false;
    return dObj.getDay()===5;
  }
  if(c.line==="sbs-2706"){
    // Romanshorn-Arbon-Langenargen-Rorschach: täglich, aber nur 27.06.-13.09.2026
    return dStr>="2026-06-27" && dStr<="2026-09-13";
  }
  if(c.line==="sbs-2706-doso"){
    // Romanshorn-Immenstaad-Hagnau-Altnau: nur Do/So, 27.06.-13.09.2026
    if(dStr<"2026-06-27"||dStr>"2026-09-13") return false;
    var wd=dObj.getDay();
    return wd===4||wd===0;
  }
  if(c.line==="untersee-do"){
    // Kreuzlingen-Schaffhausen Sonderkurse 527/546/555: nur Do, 27.06.-13.09.2026
    if(dStr<"2026-06-27"||dStr>"2026-09-13") return false;
    return dObj.getDay()===4;
  }
  if(c.line==="ueberlingen-fn3"){
    // Konstanz-Überlingen Kurse 461/462/463/464 (Fußnote 3):
    // 14.5.-3.7. nur Sa/So+Feiertag, 4.7.-13.9. Do-So
    var FEIERTAGE=["2026-05-14","2026-05-24","2026-05-25","2026-06-04","2026-08-01"];
    if(dStr<"2026-05-14"||dStr>"2026-09-13") return false;
    var w3=dObj.getDay();
    if(dStr<="2026-07-03") return w3===0||w3===6||FEIERTAGE.indexOf(dStr)!==-1;
    return w3===0||w3===4||w3===5||w3===6;
  }
  if(c.line==="obersee-schnellkurs"){
    // Konstanz-Bregenz Kurse 157/158 (S.5/6, Fußnote 3): 14.5.-3.7. nur
    // Sa/So+Feiertag, 4.7.-13.9. Do-So; zusaetzlich Nebensaison-Randzeit
    // 14.9.-4.10. Sa/So (S.3, Fußnote 1)
    var FEIERTAGE_SK=["2026-05-14","2026-05-24","2026-05-25","2026-06-04"];
    if(dStr>="2026-05-14"&&dStr<="2026-07-03"){
      var wsk=dObj.getDay(); return wsk===0||wsk===6||FEIERTAGE_SK.indexOf(dStr)!==-1;
    }
    if(dStr>="2026-07-04"&&dStr<="2026-09-13"){
      var wsk2=dObj.getDay(); return wsk2===0||wsk2===4||wsk2===5||wsk2===6;
    }
    if(dStr>="2026-09-14"&&dStr<="2026-10-04"){
      var wsk3=dObj.getDay(); return wsk3===0||wsk3===6;
    }
    return false;
  }
  return false; // alle Linien oben explizit behandelt
}
