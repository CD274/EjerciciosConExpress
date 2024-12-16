const express = require('express');
const app = express();
app.use(express.json());

var lista = [{
    id: '1',
    nombre: 'Carlos'
}, {
    id: '2',
    nombre: 'Jorge'
}, {
    id: '3',
    nombre: 'Arturo'
}];
//Usio de app, Web service de tipo GET

app.get('/nombre',(req,resp)=>{
    resp.json(lista);
});

app.listen(3000,()=>{
    console.log('Servidor corriendo en el puerto 3000');  //Notificación del inicio del server
});
