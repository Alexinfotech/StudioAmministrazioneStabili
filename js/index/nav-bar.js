// nav-bar.js

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const directLinks = document.querySelectorAll('.direct-link');
    const headerText = document.getElementById('header-text');
    const headerElement = document.getElementById('home');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    // Testo originale dell'header (default)
    window.originalHeaderText = window.originalHeaderText ||
        `Benvenuti nello Studio d'Eccellenza per l'Amministrazione Condominiale.
         Gestione accurata, trasparenza e professionalità al vostro servizio.`;

    // Mappa dei testi personalizzati (se presente)
    // ESEMPIO: window.headerTexts = { "chi-siamo": "Un team di professionisti...", ... }

    let isProgrammaticScroll = false;

    // Chiude tutti i dropdown
    const closeAllDropdowns = () => {
        navItems.forEach(item => item.classList.remove('active'));
    };

    // Cambia il contenuto dell'header con un piccolo effetto di fade
    const changeHeaderContent = (newContent) => {
        if (headerText.innerHTML.trim() === newContent.trim()) return;

        headerText.classList.remove('fade-in');
        headerText.classList.add('fade-out');

        setTimeout(() => {
            headerText.innerHTML = newContent;
            headerText.classList.remove('fade-out');
            headerText.classList.add('fade-in');
        }, 500); // Durata della transizione .fade-out in CSS
    };

    // Scrolla in modo fluido all'header
    const scrollToHeader = () => {
        isProgrammaticScroll = true;
        headerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            isProgrammaticScroll = false;
        }, 1000); // Il tempo necessario per lo scroll
    };

    // Listener per i link diretti
    directLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const newContent = (window.headerTexts && window.headerTexts[targetId])
                ? window.headerTexts[targetId]
                : window.originalHeaderText;

            changeHeaderContent(newContent);
            scrollToHeader();
        });
    });

    // Listener per i link nei dropdown
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const newContent = (window.headerTexts && window.headerTexts[targetId])
                ? window.headerTexts[targetId]
                : window.originalHeaderText;

            changeHeaderContent(newContent);
            scrollToHeader();
            closeAllDropdowns();
        });
    });

    // Attiva/chiude i dropdown al click
    navItems.forEach(item => {
        const navLink = item.querySelector('.nav-link:not(.direct-link)');
        if (navLink) {
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                closeAllDropdowns();
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Se l'utente scrolla manualmente, ripristina testo originale (se esce dall'header)
    window.addEventListener('scroll', () => {
        if (!isProgrammaticScroll) {
            const headerBottom = headerElement.getBoundingClientRect().bottom;
            if (headerBottom <= navbarHeight) {
                changeHeaderContent(window.originalHeaderText);
            }
        }
    });
});
