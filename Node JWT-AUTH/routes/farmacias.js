var express = require('express');
var app = express();
const axios = require('axios');

app.get('/', async function(req, res, next) {

    // Llamada asíncrona a la promesa que retorna la lista de farmacias.
    let farmacias = await obtenerFarmacias(); 
    console.log('terminamos', farmacias);

    res.status(200).json({
        ok: 'farmacias',
    });
});

function obtenerFarmacias() {
    return new Promise((resolve, reject) => { // Declaración de la promesa.
        // Se va a la API a obtener la información.

        /*
        axios.get('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7', function (error, response, body) {
            // Se controla errores
            if (error) return reject(error);
            try {
                resolve(JSON.parse(body));
            } catch(e) {
                reject(e);
            }
        });
        */
       
        // Make a request for a user with a given ID
        axios.get('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7')
        .then(function (response) {
        // handle success
        console.log(response);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
	});
}

module.exports = app;