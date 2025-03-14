// Importiamo la connessione al database
const connection = require('../data/db');

// Funzione per ottenere tutti i film
function index(req, res) {
    const filmsSql = "SELECT * FROM movies;";

    connection.query(filmsSql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        const imagePath = req.imagePath || "/img/films/"; // Percorso base per le immagini

        const films = result.map(film => {
            // Costruzione  percorso dell'immagine
            const finalImagePath = film.image ? imagePath + film.image : "/img/films/default.jpg"; 
            console.log("Final image path: ", finalImagePath);  
            return {
                ...film,
                image: finalImagePath
            };
        });

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

        // Se l'immagine non esiste, impostiamo un'immagine di default
        const imagePath = req.imagePath || "/img/films/";
        film.image = film.image && film.image !== "" ? imagePath + film.image : "/img/films/default.jpg";

        connection.query(reviewSql, [id], (err, reviewResult) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            film.reviews = reviewResult;

            res.json(film);
        });
    });
}

// Funzione per aggiungere un film
function store(req, res, next) {
 
    const { title, director, abstract } = req.body;

    // gestiamo il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // creiamo la query di insert
    const query = "INSERT INTO movies (title, director, abstract, image ) VALUES (?, ?, ?, ?)";

    connection.query(query,
        [title, director, abstract, imageName],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Film creato con successo!",
            });
        })

}

// inserimento nuoa review
function storeReview(req, res) {
    const { id } = req.params;
    const { name, vote, text } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)';

    connection.query(insertReviewSql, [id, name, vote, text], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        
        res.status(201).json({ message: 'Review added', id: results.insertId });
    });
}

// Esportiamo le funzioni
module.exports = { index, show, store, storeReview };