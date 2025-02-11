// js/script.js

// 1. Inizializza AOS al caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,    // Le animazioni avvengono una sola volta
        mirror: false  // Non ri-animare elementi in scroll inverso
    });
});

// 2. Inizializza Smooth Scroll e assegna a window.scrollInstance
window.scrollInstance = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true,
    offset: document.querySelector('.navbar').offsetHeight // Calcola dinamicamente l'offset in base all'altezza della navbar
});

// ---------- Animazione Header ----------
const header = document.querySelector('header');
const headerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const headerH1 = header.querySelector('h1');
        if (entry.isIntersecting) {
            header.classList.add('visible');
            headerH1.classList.add('active');
        } else {
            header.classList.remove('visible');
            headerH1.classList.remove('active');
        }
    });
}, { threshold: 0.5 });

headerObserver.observe(header);

// ---------- Funzione manuale per animare i contatori da 0 al valore target ----------
function animateCounter(element, start, end, duration) {
    // Utilizza requestAnimationFrame per un'animazione più fluida
    const range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const fraction = Math.min(progress / duration, 1);
        // Calcolo del valore intermediario
        const currentValue = start + Math.floor(range * fraction);
        element.textContent = currentValue;

        // Se non ha raggiunto la fine, ripeti
        if (fraction < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    }
    window.requestAnimationFrame(step);
}

// ---------- Intersection Observer per avviare i contatori solo una volta ----------
const statsSection = document.querySelector('.statistics');
const statItems = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statItems.forEach(item => {
                const finalValue = parseInt(item.getAttribute('data-target'));
                animateCounter(item, 0, finalValue, 2000); // 2 secondi per arrivare al valore
            });
            // Smetti di osservare la sezione dopo la prima animazione
            statsObserver.unobserve(statsSection);
        }
    });
}, { threshold: 0.3 });

statsObserver.observe(statsSection);

// ---------- Bottone "Richiedi Informazioni": Appare Solo Durante lo Scroll ----------
const floatingFormBtn = document.querySelector('.floating-form-btn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        floatingFormBtn.classList.add('show');
    } else {
        floatingFormBtn.classList.remove('show');
    }
});

// ---------- Funzione per caricare e duplicare le testimonianze ----------
function loadTestimonials() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (!testimonialContainer) return;

    // Svuota il contenitore
    testimonialContainer.innerHTML = '';

    // Funzione shuffle per mescolare l'array
    function shuffle(array) {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // Mescola e seleziona solo 10 testimonianze
    // allTestimonials viene da testimonianze.js
    const shuffled = shuffle([...allTestimonials]);
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    // Crea un elemento <div> per ogni testimonianza e lo inserisce nel container
    function createTestimonialHTML(testimonial) {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testimonial');
        testimonialDiv.setAttribute('data-aos', 'fade-up');
        testimonialDiv.innerHTML = `
            <div class="stars">
                ${'⭐'.repeat(testimonial.stars)}
            </div>
            <div class="user">${testimonial.user}</div>
            <p>"${testimonial.text}"</p>
        `;
        return testimonialDiv;
    }

    // Inserisci le 10 testimonianze scelte
    selected.forEach(testimonial => {
        testimonialContainer.appendChild(createTestimonialHTML(testimonial));
    });

    // Duplica le stesse 10 per lo scorrimento "infinito" orizzontale
    selected.forEach(testimonial => {
        testimonialContainer.appendChild(createTestimonialHTML(testimonial));
    });

    // Re-inizializza AOS per i nuovi elementi
    AOS.refresh();
}

// Carica le testimonianze alla prima visualizzazione
loadTestimonials();

// Rotazione automatica delle testimonianze ogni 1 minuto (60.000 ms)
setInterval(loadTestimonials, 60000);

// ---------- Animazione Testimonianze (Fade-in graduale) ----------
const testimonialsSection = document.querySelector('.testimonials');
if (testimonialsSection) {
    const testimonialsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const testimonials = document.querySelectorAll('.testimonial');
                testimonials.forEach((testimonial, index) => {
                    testimonial.classList.add('visible');
                    // Aggiunge un piccolo delay tra un testimonial e l'altro
                    testimonial.style.transitionDelay = `${index * 100}ms`;
                });
            }
        });
    }, { threshold: 0.3 });
    testimonialsObserver.observe(testimonialsSection);
}


