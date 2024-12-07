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

    // Email formátum ellenőrzése
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Egyszerű email minta
    if (!emailRegex.test(email)) {
        alert('Kérjük, érvényes email címet adjon meg!');
        return;
    }

    try {
        // Ellenőrizzük, hogy az email vagy a felhasználónév már létezik-e
        const { data: existingUser, error: checkError } = await supabaseClient
            .from('users') // Tábla neve
            .select('felhasználónev, email') // Csak a szükséges mezők
            .or(`email.eq.${email},felhasználónev.eq.${username}`); // Feltétel: email vagy felhasználónév egyezik

        if (checkError) { // Ha hiba történik az ellenőrzés során
            throw checkError;
        }

        if (existingUser && existingUser.length > 0) {
            // Ellenőrizzük, hogy mi létezik az adatbázisban
            const emailExists = existingUser.some(user => user.email === email);
            const usernameExists = existingUser.some(user => user.felhasználónev === username);

            if (emailExists) {
                alert('Ez az email cím már regisztrálva van!');
                return;
            }
            if (usernameExists) {
                alert('Ez a felhasználónév már foglalt!');
                return;
            }
        }

        // Ha nincs ütközés, folytatjuk a regisztrációt
        const { data, error } = await supabaseClient
            .from('users')
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
    } catch (err) {
        console.error('Hiba történt:', err);
        alert('Valami hiba történt, próbálja újra később.');
    }
});
