// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar rutas
var usuarioRoutes = require('./routes/usuario');
var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var hospital = require('./routes/hospital');
var medico = require('./routes/medico');
var busqueda = require('./routes/busqueda');
var upload = require('./routes/upload');

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospital);
app.use('/medico', medico);
app.use('/busqueda', busqueda);
app.use('/upload', upload);
app.use('/', appRoutes);



// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});