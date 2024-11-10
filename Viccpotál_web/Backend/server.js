const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  // Importáld a CORS csomagot
const app = express();
const port = 3000;

// Engedélyezzük a CORS-t minden domaintől
app.use(cors());

// MySQL kapcsolat
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'newpassword',
    database: 'viccek',
    port: 5501
});

// Kapcsolódás az adatbázishoz
db.connect((err) => {
    if (err) {
        console.error('Hiba a MySQL-hez való csatlakozás során:', err);
        return;
    }
    console.log('Sikeresen csatlakoztunk a MySQL adatbázishoz.');
});

// API végpont a viccek lekérésére
app.get('/api/jokes', (req, res) => {
    db.query('SELECT * FROM viccek', (err, results) => {
        if (err) {
            console.error('Hiba a viccek lekérésekor:', err);
            return res.status(500).send('Hiba történt');
        }
        res.json(results);
    });
});

// Szerver indítása
app.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port}`);
});
