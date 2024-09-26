document.addEventListener("DOMContentLoaded", function() {
    fetch('../JSON/jokes.json')
        .then(response => response.json())
        .then(jokes => {
            let currentJokesStack = []; // Jelenleg megjelenített viccek
            let displayedJokes = new Set(); // Megjelenített viccek nyilvántartása
            let currentIndex = 0; // Jelenlegi viccek indexének nyilvántartása
            const jokeHistory = []; // Korábban megjelenített viccek tárolása
            const today = new Date().toDateString(); // Mai dátum

            // Ellenőrzés, hogy naponta frissítjük-e a vicceket
            if (localStorage.getItem("allatos_viccekDisplayDate") !== today) {
                currentJokesStack = jokes.filter(joke => joke.category === "Állatos viccek"); // Csak az Állatos viccek
                localStorage.setItem("allatos_displayedJokes", JSON.stringify(currentJokesStack));
                localStorage.setItem("allatos_viccekDisplayDate", today);
                currentIndex = 0; // Index visszaállítása az új viccekhez
            } else {
                currentJokesStack = JSON.parse(localStorage.getItem("allatos_displayedJokes")); // Meglévő viccek betöltése
            }

            currentJokesStack.forEach(joke => displayedJokes.add(joke.title)); // Megjelenített viccek inicializálása

            function displayTopJokes() {
                const topJokesList = document.getElementById("top-jokes-list");
                topJokesList.innerHTML = "";
                // Szűrés és rendezés az összes vicc alapján
                const topJokes = currentJokesStack.slice().sort((a, b) => b.rating - a.rating).slice(0, 10);
                topJokes.forEach((joke, index) => {
                    const jokeElement = document.createElement("li");
                    jokeElement.innerHTML = `<a href="#" data-title="${joke.title}" class="top-joke-link">${index + 1}. ${joke.title}</a>`;
                    topJokesList.appendChild(jokeElement);
                });
                
                // Kattintás esemény hozzáadása a top viccek linkjeihez
                document.querySelectorAll(".top-joke-link").forEach(link => {
                    link.addEventListener("click", function(event) {
                        event.preventDefault();
                        const title = this.getAttribute("data-title");
                        const selectedJoke = currentJokesStack.find(j => j.title === title);
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
                jokeElement.setAttribute("data-rating", joke.rating);
                jokeElement.setAttribute("data-vote-count", joke.voteCount);
                jokeElement.innerHTML = `
                    <h3>${joke.title}</h3>
                    <p>${joke.joke.replace("\n", "<br>")}</p>
                    <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${joke.rating.toFixed(1)}</span></p>
                    <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${joke.voteCount}</span></p>
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
                        const jokeIndex = currentJokesStack.findIndex(j => j.title === joke.title);
                        if (jokeIndex !== -1) {
                            currentJokesStack[jokeIndex].rating = newRating;
                            currentJokesStack[jokeIndex].voteCount = newVoteCount;
                        }

                        // Top viccek frissítése
                        displayTopJokes(); // Frissítve a top viccek listája
                    });
                }

                jokeElement.appendChild(ratingContainer);
                jokeContainer.appendChild(jokeElement);
            }

            function getJokeOfTheDay() {
                const storedDate = localStorage.getItem("jokeOfTheDayDate");
                let jokeOfTheDay;

                if (storedDate === today) {
                    jokeOfTheDay = JSON.parse(localStorage.getItem("jokeOfTheDay"));
                } else {
                    jokeOfTheDay = currentJokesStack[Math.floor(Math.random() * currentJokesStack.length)];
                    localStorage.setItem("jokeOfTheDay", JSON.stringify(jokeOfTheDay));
                    localStorage.setItem("jokeOfTheDayDate", today);
                }
                return jokeOfTheDay;
            }

            function displayAllJokes(jokesToDisplay) {
                const jokeContainer = document.getElementById("all-jokes");
                jokeContainer.innerHTML = "";

                jokesToDisplay.forEach(joke => {
                    const jokeElement = document.createElement("div");
                    jokeElement.classList.add("joke", "joke-box");
                    jokeElement.setAttribute("data-rating", joke.rating);
                    jokeElement.setAttribute("data-vote-count", joke.voteCount);
                    jokeElement.innerHTML = `
                        <h3>${joke.title}</h3>
                        <p>${joke.joke.replace("\n", "<br>")}</p>
                        <p style="text-align: center; margin-top: 20px;"><strong>Értékelés:</strong> <span class="average-rating">${joke.rating.toFixed(1)}</span></p>
                        <div class="rating" style="text-align: center; margin-top: 10px;">
                            <span class="rate" data-value="1">1</span>
                            <span class="rate" data-value="2">2</span>
                            <span class="rate" data-value="3">3</span>
                            <span class="rate" data-value="4">4</span>
                            <span class="rate" data-value="5">5</span>
                        </div>
                        <p style="text-align: center; margin-top: 10px;"><strong>Értékelések száma:</strong> <span class="vote-count">${joke.voteCount}</span></p>
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
                            const jokeIndex = currentJokesStack.findIndex(j => j.title === joke.title);
                            if (jokeIndex !== -1) {
                                currentJokesStack[jokeIndex].rating = newRating;
                                currentJokesStack[jokeIndex].voteCount = newVoteCount;
                            }

                            // Top viccek frissítése
                            displayTopJokes(); // Frissítve a top viccek listája
                        });
                    });

                    jokeContainer.appendChild(jokeElement);
                });
            }

            const jokeOfTheDay = getJokeOfTheDay();
            document.getElementById("random-joke").innerHTML = `<strong>A nap vicce:</strong> ${jokeOfTheDay.joke.replace("\n", "<br>")}`;

            // Kezdeti viccek betöltése
            displayAllJokes(currentJokesStack.slice(currentIndex, currentIndex + 10));
            jokeHistory.push(currentIndex); // Az első viccek indexének tárolása

            // Következő viccek gomb kezelője
            document.getElementById("next-jokes-button").addEventListener("click", function(event) {
                event.preventDefault();
                
                // Növeljük az indexet 10-nel
                currentIndex += 10;

                // Ellenőrizzük, hogy van-e még vicc az aktuális viccek halmazban
                if (currentIndex >= currentJokesStack.length) {
                    alert("Minden vicc megjelenítve. Újrakezdés.");
                    
                    // Visszaállítjuk a viccek halmazt
                    currentJokesStack = jokes.filter(joke => joke.category === "Állatos viccek"); // Visszaállítás
                    displayedJokes.clear(); // Megjelenített viccek törlése
                    currentIndex = 0; // Index visszaállítása
                }

                // Megjelenítjük a következő 10 viccet
                const nextJokes = currentJokesStack.slice(currentIndex, currentIndex + 10);
                displayAllJokes(nextJokes); // A következő viccek megjelenítése

                // Előző gomb megjelenítése
                document.getElementById("previous-jokes-button").style.display = "inline-block";
                
                // Görgessünk az oldal tetejére
                window.scrollTo(0, 0);
            });

            // Előző viccek gomb kezelője
            document.getElementById("previous-jokes-button").addEventListener("click", function(event) {
                event.preventDefault();
                if (jokeHistory.length > 1) {
                    jokeHistory.pop(); // Az utolsó index eltávolítása
                    currentIndex = jokeHistory[jokeHistory.length - 1]; // A legutolsó korábbi index beállítása
                    displayAllJokes(currentJokesStack.slice(currentIndex, currentIndex + 10));
                }
                if (currentIndex === 0) {
                    document.getElementById("previous-jokes-button").style.display = "none"; // Előző gomb elrejtése
                }
                window.scrollTo(0, 0); // Görgessünk az oldal tetejére
            });

            displayTopJokes();
        })
        .catch(error => console.error('Error loading jokes:', error));
});
