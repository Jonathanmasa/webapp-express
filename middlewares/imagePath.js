function setImagePath(req, res, next) {
    req.imagePath = `${req.protocol}://${req.get('host')}/img/films/`;
    console.log("DEBUG - Percorso immagini impostato:", req.imagePath);
    next();
}
module.exports = setImagePath;