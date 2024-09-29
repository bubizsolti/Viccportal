# 1. Teszt: displayTopJokes funkció megjelenítése
Leírás: Ellenőrzi, hogy a displayTopJokes funkció helyesen rendezi és jeleníti meg a legjobban értékelt vicceket.

Elvárt eredmény: A legjobb 10 vicc címének meg kell jelennie a „top-jokes-list” elemen belül, a helyes sorrendben (legmagasabb értékelés elöl).
Teszt lépések:
Ellenőrizd, hogy a „top-jokes-list” elem üres-e a funkció futtatása előtt.
Futtasd a displayTopJokes funkciót.
Ellenőrizd, hogy a viccek megfelelő sorrendben jelentek meg, és csak 10 vicc látható.


# 2. Teszt: Viccek tárolása és betöltése a localStorage-ból
Leírás: Ellenőrzi, hogy a random vicceket és a nap viccét helyesen tárolja és tölti vissza a localStorage-ból.

Elvárt eredmény: A random viccek és a nap vicce helyesen töltődik vissza, ha az adott napon már tárolva van, illetve új viccek generálódnak, ha nincsenek tárolva.
Teszt lépések:
Ellenőrizd, hogy a localStorage üres.
Futtasd az oldalt, és ellenőrizd, hogy a viccek elmentésre kerülnek a localStorage-ba.
Frissítsd az oldalt, és ellenőrizd, hogy a korábban elmentett viccek visszatöltődnek.


# 3. Teszt: getJokeOfTheDay funkció helyes működése
Leírás: Ellenőrzi, hogy a getJokeOfTheDay funkció új viccet választ, ha nincs elmentve, és visszatölt egy már tárolt viccet.

Elvárt eredmény: Ha a nap vicce még nem volt tárolva, akkor új viccet választ, különben a korábban kiválasztott viccet tölti vissza.
Teszt lépések:
Távolítsd el a localStorage-ból a nap viccét, és futtasd a kódot.
Ellenőrizd, hogy új viccet választ.
Töltsd újra az oldalt, és ellenőrizd, hogy ugyanazt a viccet tölti vissza.


# 4. Teszt: createJokeElement funkció vicc megjelenítése
Leírás: Ellenőrzi, hogy a viccek helyesen jelennek meg a megadott HTML szerkezetben.
Elvárt eredmény: Minden vicc címének és tartalmának meg kell jelennie, az értékelés és a szavazatszám helyesen kell frissüljön.
Teszt lépések:
Hozz létre egy viccet a createJokeElement segítségével.
Ellenőrizd, hogy a cím, vicc szövege, értékelés és szavazatok száma helyesen jelenik meg.

# 5. Teszt: Vicc értékelés frissítése (rating update)
Leírás: Ellenőrzi, hogy a vicc értékelése és szavazatszáma helyesen frissül, ha a felhasználó értékel egy viccet.

Elvárt eredmény: A vicc új értékelése és szavazatszáma helyesen számítódik, és frissíti a megjelenést.
Teszt lépések:
Kattints egy vicc értékelési lehetőségére (1-5).
Ellenőrizd, hogy az új értékelés helyesen számolódik, és a szavazatok száma nő.
Ellenőrizd, hogy a localStorage és a képernyőn megjelenő viccek frissülnek.


 #6. Teszt: getRandomJokes funkció helyes működése
Leírás: Ellenőrzi, hogy a getRandomJokes funkció helyesen választ ki 10 véletlenszerű viccet.

Elvárt eredmény: A getRandomJokes 10 különböző, véletlenszerű viccet választ ki a vicc adatbázisból.
Teszt lépések:
Hívd meg a getRandomJokes funkciót, és ellenőrizd, hogy pontosan 10 viccet választott.
Futtasd újra a funkciót, és ellenőrizd, hogy különböző vicceket választ, ha nincs elmentve random vicc az adott napra.

# 7. Teszt: displaySingleJoke funkció egy vicc megjelenítése
Leírás: Ellenőrzi, hogy a displaySingleJoke funkció egy kiválasztott viccet jelenít meg a "popular-jokes" konténerben.

Elvárt eredmény: A „popular-jokes” konténerben csak az egy vicc jelenik meg, amit kiválasztottunk.
Teszt lépések:
Válassz ki egy viccet a „top-jokes-list” elemből.
Ellenőrizd, hogy a „popular-jokes” konténer tartalma törlődik, és csak az egy vicc jelenik meg.
Ezek a tesztek lefedik a legfontosabb funkciókat és interakciókat a kódban. A tesztelés során érdemes figyelni a konzolra és a böngésző hibakeresőjére, hogy minden funkció megfelelően működik-e.