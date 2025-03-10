const express = require('express')
 const app = express()
 const port = process.env.PORT
 
 // importiamo il middleware di CORS
 // var cors = require('cors')
 
 
 // importiamo il roputer dei film
 // const pizzasRouter = require('./routers/films');
 
 
 // importiamo il middleware di gestione errore server
 const errorsHandler = require("./middlewares/errorsHandler");
 
 // importiamo il middleware di gestione errore 404
 const notFound = require("./middlewares/notFound");
 
 
 
 
 // definiamo l'uso di una cartella per i file statici
 app.use(express.static('public'));
 
 // registro il body-parser per "application/json"
 app.use(express.json());
 
 // registro il middleware di CORS
 // app.use(cors({ origin: 'http://localhost:5173' }))
 
 
 // registriamo il middleware di check time, a livello globale
 // app.use(checkTime);	
 // app.use("/films", checkTime);
 
 // definiamo la rotta home
 app.get('/', (req, res) => {
     res.send("Ciao sono la rotta Home, dell'app di recensione film");
 })
 
 // utilizziamo la rotta dei film andando a definire la parte iniziale delle rotte
 // app.use("/films", filmsRouter)
 
 // utilizzo middleware di gestione errore server
 app.use(errorsHandler);
 
 // utilizzo middleware di gestione not found 404
 app.use(notFound);
 
 // avvio del server sulla porta specificata
 app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
 })