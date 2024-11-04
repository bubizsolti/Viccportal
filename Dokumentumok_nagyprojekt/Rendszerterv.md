### Rendszerspecifikáció - Viccportál

#### 1. **Általános követelmények**

**Funkciók:**

- **Regisztrációs Módszerek:** A felhasználók regisztrálhatnak e-mail cím és jelszó megadásával.
  A regisztráció során az adatok validációja biztosítja, hogy a felhasználó által megadott e-mail cím formátuma helyes legyen, illetve a jelszó megfeleljen a minimális követelményeknek (például legalább 8 karakter, kis- és nagybetűk, számok, speciális karakterek).

- **E-mail Megerősítés:** Regisztráció során kötelező az e-mail cím megerősítése a felhasználói fiók aktiválásához.
  A regisztráció során egy automatikus e-mail kerül kiküldésre, amely egy aktiváló linket tartalmaz a felhasználói fiók véglegesítéséhez.
  Az e-mailben található link meghatározott ideig érvényes (pl. 24 óra), és az aktiválási folyamat során a rendszer értesítést küld, ha a link lejárt.

- **Felhasználói hitelesítés:** A rendszer webes felületén a felhasználók regisztrálhatnak, bejelentkezhetnek, vicceket posztolhatnak, és kommentelhetnek.
- **Jelszó-Visszaállítás:** Jelszó-visszaállító funkció, amely e-mailen keresztül küld egy linket a jelszó módosításához.
Platformok:
Webes Felület: A rendszer webes felületén a felhasználók regisztrálhatnak, bejelentkezhetnek, vicceket posztolhatnak, és kommentelhetnek.
- Webes felület minden funkcióhoz.
  Adminisztrációs Felület: A rendszergazdák számára külön adminisztrációs felület érhető el, amely lehetőséget biztosít a felhasználói fiókok kezelésére, a moderációra, és a tartalmak ellenőrzésére.

- **Adattárolás:**

    MySQL Adatbázis: A rendszer egy MySQL adatbázist használ a felhasználói adatok, viccek és egyéb kapcsolódó információk tárolására.
    Biztonsági Mentés: Rendszeres adatbázis-biztonsági mentések készülnek az adatvesztés elkerülése érdekében.
    Adatvédelem: Az adatbázisban tárolt személyes adatokat titkosítással és anonimizálási technikákkal védik az adatbiztonsági előírásoknak megfelelően.


