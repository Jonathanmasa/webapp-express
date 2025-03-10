// importo i dati
// const menu = require('../data/pizzas');

// Importiamo il file di connessione al database
const connection = require('../data/db');


// gruppo delle funzione della logica relativa alle rotte delle pizze

function index(req, res) {

    // query di richiesta film
    const filmsSql = "SELECT * FROM movies;";

    connection.query(filmsSql, (err, result) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });



        // versione mappata del risultato
        const films = result.map(film => {
            return {
                ...film,
                image: req.imagePath + film.image
            }
        })

        // se tutto funziona
        res.json(films);
    });

}

function show(req, res) {

    // recuperiamo l'id dai params
    const { id } = req.params;

    // prepariamo la query di richiesta
    const detailFilm = "SELECT * FROM movies WHERE movies.id = ?";


    // prepariamo la query di richiesta
    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

    // richiediamo i dati del singolo film
    connection.query(detailFilm, [id], (err, filmResult) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (filmResult.length === 0) return res.status(404).json({ error: 'film not found' });

        // se tutto funziona
        // res.json(filmResult[0]);
        const book = filmResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            // se la query non va a buon fine
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorniamo l'oggetto film con le review ritornate
            film.reviews = reviewResult;

            // ritorniamo l'oggetto completo
            res.json(film);
        });



    });




}

function store(req, res) {

}



// esportiamo tutto
module.exports = { index, show, store }