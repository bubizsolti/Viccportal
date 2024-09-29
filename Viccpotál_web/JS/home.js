document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().toDateString();
    let storedRandomJokes = JSON.parse(localStorage.getItem("randomJokes"));
    let storedRandomJokesDate = localStorage.getItem("randomJokesDate");
    let storedJokeOfTheDay = JSON.parse(localStorage.getItem("jokeOfTheDay"));
    let storedJokeOfTheDayDate = localStorage.getItem("jokeOfTheDayDate");
    let jokes = []; // Globális változó inicializálása

    if (storedRandomJokesDate !== today || storedJokeOfTheDayDate !== today) {
        localStorage.removeItem("randomJokes");
        localStorage.removeItem("randomJokesDate");
        localStorage.removeItem("jokeOfTheDay");
        localStorage.removeItem("jokeOfTheDayDate");
    }

    fetch('../JSON/jokes.json')
        .then(response => response.json())
        .then(fetchedJokes => {
            jokes = fetchedJokes; // Jokes változó frissítése

            // Funkciók definiálása
            displayTopJokes(); // A top viccek megjelenítése

            const randomJokes = getStoredRandomJokes();
            const jokeOfTheDay = getJokeOfTheDay();

            const randomJokeElement = document.getElementById("random-joke");
            randomJokeElement.innerHTML = `<strong>A nap vicce:</strong> ${jokeOfTheDay.joke.replace("\n", "<br>")}`;

            const jokeContainer = document.getElementById("popular-jokes");
            randomJokes.forEach((joke, index) => {
                if (joke.title !== jokeOfTheDay.title) {
                    const jokeElement = createJokeElement(joke);
                    jokeContainer.appendChild(jokeElement);
                }
            });

            document.getElementById("next-jokes-button").addEventListener("click", function(event) {
                event.preventDefault(); 
                window.location.href = "Összes_vicc.html";
            });
        })
        .catch(error => console.error('Hiba a viccek betöltésekor:', error));

    // Funkciók definiálása
    function displayTopJokes() {
        const topJokesList = document.getElementById("top-jokes-list");
        topJokesList.innerHTML = ""; 

        const topJokes = jokes.slice().sort((a, b) => b.rating - a.rating).slice(0, 10);

        topJokes.forEach((joke, index) => {
            const jokeElement = document.createElement("li");
            jokeElement.innerHTML = `<a href="#" class="top-joke-link" data-title="${joke.title}">${index + 1}. ${joke.title}</a>`;
            topJokesList.appendChild(jokeElement);
        });

        document.querySelectorAll(".top-joke-link").forEach(link => {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                const title = this.getAttribute("data-title");
                const selectedJoke = jokes.find(j => j.title === title);
                if (selectedJoke) {
                    displaySingleJoke(selectedJoke);
                }
            });
        });
    }
    document.getElementById("login-button").addEventListener("click", function() {
        window.location.href = "belepes.html";
    });
    

    function getStoredRandomJokes() {
        if (storedRandomJokes) {
            return storedRandomJokes; 
        }
        const randomJokes = getRandomJokes();
        localStorage.setItem("randomJokes", JSON.stringify(randomJokes));
        localStorage.setItem("randomJokesDate", today);
        return randomJokes;
    }

    function getRandomJokes() {
        const shuffled = jokes.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }

    function getJokeOfTheDay() {
        if (storedJokeOfTheDay) {
            return storedJokeOfTheDay; 
        }
        const jokeOfTheDay = jokes[Math.floor(Math.random() * jokes.length)];
        localStorage.setItem("jokeOfTheDay", JSON.stringify(jokeOfTheDay));
        localStorage.setItem("jokeOfTheDayDate", today);
        return jokeOfTheDay;
    }

    function createJokeElement(joke) {
        const jokeElement = document.createElement("div");
        jokeElement.classList.add("joke");
        jokeElement.setAttribute("data-title", joke.title);
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

                const jokeIndex = jokes.findIndex(j => j.title === jokeElement.getAttribute("data-title"));
                if (jokeIndex !== -1) {
                    jokes[jokeIndex].rating = newRating;
                    jokes[jokeIndex].voteCount = newVoteCount;
                }

                displayTopJokes(); // Frissítjük a top 10-es listát
            });
        });

        return jokeElement;
    }

    function displaySingleJoke(joke) {
        const jokeContainer = document.getElementById("popular-jokes");
        jokeContainer.innerHTML = ''; // Töröljük a jelenlegi vicceket

        const singleJokeElement = createJokeElement(joke);
        jokeContainer.appendChild(singleJokeElement);
    }
});
