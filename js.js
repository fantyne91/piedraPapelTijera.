// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

/**
 * Variables
 */
let nombreValue;
let eleccionJugador;
let totalPartidas;
let actualPartida = 0;

/*
 * LLAMAMOS A LOS NODOS HTML, ASIGNAMOS LOS VALORES SEGUN LO INTRODUCIDO EN FORMULARIO
 ! SELECCIONAMOS EL  VALOR segun indice [] y CREAMOS EVENTO CON LISTENER ANIDANDO LA FUNCION
 */

const nombre = document.getElementsByName('nombre');
const partidas = document.getElementsByName('partidas');
const boton = document.getElementsByTagName('button');
boton[0].addEventListener("click", jugar);


//segun hagamos click, llamaremos a la funcion select 
//y se insertar� como argumento el valor asignado
const img = document.getElementsByTagName('img');  
img[0].addEventListener("click", () => select('piedra'));
img[1].addEventListener("click", () => select('papel'));
img[2].addEventListener("click", () => select('tijera'));

/**
 * Funcion que valida si un nommbre tiene mas 
 * de tres caracteres y que el primer caracter
 * no sea numerico
 */
function validaNombre() {
    nombreValue = nombre[0].value;  
    /// SI EL 1r CARACTER ES NUMERO, (^[a-zA-Z]+$/ para match con letras)
    const numberRegEx = /^[0-9]+$/;
     //SI HACE MATCH  o ES MENOR 3 NO PUEDE JUGAR
    if ((nombreValue.length < 3 ) || nombreValue.charAt(0).match(numberRegEx)) {                    
        nombre[0].classList.add('fondoRojo');
        return false;
      
    }else {// si nombre pasa la validacion borrar� el color de error y estara disabled
        nombre[0].classList.remove('fondoRojo');
        nombre[0].disabled = true;
        return true;
    } 
};

/**
 * Funci?n que evalua que el numerio de partidas
 * sea mayor que 0
 */
function validaPartidas() {
    const partidasValue = partidas[0].value;
    //SI PARTIDAS >0 
        if ((partidasValue <= 0)) {
        partidas[0].classList.add('fondoRojo');
        return false;
    } else {
        partidas[0].disabled = true;
        partidas[0].classList.remove('fondoRojo');
        return true;
    };
};

/**
 * Funcion donde se habilita el cominezo de la partida.
 * El jugador debe seleciconar una opci�n
 */
function jugar() {
    //limpiamos las clases y dejamos todas la imagenes sin seleccionar
    img[0].classList.remove('seleccionado');
    img[0].classList.add('noSeleccionado');

    const indicadorJugador = 'Jugador';
    const extension = '.png';
    //Cambiamos imagenes que estaban default llamandolas 
    //por la array posibilidades+indicador+extension   
    img[0].src = `img/${posibilidades[0]}${indicadorJugador}${extension}`;   
    img[1].src = `img/${posibilidades[1]}${indicadorJugador}${extension}`;
    img[2].src = `img/${posibilidades[2]}${indicadorJugador}${extension}`;

    // Ejecutamos la funcion de validar nombre
    validaNombre();
    // Ejecutamos la funcion de validar partidas
    validaPartidas();
    //establecemos en la variable totalPartidas el valor introducido por jugador
    if(validaNombre() === true && validaPartidas() === true) {
        document.getElementById('total').innerText = partidas[0].value;
        totalPartidas = partidas[0].value;

        //Habilitamos el boton YA y el Boton RESET
        boton[1].addEventListener("click", ya);
        boton[2].addEventListener("click", reset);
    }
};
 
/**
 * Funci�n que determina la imagen seleccionada con click por jugador
 * @param {String} imgSelected 
 */
function select(imgSelected){
    if(imgSelected === 'piedra') {
        eleccionJugador = 'piedra';
        img[0].classList.add('seleccionado');
        img[0].classList.remove('noSeleccionado');
    }else {
        img[0].classList.add('noSeleccionado');
        img[0].classList.remove('seleccionado');
    }

    if(imgSelected === 'papel') {
        eleccionJugador = 'papel';
        img[1].classList.add('seleccionado');
        img[1].classList.remove('noSeleccionado');
    }else {
        img[1].classList.add('noSeleccionado');
        img[1].classList.remove('seleccionado');
    }

    if(imgSelected === 'tijera') {
        eleccionJugador = 'tijera';
        img[2].classList.add('seleccionado');
        img[2].classList.remove('noSeleccionado');
    }else {
        img[2].classList.add('noSeleccionado');
        img[2].classList.remove('seleccionado');
    }
};
/**
 * Funcion que genera el array de posibles imagenes para el ordenador
 * cambiando el src de la imagen default
 * @returns {Array<String>}
 */
 function createOrdenadorAarray () {
    const indicadorOrdenador = 'Ordenador';
    const extension = '.png';
    return [
        `img/${posibilidades[0]}${indicadorOrdenador}${extension}`,
        `img/${posibilidades[1]}${indicadorOrdenador}${extension}`,
        `img/${posibilidades[2]}${indicadorOrdenador}${extension}`
    ];
}
/**
 * Funci�n que lanza la partida
 * usa el valor de azar a traves funcion partida
 */
function ya(){
    if (actualPartida<totalPartidas){
  
    contador();
    const ordenadorArr = createOrdenadorAarray();

    //CAMBIAMOS LA IMAGEN DE MAQUINA AL AZAR
    const azar = (Math.floor(Math.random()*ordenadorArr.length));       
    img[3].src =  ordenadorArr[azar];

    partida(azar);
    }else{
        reset();
       // document.getElementById("historial").innerHTML += `<li>fin de la partida</li>`
    }

};
var hist = document.getElementById("historial");
/**
 * Funcion donde se establece el vencedor o si es empate
 * @param {String} seleccionadoPC 
 */
function partida(seleccionadoPC) {
    let eleccionPC;
    
    console.log('eleccionJugador: ' + eleccionJugador);
    if(createOrdenadorAarray()[seleccionadoPC].includes('piedra')) eleccionPC = 'piedra';
    if(createOrdenadorAarray()[seleccionadoPC].includes('papel')) eleccionPC = 'papel';
    if(createOrdenadorAarray()[seleccionadoPC].includes('tijera')) eleccionPC = 'tijera';
    

      // ir cambiando el valor de texto segun quien gane
      var ganaJugador = 'Gana ' + nombreValue;
      var ganaOrdenador = 'Gana ordenador';

    if (eleccionJugador===eleccionPC){ 
        document.getElementById('historial').innerHTML += `<li>Empate</li>`;
    }else if(eleccionJugador === 'piedra'){
        if(eleccionPC==='papel')  hist.innerHTML += `<li>${ganaOrdenador}</li>`;
        if(eleccionPC==='tijera') hist.innerHTML += `<li>${ganaJugador}</li>`;
    
    }else if(eleccionJugador==='papel'){
        if (eleccionPC==='piedra') hist.innerHTML += `<li>${ganaJugador}</li>`;
        if (eleccionPC==='tijera') hist.innerHTML += `<li>${ganaOrdenador}</li>`;

    }else if(eleccionJugador==='tijera'){
        if (eleccionPC==='piedra') hist.innerHTML += `<li>${ganaOrdenador}</li>`;
        if (eleccionPC==='papel') hist.innerHTML += `<li>${ganaJugador}</li>`;
    }
}

/**
 * Funcion que va contando las partidas jugadas
 */
function contador(){      
    if(actualPartida < totalPartidas) {
        actualPartida = actualPartida + 1;
        document.getElementById('actual').innerText = actualPartida;
    };
};

/**
 * Funcion que reestablece la partida
 */
 function reset() {
    partidas[0].value = 0;
    actualPartida = 0;
    totalPartidas = 0;
    document.getElementById('actual').innerText=actualPartida;
    document.getElementById('total').innerText=totalPartidas;
    // Reseteamos todas la imagenes seleccionadas
    img[0].classList.remove('seleccionado');
    img[1].classList.remove('seleccionado');
    img[2].classList.remove('seleccionado');
    img[0].classList.add('noSeleccionado');
    img[1].classList.add('noSeleccionado');
    img[2].classList.add('noSeleccionado');

    //la imagen por defecto en la opci�n de la m�quina
    img[3].src = 'img/defecto.png';
    //volvemos a activar Partidas y reseteamos historial
    nombre[0].disabled = false;
    partidas[0].disabled = false; 

    hist.innerHTML="";
   
      
    
};
