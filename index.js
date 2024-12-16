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

app.get('/Carlos',(req,resp)=>{
    resp.send("Mi nombre es Carlos Gordillo, tengo 20 años y estoy estudiando Desarrollo de Software en el IST 17 de Julio");
});
app.get('/suma',(req,resp)=>{
    let a = 10; 
    let b = 5;
    let n = a+b; 
    resp.send("Total:"+n);
});
app.get('/suma/:n1',(req,resp)=>{
    let a = parseInt(req.params.n1); 
    let b = 5;
    let n = a+b; 
    resp.send("Total:"+n);
});

app.listen(3000,()=>{
    console.log('Servidor corriendo en el puerto 3000');  //Notificación del inicio del server
});

