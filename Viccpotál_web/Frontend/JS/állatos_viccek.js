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
                const topJokes = currentJokesStack.slice().sort((a, b) => parseFloat(b.ertekeles) - parseFloat(a.ertekeles)).slice(0, 10);
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
                jokeContainer.innerHTML = "";

                const jokeElement = document.createElement("div");
                jokeElement.classList.add("joke", "joke-box");

                const ertekeles = parseFloat(joke.ertekeles) || 0; // Alapértelmezés 0, ha nincs érték
                const ertekelesekSzama = parseInt(joke.ertekelesek_szama) || 0;

                jokeElement.setAttribute("data-rating", ertekeles);
                jokeElement.setAttribute("data-vote-count", ertekelesekSzama);
                jokeElement.innerHTML = `
                    <h3>${joke.nev}</h3>
                    <p>${joke.vicc.replace("\n", "<br>")}</p>
                    <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${ertekeles.toFixed(1)}</span></p>
                    <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${ertekelesekSzama}</span></p>
                `;

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

                    rateElement.addEventListener("click", function() {
                        const rating = parseInt(this.getAttribute("data-value"));
                        const currentRating = parseFloat(jokeElement.getAttribute("data-rating"));
                        const currentVoteCount = parseInt(jokeElement.getAttribute("data-vote-count"));

                        const newVoteCount = currentVoteCount + 1;
                        const newRating = ((currentRating * currentVoteCount) + rating) / newVoteCount;

                        jokeElement.setAttribute("data-rating", newRating);
                        jokeElement.setAttribute("data-vote-count", newVoteCount);
                        jokeElement.querySelector(".average-rating").innerText = newRating.toFixed(1);
                        jokeElement.querySelector(".vote-count").innerText = newVoteCount;

                        const jokeIndex = currentJokesStack.findIndex(j => j.nev === joke.nev);
                        if (jokeIndex !== -1) {
                            currentJokesStack[jokeIndex].ertekeles = newRating;
                            currentJokesStack[jokeIndex].ertekelesek_szama = newVoteCount;
                        }

                        displayTopJokes();
                    });
                }

                jokeElement.appendChild(ratingContainer);
                jokeContainer.appendChild(jokeElement);
            }

            function displayRandomJokes() {
                const jokeContainer = document.getElementById("all-jokes");
                jokeContainer.innerHTML = "";

                const randomJokes = getRandomJokes(currentJokesStack, 10);

                randomJokes.forEach(joke => {
                    const jokeElement = document.createElement("div");
                    jokeElement.classList.add("joke", "joke-box");

                    const ertekeles = parseFloat(joke.ertekeles) || 0; // Alapértelmezés 0, ha nincs érték
                    const ertekelesekSzama = parseInt(joke.ertekelesek_szama) || 0;

                    jokeElement.setAttribute("data-rating", ertekeles);
                    jokeElement.setAttribute("data-vote-count", ertekelesekSzama);
                    jokeElement.innerHTML = `
                        <h3>${joke.nev}</h3>
                        <p>${joke.vicc.replace("\n", "<br>")}</p>
                        <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${ertekeles.toFixed(1)}</span></p>
                        <div class="rating" style="text-align: center; margin-top: 10px;">
                            <span class="rate" data-value="1">1</span>
                            <span class="rate" data-value="2">2</span>
                            <span class="rate" data-value="3">3</span>
                            <span class="rate" data-value="4">4</span>
                            <span class="rate" data-value="5">5</span>
                        </div>
                        <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${ertekelesekSzama}</span></p>
                    `;

                    jokeElement.querySelectorAll(".rate").forEach(rateElement => {
                        rateElement.addEventListener("click", function() {
                            const rating = parseInt(this.getAttribute("data-value"));
                            const currentRating = parseFloat(jokeElement.getAttribute("data-rating"));
                            const currentVoteCount = parseInt(jokeElement.getAttribute("data-vote-count"));

                            const newVoteCount = currentVoteCount + 1;
                            const newRating = ((currentRating * currentVoteCount) + rating) / newVoteCount;

                            jokeElement.setAttribute("data-rating", newRating);
                            jokeElement.setAttribute("data-vote-count", newVoteCount);
                            jokeElement.querySelector(".average-rating").innerText = newRating.toFixed(1);
                            jokeElement.querySelector(".vote-count").innerText = newVoteCount;

                            const jokeIndex = currentJokesStack.findIndex(j => j.nev === joke.nev);
                            if (jokeIndex !== -1) {
                                currentJokesStack[jokeIndex].ertekeles = newRating;
                                currentJokesStack[jokeIndex].ertekelesek_szama = newVoteCount;
                            }

                            displayTopJokes();
                        });
                    });

                    jokeContainer.appendChild(jokeElement);
                });
            }

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
            displayRandomJokes();
        });
});
