const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function loadUserData() {
    const username = sessionStorage.getItem('username');

    if (!username) {
        alert('Nem található felhasználó. Kérlek, jelentkezz be újra!');
        window.location.href = '../Html/Home.html';
        return;
    }

    try {
        // Supabase lekérdezés a felhasználói adatokhoz
        const { data, error } = await supabaseClient
            .from('users')
            .select('felhasználónev, email')
            .eq('felhasználónev', username)
            .single();

        if (error || !data) {
            throw new Error(error ? error.message : 'Nem sikerült lekérni az adatokat.');
        }

        // Profil adatok frissítése
        document.getElementById('username').textContent = data.felhasználónev;
        document.getElementById('email').textContent = data.email;
        //ne legyen rögtön látható document.getElementById('password').textContent = data.jelszó;

    } catch (err) {
        console.error('Hiba történt az adatok betöltésekor:', err);
        alert('Nem sikerült betölteni az adatokat. Próbáld újra!');
        window.location.href = '../Html/Home.html';
    }
}

// Kijelentkezés funkció
document.getElementById('logout-button').addEventListener('click', () => {
    sessionStorage.removeItem('username'); // Felhasználónév eltávolítása
    alert('Sikeresen kijelentkeztél.');
    window.location.href = '../Html/Home.html';
});

// Adatok betöltése az oldal betöltésekor
loadUserData();
