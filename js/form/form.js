AOS.init({
    duration: 800,
    once: false,
    easing: 'ease-in-out',
});

new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true
});
/*
function scrollToMessage() {
    const message = document.getElementById('formMessage');
    if (message) {
        message.scrollIntoView({ behavior: 'smooth' });
    }
}

(function () {
    'use strict'

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (contactForm.checkValidity()) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';

            setTimeout(() => {
                const nome = document.getElementById('nome').value.trim();
                const email = document.getElementById('email').value.trim();
                const telefono = document.getElementById('telefono').value.trim();
                const messaggio = document.getElementById('messaggio').value.trim();

                formMessage.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        Grazie, <strong>${nome}</strong>! La tua richiesta è stata inviata con successo. Ti contatteremo al più presto.
                    </div>
                `;

                contactForm.reset();
                contactForm.classList.remove('was-validated');

                submitBtn.disabled = false;
                submitBtn.textContent = 'Invia Richiesta';

                scrollToMessage();
            }, 1500);
        } else {
            contactForm.classList.add('was-validated');
        }
    }, false)
})();
*/



(function () {
    'use strict';

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    function scrollToMessage() {
        if (formMessage) {
            formMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (contactForm.checkValidity()) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';

            const formData = new FormData(contactForm);

            // Invia i dati al server
            fetch('js/form/send_email.php', {
                method: 'POST',
                body: formData
            })
                // Prima leggo come testo
                .then(async response => {
                    // Se HTTP status non è ok, potrebbe essere 404/500
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(
                            `HTTP Error: ${response.status}\n\n` +
                            `Contenuto: ${errorText}`
                        );
                    }
                    return response.text(); // Leggo comunque come testo
                })
                .then(text => {
                    // Tenterò di parsare come JSON
                    try {
                        const data = JSON.parse(text);
                        return data; // Se tutto ok, restituisco l'oggetto
                    } catch (e) {
                        // Non è JSON; lo mostro grezzo
                        throw new Error('La risposta non è in JSON:\n' + text);
                    }
                })
                .then(data => {
                    // Gestisco i dati JSON
                    if (data.status === 'success') {
                        formMessage.innerHTML = `
                <div class="alert alert-success" role="alert">
                  Grazie, <strong>${formData.get('nome')}</strong>! 
                  La tua richiesta è stata inviata con successo.
                </div>
              `;
                        contactForm.reset();
                    } else {
                        formMessage.innerHTML = `
                <div class="alert alert-danger" role="alert">
                  Si è verificato un errore: ${data.message}
                </div>
              `;
                    }
                    contactForm.classList.remove('was-validated');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Invia Richiesta';
                    scrollToMessage();
                })
                .catch(error => {
                    // Se c’è un errore di rete, di parse JSON, o di HTTP
                    formMessage.innerHTML = `
              <div class="alert alert-danger" role="alert">
                Errore: ${error.message}
              </div>
            `;
                    contactForm.classList.remove('was-validated');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Invia Richiesta';
                    scrollToMessage();
                });
        } else {
            contactForm.classList.add('was-validated');
        }
    }, false);
})();
