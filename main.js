//Variables

let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let pares = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivo = null;

//documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('pares');
let mostrarTiempo = document.getElementById('tiempo');


//generacion numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function contarTiempo(){
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML= `Tiempo: ${timer}`;
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let index = 0; index <= 19; index++) {
        let tarjetaBloqueada = document.getElementById(index);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[index]}.png" alt=""></img>`;
        tarjetaBloqueada.disabled = true;
        
    }
}

if(tarjetasDestapadas == 0){}


//Funcion pricipal

function destapar(id){

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        // mostrar primera tarjeta
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt=""></img>`;

        //deshabilitar contador
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        // mostrar segunda tarjeta
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt=""></img>`;

        //deshabilitar contador
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        
        if(primerResultado == segundoResultado){
            //comparacion de resultados de numeros - tarjetas

            tarjetasDestapadas = 0;

            //aumento de aciertos
            pares++;
            mostrarAciertos.innerHTML = `Pares: ${pares}`;

            if(pares == 10){
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Pares: ${pares}`
                mostrarTiempo.innerHTML = `Genial, te has demorado ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }
        }else{
            // mostrar cartas y volver a tapar

            setTimeout(()=>{
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjeta1.innerHTML = `<img src="./img/Sprite-cartatrasera.png" alt=""></img>`;
                tarjeta2.innerHTML = `<img src="./img/Sprite-cartatrasera.png" alt=""></img>`;

                tarjetasDestapadas = 0;
            },500);
        }
    }else{
        taparTarjeta();
    }
}