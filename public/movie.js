
//API Key 
const API_KEY = "3131c90536b9cb0859d9dfab72375f3a";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

//Fetch details of movie
async function getMovieDetails() {
        const [movieRes, creditsRes, releaseRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${API_KEY}`)
        ]);

        const movie = await movieRes.json();
        const credits = await creditsRes.json();
        const releaseData = await releaseRes.json();


        displayMovie(movie, credits);

}


//Display Movie Details on movie.html
function displayMovie(movie, credits){

    const movieDetails = document.getElementById("movieDetails");

    let posterPath = "";

        if (movie.poster_path) {
        posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }

    // Top 5 Cast Memebers being displayed
    const cast = credits.cast.slice(0, 5).map(actor =>
        `<ul>${actor.name} as ${actor.character}</ul>`
    ).join("");

    movieDetails.innerHTML = `
        <div class="movie-details">

            <img src="${posterPath}">

            <div class="movie-info">

                <h1>${movie.title}</h1>

                <p><strong>Rating Score:</strong> ${movie.vote_average.toFixed(1)} / 10</p>

                <p><strong>Release Date:</strong> ${movie.release_date}</p>

                <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>

                <p><strong>Overview:</strong></p>
                <p>${movie.overview}</p>

                <h3>Cast</h3>
                <p>${cast}</p>

                <button class="button-24" id="favorite-btn">
                    Add to Favorites
                </button>
                

            </div>

        </div>
    `;

        document.getElementById('favorite-btn')
        .addEventListener('click', () => {
            addToFavorites(movie);
        });


}
async function addToFavorites(movie) {

    const response = await fetch('http://localhost:3000/favorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            movie_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            rating_avg: movie.vote_average,
            overview: movie.overview
        })
    });
    

    const data = await response.json();

    alert(`${movie.title} added to favorites!`);
}
   

getMovieDetails();

