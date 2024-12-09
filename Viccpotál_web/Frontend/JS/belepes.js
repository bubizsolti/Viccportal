// Supabase kliens inicializálása
const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Belépési esemény kezelése
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Megakadályozza az alapértelmezett form-küldést

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Itt történik az ellenőrzés a Supabase-ben
    const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('felhasználónev', username)
        .eq('jelszó', password)
        .single();

    if (error) {
        alert('Hiba a belépés során: ' + error.message);
    } else {
        alert('Sikeres belépés!');

        // Felhasználó nevét elmentjük a sessionbe
        sessionStorage.setItem('username', data.felhasználónev);

        // Átirányítás a főoldalra
        window.location.href = '../Html/Összes_vicc.html';
    }
});
