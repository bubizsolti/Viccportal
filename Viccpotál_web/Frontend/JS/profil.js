const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


// Adatok betöltése a Supabase-ból
async function loadUserData() {
    // Felhasználónév lekérése a localStorage-ból (vagy autentikáció alapján)
    const felhasználónev = localStorage.getItem('felhasználónev');

    if (!felhasználónev) {
        alert('Nem található felhasználó. Kérlek, jelentkezz be újra!');
        window.location.href = '../Html/Home.html'; // Átirányítás a bejelentkezési oldalra
        return;
    }

    // Adatok lekérése a Supabase `useres` táblából
    const { data, error } = await supabaseClient
        .from('users')
        .select('felhasználónev, email, jelszó')
        .eq('felhasználónev', felhasználónev)
        .single();

    if (error || !data) {
        alert('Nem sikerült betölteni az adatokat. Kérlek, próbáld újra!');
        return;
    }

    // Megjelenítés az oldalon
    document.getElementById('felhasználónev').textContent = data['felhasználónev'];
    document.getElementById('email').textContent = data.email;
    document.getElementById('password').textContent = data.jelszó;
}

// Kijelentkezési funkció
document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('felhasználónev'); // Felhasználónév eltávolítása
    alert('Kijelentkeztél.');
    window.location.href = '../Html/Összes_vicc.html'; // Átirányítás a bejelentkezési oldalra
});

// Adatok betöltése az oldal betöltésekor
loadUserData();
