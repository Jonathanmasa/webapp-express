const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000; 

require('dotenv').config(); 

// Importiamo il router dei film
const filmsRouter = require('./routers/films');

// Importiamo i middleware di gestione errori
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require("./middlewares/notFound");

// Importiamo il middleware per il percorso delle immagini
const imagePathMiddleware = require('./middlewares/imagePath');

// Definiamo l'uso di una cartella per i file statici
app.use(express.static('public'));

// Registro il body-parser per "application/json"
app.use(express.json());

// Registro il middleware di CORS
app.use(cors()); 

// Registro il middleware di gestione immagini
app.use(imagePathMiddleware);

// Definiamo la rotta home
app.get('/api', (req, res) => {
    res.send("Ciao, sono la rotta Home dell'app di recensione film");
});

// Utilizziamo la rotta dei film andando a definire la parte iniziale delle rotte
app.use("/api/films", filmsRouter);

// Utilizzo middleware di gestione errore server
app.use(errorsHandler);

// Utilizzo middleware di gestione not found 404
app.use(notFound);

// Avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
