
//API Key 
const API_KEY = "3131c90536b9cb0859d9dfab72375f3a";


//Fetch Newly Released Movies (Thought these would be best on the home page)
async function getNewMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );

    const data = await response.json();

    displayMovies(data.results);

}


//Display Movies
function displayMovies(movies) {

  const moviesContainer =
  document.getElementById("moviesContainer");

  moviesContainer.innerHTML = "";

  movies.forEach(movie => {

  let posterPath = "";

  if (movie.poster_path) {
    posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }

    const movieCard =
      document.createElement("div");

    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `

      <img src="${posterPath}">

      <div class="movie-info">

        <h3>${movie.title || "Unknown Title"}</h3>

        <p>Rating: ${movie.vote_average.toFixed(1)}/10</p>

        <p>${movie.release_date || "Unknown Date"}</p>

      </div>

    `;

    //Clickable Movie Poster
    movieCard.addEventListener("click", () => {
      window.location.href =
        `movie.html?id=${movie.id}`;

    });

    moviesContainer.appendChild(movieCard);
  });
}

  //Search Movies via user input
async function searchMovies() {

  const search =
    document.getElementById("searchInput").value;

  //Fetch movies based on their search input 
  document.getElementById("searchText").textContent = search;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
    );

    const data = await response.json();

    displayMovies(data.results);
}

  //Fetch Genres for Genre Dropdown 
async function getGenres() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );

  const data = await response.json();

  const select = document.getElementById("genreSelect");

  data.genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    select.appendChild(option);
  });
}

  //Filter the movies by user selected genre
async function filterByGenre() {

    const genreId =
        document.getElementById("genreSelect").value;

    let url = "";

    if (genreId === "") {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
    } 
    
    else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    }

      const response = await fetch(url);

      const data = await response.json();

      displayMovies(data.results);
}

  //Picture Slider for Movies (Gives the app more of a netflix feel)
  const slideLeft =
    document.getElementById("slideLeft");

  const slideRight =
    document.getElementById("slideRight");

  const moviesContainer =
    document.getElementById("moviesContainer");

  slideLeft.addEventListener("click", () => {
    moviesContainer.scrollBy({
      left: -500,
    });
  });

  slideRight.addEventListener("click", () => {
    moviesContainer.scrollBy({
      left: 500,
    });
  });


//Load Movies and Genres dropdown when page loads 
window.onload = function () {
  getGenres();
  getNewMovies();

};