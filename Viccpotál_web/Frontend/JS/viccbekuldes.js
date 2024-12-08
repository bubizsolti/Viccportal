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

    // Vicc beküldése a Supabase táblába
    const { error } = await supabaseClient
        .from('Beküldött viccek') // Az adatbázis tábla neve
        .insert([{ felhasznalonev: username, vicc: joke, vickategoria: category }]);

    if (error) {
        alert('Hiba történt a vicc beküldése során: ' + error.message);
    } else {
        alert('Sikeresen beküldtél egy viccet!');
        document.getElementById('joke-form').reset(); // Űrlap alaphelyzetbe állítása
    }
});
