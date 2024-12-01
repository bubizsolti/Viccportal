// 1. Teszt: displayTopJokes funkció megjelenítése
function displayTopJokes() {
    const jokes = JSON.parse(localStorage.getItem('jokes')) || [];
    const sortedJokes = jokes.sort((a, b) => b.rating - a.rating).slice(0, 10);

    const topJokesList = document.getElementById('top-jokes-list');
    topJokesList.innerHTML = ''; // Ürítse ki a listát

    sortedJokes.forEach(joke => {
        const li = document.createElement('li');
        li.textContent = `${joke.title} (Értékelés: ${joke.rating})`;

        const rateButton = document.createElement('button');
        rateButton.textContent = 'Értékelés';
        rateButton.onclick = () => promptRating(joke.id);

        li.appendChild(rateButton);
        topJokesList.appendChild(li);
    });
    // 2. Teszt: Értékelés kérése
    function promptRating(jokeId) {
        const rating = parseInt(prompt('Add meg az értékelést (1-5):'), 10);

        if (rating >= 1 && rating <= 5) {
            updateJokeRating(jokeId, rating);
            alert('Értékelés sikeresen frissítve!');
            displayTopJokes();
        } else {
            alert('Érvénytelen értékelés! Kérlek, adj meg egy értéket 1 és 5 között.');
        }
    }
    // 3. Teszt: Vicc értékelés frissítése (rating update)
    function updateJokeRating(jokeId, newRating) {
        const jokes = JSON.parse(localStorage.getItem('jokes'));
        const joke = jokes.find(j => j.id === jokeId);

        if (joke) {
            // Az új értékelés átlagolása
            joke.rating = ((joke.rating * joke.votes) + newRating) / (joke.votes + 1);
            joke.votes += 1; // Növeld a szavazatszámot
            localStorage.setItem('jokes', JSON.stringify(jokes));
        }
    }
    // 4. Teszt: displaySingleJoke funkció egy vicc megjelenítése
    function displaySingleJoke(joke) {
        const popularJokesContainer = document.getElementById('popular-jokes');
        popularJokesContainer.innerHTML = ''; // Ürítse ki a konténert

        const jokeElement = document.createElement('div');
        jokeElement.innerHTML = `
        <h3>${joke.title}</h3>
        <p>${joke.content}</p>
        <p><strong>Értékelés:</strong> ${joke.rating.toFixed(1)} (Szavazatok: ${joke.votes})</p>
    `;
        popularJokesContainer.appendChild(jokeElement);
    }
}