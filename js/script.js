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
    if(indexLettre<txt[txtIndex].length){
        txtElement.innerHTML += txt[txtIndex].charAt(indexLettre)
        indexLettre++
        setTimeout(typeWriter,vitesse)
    }
    else{
        setTimeout(eraseText,1000)
    }
}
function eraseText(){}