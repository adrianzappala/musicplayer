const tituloCancion = document.querySelector('.reproductor-musica h1')
const nombreArtista = document.querySelector('.reproductor-musica p') 

const cancion = document.getElementById('cancion'); 

const iconoControl = document.getElementById('iconoControl')
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const canciones = [
    {
        titulo:'Money',
        nombre:'Pink Floyd',
        fuente:'music/Pink Floyd-Money.mp3'  
    },
    {
        titulo:'God Only Knows',
        nombre:'The Beach Boys', 
        fuente:'music/The Beach Boys-God Only Knows.mp3'     
    },
    {
        titulo:'Bohemian Rhapsody',
        nombre:'Queen', 
        fuente:'music/Queen-Bohemian Rhapsody.mp3'     
    }

];

let indiceCancionActual = 0; 

function actualizarInfoCancion() { 
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;

    nombreArtista.textContent = canciones[indiceCancionActual].nombre;

    cancion.src = canciones[indiceCancionActual].fuente;

    cancion.addEventListener('loadeddata', function(){});    
};


cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime; 
});



botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar() {
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion(); 
        }
}

function reproducirCancion() {
    cancion.play() 
    iconoControl.classList.add('bi-pause-fill')
    iconoControl.classList.remove('bi-play-fill')
}

function pausarCancion(){
    cancion.pause();
    iconoControl.classList.remove('bi-pause-fill')
    iconoControl.classList.add('bi-play-fill')
}

cancion.addEventListener('timeupdate',function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

botonAdelante.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length; 
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length; 
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();