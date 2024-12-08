// Supabase kliens inicializálása
const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Viccbeküldési esemény kezelése
document.getElementById('joke-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Alapértelmezett form-küldés megakadályozása

    const username = document.getElementById('username').value;
    const joke = document.getElementById('joke').value;
    const category = document.getElementById('category').value;

    // Ellenőrizzük, hogy a felhasználónév létezik-e a "users" táblában
    const { data: userData, error: userError } = await supabaseClient
        .from('users')
        .select('*')
        .eq('felhasználónev', username)
        .single();

    if (userError || !userData) {
        alert('Hiba: A megadott felhasználónév nem létezik a "users" táblában.');
        return;
    }

    // Vicc beküldése a "Beküldőtt viccek" táblába
    const { error } = await supabaseClient
        .from('Beküldőtt viccek') // Az adatbázis tábla neve
        .insert([{ felhasználónev: username, vicc: joke, vicckategoria: category }]);

    if (error) {
        alert('Hiba történt a vicc beküldése során: ' + error.message);
    } else {
        alert('Sikeresen beküldtél egy viccet!');
        document.getElementById('joke-form').reset(); // Űrlap alaphelyzetbe állítása
    }
});
