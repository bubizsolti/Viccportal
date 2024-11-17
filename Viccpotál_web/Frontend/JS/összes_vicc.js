document.addEventListener("DOMContentLoaded", function() {
    // Szerverről kérjük le a vicceket
    fetch('http://localhost:3000/api/jokes') // Cseréld le a megfelelő API végpontra
        .then(response => response.json())
        .then(jokes => {
            console.log(jokes);

            // Minden vicc megjelenítése
            function displayAllJokes() {
                const jokeContainer = document.getElementById("all-jokes");
                jokeContainer.innerHTML = ""; // Töröljük az előző tartalmat

                jokes.forEach(joke => {
                    const jokeElement = document.createElement("div");
                    jokeElement.classList.add("joke", "joke-box");

                    // Biztosítjuk, hogy a "ertekeles" és "ertekelesek_szama" számok
                    const rating = parseFloat(joke.ertekeles) || 0;  // Ha nem szám, akkor alapértelmezetten 0
                    const voteCount = parseInt(joke.ertekelesek_szama) || 0;  // Ha nem szám, akkor alapértelmezetten 0

                    jokeElement.setAttribute("data-rating", rating);
                    jokeElement.setAttribute("data-vote-count", voteCount);

                    jokeElement.innerHTML = `
                        <h3>${joke.nev}</h3>
                        <p>${joke.vicc.replace("\n", "<br>")}</p>
                        <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${rating.toFixed(1)}</span></p>
                        <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${voteCount}</span></p>
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

                            // Adatok frissítése a viccek tömbben
                            const jokeIndex = jokes.findIndex(j => j.nev === joke.nev);
                            if (jokeIndex !== -1) {
                                jokes[jokeIndex].ertekeles = newRating;
                                jokes[jokeIndex].ertekelesek_szama = newVoteCount;
                            }
                        });
                    }

                    jokeElement.appendChild(ratingContainer);
                    jokeContainer.appendChild(jokeElement);
                });
            }

            // Minden vicc megjelenítése
            displayAllJokes();
        })
        .catch(error => console.error("Hiba a viccek betöltésekor:", error));
});
