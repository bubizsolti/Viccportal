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
    // 5. Teszt: Egy vicc véletlenszerű kiválasztása és megjelenítése
    function getRandomJoke() {
        const allJokes = JSON.parse(localStorage.getItem('jokes')) || [];
        if (allJokes.length === 0) {
            alert('Nincsenek viccek a rendszerben!');
            return;
        }

        const randomIndex = Math.floor(Math.random() * allJokes.length);
        return allJokes[randomIndex];
    }

    //6. Teszt: Viccek tárolása és betöltése a localStorage-ból

    function testRandomJokesStorage() {
        localStorage.removeItem('randomJokes'); // Üres localStorage

        // Generálj új vicceket és tárold el
        const randomJokes = [
            { title: 'Vicc 1', content: 'Vicces szöveg 1' },
            { title: 'Vicc 2', content: 'Vicces szöveg 2' }
        ];
        localStorage.setItem('randomJokes', JSON.stringify(randomJokes));

        // Frissítsd az oldalt
        const loadedJokes = JSON.parse(localStorage.getItem('randomJokes'));

        // Ellenőrizd, hogy a viccek visszatöltődnek
        console.assert(loadedJokes.length === 2, 'Két viccnek kellene lennie a localStorage-ból.');
    }

    testRandomJokesStorage();

    //7. Teszt: Hibakezelés – Hiányzó vicc ID

    function testUpdateJokeRatingWithMissingID() {
        const jokes = [
            { id: 1, title: 'Vicc 1', content: 'Ez az első vicc.', rating: 3, votes: 0 }
        ];
        localStorage.setItem('jokes', JSON.stringify(jokes));

        try {
            updateJokeRating(2, 5); // A vicc ID nem létezik
            console.error('Hiba: A függvény nem dobott hibát, amikor nem létező viccet próbált frissíteni.');
        } catch (e) {
            console.assert(e.message === 'A vicc nem található.', 'Hibát kellett volna dobni a nem létező vicc ID miatt.');
            console.log('updateJokeRatingWithMissingID teszt sikeresen lefutott.');
        }
    }

    testUpdateJokeRatingWithMissingID();

    // 8. Teszt: Adatok frissítése több szavazattal

    function testMultipleVotes() {
        const jokes = [
            { id: 5, title: 'Teszt vicc', content: 'Ez egy teszt vicc.', rating: 3, votes: 0 }
        ];
        localStorage.setItem('jokes', JSON.stringify(jokes));

        // Szavazás több alkalommal
        updateJokeRating(5, 4);
        updateJokeRating(5, 5);

        const updatedJokes = JSON.parse(localStorage.getItem('jokes'));
        console.assert(updatedJokes[0].rating === 5, 'Az értékelésnek 5-nek kell lennie a több szavazat után.');
        console.assert(updatedJokes[0].votes === 2, 'A szavazatszámnak 2-nek kell lennie.');
        console.log('testMultipleVotes teszt sikeresen lefutott.');
    }

    testMultipleVotes();


}