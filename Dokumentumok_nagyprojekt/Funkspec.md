# Funkcionális Követelmények

## 1. Jelenlegi helyzet leírása

Az internet terjedésével egyre több humorportál jött létre, amelyek a látogatóknak lehetőséget nyújtanak a szórakozásra és a mindennapi stressz oldására. Az ilyen portálok működtetése ugyanakkor összetett feladat, mivel a látogatók elvárják a folyamatos frissítést és a változatos tartalmat.

A jelenlegi viccportál funkcionális elemei már kialakultak:

- **Weblap Stílus**: A portál rendelkezik egységes, könnyen kezelhető felhasználói felülettel.
- **Navigáció**: A vicc kategóriák között a felhasználó könnyedén válthat, és megtekintheti a top vicceket is.
- **Oldalváltó gombok**: A gombok megjelennek, de jelenleg funkcióval nem rendelkeznek.
- **Felhasználói Kezelőfelület**: A regisztrációs és bejelentkezési gombok működnek, új oldalra navigálnak, ahol a regisztráció és a bejelentkezés megtörténik.
- **Regisztráció és Bejelentkezés**: Jelenleg nem lehet sem regisztrálni, sem bejelentkezni.

## 2. Felhasználói Elvárások és Tartalmak

A felhasználók naprakész, változatos humorforrást keresnek, amely követi a legújabb trendeket, és biztosítja számukra a következő funkciókat:

- **Széleskörű Tartalmi Kínálat**: A rendszernek többféle vicc és humoros tartalom megjelenítésére kell képesnek lennie, ami minden felhasználói igényt kielégít.
- **Interaktív Funkciók**: A felhasználóknak lehetőséget kell biztosítani saját tartalmak megosztására és értékelésére, amely közösségi élményt nyújt a látogatóknak.

## 3. Kihívások és Tartalomkezelési Igények

A humor gyorsan változó természete állandó figyelmet követel meg, így a következő funkcionális követelményeket is figyelembe kell venni:

- **Trendek követése**: A rendszernek folyamatosan figyelnie kell a közösségi médiát és új humorforrásokat.
- **Tartalmi Frissítések**: Az adminisztrátoroknak naponta új vicceket és mémeket kell feltölteniük, és kezelniük kell a felhasználói visszajelzéseket.

## 4. Közösségi Biztonság és Moderáció

A portál közösségi élményének biztosítása érdekében a következő funkcionális követelmények szükségesek:

- **Biztonságos Közeg**: A rendszernek biztosítania kell az érzékeny tartalmak megfelelő kezelését és a nem megfelelő anyagok kiszűrését.
- **Aktív Moderálás**: A felhasználóknak olyan platformot kell biztosítani, ahol szabadon és biztonságosan kommunikálhatnak.

## 5. Bevétel és Fenntarthatóság

A hosszú távú működés érdekében meg kell találni az egyensúlyt a felhasználói élmény és a bevételtermelés között:

- **Hirdetések Integrációja**: A rendszernek úgy kell elhelyeznie a reklámokat, hogy azok ne zavarják a humoros tartalmak fogyasztását.
- **Következetes Frissítés**: A portálnak rendszeresen frissülnie kell az oldalon, hogy megfeleljen az aktuális humortrendeknek és elvárásoknak.

A fenti funkcionális követelmények figyelembevételével a viccportál képes biztosítani a hosszú távú népszerűséget és relevanciát, mindemellett olyan felhasználói élményt nyújt, amely helyt áll a többi weboldallal szemben is.


#  Rendszer Funkcionális Követelmények:

## 1. Felhasználói Regisztráció és Bejelentkezés


- **Regisztráció e-mail és jelszó megadásával**: A felhasználók új fiókot hozhatnak létre a rendszerben e-mail cím és jelszó megadásával. 
Az e-mail címek egyediek lesznek, így a rendszer nem engedi, hogy ugyanazt az e-mail címet többször használják.

- **Személyes profil létrehozása**: Bejelentkezés után a felhasználók személyes profilt hozhatnak létre, ahol megtekinthetik és kezelhetik a beküldött vicceiket és
 az általuk kapott szavazatokat. A profil egy központi helyet biztosít az aktivitásuk nyomon követésére.

## 2. Viccek Beküldése és Kategorizálása


- **Viccek beküldése szöveges formában**: A felhasználók lehetőséget kapnak saját viccek beküldésére. 
Ezeket szöveges formátumban adhatják meg, amit a rendszer a megfelelő formázással jelenít meg a portálon.

- **Viccek kategóriákba sorolása**: Minden vicc egy vagy több kategóriába sorolható. Kategóriák például: "Szőke nős viccek", "Mórickás viccek", "Felnőtt viccek". 
A kategorizálás lehetővé teszi, hogy a felhasználók könnyebben böngésszenek a számukra érdekes témák között.

- **Moderáció és jóváhagyás**: Mielőtt a beküldött viccek megjelennek a portálon, moderátorok ellenőrzik őket. Az ellenőrzés során figyelembe veszik a viccek tartalmának minőségét és megfelelőségét,
 hogy kiszűrjék a nem megfelelő vagy sértő tartalmakat. Csak a moderátorok által jóváhagyott viccek kerülnek nyilvánosságra.

## 3. Viccek Megtekintése és Keresése


- **Böngészés kategóriák és népszerűség alapján**: A felhasználók különböző kategóriák vagy a viccek népszerűsége szerint böngészhetnek. Ez a funkció lehetővé teszi, hogy könnyen megtalálják a legnépszerűbb vagy számukra érdekes vicceket.

- **Kulcsszavas keresés**: Keresőfunkció is elérhető, amely kulcsszavak alapján listázza ki a releváns vicceket. Ezzel a felhasználók egyszerűen megtalálhatják azokat a vicceket, amelyek megfelelnek konkrét érdeklődési körüknek vagy hangulatuknak.

- **Szűrők és rendezési opciók**: A felhasználók különböző szűrő opciókat használhatnak, például kategóriák és időszakok alapján (pl. "legfrissebb" vagy "legnépszerűbb"), hogy még pontosabban találják meg a keresett vicceket.

- **Véletlenszerű vicc funkció**: A rendszer képes egy véletlenszerű viccet megjeleníteni a felhasználónak, ami azok számára hasznos, akiknek nincs konkrét keresési szándéka, de szeretnének új viccekkel találkozni.


## 4. Viccek Értékelése


- **Szavazási lehetőség**: A felhasználók szavazhatnak a viccekre, például "Tetszik" vagy "Nem tetszik" opciókkal. Ez a funkció visszajelzést nyújt a beküldők számára, és segíti a rendszer népszerű viccek rangsorolásában.

- **Viccek rangsorolása és kiemelése**: A rendszer az értékelések alapján rangsorolja a vicceket. A legnépszerűbb vicceket kiemelheti a főoldalon, ezzel ösztönözve a felhasználókat, hogy szavazataikkal támogassák a legjobb tartalmakat.