# **#1 Teszt:** vicc beküldése megjelenik-e a szerveren
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
# # 4. Teszt: createJokeElement funkció vicc megjelenítése
Leírás: Ellenőrzi, hogy a viccek helyesen jelennek meg a megadott HTML szerkezetben.

Elvárt eredmény: Minden vicc címének és tartalmának meg kell jelennie, az értékelés és a szavazatszám helyesen kell frissüljön.
Teszt lépések:
Hozz létre egy viccet a createJokeElement segítségével.
Ellenőrizd, hogy a cím, vicc szövege, értékelés és szavazatok száma helyesen jelenik meg.

---
# #5. Teszt: Vicc értékelésének funkciója
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
#  #6. Teszt: Felhasználói adatok mentése  
**Leírás:** Ellenőrzi, hogy a felhasználói űrlapadatok sikeresen elküldhetők és elmenthetők a szerveren.  
**Elvárt eredmény:** Az űrlap beküldése után a szerver visszaigazoló üzenetet küld, és az adatok mentése megtörténik.  
**Teszt lépések:**  
1. Töltsd ki az űrlapot a weboldalon.  
2. Nyomd meg a „Küldés” gombot.  
3. Ellenőrizd a szerver visszajelzését és az adatmentés eredményét.  

---
# #7. Teszt: A legjobb 10 vicc megjelenítése
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

#  #9. Teszt: Adatvédelem ellenőrzése  
**Leírás:** Ellenőrzi, hogy a weboldal biztonságos protokollt használ az érzékeny adatok küldésekor.  
**Elvárt eredmény:** Az adatok HTTPS-en keresztül titkosítva kerülnek továbbításra.  
**Teszt lépések:**  
1. Küldj érzékeny adatokat (pl. jelszót).  
2. Ellenőrizd a hálózati kérések titkosítását.  

---
# 10. Teszt: Bejelentkezés
Elvárt eredmény: Ha korábban már regisztrált felhasználó belép, akkor értékelheti a vicceket és küldhet is be vicceket
Teszt eredmény: Sikeresen megjelenik a bejelentkezés gomb és kattintásra a bejelentkezési oldalra kerülünk, de nem lehet bejelentkezni.
---
# 11. Teszt: Regisztráció
Elvárt eredmény: Ha a regisztációs gombra kattintunk akkor megjelenik regisztrációs oldal. Lehet regisztrálni emaillel és jelszóval. Ha regisztráltunk vicceket küldhetünk be, értékelhetünk vicceket.
Teszt eredmény: Sikeresen megjelenik a regisztrációs gomb. Kattintásra a regisztrációs oldalra visz minket. A regisztráció nem működik.
 

---
# #12. Teszt: Nap vicce megjelenítése
Leírás: Ellenőrzi, hogy a weboldal helyesen választja ki és jeleníti meg a nap viccét, a megadott kritériumok alapján.

Elvárt eredmény:

Egyetlen vicc jelenik meg a „joke-of-the-day” konténerben.
A vicc címe, szövege, értékelése és szavazatszáma helyesen jelenik meg.
Minden nap másik vicc kerül kiválasztásra (pl. időbélyeg alapján vagy véletlenszerűen).
Teszt lépések:

Töltsd fel a rendszerbe legalább 5 viccet eltérő tartalmakkal és értékelésekkel.

Hívd meg a displayJokeOfTheDay függvényt.

Ellenőrizd:

Egyetlen vicc jelenik meg a „joke-of-the-day” konténerben.
A megjelenített vicc címe, szövege, értékelése és szavazatszáma helyesen látszik.
A vicc HTML szerkezete megfelel az elvárásoknak (pl. külön cím, tartalom, értékelés és szavazatszám).
Ellenőrizd, hogy a kiválasztás logikája működik:

Ha időalapú (pl. napi frissítés): Ellenőrizd az időbélyeget, hogy másik vicc jelenik-e meg más napokon.
Ha véletlenszerű: Teszteld többszöri újratöltéssel, hogy a vicc váltakozik-e.
Szimulálj üres adatbázist, és ellenőrizd, hogy a rendszer egy „Ma nincs elérhető vicc” üzenetet jelenít-e meg.


---
# #13. Teszt: CSS fájl helyes betöltése és alkalmazása minden oldalon  
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

#  #14. Teszt: Valósidejű frissítések  
**Leírás:** Ellenőrzi, hogy a weboldal valósidejű frissítéseket kap-e a szervertől.  
**Elvárt eredmény:** Új adatok automatikusan frissülnek az oldalon.  
**Teszt lépések:**  
1. Indítsd el a valósidejű kapcsolatot.  
2. Ellenőrizd, hogy az új adatok megjelennek-e a frissítés nélkül.  

---

#  #15. Teszt: Szerver üzemidejének monitorozása  
**Leírás:** Ellenőrzi, hogy a weboldal naplózza-e a szerver leállásait.  
**Elvárt eredmény:** A szerver leállásairól naplóbejegyzések készülnek.  
**Teszt lépések:**  
1. Szimulálj szerverleállást.  
2. Ellenőrizd a naplózás eredményét.  
