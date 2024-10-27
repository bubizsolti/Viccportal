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
