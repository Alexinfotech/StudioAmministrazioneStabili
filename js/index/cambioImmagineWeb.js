// cambioImmagineWeb.js

document.addEventListener('DOMContentLoaded', () => {
    const photoItems = [
        {
            imgId: 'pulizie',
            images: [
                'images/gallery/pulizia/puli.jpeg',
                'images/gallery/pulizia/puli2.jpeg',
                'images/gallery/pulizia/puli3.jpeg'
            ]
        },
        {
            imgId: 'riunioni',
            images: [
                'images/gallery/riunioni/rio.jpeg',
                'images/gallery/riunioni/rio2.jpeg',
                'images/gallery/riunioni/rio3.jpeg'
            ]
        },
        {
            imgId: 'team',
            images: [
                'images/gallery/team/team.jpeg',
                'images/gallery/team/team2.jpeg',
                'images/gallery/team/team3.jpeg'
            ]
        }
    ];

    function changeImageWithCurtain(item) {
        const imgElement = document.getElementById(item.imgId);
        if (!imgElement) return; // Verifica che l'elemento esista

        // Trova l'indice dell'immagine corrente
        let currentIndex = item.images.indexOf(imgElement.getAttribute('src'));
        if (currentIndex === -1) currentIndex = 0; // Se non trovato, reimposta a 0

        // Passa all'immagine successiva
        currentIndex = (currentIndex + 1) % item.images.length;
        const newSrc = item.images[currentIndex];

        // Aggiunge la classe di animazione "sipario"
        imgElement.classList.add('curtain-effect');

        // Al termine dell'animazione, cambia la src e rimuovi la classe
        setTimeout(() => {
            imgElement.setAttribute('src', newSrc);
            imgElement.classList.remove('curtain-effect');
        }, 1000); // Durata dell'animazione in ms
    }

    // Imposta un intervallo di 5 secondi per ciascun gruppo di immagini
    function startImageRotation(items) {
        items.forEach(item => {
            setInterval(() => {
                changeImageWithCurtain(item);
            }, 5000);
        });
    }

    startImageRotation(photoItems);
});
