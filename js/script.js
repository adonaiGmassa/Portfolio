//By Radcircles
const txtsTypewrite=[]
const txtElement=document.querySelector(".typewriter-text")
let vitesse= 100;
let txtIndex = 0
let indexLettre = 0

function hamburg(){
    const NAVBAR = document.querySelector(".Menu-deroulant")
    NAVBAR.style.transform = "translateY(0px)";  
}

function ferme(){
    const NAVBAR = document.querySelector(".Menu-deroulant")
    NAVBAR.style.transform = "translateY(-500px)"
}
function typeWriter(){
    if(indexLettre < txtsTypewrite[txtIndex].length){
        txtElement.innerHTML += txtsTypewrite[txtIndex].charAt(indexLettre)
        indexLettre++
        setTimeout(typeWriter,vitesse)
    }
    else{
        setTimeout(eraseText,1000)// Attente de 1 seconde avant de commencer à effacer
    }
}

// Fonction pour effacer le texte
function eraseText() {
    if (txtElement.innerHTML.length) {
        // Efface une lettre à la fois
        txtElement.innerHTML = txtElement.innerHTML.slice(0, -1); 
        indexLettre--; // Réduire l'index de la lettre
        setTimeout(eraseText, 50); // Vitesse d'effacement
    } else {
        // Passer au texte suivant
        txtIndex = (txtIndex + 1) % txtsTypewrite.length; // Tourner entre les textes
        indexLettre = 0; // Réinitialiser l'index des lettres
        setTimeout(typeWriter, 500); // Attendre 0.5 seconde avant de commencer à écrire le prochain texte
    }
}