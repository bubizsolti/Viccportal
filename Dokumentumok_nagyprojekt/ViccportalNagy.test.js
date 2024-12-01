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
}