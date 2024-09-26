document.addEventListener("DOMContentLoaded", function() {
    fetch('../JSON/jokes.json')
        .then(response => response.json())
        .then(jokes => {
            let currentJokesStack = []; // Stack for currently displayed jokes
            let displayedJokes = new Set(); // Set to track displayed jokes
            let currentIndex = 0; // Index to keep track of current jokes set
            const today = new Date().toDateString(); // Get today's date

            // Check if we need to refresh jokes daily
            if (localStorage.getItem("jokesDisplayDate") !== today) {
                currentJokesStack = getRandomJokes(); // Get new random jokes
                localStorage.setItem("displayedJokes", JSON.stringify(currentJokesStack));
                localStorage.setItem("jokesDisplayDate", today);
                currentIndex = 0; // Reset index for the new set of jokes
            } else {
                currentJokesStack = JSON.parse(localStorage.getItem("displayedJokes")); // Load existing jokes
            }

            currentJokesStack.forEach(joke => displayedJokes.add(joke.title)); // Initialize displayed jokes

            function displayTopJokes() {
                const topJokesList = document.getElementById("top-jokes-list");
                topJokesList.innerHTML = "";
                jokes.sort((a, b) => b.rating - a.rating); // Sort jokes by rating
                jokes.slice(0, 10).forEach((joke, index) => {
                    const jokeElement = document.createElement("li");
                    jokeElement.innerHTML = `<a href="#">${index + 1}. ${joke.title}</a>`;
                    jokeElement.addEventListener("click", function() {
                        displaySingleJoke(joke); // Display only the selected joke
                    });
                    topJokesList.appendChild(jokeElement);
                });
            }

            function displaySingleJoke(joke) {
                const jokeContainer = document.getElementById("all-jokes");
                jokeContainer.innerHTML = ""; // Clear previous jokes

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

                // Add rating event listeners as before
                jokeElement.querySelectorAll(".rate").forEach(rateElement => {
                    rateElement.addEventListener("click", function() {
                        const rating = parseInt(this.getAttribute("data-value"));
                        const currentRating = parseFloat(jokeElement.getAttribute("data-rating"));
                        const currentVoteCount = parseInt(jokeElement.getAttribute("data-vote-count"));

                        const newVoteCount = currentVoteCount + 1;
                        const newRating = ((currentRating * currentVoteCount) + rating) / newVoteCount;

                        // Update data
                        jokeElement.setAttribute("data-rating", newRating);
                        jokeElement.setAttribute("data-vote-count", newVoteCount);
                        jokeElement.querySelector(".average-rating").innerText = newRating.toFixed(1);
                        jokeElement.querySelector(".vote-count").innerText = newVoteCount;

                        // Update local storage
                        const jokeIndex = jokes.findIndex(j => j.title === joke.title);
                        if (jokeIndex !== -1) {
                            jokes[jokeIndex].rating = newRating; // Update rating
                            jokes[jokeIndex].voteCount = newVoteCount; // Update vote count
                        }

                        localStorage.setItem("jokes", JSON.stringify(jokes)); // Save updated jokes to local storage

                        // Update top jokes
                        updateTopJokes(); // Ensure top jokes list is updated after voting
                    });
                });

                jokeContainer.appendChild(jokeElement);
            }

            function getJokeOfTheDay() {
                const storedDate = localStorage.getItem("jokeOfTheDayDate");
                let jokeOfTheDay;

                if (storedDate === today) {
                    jokeOfTheDay = JSON.parse(localStorage.getItem("jokeOfTheDay"));
                } else {
                    jokeOfTheDay = jokes[Math.floor(Math.random() * jokes.length)];
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

                    jokeElement.querySelectorAll(".rate").forEach(rateElement => {
                        rateElement.addEventListener("click", function() {
                            const rating = parseInt(this.getAttribute("data-value"));
                            const currentRating = parseFloat(jokeElement.getAttribute("data-rating"));
                            const currentVoteCount = parseInt(jokeElement.getAttribute("data-vote-count"));

                            const newVoteCount = currentVoteCount + 1;
                            const newRating = ((currentRating * currentVoteCount) + rating) / newVoteCount;

                            // Update data
                            jokeElement.setAttribute("data-rating", newRating);
                            jokeElement.setAttribute("data-vote-count", newVoteCount);
                            jokeElement.querySelector(".average-rating").innerText = newRating.toFixed(1);
                            jokeElement.querySelector(".vote-count").innerText = newVoteCount;

                            // Update local storage
                            const jokeIndex = jokes.findIndex(j => j.title === joke.title);
                            if (jokeIndex !== -1) {
                                jokes[jokeIndex].rating = newRating; // Update rating
                                jokes[jokeIndex].voteCount = newVoteCount; // Update vote count
                            }

                            localStorage.setItem("jokes", JSON.stringify(jokes)); // Save updated jokes to local storage
                            updateTopJokes(); // Ensure top jokes list is updated after voting
                        });
                    });

                    jokeContainer.appendChild(jokeElement);
                });
            }

            const jokeOfTheDay = getJokeOfTheDay();
            document.getElementById("random-joke").innerHTML = `<strong>A nap vicce:</strong> ${jokeOfTheDay.joke.replace("\n", "<br>")}`;

            // Load initial jokes
            displayAllJokes(currentJokesStack.slice(currentIndex, currentIndex + 10));

            // Next jokes button handler
            document.getElementById("next-jokes-button").addEventListener("click", function(event) {
                event.preventDefault();
                if (currentIndex + 10 >= currentJokesStack.length) {
                    const newJokes = getRandomJokes();
                    if (newJokes.length > 0) {
                        currentJokesStack.push(...newJokes); // Add new jokes to the stack
                        newJokes.forEach(joke => displayedJokes.add(joke.title)); // Mark new jokes as displayed
                    } else {
                        alert("Nincs több új vicc.");
                        return; // Exit if no new jokes
                    }
                }
                currentIndex += 10; // Increment index after updating jokes
                displayAllJokes(currentJokesStack.slice(currentIndex, currentIndex + 10)); // Display new set of jokes
                updateTopJokes(); // Update top jokes after displaying new jokes
                document.getElementById("previous-jokes-button").style.display = "inline-block"; // Show previous button
                window.scrollTo(0, 0); // Scroll to top of the page
            });

            // Previous jokes button handler
            document.getElementById("previous-jokes-button").addEventListener("click", function(event) {
                event.preventDefault();
                if (currentIndex > 0) {
                    currentIndex -= 10; // Decrement by 10
                    displayAllJokes(currentJokesStack.slice(currentIndex, currentIndex + 10));
                }
                if (currentIndex === 0) {
                    document.getElementById("previous-jokes-button").style.display = "none"; // Hide previous button
                }
                window.scrollTo(0, 0); // Scroll to top of the page
            });

            // Function to update top jokes based on ratings
            function updateTopJokes() {
                const topJokesList = document.getElementById("top-jokes-list");
                topJokesList.innerHTML = "";
                jokes.sort((a, b) => b.rating - a.rating); // Ensure the jokes are sorted correctly by the latest ratings
                jokes.slice(0, 10).forEach((joke, index) => {
                    const jokeElement = document.createElement("li");
                    jokeElement.innerHTML = `<a href="#">${index + 1}. ${joke.title}</a>`;
                    jokeElement.addEventListener("click", function() {
                        displaySingleJoke(joke); // Display only the selected joke
                    });
                    topJokesList.appendChild(jokeElement);
                });
                console.log("Top viccek frissítve");
            }

            displayTopJokes(); // Initial display of top jokes
        })
        .catch(error => console.error('Hiba a viccek betöltésekor:', error));
});
