// Importiamo la connessione al database
const connection = require('../data/db');

// Funzione per ottenere tutti i film
function index(req, res) {
    const filmsSql = "SELECT * FROM movies;";

    connection.query(filmsSql, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        const imagePath = req.imagePath || '/default/path/';
        
        const films = result.map(film => ({
            ...film,
            image: imagePath + film.image
        }));

        res.json(films);
    });
}

// Funzione per ottenere i dettagli di un film
function show(req, res) {
    const { id } = req.params;

    const detailFilm = "SELECT * FROM movies WHERE movies.id = ?";
    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

    connection.query(detailFilm, [id], (err, filmResult) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (filmResult.length === 0) return res.status(404).json({ error: 'Film not found' });

        const film = filmResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            film.reviews = reviewResult;

            res.json(film);
        });
    });
}

// Funzione per aggiungere un film (ancora da implementare)
function store(req, res) {
    res.status(501).json({ message: 'Not Implemented' });
}

// Esportiamo le funzioni
module.exports = { index, show, store };