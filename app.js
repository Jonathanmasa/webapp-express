// Caricamento delle variabili d'ambiente
require('dotenv').config();

const express = require('express');
const cors = require('cors');  // se necessario
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Importiamo i middleware
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');
const imagePathMiddleware = require('./middlewares/imagePath');

// Importiamo il router dei film
const filmsRouter = require('./routers/films');

// Definiamo l'uso di una cartella per i file statici
app.use(express.static(path.join(__dirname, 'public')));  // Corretto per gestire i percorsi assoluti

// Registro il body-parser per "application/json"
app.use(express.json());

// Abilitare CORS se necessario (puoi decommentare questa riga se vuoi abilitare CORS)
app.use(cors());

// Registro il middleware di gestione immagini (supponiamo che tu stia impostando un percorso base per le immagini)
app.use(imagePathMiddleware);

// Registro il router per i film
app.use("/api/films", filmsRouter);

// Definiamo la rotta home
app.get('/api', (req, res) => {
    res.send("Ciao, sono la rotta Home dell'app di recensione film");
});

// Debug: stampo tutte le rotte registrate
console.log("Rotte registrate:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});

// Middleware di gestione degli errori
app.use(errorsHandler);
app.use(notFound);

// Avvio del server
app.listen(port, () => {
    console.log(`✅ Server in esecuzione su http://localhost:${port}`);
});