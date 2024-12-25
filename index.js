const express = require('express');
const app = express();
app.use(express.json());

const lista = [{
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

//tarea
//Primera figura geometrica:
// 1. Primera Figura Geométrica: Elipse
app.get('/elipse/:a/:b', (req, resp) => {
    let a = parseFloat(req.params.a); // Radio mayor
    let b = parseFloat(req.params.b); // Radio menor

    let area = Math.PI * a * b; // Área de la elipse
    let perimetro = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b))); // Perímetro 

    resp.send(`Elipse: Área = ${area}, Perímetro = ${perimetro}`);
});

// 2. Segunda Figura Geométrica: Trapecio Irregular
app.get('/trapecio/:B/:b/:h/:L1/:L2', (req, resp) => {
    let B = parseFloat(req.params.B);  // Base mayor
    let b = parseFloat(req.params.b);  // Base menor
    let h = parseFloat(req.params.h);  // Altura
    let L1 = parseFloat(req.params.L1); // Lado no paralelo 1
    let L2 = parseFloat(req.params.L2); // Lado no paralelo 2

    let area = ((B + b) * h) / 2; // Área del trapecio
    let perimetro = B + b + L1 + L2; // Perímetro del trapecio

    resp.send(`Trapecio Irregular: Área = ${area}, Perímetro = ${perimetro}`);
});

// 3. Tercera Figura Geométrica: Pentágono Regular
app.get('/pentagono/:l', (req, resp) => {
    let l = parseFloat(req.params.l); // Longitud de un lado

    let area = (5 * Math.pow(l, 2)) / (4 * Math.tan(Math.PI / 5)); // Área del pentágono
    let perimetro = 5 * l; // Perímetro del pentágono

    resp.send(`Pentágono Regular: Área = ${area}, Perímetro = ${perimetro}`);
});

// 4. Tarea en clase De trinomio cuadrado perfecto
// Verifica si es un trinomio cuadrado perfecto
// Comprueba si el trinomio es un cuadrado perfecto
function esTrinomioCuadradoPerfecto(a, b, c) {
    // Verificar si cumple con la forma a² ± 2ab + b²
    const terminoMedio = Math.sqrt(a) * Math.sqrt(c) * 2;
    return b === terminoMedio || b === -terminoMedio;
}

// Convierte el trinomio en un binomio cuadrado perfecto
function convertirABinomioCuadradoPerfecto(a, b, c) {
    const m = Math.sqrt(a); // Coeficiente de la raíz cuadrada de a
    const n = Math.sqrt(c); // Coeficiente de la raíz cuadrada de c
    const signo = b > 0 ? '+' : '-';

    return {
        binomio: `(${m}x ${signo} ${n})²`,
        m: m,
        n: signo === '+' ? n : -n
    };
}

// Formatea el trinomio eliminando redundancias de signos
function formatearTrinomio(a, b, c) {
    const signoB = b >= 0 ? `+${b}` : `${b}`;
    const signoC = c >= 0 ? `+${c}` : `${c}`;
    return `${a}x² ${signoB}x ${signoC}`;
}

// Genera las combinaciones de signos posibles para evaluar
function generarCombinaciones(a, b, c) {
    const combinaciones = [
        { signoA: 1, signoB: 1, signoC: 1 }, // +++
        { signoA: 1, signoB: -1, signoC: 1 }, // +-+
        { signoA: 1, signoB: -1, signoC: -1 }, // +--
        { signoA: -1, signoB: 1, signoC: 1 }, // -++
    ];

    return combinaciones.map(({ signoA, signoB, signoC }) => ({
        a: signoA * a,
        b: signoB * b,
        c: signoC * c,
    }));
}

// Ruta GET para resolver el problema de trinomios cuadrados perfectos
app.get('/trinomios/:a/:b/:c', (req, resp) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const c = parseFloat(req.params.c);

    const combinaciones = generarCombinaciones(a, b, c);
    const resultados = [];

    combinaciones.forEach(({ a, b, c }) => {
        const trinomio = formatearTrinomio(a, b, c);

        if (esTrinomioCuadradoPerfecto(a, b, c)) {
            const { binomio, m, n } = convertirABinomioCuadradoPerfecto(a, b, c);

            resultados.push({
                trinomio: trinomio,
                mensaje: `Es un trinomio cuadrado perfecto.`,
                binomio: binomio,
                factorizacion: `${a}x² ${b}x ${c} = ${binomio}`
            });
        } else {
            resultados.push({
                trinomio: trinomio,
                mensaje: `NO es un trinomio cuadrado perfecto.`
            });
        }
    });

    resp.json(resultados);
});

//Captura de datos por querrys
// http://localhost:3000/adicion?num1=15&num2=-7
app.get('/adicion', (req, resp) => {
    let n1 = parseFloat(req.query.num1);
    let n2 = parseFloat(req.query.num2); 
    let suma = n1 + n2;

    resp.json({ resultado: suma }); // Enviar la respuesta en formato JSON
});
//RESTA por query
// http://localhost:3000/resta?num1=15&num2=7
app.get('/resta', (req, resp) => {
    var para = req.query;
    let n1 = parseFloat(para.num1);
    let n2 = parseFloat(para.num2);
    let resta;
    if(n1>=n2) {
        resta = n1 - n2;
    }else{
        resta = n2 - n1;
    }
    resp.send('La resta es: '+ resta);
});
//Caclcular un servicio web mediante querys que nos permita conocer el valor a pagar en matriculación vehicular siguiendo las pautas:
//El año: si es mayor al 2000, pagará un subsidio de contaminacion equivalente al 2% del valor del vehículo. 
// Si es menor al año 2000 pagara el 5% del valor del vehículo, el valor de matriculacion esta fijado en 96$
//Si el vehículo posee un aplaca de Imbabura, Carchi, Esmeraldas o Sucumbios Tendra un descuento en el valor de matriculacion del 2.5%.
//Si el vehículo posee multas por cada multa pagará 18$
//Desglosar cada parametro en una estructura JSON(Almacenar), que contenga una clave que nos indeque el valor total a pagar.
// http://localhost:3000/matricula?num1=15&num2=7
app.get('/matricula', (req, resp) => {
    var para = req.query;
    let valVehi = parseFloat(para.valVehi);
    let anio = parseInt(para.anio);
    let placa = para.placa.toUpperCase();
    let multas = parseInt(para.multas);
    let vehi = parseInt(para.vehi); // Número de vehículos
    let responseArray = [];

    // Realizar el cálculo para cada vehículo
    for (let i = 0; i < vehi; i++) {
        let Total = 0;

        // Calculo del año
        let calAnio = 0;
        if (anio >= 2000) {
            calAnio = valVehi * 0.02; // 2%
        } else if (anio < 2000) {
            calAnio = valVehi * 0.05; // 5%
        }

        // Calculo de la provincia
        let calPlaca = 0;
        if (
            placa[0].toUpperCase() === 'I' ||
            placa[0].toUpperCase() === 'C' ||
            placa[0].toUpperCase() === 'E' ||
            placa[0].toUpperCase() === 'S'
        ) {
            calPlaca = 96 * 0.025; // Descuento
        }

        // Multas
        let calMultas = multas * 18; // Multa por cada multa $18

        // Total a pagar
        Total = 96 + calAnio - calPlaca + calMultas;

        // Añadir
        responseArray.push({
            valVehi: valVehi,
            anio: anio,
            placa: placa,
            multas: multas,
            valorBase: 96,
            subsidioContaminacion: calAnio,
            descuentoProvincia: calPlaca,
            multas: calMultas,
            totalPagar: Total
        });
    }

    // Devolver el array de JSON
    resp.json(responseArray);
});



app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');  // Notificación del inicio del server
});
