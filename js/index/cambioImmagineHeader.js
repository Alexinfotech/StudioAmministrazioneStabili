// cambioImmagineHeader.js

document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('header');
    if (!headerElement) return;

    const images = [
        'images/header/foto50.jpg',
        'images/header/fotoH1.jpg',
        'images/header/fotoH2.jpg',
        'images/header/fotoH3.jpg',
        'images/header/fotoH4.jpg'
    ];

    let currentIndex = 0;

    // Cambia gradualmente lo sfondo dell'header
    function changeHeaderBackground() {
        currentIndex = (currentIndex + 1) % images.length;
        headerElement.style.setProperty('--next-background', `url('${images[currentIndex]}')`);

        // Applica l'effetto "tendina" (puoi sostituirlo con fade, slide, ecc.)
        headerElement.classList.add('tendina');

        setTimeout(() => {
            // Aggiorna l'immagine di sfondo effettiva
            headerElement.style.backgroundImage = `
                linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                url('${images[currentIndex]}')`;

            // Rimuove la classe di transizione
            headerElement.classList.remove('tendina');
        }, 1500); // Deve corrispondere alla durata della transizione
    }

    // Cambia sfondo ogni 30 secondi
    setInterval(changeHeaderBackground, 30000);
});
