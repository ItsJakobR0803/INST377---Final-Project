#  Installation Guide
## 1.1 Prerequisites

Before installing the project, ensure you have the following installed:

Node.js (v16 or newer recommended)
npm
Git

## 1.2 Clone the Repository
git clone https://github.com/ItsJakobR0803/INST377---Final-Project

## 1.3 Install Dependencies
All project dependencies are listed in the package.json file.

Install dependencies with:
npm install

## 1.4 Environment Variables

Create a .env file in the root or server folder:
API_KEY=api_key_here
SUPABASE_KEY = supabase_key_here
SUPABASE_URL = supabase_url_here 

# Running Application 

## 2.1 Running Server 
To start server: 
npm start 

## 2.2 Running Tests
Currently, no automated tests have been implemented.

# APIs 

## Endpoints
GET /
Serves the main homepage.
Returns: public/home.html

GET /api/movies
Retrieves a list of popular movies from TMDb.

GET /api/search
Searches for movies based on a query string.

Query Parameters
Parameter	Description
q	Movie search keyword

Example Request
GET /api/search?q=batman
Returns 'Batman' movies from TMDb.

GET /api/genres
Retrieves all movie genres.


GET /api/filtered
Retrieves movies filtered by genre.

Query Parameters
Parameter	Description
genre	Genre ID

Example Request
GET /api/filtered?genre=28
Returns action movies.

GET /api/details/:id
Retrieves detailed movie information.

URL Parameters
Parameter	Description
id	TMDb movie ID

Example Request
GET /api/details/550
Returns:
Movie details
Cast and crew credits
Release date information

GET /favorites
Retrieves all favorite movies stored in Supabase.

Example Request
GET /favorites
Returns all favorite movie entries.

POST /favorite
Adds a movie to the favorites database.

Request Body
{
  "movie_id": 550,
  "title": "Fight Club",
  "release_date": "1999-10-15",
  "rating_avg": 8.8,
  "overview": "Movie description",
  "poster_path": "/path.jpg"
}
Returns inserted database entry.

# Known Bugs
Duplicate favorite movies can currently be added.
No DELETE endpoint exists for removing favorites.
Error handling is minimal for failed API requests.
Search results may occasionally return incomplete movie data from TMDb.
No authentication system is implemented.

# Future Development Roadmap
Planned improvements include:

Add user authentication
Add DELETE endpoint for favorites
Prevent duplicate favorites