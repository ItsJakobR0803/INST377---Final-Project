const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
//Was getting error about CORS looked into and found way around 
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 5500;
dotenv.config();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/favorites', async (req, res) =>{
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
                rating_avg: movie.vote_average,
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


app.listen(port, () =>{
    console.log(`App is available on port: ${port}`)
});