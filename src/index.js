const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');

const app = express();

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/imagenes'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLowerCase());
    }
});

const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/imagenes'),
    limits: { fileSize: 80000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error el archivo debe ser una imagen');
    }
}).single('imagen');

app.use(upload);

app.use(require('./routes/index.routes'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});