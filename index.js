const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(express.static(__dirname + '/public'));  

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

const API_KEY = process.env.API_KEY

app.get('/', (req, res) => {
    res.sendFile('public/home.html', { root: __dirname });
});

app.get('/api/movies', async (req, res) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
        );

        const data = await response.json();
        res.json(data);
});

app.get('/api/search', async (req, res) => {
        const query = req.query.q;

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`
        );

        const data = await response.json();
        res.json(data);

});

app.get('/api/genres', async (req, res) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`
        );

        const data = await response.json();
        res.json(data);

});

app.get('/api/filtered', async (req, res) => {
        const genreId = req.query.genre;

        let url = "";

        if (!genreId) {
            url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`;
        } else {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
});

app.get('/api/details/:id', async (req, res) => {
    const movieId = req.params.id;
        const [movieRes, creditsRes, releaseRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${process.env.API_KEY}`)
        ]);

        const movie = await movieRes.json();
        const credits = await creditsRes.json();
        const releaseData = await releaseRes.json();

        res.json({ movie, credits, releaseData });
    });

app.get('/favorites', async (req, res) => {
    console.log('Attempting to get all favorite movies');

    const { data, error } = await supabase.from('favorites').select();


    if (error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    } else {
        res.json(data)
    }
    console.log('Recieved Data:', data)
});


app.post('/favorite', async(req, res) =>{
    console.log('Adding Favorite');
    console.log(`Request: ${JSON.stringify(req.body)}`)

    const movie_id = req.body.movie_id;
    const title = req.body.title;
    const release_date = req.body.release_date;
    const rating_avg = req.body.rating_avg;
    const overview = req.body.overview;
    const poster_path = req.body.poster_path

     const { data, error } = await supabase
        .from('favorites')
        .insert([
            {
                movie_id,
                title,
                release_date,
                rating_avg,
                overview,
                poster_path
            }
        ])
        .select();

    if (error) {
        console.log('Supabase Error:', error);
        return res.status(500).json(error);
    }

    console.log('Inserted:', data);

    res.json(data);
});


app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});