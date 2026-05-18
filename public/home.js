
//Fetch Newly Released Movies (Thought these would be best on the home page)
async function getNewMovies() {
    const response = await fetch('/api/movies');
    
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

    const search = document.getElementById("searchInput").value; 

    const response = await fetch(`/api/search?q=${search}`); 

    const data = await response.json();
    displayMovies(data.results);
}
  //Fetch Genres for Genre Dropdown 
async function getGenres() {
  const response = await fetch('/api/genres');

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
    const genreId = document.getElementById("genreSelect").value;

    let url = "/api/filtered";

    if (genreId !== "") {
        url += `?genre=${genreId}`;
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