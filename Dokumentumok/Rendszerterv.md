# Rendszerspecifikáció

## Felhasználói Regisztráció és Hitelesítés

**Funkciók:**

- **Regisztrációs Módszerek:** A felhasználók regisztrálhatnak e-mail cím és jelszó megadásával.
- **E-mail Megerősítés:** Regisztráció során kötelező az e-mail cím megerősítése a felhasználói fiók aktiválásához.
- **Jelszó-Visszaállítás:** Jelszó-visszaállító funkció, amely e-mailen keresztül küld egy linket a jelszó módosításához.

**Rendszer Komponens:**

- Hitelesítési modul

## Felhasználói Profil

**Funkciók:**

- **Profil Készítése:** Regisztrált felhasználók személyes profilt hozhatnak létre.
- **Profil Tartalom:** A felhasználói profil tartalmazza a beküldött vicceket és azok értékeléseit.
- **Profil Módosítás:** Felhasználók módosíthatják személyes adataikat, jelszavukat, és kezelhetik saját vicceiket.

**Rendszer Komponens:**

- Profilkezelő modul

## Viccek Beküldése

**Funkciók:**

- **Viccek Beküldése:** Felhasználók szöveges formában küldhetnek be vicceket.
- **Kategorizálás:** Minden vicc előre definiált kategóriák szerint kategorizálható (pl. "Felnőtt viccek", "Szőke nős viccek").
- **Moderálás:** Beküldött vicceket a moderátorok előszűrik, mielőtt azok megjelennek az oldalon.

**Rendszer Komponens:**

- Beküldési és kategorizálási modul

## Viccek Megtekintése és Keresése

**Funkciók:**

- **Böngészés:** Felhasználók böngészhetnek a viccek között kategóriák és népszerűség alapján.
- **Keresés:** Kulcsszavas keresési funkció biztosítja a viccek gyors keresését.
- **Szűrés:** Szűrő funkciók elérhetők időszak szerint (pl. "legfrissebb", "legnépszerűbb").
- **Véletlenszerű Vicc:** Véletlenszerű vicc funkció, amely egy random viccet jelenít meg.

**Rendszer Komponens:**

- Kereső és szűrő modul

## Viccek Értékelése

**Funkciók:**

- **Értékelés:** Felhasználók szavazhatnak viccekre ("Tetszik" vagy "Nem tetszik").
- **Rangsorolás:** Viccek láthatósága és rangsorolása a szavazatok számától függ.
- **Kiemelés:** A legnépszerűbb viccek kiemelten jelennek meg a főoldalon.

**Rendszer Komponens:**

- Értékelési modul

## Moderáció

**Funkciók:**

- **Moderátori Adminisztráció:** Moderátorok adminisztrációs felületen jóváhagyhatják, szerkeszthetik, vagy törölhetik a vicceket.
- **Jelentések Kezelése:** Moderátorok kezelhetik a felhasználói jelentéseket és eltávolíthatják a nem megfelelő tartalmakat.
- **Szűrés és Figyelmeztetés:** Szűrési és figyelmeztetési funkciók a jogsértő tartalmak ellen.

**Rendszer Komponens:**

- Moderátoroknak szánt admin felület






# Viccportál Adatbázis Terv

## Táblák

### 1. `felhasználók`
Tárolja a regisztrált felhasználók adatait, beleértve az adminokat és moderátorokat is.
| Oszlop neve  | Típus  | Leírás  |
|--------------|--------|---------|
| `felhasznalo_id`    | INT    | Egyedi felhasználói azonosító (Elsődleges kulcs) |
| `felhasznalonev`   | VARCHAR| A felhasználók által használt név |
| `email`      | VARCHAR| A felhasználók e-mail címe |
| `jelszo`   | VARCHAR| A felhasználók jelszava elszó (HASH-elve) |
| `csoport`       | ENUM   | Felhasználói szerepkör (admin, moderátor, felhasználó) |
| `mikor_regisztralt` | TIMESTAMP | Regisztráció időpontja |

### 2. `viccek` 
Tárolja a felhasználók által beküldött vicceket.
| Oszlop neve  | Típus  | Leírás  |
|--------------|--------|---------|
| `vicc_id`    | INT    | Egyedi vicc azonosító (Elsődleges kulcs) |
| `felhasznalo_id`    | INT    | A viccet beküldő felhasználó (Külső kulcs a `felhasznalok` táblára) |
| `kategoria_id`| INT    | A vicc kategóriája (Külső kulcs a `kategoriak` táblára) |
| `vicc_szovege`  | TEXT   | Maga a vicc |
| `letrehozva` | TIMESTAMP | Beküldés időpontja |
| `jovahagyott`| BOOLEAN | Jóváhagyás állapota |
| `jovahagyo_id`| INT    | Moderátor, aki jóváhagyta (Külső kulcs a `felhasznalok` táblára) |

### 3. `kategoriak` 
Tárolja a viccek kategóriáit.
| Oszlop neve  | Típus  | Leírás  |
|--------------|--------|---------|
| `kategoria_id`| INT    | Kategória azonosító (Elsődleges kulcs) |
| `kategoria_neve` | VARCHAR | A vicc kategóriájának a neve |

### 4. `ertekelesek` 
A viccekhez adott értékelések (pl. tetszik/nem tetszik).
| Oszlop neve  | Típus  | Leírás  |
|--------------|--------|---------|
| `ertekeles_id`  | INT    | Egyedi értékelés azonosító (Elsődleges kulcs) |
| `vicc_id`    | INT    | Értékelt vicc (Külső kulcs a `viccek` táblára) |
| `felhasznalo_id`    | INT    | Értékelést adó felhasználó (Külső kulcs a `felhasznalok` táblára) |
| `ertekeles` | INT  | Értékelés értéke (1-5) |
| `ertekeles_idopontja` | TIMESTAMP | Az értékelésnek az időpontja |

Itt látható ERD-diagram formában.

![ERD-diagram](Képek/ERD-diagram.jfif)

