ISS-project
===========

ISS project

Napomene:

U folderu Examples se nalaze dvije stvari:

1. MilkTruckFlight je test napravljen na temelju milk truck skripte sa custom modelom miga-21. Leti se iznad Zagreba. Zgodno za početak.
2. GEFS je simulator od onog frajera sa izbačenim nekim nepotrebnim svarima kao google analitcs i slično. Uglavnom to je jako dobro proučit. Osnovini js kod se nalazi u js/gefs.js. To je ogromni file sa brdo linija koda ali je podjeljen u više djelova (ne garantiram da je točno):

1. 1 - 13759: Kordinate za piste i sl
2. 13760 - 14485 : SWFObject skripta
3. 14485 - 18210: jQuery 
4. 18210 - 18780: neznam :/
5. 18781 - 19729: Bootstrap
6. 19730 - 19862: Dio skripte za joystick
7. 19863 - 20619: Neke mat funkcije i konstante
8. 20437 - 21628: Definicije nekih funkcije
9. 21629 - do kraja: Tu počinje inicijalizacija google eartha loadanje modela i sl...
