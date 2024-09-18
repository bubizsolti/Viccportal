# Jelenlegi helyzet leírása

Az internet elterjedésével a humorforrások is átalakultak, és a viccportálok népszerűsége egyre nőtt. Az emberek szívesen keresnek fel ilyen oldalakat, hogy oldják a stresszt és felviduljanak a mindennapokban. 

Azonban a viccportálok kezelése, frissítése és karbantartása nem kis feladat. A rendszeres tartalomfeltöltés érdekében az adminisztrátoroknak naponta több órát kell eltölteniük új viccek, mémek és humoros tartalmak keresésével, moderálásával, valamint a felhasználói visszajelzések kezelésével.

Mivel az internetes humor gyorsan változik, a trendek követése és az új humorstílusok integrálása elengedhetetlen, hogy a portálok vonzóak maradjanak. A látogatók elvárják:

- A gyors frissítést,
- A humoros tartalmak széles választékát

A viccportálok közönsége nagyrészt nem csak passzív fogyasztói a tartalomnak, hanem szívesen osztják meg saját humoros alkotásaikat is. A felhasználók részvétele és a közösségi interakciók folyamatos odafigyelést és moderálást igényelnek. 

Mindeközben fontos, hogy a viccportálok:

- Ne csak humorforrást jelentsenek,
- Hanem olyan felületet is, ahol a közösség tagjai biztonságban érezhetik magukat,
- Kerüljék az érzékeny témák megsértését és a nem megfelelő tartalmak megjelenését.

A viccportálok számára a relevancia fenntartása kulcsfontosságú, hiszen az online világban a felhasználók gyorsan elpártolnak, ha egy oldal nem frissül rendszeresen, vagy a tartalmak nem tükrözik a legújabb trendeket. 

Ezért a humoros tartalmak szerkesztőinek:

- Folyamatosan követniük kell a közösségi média platformokat és az aktuális mémeket,
- Naprakész anyagokat kell kínálniuk.

Az ilyen portálok hosszú távú fenntarthatóságát befolyásolja az is, hogy miként képesek bevételt generálni, például hirdetéseken keresztül. Ez újabb kihívást jelent, hiszen:

- Meg kell találni az egyensúlyt a felhasználói élmény és a reklámok mennyisége között,
- Ügyelni kell arra, hogy a látogatók ne érezzék túlzsúfoltnak az oldalt.


#  Rendszer Funkcionális Követelmények:

Felhasználói Regisztráció és Bejelentkezés
- A felhasználók regisztrálhatnak e-mail cím és jelszó megadásával, vagy külső fiókok (pl. Facebook, Google) használatával.
- E-mail megerősítés a regisztráció során a felhasználók hitelesítéséhez.
- Jelszó-visszaállítási lehetőség e-mailes értesítéssel.
- A felhasználók bejelentkezés után személyes profilt hozhatnak létre, ahol     megtekinthetik a beküldött vicceiket és a kapott szavazataikat.

Viccek Beküldése és Kategorizálása
- A felhasználók beküldhetnek vicceket szöveges formában
- A beküldött vicceket kategóriákba kell sorolni (pl. "Szőke nős viccek", "Mórickás   viccek", "Felnőtt viccek").
- A moderátorok átnézik és jóváhagyják a beküldött vicceket, mielőtt azok megjelennek a  portálon.

Viccek Megtekintése és Keresése
- A felhasználók böngészhetnek a viccek között kategóriák vagy népszerűség szerint.
- Keresőfunkció, amely lehetővé teszi a felhasználóknak, hogy kulcsszavak alapján   keressenek vicceket.
- Szűrő opciók: kategória, időszak (pl. "legfrissebb", "legnépszerűbb").
- Véletlenszerű vicc funkció, amely egy véletlenszerűen kiválasztott viccet jelenít meg a felhasználónak.

Viccek Értékelése 
- A felhasználók szavazhatnak a viccekre (pl. "Tetszik" vagy "Nem tetszik"), ami befolyásolja a vicc láthatóságát.
- A rendszer képes legyen az értékelések alapján rangsorolni a vicceket, és a legnépszerűbb vicceket kiemelni a főoldalon.

Moderátorok számára elérhető felület, ahol jóváhagyhatják, szerkeszthetik, vagy törölhetik a beküldött vicceket.
- Moderálási eszközök a nem megfelelő tartalmak (pl. sértő, jogsértő viccek) kezelésére, beleértve a felhasználói jelentéseket is.

# Nem Funkcionális Követelmények

Teljesítmény
- Az oldalnak képesnek kell lennie legalább 100 egyidejű felhasználó kiszolgálására.
- A rendszernek a viccek beküldését, megtekintését, és értékelését 5 másodpercen belül kell feldolgoznia, még csúcsidőben is.
- Gyors és hatékony keresési és szűrési funkciók, amelyek nagy mennyiségű adat esetén is jól működnek.

Biztonság
- Az adatokat biztonságosan kell tárolni és titkosítani (pl. jelszavak hash-elése).
- A felhasználói adatok védelme és GDPR-megfelelés biztosítása.
- Rendszeres biztonsági mentések és lehetőség az adatok visszaállítására.

Felhasználói Élmény

- Reszponzív design, amely jól működik asztali gépeken.
- Egyszerű és átlátható navigáció, gyors hozzáférés a különböző vicckategóriákhoz.
- Intuitív felület a viccek beküldésére és a közösségi funkciók használatára (pl. szavazás, kommentelés).

# Adatbázis és Tárolás

Az adatbázis tárolja a felhasználói profilokat, vicceket, kommenteket, értékeléseket, kategóriákat, és a moderációs műveleteket.
Olyan adatbázis-struktúra kialakítása, amely támogatja a skálázhatóságot és a nagy mennyiségű adat kezelését (pl. MySQL, PostgreSQL).