async function loadFavorites() {

    const response = await fetch('http://localhost:3000/favorites');

    const movies = await response.json();

    console.log("Favorites:", movies);

    const container = document.getElementById('favorites-list');

    container.innerHTML = movies.map(movie => `
        <div class="movie-card" data-id="${movie.movie_id}">

            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

            <h3>${movie.title}</h3>

            <p>Release: ${movie.release_date || 'N/A'}</p>

            <p>Rating: ${movie.rating_avg || 'N/A'}</p>

        </div>
    `).join("");

    // Make cards clickable
    const cards = document.querySelectorAll('.movie-card');

    cards.forEach(card => {

        card.addEventListener('click', () => {

            const movieId = card.dataset.id;

            window.location.href = `movie.html?id=${movieId}`;
        });
    });
}

loadFavorites();


