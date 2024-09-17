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
| `szerep`       | ENUM   | Felhasználói szerepkör (admin, moderátor, felhasználó) |
| `mikor_regisztralt` | TIMESTAMP | Regisztráció időpontja |

### 2. `viccek` 
Tárolja a felhasználók által beküldött vicceket.
| Oszlop neve  | Típus  | Leírás  |
|--------------|--------|---------|
| `vicc_id`    | INT    | Egyedi vicc azonosító (Elsődleges kulcs) |
| `felhasznalo_id`    | INT    | A viccet beküldő felhasználó (Külső kulcs a `users` táblára) |
| `kategoria_id`| INT    | A vicc kategóriája (Külső kulcs a `kategoriak` táblára) |
| `vicc_szovege`  | TEXT   | Maga a vicc |
| `letrehozva` | TIMESTAMP | Beküldés időpontja |
| `jovahagyo_id`| INT    | Moderátor, aki jóváhagyta (Külső kulcs a `users` táblára) |
| `jovahagyott`| BOOLEAN | Jóváhagyás állapota |

### 3. `kategoriak` 
Tárolja a viccek kategóriáit.
| Oszlop neve  | Típus  | Leírás  |
|--------------|--------|---------|
| `kategoria_id`| INT    | Kategória azonosító (Elsődleges kulcs) |
| `kategoria_neve` | VARCHAR | A vicc kategóriájának a neve |