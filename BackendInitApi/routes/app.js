var express = require('express');
var app = express();

const axios = require('axios')

function dataApi(endpoint = '',opc='') {
    return new Promise((resolve, reject) => { // Declaración de la promesa.
        axios.get(`https://rickandmortyapi.com/api/${endpoint}${opc}`)
        .then(function (response) {
            // handle success
            resolve(response);
        })
        .catch(function (error) {
            // handle error
            resolve();
        })
	});
}

const api = axios.create({
    method: 'get',
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 5000
})

app.get('/', async function(req, res, next) {

    try {
        const { data } = await api('')
        return res.status(200).json({
            ok: 'Peticion realizada correctamente',
            data: data
        });
    }catch (e) {
        console.log(e.message)
    }
});

const validate = qry => {
    if (typeof qry === 'number' && Number.isInteger(qry) || Array.isArray(qry)) {
      return `/${qry}`
    }
  
    if (typeof qry === 'object') {
      return `/?${Object.keys(qry)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(qry[key])}`)
        .join('&')}`
    }
  
    throw new Error(`As argument use an object, an array, an integer or leave it blank`)
}

app.get('/character', async function(req, res, next) {

   const query = validate(req.query);
   let response = await dataApi('character/',query); 

   res.status(200).json({
       ok: 'Peticion realizada correctamente',
       data: response.data
   });
    
});

app.get('/character/:id', async function(req, res, next) {

    var id = req.params.id;

    try {
        const  {data}  = await api('character/'+id)
        return res.status(200).json({
            ok: 'Peticion realizada correctamente',
            data: data
        });
    }catch (e) {
        console.log(e.message)
    }
});


app.get('/location', async function(req, res, next) {

    const query = validate(req.query);
    let response = await dataApi('location/',query); 
 
    res.status(200).json({
        ok: 'Peticion realizada correctamente',
        data: response.data
    });
});

app.get('/location/:id', async function(req, res, next) {
    
    var id = req.params.id;
    let response = await dataApi('location',id); 

    res.status(200).json({
        ok: 'Peticion realizada correctamente',
        data: response.data
    });
});

app.get('/episode', async function(req, res, next) {

    const query = validate(req.query);
    let response = await dataApi('episode/',query); 
 
    res.status(200).json({
        ok: 'Peticion realizada correctamente',
        data: response.data
    });
});

app.get('/episode/:id', async function(req, res, next) {
    
    var id = req.params.id;
    let response = await dataApi('episode',id); 

    res.status(200).json({
        ok: 'Peticion realizada correctamente',
        data: response.data
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    return res.status(200).json({
        ok: 'Not Found',

    });
});

module.exports = app;