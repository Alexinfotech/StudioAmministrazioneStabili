document.addEventListener("DOMContentLoaded", () => {
    const chatbotRoot = document.querySelector("#chatbot-root");

    if (chatbotRoot) {
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop || currentScroll > 200) {
                // Scroll verso il basso o lontano dalla parte superiore: nascondi il bottone
                chatbotRoot.classList.remove("visible");
                chatbotRoot.classList.add("hidden");
            } else if (currentScroll <= 200) {
                // Vicino alla parte superiore: mostra il bottone
                chatbotRoot.classList.remove("hidden");
                chatbotRoot.classList.add("visible");
            }

            lastScrollTop = Math.max(0, currentScroll); // Evita valori negativi
        });
    }
});
