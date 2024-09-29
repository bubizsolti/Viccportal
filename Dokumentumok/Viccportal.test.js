 /* 1. Teszt: displayTopJokes funkció megjelenítése */

function displayTopJokes() {
    const jokes = JSON.parse(localStorage.getItem('jokes')) || [];
    const sortedJokes = jokes.sort((a, b) => b.rating - a.rating).slice(0, 10);
    
    const topJokesList = document.getElementById('top-jokes-list');
    topJokesList.innerHTML = ''; // Ürítse ki a listát

    sortedJokes.forEach(joke => {
        const li = document.createElement('li');
        li.textContent = joke.title; // Feltehető, hogy a viccnek van címe
        topJokesList.appendChild(li);
    });
}

// Tesztelési lépés
function testDisplayTopJokes() {
    // Előző adatok törlése
    localStorage.removeItem('jokes');

    // Üres lista ellenőrzése
    const topJokesList = document.getElementById('top-jokes-list');
    console.assert(topJokesList.innerHTML === '', 'A lista üres kell legyen a teszt előtt.');

    // Viccek hozzáadása
    const sampleJokes = [
        { title: 'Vicces vicc 1', rating: 5 },
        { title: 'Vicces vicc 2', rating: 3 },
        { title: 'Vicces vicc 3', rating: 4 },
        { title: 'Vicces vicc 4', rating: 5 },
        { title: 'Vicces vicc 5', rating: 2 },
        { title: 'Vicces vicc 6', rating: 1 },
        { title: 'Vicces vicc 7', rating: 4 },
        { title: 'Vicces vicc 8', rating: 5 },
        { title: 'Vicces vicc 9', rating: 3 },
        { title: 'Vicces vicc 10', rating: 4 },
        { title: 'Vicces vicc 11', rating: 5 }
    ];

    localStorage.setItem('jokes', JSON.stringify(sampleJokes));
    displayTopJokes();

    // Ellenőrizze, hogy a megfelelő viccek jelennek meg
    const displayedJokes = Array.from(topJokesList.children).map(li => li.textContent);
    console.assert(displayedJokes.length === 10, 'A lista hossza 10 kell, hogy legyen.');
    console.log('Displayed jokes:', displayedJokes);
}

testDisplayTopJokes();


 /* 2. Teszt: Viccek tárolása és betöltése a localStorage-ból */

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


/* 3. Teszt: getJokeOfTheDay funkció helyes működése */

function getJokeOfTheDay() {
    const today = new Date().toDateString();
    const jokeOfTheDay = JSON.parse(localStorage.getItem('jokeOfTheDay'));

    if (!jokeOfTheDay || jokeOfTheDay.date !== today) {
        const newJoke = { title: 'Új vicc', content: 'Ez a nap vicce.' }; // Generálj egy új viccet
        localStorage.setItem('jokeOfTheDay', JSON.stringify({ date: today, joke: newJoke }));
        return newJoke;
    }
    return jokeOfTheDay.joke;
}

// Tesztelési lépés
function testGetJokeOfTheDay() {
    localStorage.removeItem('jokeOfTheDay'); // Törölje a korábbi viccet
    const joke = getJokeOfTheDay();
    console.assert(joke.title === 'Új vicc', 'Új viccnek kellene lennie.');

    // Frissítse az oldalt és ellenőrizze
    const jokeAgain = getJokeOfTheDay();
    console.assert(jokeAgain.title === 'Új vicc', 'Ugyanazt a viccet kellene visszaadni a mai napon.');
}

testGetJokeOfTheDay();


/* 4. Teszt: Vicc értékelés frissítése (rating update) */

function updateJokeRating(jokeId, newRating) {
    const jokes = JSON.parse(localStorage.getItem('jokes'));
    const joke = jokes.find(j => j.id === jokeId);
    
    if (joke) {
        joke.rating = newRating;
        joke.votes = (joke.votes || 0) + 1; // Növeld a szavazatszámot
        localStorage.setItem('jokes', JSON.stringify(jokes));
    }
}

// Tesztelési lépés
function testUpdateJokeRating() {
    const jokes = [{ id: 1, title: 'Vicces vicc', rating: 3, votes: 0 }];
    localStorage.setItem('jokes', JSON.stringify(jokes));

    updateJokeRating(1, 5);
    const updatedJokes = JSON.parse(localStorage.getItem('jokes'));

    console.assert(updatedJokes[0].rating === 5, 'A vicc értékelésének frissülnie kell.');
    console.assert(updatedJokes[0].votes === 1, 'A szavazatszámnak 1-nek kell lennie.');
}

testUpdateJokeRating();


/* 5. Teszt: getRandomJokes funkció helyes működése */

function getRandomJokes() {
    const allJokes = JSON.parse(localStorage.getItem('jokes')) || [];
    const randomJokes = [];
    
    while (randomJokes.length < 10 && allJokes.length > 0) {
        const randomIndex = Math.floor(Math.random() * allJokes.length);
        const joke = allJokes[randomIndex];

        if (!randomJokes.includes(joke)) {
            randomJokes.push(joke);
        }
    }
    return randomJokes;
}

// Tesztelési lépés
function testGetRandomJokes() {
    const jokes = [
        { title: 'Vicc 1', content: 'Vicces szöveg 1' },
        { title: 'Vicc 2', content: 'Vicces szöveg 2' },
        { title: 'Vicc 3', content: 'Vicces szöveg 3' },
        { title: 'Vicc 4', content: 'Vicces szöveg 4' },
        { title: 'Vicc 5', content: 'Vicces szöveg 5' },
        { title: 'Vicc 6', content: 'Vicces szöveg 6' },
        { title: 'Vicc 7', content: 'Vicces szöveg 7' },
        { title: 'Vicc 8', content: 'Vicces szöveg 8' },
        { title: 'Vicc 9', content: 'Vicces szöveg 9' },
        { title: 'Vicc 10', content: 'Vicces szöveg 10' }
    ];
    
    localStorage.setItem('jokes', JSON.stringify(jokes));
    const randomJokes = getRandomJokes();
    
    console.assert(randomJokes.length === 10, 'Tíz véletlenszerű viccnek kell lennie.');
    console.log('Random Jokes:', randomJokes);
}

testGetRandomJokes();


/* 7. Teszt: displaySingleJoke funkció egy vicc megjelenítése */

function displaySingleJoke(joke) {
    const popularJokesContainer = document.getElementById('popular-jokes');
    popularJokesContainer.innerHTML = ''; // Ürítse ki a konténert

    const jokeElement = createJokeElement(joke);
    popularJokesContainer.appendChild(jokeElement);
}

// Tesztelési lépés
function testDisplaySingleJoke() {
    const joke = { title: 'Kiválasztott vicc', content: 'Ez a kiválasztott vicc szövege.' };
    displaySingleJoke(joke);

    const popularJokesContainer = document.getElementById('popular-jokes');
    console.assert(popularJokesContainer.children.length === 1, 'Csak egy viccnek kellene megjelennie.');
    console.assert(popularJokesContainer.children[0].querySelector('h3').textContent === joke.title, 'A kiválasztott vicc címe nem megfelelő.');
}

testDisplaySingleJoke();


