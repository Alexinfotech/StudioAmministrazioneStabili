/******************************************************
 * ESEMPIO DI POSSIBILE IMPORT DI LIBRERIE CHE TI 
 * AIUTANO A SIMULARE UN COMPORTAMENTO PIÙ "AI"        *
 ******************************************************/
// import ChatBot from 'react-simple-chatbot';     // Esempio: libreria semplice
// import { useChatbot } from 'react-chatbot-kit';  // Esempio: libreria con più funzionalità
// import { Configuration, OpenAIApi } from "openai"; // Esempio: integrazione API OpenAI

/******************************************************
 * ESEMPIO DI CONFIGURAZIONE SE USASSI openai          *
 * (In un progetto reale dovresti specificare la tua   *
 * chiave in modo sicuro, mai in chiaro nel codice)    *
 ******************************************************/
// const configuration = new Configuration({
//   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

/******************************************************
 * NOTA: Le righe di cui sopra sono solo suggerimenti
 * per arricchire il bot con librerie IA. Il codice
 * seguente rimane integralmente riscritto e mantiene
 * la logica originale. Puoi usare questi spunti per
 * rendere il bot più "intelligente".
 ******************************************************/
/* CHATBOT.JS*/

const { useState, useEffect, useRef } = React;

// Lista di parole offensive senza duplicati
const badWords = [
    'cazzo', 'merda', 'vaffanculo', 'stronzo', 'puttana', 'bastardo',
    'dio', 'madonna', 'cristo', 'gesù', 'porco', 'coglione',
    'fanculo', 'troia', 'cagna', 'figa', 'cazzata', 'cazzuto',
    'sballato', 'imbecille', 'testa di cazzo', 'porca miseria', 'che schifo'
];

// Funzione per pulire il testo dalle parolacce
const cleanMessage = (message) => {
    return badWords.reduce((acc, word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        return acc.replace(regex, '*'.repeat(word.length));
    }, message);
};

// Servizio del Chatbot
const ChatbotService = {
    interact: (userId, message, userName, awaitingName) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let response = "";

                // Controllo e gestione delle parolacce
                const lowerCaseMessage = message.toLowerCase();
                const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));

                if (containsBadWord) {
                    response = `Mi dispiace, ${userName || 'amico'}, ma non posso rispondere a quel tipo di linguaggio. Per favore, chiedimi informazioni su email, PEC, telefono, ubicazione, come arrivarci con i mezzi pubblici, parcheggio, orari, servizi, team, prezzi, feedback, moduli pdf o altro.`;

                    // Pulisce le parolacce nel messaggio
                    const cleanedMessage = cleanMessage(message);

                    // Log del messaggio pulito (opzionale)
                    console.log(`Messaggio pulito: ${cleanedMessage}`);

                    resolve({
                        assistant_response: response
                    });
                    return;
                }

                // Se il chatbot sta aspettando il nome dell'utente
                if (awaitingName) {
                    // Cerca frasi come "mi chiamo [Nome]" o "sono [Nome]"
                    let nameMatch = message.trim().match(/^(?:mi chiamo|sono)\s+([A-Za-zÀ-ÿ]+)/i);
                    if (nameMatch && nameMatch[1]) {
                        const extractedName = nameMatch[1];
                        response = `Piacere di conoscerti, ${extractedName}! Come posso aiutarti oggi?`;
                        resolve({
                            assistant_response: response,
                            user_name: extractedName,
                            awaiting_name: false
                        });
                        return;
                    }

                    // Se non trova una frase chiave, verifica se l'input è un nome
                    nameMatch = message.trim().match(/^([A-Za-zÀ-ÿ]+)$/i);
                    if (nameMatch && nameMatch[1]) {
                        const extractedName = nameMatch[1];
                        response = `Piacere di conoscerti, ${extractedName}! Come posso aiutarti oggi?`;
                        resolve({
                            assistant_response: response,
                            user_name: extractedName,
                            awaiting_name: false
                        });
                        return;
                    }

                    // Lista di saluti comuni da ignorare
                    const saluti = ['ciao', 'salve', 'buongiorno', 'buonasera', 'hey', 'hola', 'hi'];
                    if (saluti.includes(message.trim().toLowerCase())) {
                        response = `Mi piacerebbe sapere come ti chiami! Puoi dirmelo dicendo "Mi chiamo [Nome]" o "Sono [Nome]"?`;
                        resolve({
                            assistant_response: response
                        });
                        return;
                    }

                    // Se non trova un nome valido, chiedi nuovamente
                    response = `Mi piacerebbe sapere come ti chiami! Puoi dirmelo dicendo "Mi chiamo [Nome]" o "Sono [Nome]"?`;
                    resolve({
                        assistant_response: response
                    });
                    return;
                }

                // Matching per le domande sulle funzionalità
                if (
                    /cosa puoi fare/i.test(message) ||
                    /come puoi aiutarmi/i.test(message) ||
                    /che cosa puoi fare/i.test(message) ||
                    /come mi puoi aiutare/i.test(message) ||
                    /che cosa posso chiederti/i.test(message)
                ) {
                    response = `Posso aiutarti con le seguenti attività:
- **Fornire informazioni sui nostri servizi**: email, PEC, telefono, ubicazione, parcheggio, orari, ecc.
- **Fornire indicazioni su come raggiungerci**: autobus, metropolitana, treno.
- **Offrire assistenza su moduli e documenti disponibili**: censimento, richiesta sopralluogo, detrazioni fiscali.
- **Rispondere a domande generali sul nostro team e sui prezzi**.
- **E molto altro!** Prova a chiedermi qualcosa di specifico per vedere come posso aiutarti.`;
                    resolve({
                        assistant_response: response
                    });
                    return;
                }

                // Array di risposte predefinite per migliorare la dinamicità
                const defaultResponses = [
                    `Interessante, ${userName || 'amico'}! Puoi dirmi di più?`,
                    `Capisco, ${userName || 'amico'}, come posso aiutarti ulteriormente?`,
                    `Sono qui per aiutarti, ${userName || 'amico'}! Di cosa hai bisogno?`,
                    `Perfetto, ${userName || 'amico'}, continua pure.`,
                    `Va bene, ${userName || 'amico'}, dimmi di più.`
                ];

                // Matching per le richieste specifiche
                if (/email|posta elettronica|indirizzo email|scrivimi|contattami via email/i.test(message)) {
                    response = `Puoi contattarmi via email all'indirizzo: <a href='mailto:info@riva.it'>info@riva.it</a>, ${userName || 'amico'}.`;
                } else if (/pec|posta elettronica certificata|contattami via PEC/i.test(message)) {
                    response = `La nostra PEC è: <a href='mailto:infoPec@riva.it'>infoPec@riva.it</a>, ${userName || 'amico'}.`;
                } else if (/telefono|tel|numero di telefono|cellulare|cell|chiamami|contattami al telefono/i.test(message)) {
                    response = `Puoi chiamarmi al Tel.: <a href='tel:+390266715707'>02 6671 5707</a> o al Cell.: <a href='tel:+3290123456789'>+329 0123 456789</a>, ${userName || 'amico'}.`;
                } else if (/ubicazione|dove siete|indirizzo|posizione|localizzazione|dove vi trovo|mappa|la vostra sede/i.test(message)) {
                    response = `Ecco la nostra ubicazione, ${userName || 'amico'}:`;
                    response += `<div class="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.442123456789!2d9.189982315511014!3d45.464203179101846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c76b1d123456%3A0xabcdef1234567890!2sViale%20Delle%20Rimembranze%20Di%20Greco%2C%2055%2C%2020125%20Milano%20MI!5e0!3m2!1sit!2sit!4v1670000000000!5m2!1sit!2sit" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>`;
                } else if (
                    /come arrivarci|come raggiungervi|indicazioni|come raggiungere|indicazioni stradali|direzioni per arrivare/i.test(message)
                ) {
                    response = `Puoi raggiungerci con i mezzi pubblici, ${userName || 'amico'}:
- **Autobus**: Le linee 43, 81 e 87 hanno fermate nelle vicinanze dello studio.
- **Metropolitana**: La fermata più vicina è "Ca' Granda" sulla linea M5 (lilla), situata a circa 10 minuti a piedi dallo studio.
- **Treno**: La stazione ferroviaria di Milano Greco Pirelli è nelle vicinanze e offre collegamenti regionali.`;
                } else if (/parcheggio|parking|dove parcheggiare|posti auto|come parcheggiare/i.test(message)) {
                    response = `Per il parcheggio, ${userName || 'amico'}:
- **Supermercato U2 (Unes)**: Si trova in Via Emilio De Marchi, 10, a circa 240 metri dallo studio.
- **Indicazioni a piedi**: Dal parcheggio Unes, procedere verso sud-est su Via Emilio De Marchi per circa 100 metri, quindi svoltare a sinistra in Viale delle Rimembranze di Greco. Proseguire per circa 140 metri fino al numero 55.`;
                } else if (/orari|quando siete aperti|orari di apertura|orari di lavoro/i.test(message)) {
                    response = `I nostri orari di apertura sono dal lunedì al venerdì, dalle 9:00 alle 18:00, ${userName || 'amico'}.`;
                } else if (/servizi|cosa offrite|cosa fate|i vostri servizi|servizi offerti/i.test(message)) {
                    response = `Offriamo servizi di gestione condominiale, consulenza immobiliare e assistenza legale per proprietà, ${userName || 'amico'}.`;
                } else if (/team|chi siete|il vostro team|i vostri professionisti/i.test(message)) {
                    response = `Il nostro team è composto da professionisti esperti nel settore immobiliare e gestionale, pronti ad assisterti in ogni necessità, ${userName || 'amico'}.`;
                } else if (/prezzi|costi|quanto costa|tariffe|prezzi dei servizi/i.test(message)) {
                    response = `I nostri prezzi sono competitivi e variano in base ai servizi richiesti, ${userName || 'amico'}. Contattaci per un preventivo personalizzato tramite il <a href='form.html'> INFORMAZIONI</a>, oppure all'indirizzo email: <a href='mailto:info@riva.it'>info@riva.it</a>.`;
                } else if (/feedback|recensioni|opinioni|cosa pensano di noi|commenti/i.test(message)) {
                    response = `Puoi leggere le recensioni dei nostri clienti sulla nostra pagina <a href='index.html'>Studio Riva</a>, ${userName || 'amico'}.`;
                } else if (/modulo|modelli|pdf|moduli disponibili|documenti|cesimento|modello/i.test(message)) {
                    response = `Ecco i moduli disponibili per il download, ${userName || 'amico'}:
<ul>
    <li><a href="/pdfs/modulo1.pdf" download="Modulo_1">Censimento</a></li>
    <li><a href="/pdfs/modulo2.pdf" download="Modulo_2">Richiesta sopralluogo</a></li>
    <li><a href="/pdfs/modulo3.pdf" download="Modulo_3">Come inserire la detrazione nel modello 730</a></li>
</ul>`;
                } else {
                    // Risposta predefinita casuale
                    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
                    response = defaultResponses[randomIndex];
                }

                resolve({
                    assistant_response: response
                });
            }, 1000); // Simula un ritardo di 1 secondo
        });
    }
};

// Componente Chatbot
const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Ciao! Sono Ambrogio, il chatbot di Studio Riva Amministrazione Immobili. Prima di tutto, come ti chiami?',
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
    const [userName, setUserName] = useState(null);
    const [awaitingName, setAwaitingName] = useState(true); // Stato per tracciare se si sta aspettando il nome
    const chatMessagesRef = useRef(null);

    const DEFAULT_GIF = 'https://tenor.com/view/o2-o2robot-o2ad-bubl-o2bubl-gif-18485862.gif';
    const SENDING_GIF = 'https://tenor.com/it/view/o2-o2robot-o2ad-bubl-o2bubl-gif-18419086.gif';
    const INACTIVITY_GIF = 'https://tenor.com/it/view/o2-bubl-robot-blue-bubble-gif-23294584.gif';

    useEffect(() => {
        setCurrentGif(DEFAULT_GIF);

        // Recupera il nome dell'utente da localStorage se presente
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
            setAwaitingName(false);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: `Bentornato, ${storedName}! Come posso aiutarti oggi?` },
            ]);
        }

        // Cleanup dei timeout al momento dello smontaggio del componente
        return () => {
            if (holdTimeout) {
                clearTimeout(holdTimeout);
            }
            if (inactivityTimeout) {
                clearTimeout(inactivityTimeout);
            }
        };
    }, []);

    // Funzione per avviare il hold
    const startHold = () => {
        setIsHolding(true);
        setIsAnimating(true);

        const timeout = setTimeout(() => {
            openChatbot();
            setIsHolding(false);
        }, 2000); // Tempo di hold: 2 secondi
        setHoldTimeout(timeout);
    };

    // Funzione per terminare il hold
    const endHold = () => {
        if (holdTimeout) {
            clearTimeout(holdTimeout);
        }
        setIsHolding(false);

        if (!chatbotVisible) {
            setIsAnimating(false);
        }
    };

    // Funzione per cancellare il hold
    const cancelHold = () => {
        endHold();
    };

    // Funzione per aprire il chatbot
    const openChatbot = () => {
        setChatbotVisible(true);
        setCurrentGif(DEFAULT_GIF);
        resetInactivityTimer();

        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    // Funzione per chiudere il chatbot
    const closeChatbot = () => {
        setChatbotVisible(false);
        setCurrentGif(null);
        if (inactivityTimeout) {
            clearTimeout(inactivityTimeout);
        }
    };

    // Funzione per inviare un messaggio
    const sendMessage = () => {
        if (userInput.trim() === '') return;

        const userMessage = userInput.trim();

        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: userMessage },
        ]);
        scrollToBottom();

        setCurrentGif(SENDING_GIF);
        resetInactivityTimer();

        setUserInput('');
        setIsTyping(true);

        ChatbotService.interact(getUserId(), userMessage, userName, awaitingName)
            .then((response) => {
                setIsTyping(false);

                // Se il servizio ritorna un nome utente, salvalo
                if (response.user_name) {
                    setUserName(response.user_name);
                    setAwaitingName(false);
                    // Salva il nome in localStorage
                    localStorage.setItem('userName', response.user_name);
                }

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: 'assistant', content: response.assistant_response },
                ]);
                scrollToBottom();

                setCurrentGif(DEFAULT_GIF);
                resetInactivityTimer();
            })
            .catch((error) => {
                console.error('Errore nell\'interazione con il backend:', error);
                setIsTyping(false);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        role: 'assistant',
                        content: "Mi dispiace, c'è stato un errore nell'interagire con l'assistente. Riprova più tardi.",
                    },
                ]);
                scrollToBottom();
                resetInactivityTimer();
            });
    };

    // Funzione per resettare il timer di inattività
    const resetInactivityTimer = () => {
        if (inactivityTimeout) {
            clearTimeout(inactivityTimeout);
        }
        const timeout = setTimeout(() => {
            setCurrentGif(INACTIVITY_GIF);
        }, 10000); // 10 secondi di inattività
        setInactivityTimeout(timeout);
    };

    // Funzione per scrollare automaticamente verso il basso
    const scrollToBottom = () => {
        setTimeout(() => {
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }
        }, 100);
    };

    // Funzione per ottenere l'ID utente (placeholder)
    const getUserId = () => {
        return 1; // Implementa la logica per ottenere l'ID utente reale se necessario
    };

    return (
        <div
            className={`chatbot-wrapper ${isHolding ? 'holding' : ''} ${chatbotVisible ? 'visible' : ''} ${isAnimating ? 'animating' : ''}`}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            aria-label="Chatbot"
        >
            {/* Icona del chatbot quando non è visibile */}
            {!chatbotVisible && !isAnimating && (
                <div className="icon-container">💬</div>
            )}

            {/* Animazione di apertura */}
            {isAnimating && (
                <div className="animation-container">
                    <img
                        src="https://tenor.com/view/o2-o2robot-o2ad-bubl-o2bubl-gif-18485851.gif"
                        alt="Animazione di apertura della chat"
                        className="opening-animation"
                    />
                </div>
            )}

            {/* Contenuto della chat quando è visibile */}
            {chatbotVisible && (
                <div className="chat-container visible-chat">
                    {/* Intestazione della chat */}
                    <div className="chat-header">
                        <div className="header-left">
                            <div className="header-gif-container">
                                {currentGif && (
                                    <img
                                        src={currentGif}
                                        alt="Animazione"
                                        className="header-gif"
                                    />
                                )}
                            </div>
                            <div className="header-info">
                                <h4>Ambrogio</h4>
                                <span className="status-dot"></span>
                            </div>
                        </div>

                        {/* Pulsante per chiudere la chat */}
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

                    {/* Messaggi della chat */}
                    <div id="chatMessages" className="chat-messages" ref={chatMessagesRef}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                            >
                                <div
                                    className="message-content"
                                    dangerouslySetInnerHTML={{ __html: message.content }}
                                ></div>
                            </div>
                        ))}

                        {/* Indicatore di digitazione */}
                        {isTyping && (
                            <div className="typing-indicator">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        )}
                    </div>

                    {/* Input per i messaggi */}
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

// Rendering del componente Chatbot
ReactDOM.render(<Chatbot />, document.getElementById('chatbot-root'));
