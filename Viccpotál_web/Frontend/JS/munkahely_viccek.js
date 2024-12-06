// Egyszer deklaráljuk és inicializáljuk a supabase klienst
const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzA3Nzk5NSwiZXhwIjoyMDQ4NjUzOTk1fQ.wXA5w3xq6MuwozzdZ8U-WnxY7W-vh5tFu9LlwLiTAhI";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Track the page number for pagination
let currentPage = 1;
const jokesPerPage = 10;

// Function to fetch random jokes with pagination
async function fetchRandomJokes(page = 1) {
    try {
        // Lekérjük az "Munkahelyi viccek" kategóriájú vicceket a `Viccportál` táblából
        const { data: jokesData, error } = await supabaseClient
            .from("Viccportál")
            .select("id, nev, vicc, ertekeles, ertekelesek_szama")
            .eq("kategoriak", "Munkahely viccek") // Csak az "Munkahelyi viccek" kategóriát kérjük
            .range((page - 1) * jokesPerPage, page * jokesPerPage - 1); // Lapozás

        if (error) {
            console.error("Hiba az 'Munkahelyi viccek' lekérésekor:", error.message);
            return [];
        }

        return jokesData;
    } catch (error) {
        console.error("Hiba az 'Munkahelyi viccek' lekérésekor:", error);
        return [];
    }
}

// Function to display random jokes
async function displayRandomJokes() {
    const randomJokes = await fetchRandomJokes(currentPage);

    const jokesContainer = document.getElementById('popular-jokes');
    if (jokesContainer) {
        jokesContainer.innerHTML = '';  // Töröljük a korábbi vicceket

        randomJokes.forEach(joke => {
            const jokeElement = createJokeElement(joke);  // Create the joke element
            jokesContainer.appendChild(jokeElement);
        });

        // Show or hide pagination buttons
        togglePaginationButtons(randomJokes.length);
    }
}

// Function to toggle pagination buttons visibility
function togglePaginationButtons(currentJokesCount) {
    const nextButton = document.getElementById('next-jokes-button');
    const previousButton = document.getElementById('previous-jokes-button');

    // If there are less than `jokesPerPage` jokes, hide the next button
    if (currentJokesCount < jokesPerPage) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'inline-block';
    }

    // If we are on the first page, hide the previous button
    if (currentPage === 1) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }
}

// Function to handle the "Next" button click
document.getElementById('next-jokes-button')?.addEventListener('click', async () => {
    currentPage++;
    await displayRandomJokes();
});

// Function to handle the "Previous" button click
document.getElementById('previous-jokes-button')?.addEventListener('click', async () => {
    if (currentPage > 1) {
        currentPage--;
        await displayRandomJokes();
    }
});

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

// Function to handle rating clicks and update the database
async function handleRatingClick(jokeId, ratingValue) {
    try {
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
    } catch (error) {
        console.error('Error handling rating:', error);
    }
}

// Function to fetch the daily joke
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
// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchDailyJoke();  // A nap vicce
    displayRandomJokes();  // Véletlenszerű viccek
    displayTopRatedJokes();  // Legjobb 10 vicc
});
