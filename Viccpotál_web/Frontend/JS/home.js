// Supabase kliens inicializálása
const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
// Function to fetch the current user
// Function to fetch the current user
// Supabase kliens inicializálása


// Funkció a felhasználó profiljának lekérésére
async function fetchUserProfile() {
    const { data: session, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError) {
        console.error("Hiba a session lekérésekor:", sessionError);
        return;
    }

    const profileNameElement = document.getElementById('profile-name');
    
    if (session && session.user) {
        // Ha van aktív session, folytatjuk a felhasználói adatokat
        const { data: userData, error } = await supabaseClient
            .from('users')
            .select('felhasználónev')
            .eq('id', session.user.id)
            .single();

        if (error) {
            console.error("Hiba a felhasználó adatainak lekérésekor:", error);
        } else {
            // Ha sikerült a lekérdezés, jelenítsük meg a felhasználó nevét
            if (profileNameElement) {
                profileNameElement.textContent = userData.felhasználónev;
                profileNameElement.style.display = 'block'; // Mutassuk a nevet
            }
        }
    } else {
        // Ha nincs session, próbálkozzunk a sessionStorage-ból történő név lekérésével
        const username = sessionStorage.getItem('username');
        if (profileNameElement && username) {
            profileNameElement.textContent = username;
            profileNameElement.style.display = 'block'; // Mutassuk a nevet
        } else {
            console.log('Nincs bejelentkezett felhasználó.');
        }
    }
}

// Hívjuk meg a funkciót az oldal betöltődésekor
document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile(); // Hívjuk meg a funkciót a profil név megjelenítésére
});

// Function to check if the user is logged in and show/hide the profile button
async function checkUserLoginStatus() {
    const { data: session, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError) {
        console.error("Hiba a session lekérésekor:", sessionError);
        return;
    }
    const username = sessionStorage.getItem('username');
    const profileLink = document.getElementById('profile-link');
    const profilePicture = document.getElementById('profile-picture');
    const profileNameElement = document.getElementById('profile-name');

    if (username) {
        // Ha van aktív session, jelenítse meg a profil részt
        profileLink.style.display = 'block';
        profilePicture.style.display = 'block';
        profileNameElement.style.display = 'block';
    } else {
        // Ha nincs aktív session, rejtse el a profil részt
        profileLink.style.display = 'none';
        profilePicture.style.display = 'none';
        profileNameElement.style.display = 'none';
    }
}

// Hívjuk meg az oldal betöltődésekor
document.addEventListener('DOMContentLoaded', () => {
    checkUserLoginStatus();
});


// Supabase kliens inicializálása


// Function to display the username if logged in
function displayUsername() {
    const username = sessionStorage.getItem('username');
    const profileNameElement = document.getElementById('profile-name');

    if (username && profileNameElement) {
        profileNameElement.textContent = ` ${username}!`; // Felhasználó név megjelenítése
        profileNameElement.style.display = 'block'; // Megjeleníti a profilt
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayUsername(); // Felhasználó név megjelenítése a bejelentkezés után
});
async function handleRatingClick(jokeId, ratingValue) {
    try {
        // Először ellenőrizzük, hogy be vagyunk-e jelentkezve
        const { data: session } = await supabaseClient.auth.getSession();
        
        // Ha nincs session, próbálkozunk sessionStorage-ból történő lekéréssel
        if (!session || !session.user) {
            const username = sessionStorage.getItem('username');
            if (username) {
                console.log('Felhasználó neve: ', username);
            } else {
                alert("Kérlek, jelentkezz be, hogy értékelhesd a vicceket.");
                return; // Ha nincs bejelentkezve a felhasználó, akkor nem engedjük az értékelést
            }
        }

        // Fetch the current joke data
        const { data: jokeData, error: jokeError } = await supabaseClient
            .from('Viccportál')
            .select('*')
            .eq('id', jokeId)
            .single();

        if (jokeError) throw jokeError;

        // Calculate the new average rating and the new vote count
        const newVoteCount = (jokeData.ertekelesek_szama || 0) + 1;
        const newAverageRating = ((jokeData.ertekeles || 0) * jokeData.ertekelesek_szama + ratingValue) / newVoteCount;

        // Update the joke in the database with the new rating and vote count
        const { error: updateError } = await supabaseClient
            .from('Viccportál')
            .update({
                ertekeles: newAverageRating,
                ertekelesek_szama: newVoteCount
            })
            .eq('id', jokeId);

        if (updateError) throw updateError;

        // After updating the database, update the displayed rating
        const jokeElement = document.querySelector(`.joke[data-id='${jokeId}']`);
        if (jokeElement) {
            // Update the displayed average rating and vote count
            jokeElement.querySelector('.average-rating').textContent = newAverageRating.toFixed(1);
            jokeElement.querySelector('.vote-count').textContent = newVoteCount;
        }

        // After updating the rating, refresh the top rated jokes list
        await displayTopRatedJokes();

    } catch (error) {
        console.error('Error handling rating:', error);
    }
}



// Function to fetch daily joke
async function fetchDailyJoke() {
    try {
        const { data: dailyJokeData, error: dailyJokeError } = await supabaseClient
            .from('daily_joke')
            .select('joke_id')
            .single();

        if (dailyJokeError) throw dailyJokeError;

        const { data: jokeDetails, error: jokeError } = await supabaseClient
            .from('Viccportál')
            .select('*')
            .eq('id', dailyJokeData.joke_id)
            .single();

        if (jokeError) throw jokeError;

        const randomJokeElement = document.getElementById('random-joke');
        if (randomJokeElement) {
            randomJokeElement.textContent = jokeDetails.vicc;
        }
    } catch (error) {
        console.error('Error fetching daily joke:', error);
    }
}

// Function to fetch random jokes
async function fetchRandomJokes() {
    try {
        // Lekérjük a napi random viccek azonosítóit a `daily_random_jokes` táblából
        const { data: dailyJokesData, error: dailyJokesError } = await supabaseClient
            .from('daily_random_jokes')
            .select('joke_ids')
            .eq('date', new Date().toISOString().split('T')[0]) // A mai dátum
            .single();  // Mivel egyetlen rekordra van szükség, használjuk a .single()

        if (dailyJokesError || !dailyJokesData) {
            console.error("Hiba a napi viccek lekérésében:", dailyJokesError);
            return [];
        }

        const jokeIds = dailyJokesData.joke_ids;

        if (!jokeIds || jokeIds.length === 0) {
            console.log("Nincs elérhető napi vicc.");
            return [];
        }

        // Lekérjük a vicceket a `Viccportál` táblából a lekért ID-k alapján
        const { data: jokesData, error: jokesError } = await supabaseClient
            .from('Viccportál')
            .select('id, nev, vicc, ertekeles, ertekelesek_szama')
            .in('id', jokeIds); // Az összes vicc, ami benne van a `joke_ids` tömbben

        if (jokesError) {
            console.error("Hiba a viccek lekérésekor:", jokesError);
            return [];
        }

        return jokesData;
    } catch (error) {
        console.error('Hiba a véletlenszerű viccek lekérésekor:', error);
        return [];
    }
}

// Function to fetch top 10 jokes based on rating
async function fetchTopRatedJokes() {
    const { data, error } = await supabaseClient
        .from("Viccportál")
        .select("id, nev, vicc, ertekeles, ertekelesek_szama")
        .order("ertekeles", { ascending: false })
        .limit(10);

    if (error) {
        console.error("Hiba a top viccek lekérésekor:", error.message);
        return [];
    }

    return data;
}

// Function to handle rating clicks and update the database
// Function to handle rating clicks and update the database





// Function to create the joke element with the rating system
function createJokeElement(joke) {
    const jokeElement = document.createElement("div");
    jokeElement.classList.add("joke");
    jokeElement.setAttribute("data-id", joke.id); // Set the unique ID for this joke
    jokeElement.setAttribute("data-title", joke.nev);
    jokeElement.setAttribute("data-rating", joke.ertekeles || 0);
    jokeElement.setAttribute("data-vote-count", joke.ertekelesek_szama || 0);
    
    jokeElement.innerHTML = `
        <h3>${joke.nev}</h3>
        <p>${joke.vicc.replace("\n", "<br>")}</p>
        <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${(joke.ertekeles || 0).toFixed(1)}</span></p>
        <div class="rating" style="text-align: center; margin-top: 10px;">
            <span class="rate" data-value="1">1</span>
            <span class="rate" data-value="2">2</span>
            <span class="rate" data-value="3">3</span>
            <span class="rate" data-value="4">4</span>
            <span class="rate" data-value="5">5</span>
        </div>
        <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${joke.ertekelesek_szama || 0}</span></p>
    `;

    // Add event listeners to the rating buttons
    const rateButtons = jokeElement.querySelectorAll('.rate');
    rateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const ratingValue = parseInt(button.getAttribute('data-value'));
            handleRatingClick(joke.id, ratingValue);
        });
    });

    return jokeElement;
}

// Function to display random jokes
async function displayRandomJokes() {
    const randomJokes = await fetchRandomJokes();
    
    const jokesContainer = document.getElementById('popular-jokes');
    if (jokesContainer) {
        jokesContainer.innerHTML = '';  // Töröljük a korábbi vicceket

        randomJokes.forEach(joke => {
            const jokeElement = createJokeElement(joke);  // Create the joke element
            jokesContainer.appendChild(jokeElement);
        });
    }
}

// Function to display top 10 rated jokes
async function displayTopRatedJokes() {
    const topJokes = await fetchTopRatedJokes();
    
    const topJokesContainer = document.getElementById('top-jokes-list');
    if (topJokesContainer) {
        topJokesContainer.innerHTML = ''; // Töröljük a korábbi listát

        topJokes.forEach(joke => {
            const jokeElement = document.createElement("li");
            jokeElement.innerHTML = `
                <a href="#" onclick="displaySingleJoke(${joke.id})">${joke.nev}</a> - <strong>Értékelés: </strong>${(joke.ertekeles || 0).toFixed(1)} (Szavazatok száma: ${joke.ertekelesek_szama || 0})
            `;
            topJokesContainer.appendChild(jokeElement);
        });
    }
}

// Function to display a single joke when clicked
// Function to display a single joke when clicked
async function displaySingleJoke(jokeId) {
    try {
        const { data: jokeData, error } = await supabaseClient
            .from('Viccportál')
            .select('*')
            .eq('id', jokeId)
            .single();
        
        if (error) throw error;

        const randomJokeElement = document.getElementById('popular-jokes'); // Ezt módosítjuk
        if (randomJokeElement) {
            // Display the selected joke in place of random jokes with the same style
            randomJokeElement.innerHTML = `
                <div class="joke"> <!-- Hozzáadva a "joke" osztály -->
                    <h3>${jokeData.nev}</h3>
                    <p>${jokeData.vicc.replace("\n", "<br>")}</p>
                    <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${(jokeData.ertekeles || 0).toFixed(1)}</span></p>
                    <div class="rating" style="text-align: center; margin-top: 10px;">
                        <span class="rate" data-value="1">1</span>
                        <span class="rate" data-value="2">2</span>
                        <span class="rate" data-value="3">3</span>
                        <span class="rate" data-value="4">4</span>
                        <span class="rate" data-value="5">5</span>
                    </div>
                    <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${jokeData.ertekelesek_szama || 0}</span></p>
                </div>
            `;

            // Add event listeners to the rating buttons for the single joke
            const rateButtons = randomJokeElement.querySelectorAll('.rate');
            rateButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const ratingValue = parseInt(button.getAttribute('data-value'));
                    
                    // Handle rating click
                    await handleRatingClick(jokeId, ratingValue);

                    // After rating, update the rating display in the UI (for the single joke)
                    const averageRating = randomJokeElement.querySelector('.average-rating');
                    const voteCount = randomJokeElement.querySelector('.vote-count');

                    if (averageRating && voteCount) {
                        const { data: updatedJoke, error } = await supabaseClient
                            .from('Viccportál')
                            .select('ertekeles, ertekelesek_szama')
                            .eq('id', jokeId)
                            .single();
                        
                        if (error) {
                            console.error('Error fetching updated joke:', error);
                            return;
                        }

                        averageRating.textContent = (updatedJoke.ertekeles || 0).toFixed(1);
                        voteCount.textContent = updatedJoke.ertekelesek_szama || 0;
                    }
                });
            });
        }
    } catch (error) {
        console.error('Hiba a vicc megjelenítésekor:', error);
    }
}
document.getElementById('login-button').addEventListener('click', () => {
    window.location.href = '../HTML/belepes.html'; // Ide kell a céloldal nevét megadni
});



// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchDailyJoke(); // A nap vicce
    displayRandomJokes(); // Véletlenszerű viccek
    displayTopRatedJokes(); // Legjobb 10 vicc
});
