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
