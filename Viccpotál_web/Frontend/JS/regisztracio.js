// Supabase kliens inicializálása
const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Regisztrációs esemény kezelése
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Megakadályozza a form alapértelmezett küldését

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Felhasználói adatokat mentés a Supabase adatbázisba
    const { data, error } = await supabaseClient
        .from('users') // Tábla neve
        .insert([
            {
                felhasználónev: username,
                email: email,
                jelszó: password, // Jelszó titkosítás nélkül
            }
        ]);

    if (error) {
        alert('Hiba a felhasználói adatok mentésénél: ' + error.message);
    } else {
        alert('Sikeres regisztráció!');
        window.location.href = 'belepes.html'; // Átirányítás a belépési oldalra
    }
});
