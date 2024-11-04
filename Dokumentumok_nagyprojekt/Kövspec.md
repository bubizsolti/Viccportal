# Követelmény specifikáció

## 1. Jelenlegi helyzet leírása

Az internet terjedésével egyre több humorportál jött létre, amelyek a látogatóknak lehetőséget nyújtanak a szórakozásra és a mindennapi stressz oldására. Az ilyen portálok működtetése ugyanakkor összetett feladat, mivel a látogatók elvárják a folyamatos frissítést és a változatos tartalmat.

A jelenlegi viccportál felépítése már kialakult:

- **Kialakult Weblap Stílus**: A portál rendelkezik egységes, könnyen kezelhető felhasználói felülettel.
- **Navigáció**: A vicc kategóriák között könnyen váltogathat a felhasználó, valamint a top vicceket is megtekintheti.
- **Oldalváltó gombok**: Megjelennek a gombok, ám jelenleg funkcióval nem rendelkeznek.
- **Felhasználói Kezelőfelület**: A regisztrációs és Bejelentkezési gombok megjelennek és funkcionálnak, új oldalra navigálnak, ahol a regisztráció és a bejelentkezés megtörténik.
- **Regisztráció és bejelentkezés**: Jelenleg nem lehet sem regisztrálni, sem bejelentkezni.

## 2. Felhasználói Elvárások és Tartalmak

A felhasználók naprakész, változatos humorforrást keresnek, amely követi a legújabb trendeket, valamint biztosítja számukra a következőket:

- **Széleskörű Tartalmi Kínálat**: Többféle vicc és humoros tartalom, amely minden felhasználó igényeit kielégíti.
- **Interaktív Funkciók**: Lehetőség saját tartalmak megosztására és értékelésére, ami közösségi élményt nyújt a látogatóknak.

## 3. Kihívások és Tartalomkezelési Igények

A humor gyorsan változó természete állandó figyelmet követel meg, így a következő feladatokat is meg kell oldani:

- **Trendek követése**: Folyamatosan figyelni a közösségi médiát és új humorforrásokat.
- **Tartalmi Frissítések**: Az adminisztrátoroknak naponta kell új vicceket és mémeket feltölteniük, valamint kezelni a felhasználói visszajelzéseket.

## 4. Közösségi Biztonság és Moderáció

A portál közösségi élményének biztosítása érdekében ügyelni kell:

- **Biztonságos Közegre**: Az érzékeny tartalmak kezelése és a nem megfelelő anyagok kiszűrése kiemelt prioritás.
- **Aktív Moderálás**: A látogatóknak olyan helyet kell biztosítani, ahol szabadon és biztonságosan kommunikálhatnak.

## 5. Bevétel és Fenntarthatóság

A hosszú távú működés érdekében meg kell találni az egyensúlyt a felhasználói élmény és a bevételtermelés között:

- **Hirdetések Integrációja**: Úgy kell elhelyezni a reklámokat, hogy azok ne zavarják a humoros tartalmak fogyasztását.
- **Következetes Frissítés**: A látogatók megtartása érdekében rendszeresen frissíteni kell az oldalt, hogy megfeleljen az aktuális humortrendeknek és elvárásoknak.

A fenti elemek figyelembevételével a viccportál képes biztosítani a hosszú távú népszerűséget és relevanciát, mindemellett olyan felhasználói élményt nyújt, amely összhangban van a látogatók igényeivel.

#  Rendszer Funkcionális Követelmények:

## 1. Felhasználói Regisztráció és Bejelentkezés

- **Regisztráció e-mail és jelszó megadásával**:
A rendszer lehetőséget biztosít a felhasználóknak, hogy e-mail cím és jelszó megadásával regisztráljanak, és így egyéni fiókot hozzanak létre.

A regisztráció során megadott e-mail címek egyedi azonosítóként működnek, így a rendszer minden e-mail címet csak egyszer fogad el, ezáltal kiküszöbölve a duplikált fiókok lehetőségét.

A regisztrációs folyamat során a felhasználónak:
                        - **Egy jelszót kell választania**: A jelszóval kapcsolatos minimális biztonsági követelményeket (pl. legalább 8 karakter hosszú, kis- és nagybetűk, számok és speciális karakterek használata) a rendszer ellenőrzi.
                        - **E-mail cím megerősítése**: A felhasználók a megadott e-mail címre egy megerősítő linket kapnak, amelyre kattintva hitelesítik az e-mail címüket. Ez a lépés kötelező a regisztráció sikeres befejezéséhez és a fiók aktiválásához.
                        - **Elfelejtett jelszó funkció**: Az elfelejtett jelszavú felhasználók számára jelszó-visszaállítási lehetőség is biztosított, amely során egy egyszer használatos hivatkozást kapnak e-mailben a jelszó megváltoztatásához.

- **Személyes profil létrehozása**:
Sikeres regisztráció és bejelentkezés után a felhasználók személyes profilt hozhatnak létre. A profil egy központi helyet biztosít számukra, ahol elérhetik és kezelhetik a saját aktivitásukkal kapcsolatos információkat, beleértve:
                        - **Beküldött viccek listája**: A felhasználók megtekinthetik az általuk beküldött vicceket, azok státuszát (pl. elfogadott, moderálás alatt, elutasított) és azok megtekintési és értékelési statisztikáit.
                        - **Értékelések és szavazatok nyomon követése**: A felhasználók láthatják a vicceikre kapott visszajelzéseket, például az adott viccre érkezett szavazatok és értékelések számát és arányát. Ez motiválhatja őket a további tartalom létrehozására és a közösség aktív részvételére.
                        - **Profilkép és bemutatkozás szerkesztése**: A felhasználók személyre szabhatják profiljukat profilképpel és rövid bemutatkozó szöveggel, amely az interakcióik során láthatóvá válik a közösség számára.
                        - **Fiókbeállítások módosítása**: Lehetőség van a személyes adatok (pl. e-mail cím, jelszó) frissítésére, valamint az értesítési beállítások testreszabására, hogy a felhasználók értesítést kapjanak, ha valaki szavaz vagy hozzászól egy viccükhöz.

## 2. Viccek Beküldése és Kategorizálása

- **Viccek beküldése szöveges formában**:

A rendszer lehetőséget biztosít a felhasználóknak, hogy saját, egyedi vicceket osszanak meg másokkal. A vicc beküldéséhez egy szöveges űrlap áll rendelkezésre, amely lehetővé teszi a felhasználók számára, hogy egy egyszerű, intuitív felületen keresztül írják meg és nyújtsák be tartalmaikat.
 A viccek szövegének beírásához az alábbi funkciókat kínálja a rendszer:
                        - **Szövegszerkesztési eszközök**: Az űrlap tartalmazza az alapvető szövegformázási lehetőségeket (pl. bekezdések, idézőjelek, gondolatjelek), hogy a felhasználók könnyebben szerkeszthessék és strukturálhassák vicceiket a jobb olvashatóság érdekében.
                        - **Hosszkorlátozás és tartalomirányelvek**: A rendszer korlátozást vezet be a viccek hosszára, ezzel biztosítva, hogy a beküldött tartalom jól olvasható, rövid és tömör legyen. Az irányelvek tartalmi szempontokat is tartalmaznak, amelyek jelzik a felhasználóknak, milyen típusú viccek megengedettek, például a sértő, rasszista vagy más szabálysértő tartalmak tiltása.
                        - **Beküldési visszajelzés**: A beküldést követően a felhasználó értesítést kap arról, hogy vicce moderációs folyamat alá került, és a moderátorok jóváhagyásáig nem jelenik meg a portálon. Ezzel átláthatóvá válik a folyamat, és a felhasználók várakozási idővel is tisztában lesznek.

- **Viccek kategóriákba sorolása**:

A beküldött vicceknek minden esetben kategóriát kell választani, amely segít a felhasználóknak gyorsabban megtalálni a számukra érdekes tartalmakat. A kategorizálás kulcsszerepet játszik abban, hogy a viccek megfelelően rendszerezettek legyenek, és hogy a felhasználók különböző érdeklődési területek alapján tudjanak böngészni. A kategorizálás a következőképpen működik:
                        - **Előre meghatározott kategóriák listája**: A rendszer kínál egy listát az elérhető kategóriákról, például "Szőke nős viccek", "Mórickás viccek", "Felnőtt viccek", stb. Ezek az előre meghatározott kategóriák lehetővé teszik, hogy a viccek könnyen megtalálhatók legyenek egy adott stílus vagy téma alapján.
                        - **Több kategória választásának lehetősége**: Egyes viccek több kategóriába is illeszkedhetnek, ezért a felhasználók lehetőséget kapnak, hogy több kategóriát válasszanak ki beküldéskor. Ezzel a módszerrel növelhető az adott vicc elérhetősége és kereshetősége a portálon.
                        - **Új kategóriák javaslata**: A felhasználók javasolhatnak új kategóriákat, amennyiben úgy érzik, hogy a meglévő kategóriák nem fedik le teljesen a beküldendő vicc témáját. Ezeket a javaslatokat a moderátorok bírálják el, és dönthetnek arról, hogy a javasolt kategória bekerül-e a rendszerbe.

 ## 3. Viccek megtekintése és keresése

                        - Az oldalt látogatók böngészhetnek a kiírt viccek között kategória és népszerűség szerint. Ha valakinek van egy kedvenc fajtája, vagy csak kíváncsi, hogy mik a legfelkapottabb viccek, akkor azok alapján tekintheti meg őket.

                        - A felhasználóknak lehetősége van egy keresőfunkció használatára, amellyel kulcsszavak alapján is kereshetnek általuk látni kívánt vicceket.

                        - Véletlenszerűen is meg lehet tekinteni a vicceket. Ez egy külön gomb segítségével valósítható meg.