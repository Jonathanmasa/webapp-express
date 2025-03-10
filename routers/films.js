const express = require('express');
 const router = express.Router();
 
 // importiamo il controller
 const filmController = require("../controllers/moviesController");
 
 // ROTTE
 router.get('/', filmController.index);
 
 router.get('/:id', filmController.show);
 
 
 
 // esportiamo il modulo
 module.exports = router;