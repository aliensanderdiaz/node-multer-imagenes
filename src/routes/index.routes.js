const { Router } = require('express');
const path = require('path');

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/subir', (req, res) => {
    console.log(req.file);
    res.send('Imagen subida');
});

module.exports = router;