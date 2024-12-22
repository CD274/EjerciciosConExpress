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
function esTrinomioCP(a, b, c) {
    const discriminante = b ** 2;
    const producto = 4 * a * c;
    return discriminante === producto;
}

// Convierte el trinomio en un binomio cuadrado perfecto
function converBi(a, b, c) {
    const m = Math.sqrt(Math.abs(a));
    const n = Math.sqrt(Math.abs(c));
    const signo = b > 0 ? '+' : '-';

    return {
        binomio: `(${m}x ${signo} ${Math.abs(n)})²`,
        m: m,
        n: signo === '+' ? n : -n
    };
}

// Resuelve el binomio cuadrado perfecto
function resolverBinomio(m, n) {
    const x = -n / m;
    return x;
}

// Formatea el trinomio eliminando redundancias de signos
function formatearTrinomio(a, b, c) {
    const signoB = b >= 0 ? `+${b}` : `${b}`;
    const signoC = c >= 0 ? `+${c}` : `${c}`;
    return `${a}x² ${signoB}x ${signoC}`;
}

// Genera las combinaciones de signos posibles
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

// Ruta GET
app.get('/trinomios/:a/:b/:c', (req, resp) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const c = parseFloat(req.params.c);

    const combinaciones = generarCombinaciones(a, b, c);
    const resultados = [];

    combinaciones.forEach(({ a, b, c }) => {
        const trinomio = formatearTrinomio(a, b, c);

        if (esTrinomioCP(a, b, c)) {
            const { binomio, m, n } = converBi(a, b, c);
            const x = resolverBinomio(m, n);

            resultados.push({
                trinomio: trinomio,
                mensaje: `Es un trinomio cuadrado perfecto.`,
                binomio: binomio,
                solucion: `x = ${x}`
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


app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');  // Notificación del inicio del server
});
