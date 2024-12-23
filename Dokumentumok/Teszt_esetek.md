# **1 Teszt:** vicc beküldése megjelenik-e a szerveren
Leírás: Ellenőrzi, hogy a weboldalról beküldött tesztadatok megfelelően eljutnak-e a szerverre, és megjelennek-e a kívánt helyen.

Elvárt eredmény: A tesztadatok megjelennek a szerveren, és a sikeres beküldésről visszaigazolás érkezik a weboldalra.

Teszt lépések:

Nyisd meg a teszt beküldési űrlapot a weboldalon.
Töltsd ki az űrlapot tesztadatokkal (pl. név, e-mail, üzenet).
Kattints a „Küldés” gombra.
Ellenőrizd:
A weboldalon megjelenik-e egy „Beküldés sikeres” üzenet.
A szerver megfelelő helyen tárolja-e a beküldött adatokat (ellenőrizheted az adminisztrációs panelen vagy a szerver adatbázisában).
Hibás vagy hiányos adat esetén hibaüzenetet jelenít-e meg az űrlap.
Megjegyzés: Szimulálj hálózati hibát is, hogy ellenőrizd, a rendszer megfelelően kezeli-e a beküldési kudarcot (pl. „Nem sikerült elküldeni, próbáld újra később” üzenet).



---
# 2. Teszt: Viccek tárolása és betöltése a adatbázis
Leírás: Ellenőrzi, hogy a random vicceket és a nap viccét helyesen tárolja és tölti vissza a adatbázisból.

Elvárt eredmény: A random viccek és a nap vicce helyesen töltődik vissza, ha az adott napon már tárolva van, illetve új viccek generálódnak, ha nincsenek tárolva.
Teszt lépések:
Ellenőrizd, hogy az adatbázis üres.
Futtasd az oldalt, és ellenőrizd, hogy a viccek elmentésre kerülnek a adatbázisba.
Frissítsd az oldalt, és ellenőrizd, hogy a korábban elmentett viccek visszatöltődnek.

---

# 3. Teszt: getJokeOfTheDay funkció helyes működése
Leírás: Ellenőrzi, hogy a getJokeOfTheDay funkció új viccet választ, ha nincs elmentve, és visszatölt egy már tárolt viccet.

Elvárt eredmény: Ha a nap vicce még nem volt tárolva, akkor új viccet választ, különben a korábban kiválasztott viccet tölti vissza.
Teszt lépések:
Távolítsd el a localStorage-ból a nap viccét, és futtasd a kódot.
Ellenőrizd, hogy új viccet választ.
Töltsd újra az oldalt, és ellenőrizd, hogy ugyanazt a viccet tölti vissza.

---
#  4. Teszt: createJokeElement funkció vicc megjelenítése
Leírás: Ellenőrzi, hogy a viccek helyesen jelennek meg a megadott HTML szerkezetben.

Elvárt eredmény: Minden vicc címének és tartalmának meg kell jelennie, az értékelés és a szavazatszám helyesen kell frissüljön.
Teszt lépések:
Hozz létre egy viccet a createJokeElement segítségével.
Ellenőrizd, hogy a cím, vicc szövege, értékelés és szavazatok száma helyesen jelenik meg.

---
# 5. Teszt: Vicc értékelésének funkciója
Leírás: Ellenőrzi, hogy a felhasználók sikeresen tudják-e értékelni a vicceket, és az értékelés megfelelően frissül a szerveren és a weboldalon.

Elvárt eredmény: Az értékelés sikeresen mentésre kerül a szerveren, és az új értékelés megjelenik a weboldalon.

Teszt lépések:

Nyisd meg a vicc értékelési felületét a weboldalon.

Válassz egy viccet, és adj hozzá egy értékelést (pl. 1-től 5-ig terjedő skálán).

Ellenőrizd:

Az értékelés megjelenik-e az adott vicc mellett.
A szerver frissíti-e az értékelést az adatbázisban.
Az átlagos értékelés frissül-e, ha többen is értékelik a viccet.
Próbálj hibás vagy üres értékelést küldeni, és ellenőrizd, hogy hibaüzenet jelenik-e meg (pl. „Érvénytelen értékelés!”).

Ellenőrizd, hogy ugyanaz a felhasználó nem tud-e többször értékelni ugyanazt a viccet (ha ez az elvárás).
#  6. Teszt: Felhasználói adatok mentése  
**Leírás:** Ellenőrzi, hogy a felhasználói űrlapadatok sikeresen elküldhetők és elmenthetők a szerveren.  
**Elvárt eredmény:** Az űrlap beküldése után a szerver visszaigazoló üzenetet küld, és az adatok mentése megtörténik.  
**Teszt lépések:**  
1. Töltsd ki az űrlapot a weboldalon.  
2. Nyomd meg a „Küldés” gombot.  
3. Ellenőrizd a szerver visszajelzését és az adatmentés eredményét.  

---
# 7. Teszt: A legjobb 10 vicc megjelenítése
Leírás: Ellenőrzi, hogy a weboldalon a legjobban értékelt 10 vicc helyesen jelenik meg, a megfelelő sorrendben és formátumban.

Elvárt eredmény:

A legjobb 10 vicc címe, szövege, értékelése és szavazatszáma helyesen jelenik meg.
A viccek az értékelésük alapján csökkenő sorrendben vannak rendezve.
Pontosan 10 vicc jelenik meg a „top-jokes-list” konténerben.
Teszt lépések:

Töltsd fel a rendszerbe legalább 15 viccet eltérő értékelésekkel és szavazatszámokkal.

Hívd meg a displayTopJokes függvényt.

Ellenőrizd:

Pontosan 10 vicc jelenik meg a „top-jokes-list” elemben.
A viccek sorrendje az értékelés szerint csökkenő (pl. 5.0, 4.9, 4.8 stb.).
Minden vicc címe, szövege, értékelése és szavazatszáma helyesen jelenik meg a megfelelő HTML elemekben.
Ellenőrizd, hogy üres adatbázis esetén a lista helyesen kezeli a hibát, és egy „Nincs elérhető vicc” üzenetet jelenít meg.

Frissíts egy vicc értékelését, és hívd meg újra a displayTopJokes függvényt. Ellenőrizd, hogy a lista frissül-e a helyes sorrendben.


---
# 8. Teszt: Vicc kategóriák kattinthatósága
Elvárt eredmény: Ha rámegyünk az egyik vicc katgóriára, új HTML oldal jelenik meg.

Teszt eredmény: Sikeresen HTML oldalt vált, ha rámegyünk a linkre.


---

#  9. Teszt: Adatvédelem ellenőrzése  
**Leírás:** Ellenőrzi, hogy a weboldal biztonságos protokollt használ az érzékeny adatok küldésekor.  
**Elvárt eredmény:** Az adatok HTTPS-en keresztül titkosítva kerülnek továbbításra.  
**Teszt lépések:**  
1. Küldj érzékeny adatokat (pl. jelszót).  
2. Ellenőrizd a hálózati kérések titkosítását.  

---
# 10. Teszt: Bejelentkezés
Elvárt eredmény: Ha korábban már regisztrált felhasználó akkor bejelentkezhet.
Teszt eredmény: Sikeresen megjelenik a bejelentkezés gomb és kattintásra a bejelentkezési oldalra kerülünk, ahol betudunk jelentkezmi.
---
# 11. Teszt: Regisztráció
Elvárt eredmény: Ha a regisztációs gombra kattintunk akkor megjelenik regisztrációs oldal. Lehet regisztrálni emaillel és jelszóval. Ha regisztráltunk vicceket küldhetünk be, értékelhetünk vicceket.
Teszt eredmény: Sikeresen megjelenik a regisztrációs gomb. Kattintásra a regisztrációs oldalra visz minket, ahol regisztrálhatunk.
 

---
# 12. Teszt: Nap vicce megjelenítése
Leírás: Ellenőrzi, hogy a weboldal helyesen választja ki és jeleníti meg a nap viccét, a megadott kritériumok alapján.

Elvárt eredmény:

Egyetlen vicc jelenik meg a „joke-of-the-day” konténerben.
A vicc címe és szövege helyesen jelenik meg.
Minden nap másik vicc kerül kiválasztásra (pl. időbélyeg alapján vagy véletlenszerűen).
Teszt lépések:

Töltsd fel a rendszerbe legalább 5 viccet eltérő tartalmakkal és értékelésekkel.

Hívd meg a displayJokeOfTheDay függvényt.

Ellenőrizd:

Egyetlen vicc jelenik meg a „joke-of-the-day” konténerben.
A megjelenített vicc címe és szövege helyesen látszik.
A vicc HTML szerkezete megfelel az elvárásoknak (pl. külön cím, tartalom).
Ellenőrizd, hogy a kiválasztás logikája működik:

Ha időalapú (pl. napi frissítés): Ellenőrizd az időbélyeget, hogy másik vicc jelenik-e meg más napokon.
Ha véletlenszerű: Teszteld többszöri újratöltéssel, hogy a vicc váltakozik-e.
Szimulálj üres adatbázist, és ellenőrizd, hogy a rendszer egy „Ma nincs elérhető vicc” üzenetet jelenít-e meg.


---
# #3. Teszt: CSS fájl helyes betöltése és alkalmazása minden oldalon  
**Leírás:** Ellenőrzi, hogy a közös stílusokat tartalmazó CSS fájl helyesen betöltődik és működik minden weboldalon.  

**Elvárt eredmény:**  
- A CSS fájl betöltődik minden oldalon.  
- Az összes stíluselem megfelelően alkalmazásra kerül az adott oldalon.  
- Nincsenek hiányzó stílusok vagy törött elemek.  

**Teszt lépések:**  
1. **HTML ellenőrzés:** Győződj meg róla, hogy minden oldal forráskódjában szerepel a CSS fájl helyes hivatkozása:  
   ```html
   <link rel="stylesheet" href="styles.css">
   ```  

2. **Betöltés ellenőrzése:**  
   - Nyisd meg a weboldalt a böngészőben.  
   - A böngésző fejlesztői eszközeivel ellenőrizd a CSS fájl betöltésének állapotát (pl. nincs 404-es hiba).  

3. **Stílusok ellenőrzése minden oldalon:**  
   - Nyisd meg a weboldal összes oldalát.  
   - Ellenőrizd, hogy a közös elemek (pl. fejléc, lábléc, menük, gombok) megfelelő stílusokat kaptak.  

4. **Responsiveness tesztelése:**  
   - Ellenőrizd, hogy a CSS fájl mobil, tablet és asztali eszközökön is megfelelően működik.  
   - Tesztelj különböző böngészőkben (pl. Chrome, Firefox, Safari).  

5. **Hibák szimulálása:**  
   - Távolítsd el a CSS hivatkozást az egyik oldalról, és ellenőrizd, hogy az oldal felismeri-e a hiányzó fájlt (pl. hibaüzenet a konzolban).  

6. **Verziókezelés tesztelése:**  
   - Ha verziózott CSS fájlt használsz (pl. `styles.css?v=1.0`), ellenőrizd, hogy a frissítések automatikusan alkalmazásra kerülnek a gyorsítótár ellenére is.  

**Megjegyzés:**  
- Győződj meg arról, hogy a CSS fájl relatív vagy abszolút hivatkozása helyesen van beállítva, különösen, ha az oldalak különböző könyvtárstruktúrákban vannak.  
- Ha több CSS fájl van (pl. globális és oldalspecifikus), ellenőrizd, hogy a fájlok sorrendje megfelelő, és nem írják felül egymást váratlanul.
 

---

#  14. Teszt: Valósidejű frissítések  
**Leírás:** Ellenőrzi, hogy a weboldal valósidejű frissítéseket kap-e a szervertől.  
**Elvárt eredmény:** Új adatok automatikusan frissülnek az oldalon.  
**Teszt lépések:**  
1. Indítsd el a valósidejű kapcsolatot.  
2. Ellenőrizd, hogy az új adatok megjelennek-e a frissítés nélkül.  

---

#  15. Teszt: Szerver üzemidejének monitorozása  
**Leírás:** Ellenőrzi, hogy a weboldal naplózza-e a szerver leállásait.  
**Elvárt eredmény:** A szerver leállásairól naplóbejegyzések készülnek.  
**Teszt lépések:**  
1. Szimulálj szerverleállást.  
2. Ellenőrizd a naplózás eredményét.  


#  16 Teszt: Belépési funkció helyes működésének ellenőrzése
**Leírás:** Ellenőrzi, hogy a weboldalon a belépési funkció helyesen működik-e, és a felhasználó helyes adatokkal hozzáfér a fiókjához.

**Elvárt eredmény:** A felhasználó helyes adatokkal sikeresen belép, és a rendszer tárolja a belépési információkat (pl. munkamenet létrejön).

**Teszt lépések:**
1.Nyisd meg a belépési oldalt.

2.Töltsd ki az űrlapot helyes felhasználónévvel és jelszóval.

3.Kattints a "Belépés" gombra.

**Ellenőrizd:**

A felhasználó átirányításra kerül-e a saját fiók felületére.

A rendszer létrehoz-e munkamenetet vagy tokent a belépéshez (ellenőrizd böngészőből vagy szerver naplóiból).
Próbáld meg hibás jelszóval belépni.

**Ellenőrizd:**
A rendszer megjelenít-e figyelmeztető üzenetet (pl. „Helytelen felhasználónév vagy jelszó”).
Próbáld meg nem létező felhasználónévvel belépni.

**Ellenőrizd:**
A rendszer megfelelően kezeli-e ezt az esetet (pl. „A felhasználó nem található” üzenet).
Szimulálj hálózati hibát, és ellenőrizd:
A rendszer megjelenít-e hibaüzenetet („Nem sikerült csatlakozni, próbáld újra”).


# 17 Teszt: Viccbeküldési funkció működésének ellenőrzése
**Leírás:** Ellenőrzi, hogy a felhasználó helyes adatokkal tud-e viccet beküldeni, és a rendszer ellenőrzi-e a felhasználónevét és a kategóriát.

**Elvárt eredmény:** A helyes adatokkal a vicc bekerül az adatbázisba, a hiányos vagy hibás adatokra pedig hibaüzenet jelenik meg.

**Teszt lépések:**
1. be egy regisztrált felhasználóval.
2. Nyisd meg a viccbeküldési oldalt.
3. Töltsd ki az űrlapot helyes adatokkal (felhasználónév, vicc szövege, kategória).
4. Kattints a "Beküldés" gombra.
 
**Ellenőrizd:**
A beküldött vicc megjelenik-e az adatbázisban a megfelelő felhasználónévvel és kategóriával.
A weboldalon megjelenik-e a „Beküldés sikeres” visszajelzés.
Próbálj hiányos adatokkal beküldeni (pl. üres kategória vagy vicc szöveg).

**Ellenőrizd:**
A rendszer hibaüzenetet ad-e („A kategória kitöltése kötelező”).
Próbálj nem létező kategóriát választani. Ellenőrizd:
A rendszer figyelmeztet-e, hogy a kategória érvénytelen.

**Szimulálj hálózati hibát, és ellenőrizd:**
A rendszer megjelenít-e figyelmeztető üzenetet („Nem sikerült beküldeni, próbáld újra”).

# 18 Teszt: Regisztrációs funkció helyes működésének ellenőrzése

**Leírás:** Ellenőrzi, hogy a felhasználó megfelelő adatokkal regisztrálhat-e, és a rendszer biztosítja-e az e-mail és a felhasználónév egyediségét.

**Elvárt eredmény:** A regisztráció sikeres helyes adatokkal, de azonos e-mail vagy felhasználónév esetén hibaüzenet jelenik meg.

**Teszt lépések:**
1. Nyisd meg a regisztrációs oldalt.
2. Töltsd ki az űrlapot helyes adatokkal (név, e-mail, felhasználónév, jelszó).
3. Kattints a "Regisztráció" gombra.

**Ellenőrizd:**
A felhasználó adatai bekerülnek-e az adatbázisba.
A weboldalon megjelenik-e a „Regisztráció sikeres” üzenet.
Próbáld meg ugyanazzal az e-mail címmel regisztrálni magad. 
**Ellenőrizd:**
A rendszer hibaüzenetet ad-e („Ezzel az e-mail címmel már regisztráltak”).
Próbáld meg ugyanazzal a felhasználónévvel regisztrálni magad. 
**Ellenőrizd:**
A rendszer figyelmeztet-e, hogy a felhasználónév már foglalt.
Szimulálj hálózati hibát, és ellenőrizd:
Megjelenik-e a „Nem sikerült regisztrálni, próbáld újra” üzenet.

# 19 Teszt: Regisztrációs email

**Elvárt eredmény:** Csak email formátummal engedi megadni az emailt, egyéb esetben hibát jelez.

**Kapott eredmény:** Csak helyes email formátummal enged regisztrálni. Egyéb esetben arra kér,hogy email formátumot adjak meg és hibát jelez.

# 20 Teszt: Viccek értékelése bejelentkezés alapján

**Elvárt erdmény:** Csak bejelentkezett felhasználók számára enged vicceket értékelni. Egyéb esetben hibát jelez.

**Kapott eredmény:** Ha nincs bejelentkezve a felhasználó nem enged értékelni és megkér,hogy jelentkezz be a funkció eléréséhez.

# 21 Teszt: Profil név megjelenítése

**Elvárt eredmény:** Ha be van jelentkezve a felhasználó a profil icon alatt megjelenik a a felhasználóneve. Egyéb esetben nincs oda írva semmi.

**Kapott eredmény:** Ha bejelentkezünk sikeresen megjelenik a felhasználónevünk.

# 22 Teszt: Oldalváltó gombok működése

**Elvárt eredmény:** A főoldalon használva a gombot az "Összes viccek" oldalra navigál. Más oldalon betölti a következő 10 viccet és megjelenik az "Előző 10 vicc" gomb ami vissza hozza az előző 10 viccet.

**Kapott eerdmény:** A főoldalról sikeres átnavigál az "Összes viccek" oldalra. Egyéb esetben betölti a következő 10 viccet, valamint az "Előző 10 vicc gombot'. Az "Előző 10 vicc" gomb sikeresen vissza hozza a az előző 10 viccet.

# 23 Teszt: Breadcrumb működése

**Elvárt eredmény:** Az oldalon nyomon tudod követni,hogy melyik Kategória oldalán vagy és hogy hogyan tudtál oda menni. Ha rákattintasz a "Főoldal>>--->>>" breadcrumbra vissza visz a főoldalra.

**Kapott eredmény:** Sikeresen megjelenik a Breadcrumb és jelzi,hogy melyik oldalon vagy. Sikeresen vissza visz a főoldalra, ha rá mész.

# 24 Teszt: Kinézet

**Elvárt eredmény:** Az oldal méretének állításakor megőrzi a stílust és nem csúszik szét, valamint minden Böngészőben (Firefox,Chrome...) ugyan úgy működik.

**Kapott eredmény:** Az oldal stílusa nem esik szét, ha változtatjuk a méretét. Minden böngészőben azonos a sílus és a funkciók.