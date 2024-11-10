document.addEventListener("DOMContentLoaded", function() {
    // Szerverről kérjük le a vicceket
    fetch('http://localhost:3000/api/jokes') // Cseréld le a megfelelő API végpontra
        .then(response => response.json())
        .then(jokes => {
            console.log(jokes);
            let currentJokesStack = jokes.filter(joke => joke.kategoriak === "Állatos viccek"); // Csak az Állatos viccek
            let displayedJokes = new Set(); // Megjelenített viccek nyilvántartása
            const today = new Date().toDateString(); // Mai dátum

            currentJokesStack.forEach(joke => displayedJokes.add(joke.nev)); // Megjelenített viccek inicializálása

            function displayTopJokes() {
                const topJokesList = document.getElementById("top-jokes-list");
                topJokesList.innerHTML = "";
                // Szűrés és rendezés az összes vicc alapján
                const topJokes = currentJokesStack.slice().sort((a, b) => b.ertekeles - a.ertekeles).slice(0, 10);
                topJokes.forEach((joke, index) => {
                    const jokeElement = document.createElement("li");
                    jokeElement.innerHTML = `<a href="#" data-title="${joke.nev}" class="top-joke-link">${index + 1}. ${joke.nev}</a>`;
                    topJokesList.appendChild(jokeElement);
                });

                // Kattintás esemény hozzáadása a top viccek linkjeihez
                document.querySelectorAll(".top-joke-link").forEach(link => {
                    link.addEventListener("click", function(event) {
                        event.preventDefault();
                        const title = this.getAttribute("data-title");
                        const selectedJoke = currentJokesStack.find(j => j.nev === title);
                        if (selectedJoke) {
                            displaySingleJoke(selectedJoke);
                        }
                    });
                });
            }

            function displaySingleJoke(joke) {
                const jokeContainer = document.getElementById("all-jokes");
                jokeContainer.innerHTML = ""; // Korábbi vicc törlése

                const jokeElement = document.createElement("div");
                jokeElement.classList.add("joke", "joke-box");
                jokeElement.setAttribute("data-rating", joke.ertekeles);
                jokeElement.setAttribute("data-vote-count", joke.ertekelesek_szama);
                jokeElement.innerHTML = `
                    <h3>${joke.nev}</h3>
                    <p>${joke.vicc.replace("\n", "<br>")}</p>
                    <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${joke.ertekeles.toFixed(1)}</span></p>
                    <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${joke.ertekelesek_szama}</span></p>
                `;
                
                // Hozzáadjuk az értékelés lehetőségeit
                const ratingContainer = document.createElement("div");
                ratingContainer.classList.add("rating");
                ratingContainer.style.textAlign = "center";
                ratingContainer.style.marginTop = "10px";

                for (let i = 1; i <= 5; i++) {
                    const rateElement = document.createElement("span");
                    rateElement.classList.add("rate");
                    rateElement.setAttribute("data-value", i);
                    rateElement.textContent = i;
                    rateElement.style.cursor = "pointer";
                    ratingContainer.appendChild(rateElement);
                    
                    // Értékelés kezelése
                    rateElement.addEventListener("click", function() {
                        const rating = parseInt(this.getAttribute("data-value"));
                        const currentRating = parseFloat(jokeElement.getAttribute("data-rating"));
                        const currentVoteCount = parseInt(jokeElement.getAttribute("data-vote-count"));

                        const newVoteCount = currentVoteCount + 1;
                        const newRating = ((currentRating * currentVoteCount) + rating) / newVoteCount;

                        // Adatok frissítése az oldalon
                        jokeElement.setAttribute("data-rating", newRating);
                        jokeElement.setAttribute("data-vote-count", newVoteCount);
                        jokeElement.querySelector(".average-rating").innerText = newRating.toFixed(1);
                        jokeElement.querySelector(".vote-count").innerText = newVoteCount;

                        // Adatok frissítése a currentJokesStack-ben
                        const jokeIndex = currentJokesStack.findIndex(j => j.nev === joke.nev);
                        if (jokeIndex !== -1) {
                            currentJokesStack[jokeIndex].ertekeles = newRating;
                            currentJokesStack[jokeIndex].ertekelesek_szama = newVoteCount;
                        }

                        // Top viccek frissítése
                        displayTopJokes(); // Frissítve a top viccek listája
                    });
                }

                jokeElement.appendChild(ratingContainer);
                jokeContainer.appendChild(jokeElement);
            }

            function displayRandomJokes() {
                const jokeContainer = document.getElementById("all-jokes");
                jokeContainer.innerHTML = "";

                // Véletlenszerűen kiválasztott 10 vicc
                const randomJokes = getRandomJokes(currentJokesStack, 10);

                randomJokes.forEach(joke => {
                    const jokeElement = document.createElement("div");
                    jokeElement.classList.add("joke", "joke-box");
                    jokeElement.setAttribute("data-rating", joke.ertekeles);
                    jokeElement.setAttribute("data-vote-count", joke.ertekelesek_szama);
                    jokeElement.innerHTML = `
                        <h3>${joke.nev}</h3>
                        <p>${joke.vicc.replace("\n", "<br>")}</p>
                        <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${joke.ertekeles.toFixed(1)}</span></p>
                        <div class="rating" style="text-align: center; margin-top: 10px;">
                            <span class="rate" data-value="1">1</span>
                            <span class="rate" data-value="2">2</span>
                            <span class="rate" data-value="3">3</span>
                            <span class="rate" data-value="4">4</span>
                            <span class="rate" data-value="5">5</span>
                        </div>
                        <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${joke.ertekelesek_szama}</span></p>
                    `;

                    // Értékelés kezelése
                    jokeElement.querySelectorAll(".rate").forEach(rateElement => {
                        rateElement.addEventListener("click", function() {
                            const rating = parseInt(this.getAttribute("data-value"));
                            const currentRating = parseFloat(jokeElement.getAttribute("data-rating"));
                            const currentVoteCount = parseInt(jokeElement.getAttribute("data-vote-count"));

                            const newVoteCount = currentVoteCount + 1;
                            const newRating = ((currentRating * currentVoteCount) + rating) / newVoteCount;

                            // Adatok frissítése az oldalon
                            jokeElement.setAttribute("data-rating", newRating);
                            jokeElement.setAttribute("data-vote-count", newVoteCount);
                            jokeElement.querySelector(".average-rating").innerText = newRating.toFixed(1);
                            jokeElement.querySelector(".vote-count").innerText = newVoteCount;

                            // Adatok frissítése a currentJokesStack-ben
                            const jokeIndex = currentJokesStack.findIndex(j => j.nev === joke.nev);
                            if (jokeIndex !== -1) {
                                currentJokesStack[jokeIndex].ertekeles = newRating;
                                currentJokesStack[jokeIndex].ertekelesek_szama = newVoteCount;
                            }

                            // Top viccek frissítése
                            displayTopJokes(); // Frissítve a top viccek listája
                        });
                    });

                    jokeContainer.appendChild(jokeElement);
                });
            }

            // Véletlenszerű viccek lekérése
            function getRandomJokes(jokesArray, num) {
                const shuffled = jokesArray.slice();
                let i = jokesArray.length;
                let min = i - num;
                let temp, index;

                while (i > min) {
                    index = Math.floor((i--) * Math.random());
                    temp = shuffled[i];
                    shuffled[i] = shuffled[index];
                    shuffled[index] = temp;
                }

                return shuffled.slice(min);
            }

            displayTopJokes();
            displayRandomJokes(); // Véletlenszerű viccek megjelenítése
        });
});
