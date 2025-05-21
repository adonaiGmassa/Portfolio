/*By Radcircles*/


// Sélectionner le formulaire et les éléments d'affichage
const form = document.getElementById('contactForm');
const confirmationMessage = document.getElementById('confirmationMessage');
const errorMessage = document.getElementById('errorMessage');


// Fonction pour valider le formulaire
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher l'envoi du formulaire par défaut

    // Récupérer les valeurs des champs
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Réinitialiser les messages d'erreur ou de confirmation
    confirmationMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Validation des champs
    if (nom === '' ||prenom === '' || email === '' || message === '') 
        {
            errorMessage.style.display = 'block'; // Afficher le message d'erreur
        } 
        else
        {
        // Afficher le message de confirmation et réinitialiser le formulaire
        confirmationMessage.style.display = 'block';
        form.reset(); // Réinitialiser le formulaire après envoi
        }
        
});
