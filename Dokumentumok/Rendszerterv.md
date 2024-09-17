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
