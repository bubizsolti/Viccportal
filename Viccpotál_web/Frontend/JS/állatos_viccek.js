document.addEventListener("DOMContentLoaded", function () {
    // Viccek lekérése a szerverről
    fetch('http://localhost:3000/api/jokes') // Cseréld ki a helyes API végpontra
        .then(response => {
            if (!response.ok) {
                throw new Error('Nem sikerült lekérni az adatokat a szerverről!');
            }
            return response.json();
        })
        .then(jokes => {
            if (!Array.isArray(jokes)) {
                throw new Error('A szerver válasza nem megfelelő formátumú (nem tömb).');
            }

            const currentJokesStack = jokes.filter(joke => joke.kategoriak === "Állatos viccek");

            if (currentJokesStack.length === 0) {
                console.warn("Nincs 'Állatos viccek' kategóriába tartozó vicc.");
            }

            // TOP viccek megjelenítése
            displayTopJokes(currentJokesStack);

            // Véletlenszerű viccek megjelenítése
            displayRandomJokes(currentJokesStack);
        })
        .catch(error => {
            console.error('Hiba történt:', error.message);
        });

    function displayTopJokes(jokes) {
        const topJokesList = document.getElementById("top-jokes-list");
        if (!topJokesList) {
            console.error("Nem található 'top-jokes-list' elem az oldalon.");
            return;
        }

        topJokesList.innerHTML = ""; // Tisztítás
        const topJokes = jokes.slice()
            .sort((a, b) => parseFloat(b.ertekeles || 0) - parseFloat(a.ertekeles || 0))
            .slice(0, 10);

        topJokes.forEach((joke, index) => {
            const jokeItem = document.createElement("li");
            jokeItem.innerHTML = `<a href="#" data-title="${joke.nev}" class="top-joke-link">${index + 1}. ${joke.nev}</a>`;
            topJokesList.appendChild(jokeItem);
        });

        document.querySelectorAll(".top-joke-link").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const title = this.getAttribute("data-title");
                const selectedJoke = jokes.find(j => j.nev === title);
                if (selectedJoke) {
                    displaySingleJoke(selectedJoke);
                }
            });
        });
    }

    function displaySingleJoke(joke) {
        const jokeContainer = document.getElementById("all-jokes");
        if (!jokeContainer) {
            console.error("Nem található 'all-jokes' elem az oldalon.");
            return;
        }

        jokeContainer.innerHTML = ""; // Tisztítás

        const jokeElement = document.createElement("div");
        jokeElement.classList.add("joke", "joke-box");
        jokeElement.innerHTML = `
            <h3>${joke.nev}</h3>
            <p>${joke.vicc.replace("\n", "<br>")}</p>
            <p><strong>Értékelés:</strong> ${parseFloat(joke.ertekeles || 0).toFixed(1)}</p>
        `;

        jokeContainer.appendChild(jokeElement);
    }

    function displayRandomJokes(jokes) {
        const jokeContainer = document.getElementById("all-jokes");
        if (!jokeContainer) {
            console.error("Nem található 'all-jokes' elem az oldalon.");
            return;
        }

        jokeContainer.innerHTML = ""; // Tisztítás
        const randomJokes = getRandomJokes(jokes, 5);

        randomJokes.forEach(joke => {
            const jokeElement = document.createElement("div");
            jokeElement.classList.add("joke", "joke-box");
            jokeElement.innerHTML = `
                <h3>${joke.nev}</h3>
                <p>${joke.vicc.replace("\n", "<br>")}</p>
                <p><strong>Értékelés:</strong> ${parseFloat(joke.ertekeles || 0).toFixed(1)}</p>
            `;
            jokeContainer.appendChild(jokeElement);
        });
    }

    function getRandomJokes(jokesArray, num) {
        return jokesArray
            .sort(() => 0.5 - Math.random())
            .slice(0, num);
    }
});
