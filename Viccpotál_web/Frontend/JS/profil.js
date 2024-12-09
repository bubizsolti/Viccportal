const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Adatok betöltése a Supabase-ból
async function loadUserData() {
    // UI állapot frissítése (opcionális)
    document.getElementById('status-message').textContent = 'Betöltés folyamatban...';

    // Felhasználónév lekérése a localStorage-ból (vagy autentikáció alapján)
    const felhasználónev = sessionStorage.getItem('username');

    if (!felhasználónev) {
        alert('Nem található felhasználó. Kérlek, jelentkezz be újra!');
        window.location.href = '../Html/Home.html'; // Átirányítás a bejelentkezési oldalra
        return;
    }

    try {
        // Adatok lekérése a Supabase `users` táblából
        const { data, error } = await supabaseClient
            .from('users')
            .select('felhasználónev, email, jelszó')
            .eq('felhasználónev', felhasználónev)
            .single();

        if (error || !data) {
            throw new Error('Nem sikerült betölteni az adatokat.');
        }

        // Megjelenítés az oldalon
        document.getElementById('felhasználónev').textContent = data.felhasználónev;
        document.getElementById('email').textContent = data.email;
        document.getElementById('jelszó').textContent = data.jelszó;

        // Töltési állapot törlése
        document.getElementById('status-message').textContent = '';
    } catch (err) {
        alert(err.message);
        window.location.href = '../Html/Home.html'; // Átirányítás a bejelentkezési oldalra
    }
}

// Kijelentkezési funkció
document.getElementById('logout-button').addEventListener('click', () => {
    sessionStorage.removeItem('username'); // Felhasználónév eltávolítása
    alert('Kijelentkeztél.');
    window.location.href = '../Html/Home.html'; // Átirányítás a bejelentkezési oldalra
});

// Adatok betöltése az oldal betöltésekor
loadUserData();
