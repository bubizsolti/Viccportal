### Rendszerspecifikáció - Viccportál

#### 1. **Általános követelmények**

**Funkciók:**

- **Regisztrációs Módszerek:** A felhasználók regisztrálhatnak e-mail cím és jelszó megadásával.
  A regisztráció során az adatok validációja biztosítja, hogy a felhasználó által megadott e-mail cím formátuma helyes legyen, illetve a jelszó megfeleljen a minimális követelményeknek (például legalább 8 karakter, kis- és nagybetűk, számok, speciális karakterek).

- **E-mail Megerősítés:** Regisztráció során kötelező az e-mail cím megerősítése a felhasználói fiók aktiválásához.
  A regisztráció során egy automatikus e-mail kerül kiküldésre, amely egy aktiváló linket tartalmaz a felhasználói fiók véglegesítéséhez.
  Az e-mailben található link meghatározott ideig érvényes (pl. 24 óra), és az aktiválási folyamat során a rendszer értesítést küld, ha a link lejárt.

- **Felhasználói hitelesítés:** A rendszer funkciói nagy részét csak bejelentkezett felhasználók érhetik el, mint például viccek posztolása.
- **Jelszó-Visszaállítás:** Jelszó-visszaállító funkció, amely e-mailen keresztül küld egy linket a jelszó módosításához.
- **Platformok:**
  - Webes felület minden funkcióhoz.
  - **Adattárolás:** A rendszer MySQL adatbázist használ a felhasználói adatok, viccek és tárolására.

