const express = require('express');
const router = express.Router();

// Importiamo il controller
const filmController = require("../controllers/moviesController");

// ROTTE
router.get('/', filmController.index); 
router.get('/:id', filmController.show);
router.post('/', filmController.store); 

// Esportiamo il modulo
module.exports = router;