document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/api/jokes?category=Anyós viccek')
        .then(response => response.json())
        .then(jokes => {
            const jokeContainer = document.getElementById("popular-jokes");
            jokeContainer.innerHTML = ''; // Clear existing content

            jokes.forEach(joke => {
                const jokeElement = document.createElement("div");
                jokeElement.classList.add("joke");
                
                jokeElement.innerHTML = `
                    <h3>${joke.nev}</h3>
                    <p>${joke.vicc}</p>
                    <div class="rating-container">
                        <p>Értékelés: ${joke.ertekeles.toFixed(1)}</p>
                        <p>Szavazatok száma: ${joke.ertekelesek_szama}</p>
                        <div class="rating">
                            ${generateRatingStars()}
                        </div>
                    </div>
                `;
                
                jokeContainer.appendChild(jokeElement);

                // Add rating functionality
                const ratingDiv = jokeElement.querySelector('.rating');
                if (ratingDiv) {
                    setupRatingListeners(ratingDiv, joke.id);
                }
            });
        })
        .catch(error => console.error('Error:', error));
});

function generateRatingStars() {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="rate" data-value="${i}">${i}</span>`;
    }
    return starsHtml;
}

function setupRatingListeners(ratingDiv, jokeId) {
    const stars = ratingDiv.querySelectorAll('.rate');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-value'));
            updateJokeRating(jokeId, rating);
        });
    });
}

function updateJokeRating(jokeId, rating) {
    fetch(`http://localhost:3000/api/jokes/${jokeId}/rate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Refresh the jokes display
            location.reload();
        }
    })
    .catch(error => console.error('Error updating rating:', error));
}
