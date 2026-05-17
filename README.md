---

# Link to Developer Manual

See the Developer Manual below for setup, installation, API endpoints, and future development information.

---

# Developer Manual

## Project Structure

movie-finder/
│
| - docs/
│   |- README.md
│
| - public/
│   |- home.html / home.js
│   |- movie.html / movie.js
│   |- help.html 
|   |- about.html
|   |- project.css
│

---

# Installation Instructions

## 1. Clone the Repository

git clone <your-repository-url>
cd movie-finder

---

## 2. Install Dependencies

Install all required Node packages:

npm install

Dependencies used:
- express
- cors
- @supabase/supabase-js

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory.

Example:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
TMDB_TOKEN=your_tmdb_api_token
```

---

# Running the Application

Start the server:

```bash
node server.js
```

or with nodemon:

```bash
npx nodemon server.js
```

The application will run at:

```text
http://localhost:3000
```

---

# Running Tests

Currently, automated tests have not been implemented.

Future development should include:
- API endpoint testing
- Frontend integration testing
- Database testing

Recommended testing frameworks:
- Jest
- Supertest

---

# API Documentation

---

## GET /api/favorites

### Description
Retrieves all favorite movies stored in the Supabase database.

### Example Request

```http
GET /api/favorites
```

### Example Response

```json
[
  {
    "id": 1,
    "title": "Inception",
    "year": "2010"
  }
]
```

---

## POST /api/favorites

### Description
Stores a movie in the Supabase favorites table.

### Example Request

```http
POST /api/favorites
```

### Request Body

```json
{
  "title": "Interstellar",
  "year": "2014"
}
```

### Example Response

```json
[
  {
    "id": 2,
    "title": "Interstellar",
    "year": "2014"
  }
]
```

---

## GET /api/search/movie

### Description
Searches for movies using the TMDb external API.

### Example Request

```http
GET /api/search/movie?title=batman
```

### Example Response

```json
{
  "results": [
    {
      "title": "Batman Begins",
      "release_date": "2005-06-15"
    }
  ]
}
```

---

# Database Design

## Supabase Table: favorites

| Column | Type |
|-------|------|
| id | int8 |
| title | text |
| year | text |

---

# Known Bugs

Current known issues include:
- Duplicate movies can be saved
- Some movie searches may return incomplete information
- Error handling is limited for failed API requests
- Mobile styling may need further optimization

---

# Roadmap for Future Development

Planned future features:
- User authentication with Supabase Auth
- Delete favorite movies
- Movie poster support
- Search filters by genre and release year
- Movie trailers
- Responsive UI improvements
- Unit and integration testing
- Pagination for search results

---

# Technologies Used

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- Supabase PostgreSQL

## External API
- TMDb API

---

# Credits

Movie data provided by TMDb API.

Supabase used for cloud database services.
