const express = require('express');
const router = express.Router();

// Importiamo il controller dei film
const filmController = require("../controllers/moviesController");
// importiamo il middelware della gestione file
const upload = require('../middlewares/multer');

// ROTTE PER I FILM

// Ottieni tutti i film
router.get('/', filmController.index);

// Ottieni i dettagli di un singolo film 
router.get('/:id', filmController.show);

// store aggiungi film
router.post('/', upload.single('image'), filmController.store);

// Aggiungi una recensione a un film specifico
router.post('/:id/reviews', filmController.storeReview);

// Esportiamo il modulo router
module.exports = router;
