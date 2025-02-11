
const { useState, useEffect, useRef } = React;

const badWords = [
    'cazzo', 'merda', 'vaffanculo', 'stronzo', 'puttana', 'bastardo', 'dio', 'madonna', 'cristo', 'gesù',
    'porco', 'coglione', 'fanculo', 'troia', 'cagna', 'figa', 'cazzata', 'cazzuto',
    'sballato', 'imbecille', 'testa di cazzo', 'porca miseria', 'che schifo',
    'coglione', 'fanculo', 'troia', 'cagna', 'figa', 'cazzata', 'cazzuto',
    'sballato', 'imbecille', 'testa di cazzo', 'porca miseria', 'che schifo'
];

const ChatbotService = {
    interact: (userId, message) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let response = "";

                // Controllo e gestione delle parolacce
                const lowerCaseMessage = message.toLowerCase();
                const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));

                if (containsBadWord) {
                    response = "Mi dispiace, ma non posso rispondere a quel tipo di linguaggio. Per favore, chiedimi informazioni su email, PEC, telefono, ubicazione, come arrivarci con i mezzi pubblici, parcheggio, orari, servizi, team, prezzi, feedback , moduli pdf o altro.";

                    // Pulisce le parolacce nel messaggio
                    badWords.forEach(word => {
                        const regex = new RegExp(`\\b${word}\\b`, 'gi');
                        message = message.replace(regex, '*'.repeat(word.length));
                    });

                    // Ritorna immediatamente la risposta
                    resolve({
                        assistant_response: response
                    });
                    return; // Interrompe l'esecuzione del resto del codice
                }

                // Matching per le altre richieste
                if (/email|posta elettronica|indirizzo email|scrivimi|contattami via email/i.test(message)) {
                    response = "Puoi contattarci via email all'indirizzo: <a href='mailto:info@riva.it'>info@riva.it</a>";
                } else if (/pec|posta elettronica certificata|contattami via PEC/i.test(message)) {
                    response = "La nostra PEC è: <a href='mailto:infoPec@riva.it'>infoPec@riva.it</a>";
                } else if (/telefono|tel|numero di telefono|cellulare|cell|chiamami|contattami al telefono/i.test(message)) {
                    response = "Puoi chiamarci al Tel.: <a href='tel:+390266715707'>02 6671 5707</a> o al Cell.: <a href='tel:+3290123456789'>+329 0123 456789</a>";
                } else if (/ubicazione|dove siete|indirizzo|posizione|localizzazione|dove vi trovo|mappa|la vostra sede/i.test(message)) {
                    response = "Ecco la nostra ubicazione:";
                    response += `<div class="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.442123456789!2d9.189982315511014!3d45.464203179101846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c76b1d123456%3A0xabcdef1234567890!2sViale%20Delle%20Rimembranze%20Di%20Greco%2C%2055%2C%2020125%20Milano%20MI!5e0!3m2!1sit!2sit!4v1670000000000!5m2!1sit!2sit" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                 </div>`;
                } else if (/come arrivarci|come raggiungervi|indicazioni|come raggiungere|indicazioni stradali|direzioni per arrivare/i.test(message)) {
                    response = `Puoi raggiungerci con i mezzi pubblici:
Autobus: Le linee 43, 81 e 87 hanno fermate nelle vicinanze dello studio.
Metropolitana: La fermata più vicina è "Ca' Granda" sulla linea M5 (lilla), situata a circa 10 minuti a piedi dallo studio.
Treno: La stazione ferroviaria di Milano Greco Pirelli è nelle vicinanze e offre collegamenti regionali.`;
                } else if (/parcheggio|parking|dove parcheggiare|posti auto|come parcheggiare/i.test(message)) {
                    response = `Per il parcheggio:
Supermercato U2 (Unes): Si trova in Via Emilio De Marchi, 10, a circa 240 metri dallo studio.
Indicazioni a piedi: Dal parcheggio Unes, procedere verso sud-est su Via Emilio De Marchi per circa 100 metri, quindi svoltare a sinistra in Viale delle Rimembranze di Greco. Proseguire per circa 140 metri fino al numero 55.`;
                } else if (/orari|quando siete aperti|orari di apertura|orari di lavoro/i.test(message)) {
                    response = "I nostri orari di apertura sono dal lunedì al venerdì, dalle 9:00 alle 18:00.";
                } else if (/servizi|cosa offrite|cosa fate|i vostri servizi|servizi offerti/i.test(message)) {
                    response = "Offriamo servizi di gestione condominiale, consulenza immobiliare e assistenza legale per proprietà.";
                } else if (/team|chi siete|il vostro team|i vostri professionisti/i.test(message)) {
                    response = "Il nostro team è composto da professionisti esperti nel settore immobiliare e gestionale, pronti ad assisterti in ogni necessità.";
                } else if (/prezzi|costi|quanto costa|tariffe|prezzi dei servizi/i.test(message)) {
                    response = "I nostri prezzi sono competitivi e variano in base ai servizi richiesti. Contattaci per un preventivo personalizzato, tramite form (RICHIEDI INFORMAZIONI), oppure al indirizzo email: <a href='mailto:info@riva.it'>info@riva.it</a>";
                } else if (/feedback|recensioni|opinioni|cosa pensano di noi|commenti/i.test(message)) {
                    response = "Puoi leggere le recensioni dei nostri clienti sulla nostra pagina <a href='index.html'>Studio Riva</a>.";
                } else if (/modulo|modelli|pdf|moduli disponibili|documenti|cesimento| modello/i.test(message)) {
                    response = `Ecco i moduli disponibili per il download:
    <ul>
    <li><a href="/pdfs/modulo1.pdf" download="Modulo_1">Censimento</a></li>
    <li><a href="/pdfs/modulo2.pdf" download="Modulo_2">Richiesta soppralluogo</a></li>
    <li><a href="/pdfs/modulo3.pdf" download="Modulo_3">Come inserire la detrazione nel modello 730</a></li>
    </ul>   

    </ul>`;
                } else {
                    response = "Mi dispiace, non ho capito la tua richiesta. Per favore, chiedimi informazioni su email, PEC, telefono, ubicazione, come arrivarci con i mezzi pubblici, parcheggio, orari, servizi, team, prezzi, feedback, moduli pdf o altro.";
                }



                resolve({
                    assistant_response: response
                });
            }, 1000);
        });
    }
};



const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Ciao! Sono Ambrogio, il chatbot di Studio Riva Amministrazione Immobili. Posso aiutarti con informazioni su: email, PEC, telefono, ubicazione, come arrivarci con i mezzi pubblici, parcheggio, orari, servizi, team, prezzi, feedback, moduli detrazione, moduli censimento, moduli pdf e altro. Come posso assisterti oggi?',
        },
    ]);
    const [userInput, setUserInput] = useState('');
    const [chatbotVisible, setChatbotVisible] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const [holdTimeout, setHoldTimeout] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [currentGif, setCurrentGif] = useState(null);
    const [inactivityTimeout, setInactivityTimeout] = useState(null);
    const chatMessagesRef = useRef(null);

    const DEFAULT_GIF =
        'https://tenor.com/view/o2-o2robot-o2ad-bubl-o2bubl-gif-18485862.gif';
    const SENDING_GIF =
        'https://tenor.com/it/view/o2-o2robot-o2ad-bubl-o2bubl-gif-18419086.gif';
    const INACTIVITY_GIF =
        'https://tenor.com/it/view/o2-bubl-robot-blue-bubble-gif-23294584.gif';

    useEffect(() => {
        setCurrentGif(DEFAULT_GIF);

        return () => {
            if (holdTimeout) {
                clearTimeout(holdTimeout);
            }
            if (inactivityTimeout) {
                clearTimeout(inactivityTimeout);
            }
        };
    }, [holdTimeout, inactivityTimeout]);

    const startHold = () => {
        setIsHolding(true);
        setIsAnimating(true);

        const timeout = setTimeout(() => {
            openChatbot();
            setIsHolding(false);
        }, 2000);
        setHoldTimeout(timeout);
    };

    const endHold = () => {
        if (holdTimeout) {
            clearTimeout(holdTimeout);
        }
        setIsHolding(false);

        if (!chatbotVisible) {
            setIsAnimating(false);
        }
    };

    const cancelHold = () => {
        endHold();
    };

    const openChatbot = () => {
        setChatbotVisible(true);
        setCurrentGif(DEFAULT_GIF);
        resetInactivityTimer();

        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    const closeChatbot = () => {
        setChatbotVisible(false);
        setCurrentGif(null);
        if (inactivityTimeout) {
            clearTimeout(inactivityTimeout);
        }
    };

    const sendMessage = () => {
        if (userInput.trim() === '') return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: userInput },
        ]);
        scrollToBottom();

        setCurrentGif(SENDING_GIF);
        resetInactivityTimer();

        const userMessage = userInput.trim();
        setUserInput('');
        setIsTyping(true);

        ChatbotService.interact(getUserId(), userMessage)
            .then((response) => {
                setIsTyping(false);

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'assistant', content: response.assistant_response },
                ]);
                scrollToBottom();

                setCurrentGif(DEFAULT_GIF);
                resetInactivityTimer();
            })
            .catch((error) => {
                console.error('Error interacting with backend:', error);
                setIsTyping(false);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        role: 'assistant',
                        content:
                            "Mi dispiace, c'è stato un errore nell'interagire con l'assistente. Riprova più tardi.",
                    },
                ]);
                scrollToBottom();
                resetInactivityTimer();
            });
    };

    const resetInactivityTimer = () => {
        if (inactivityTimeout) {
            clearTimeout(inactivityTimeout);
        }
        const timeout = setTimeout(() => {
            setCurrentGif(INACTIVITY_GIF);
        }, 10000);
        setInactivityTimeout(timeout);
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop =
                    chatMessagesRef.current.scrollHeight;
            }
        }, 100);
    };

    const getUserId = () => {
        return 1;
    };

    return (
        <div
            className={`chatbot-wrapper ${isHolding ? 'holding' : ''} ${chatbotVisible ? 'visible' : ''
                } ${isAnimating ? 'animating' : ''}`}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            aria-label="Chatbot"
        >
            {!chatbotVisible && !isAnimating && (
                <div className="icon-container">💬</div>
            )}

            {isAnimating && (
                <div className="animation-container">
                    <img
                        src="https://tenor.com/view/o2-o2robot-o2ad-bubl-o2bubl-gif-18485851.gif"
                        alt="Chat Opening Animation"
                        className="opening-animation"
                    />
                </div>
            )}

            {chatbotVisible && (
                <div className="chat-container visible-chat">
                    <div className="chat-header">
                        <div className="header-left">
                            <div className="header-gif-container">
                                {currentGif && (
                                    <img
                                        src={currentGif}
                                        alt="Animation"
                                        className="header-gif"
                                    />
                                )}
                            </div>
                            <div className="header-info">
                                <h4>Ambrogio</h4>
                                <span className="status-dot"></span>
                            </div>
                        </div>

                        <button
                            className="close-button"
                            onClick={closeChatbot}
                            aria-label="Chiudi Chatbot"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="close-icon"
                            >
                                <path d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29a1 1 0 00-1.42 1.42L10.83 12l-5.12 5.12a1 1 0 001.42 1.42L12 14.83l4.88 4.88a1 1 0 001.42-1.42L13.17 12l5.12-5.12z" />
                            </svg>
                        </button>
                    </div>

                    <div id="chatMessages" className="chat-messages" ref={chatMessagesRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'
                                    }`}
                            >
                                <div className="message-content" dangerouslySetInnerHTML={{ __html: message.content }}></div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="typing-indicator">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        )}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={userInput}
                            placeholder="Scrivi un messaggio..."
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') sendMessage();
                            }}
                        />
                        <button onClick={sendMessage} aria-label="Invia Messaggio">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="send-icon"
                            >
                                <path d="M4.01 20.99L4 19l16-7-16-7v5l12 2-12 2v5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<Chatbot />, document.getElementById('chatbot-root'));

