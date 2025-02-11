// js/index/testimonianze.js

/**
 * Array di testimonianze predefinite, ognuna con:
 *  - numero di stelle (stars)
 *  - nome utente (user)
 *  - testo della recensione (text)
 */
const allTestimonials = [
    { stars: 4, user: "Marco B.", text: "Servizio impeccabile e trasparenza totale. Consiglio vivamente!" },
    { stars: 4, user: "Laura G.", text: "Il team è sempre disponibile e professionale. Gestione senza problemi." },
    { stars: 4, user: "Giuseppe M.", text: "Eccellenza nella gestione condominiale, mi sento sempre al sicuro." },
    { stars: 4, user: "Sofia L.", text: "Comunicazione chiara e tempestiva, un vero punto di riferimento." },
    { stars: 4, user: "Antonio R.", text: "Professionalità e competenza, non potrei chiedere di meglio." },
    { stars: 4, user: "Elena P.", text: "Gestione impeccabile e attenzione ai dettagli, sempre pronti a rispondere." },
    { stars: 4, user: "Luca S.", text: "Un team affidabile e professionale, consigliatissimo!" },
    { stars: 4, user: "Martina F.", text: "Servizio rapido ed efficiente, sempre pronti a supportarmi." },
    { stars: 4, user: "Paolo T.", text: "Ottima gestione amministrativa, trasparenza totale." },
    { stars: 4, user: "Francesca C.", text: "Il miglior servizio di amministrazione condominiale che abbia mai usato." },
    { stars: 4, user: "Andrea V.", text: "Professionalità e attenzione al cliente. Servizio eccellente!" },
    { stars: 4, user: "Carla M.", text: "Gestione trasparente e puntuale. Mi sento supportata in ogni momento." },
    { stars: 4, user: "Davide L.", text: "Un team che sa ascoltare e risolvere ogni problema. Grazie di cuore!" },
    { stars: 4, user: "Federica R.", text: "Efficienza e competenza. La gestione condominiale non è mai stata così facile." },
    { stars: 4, user: "Giorgio T.", text: "Servizio rapido e professionale. Consigliato a tutti i condomini." },
    { stars: 4, user: "Helena S.", text: "Trasparenza e affidabilità. Un partner indispensabile per la gestione del mio condominio." },
    { stars: 4, user: "Ivan B.", text: "Grazie alla vostra gestione, il condominio è sempre in perfetto ordine." },
    { stars: 4, user: "Laura D.", text: "Servizio impeccabile e personale altamente qualificato. Mi sento sempre al sicuro." },
    { stars: 4, user: "Marco G.", text: "Un servizio professionale e attento alle esigenze dei condomini." },
    { stars: 4, user: "Nadia K.", text: "Efficienza e puntualità sono le vostre parole d'ordine." },
    { stars: 4, user: "Omar Q.", text: "Grazie per la vostra dedizione e professionalità." },
    { stars: 4, user: "Paola L.", text: "Un servizio che supera le aspettative in ogni aspetto." },
    { stars: 4, user: "Quentin M.", text: "Professionalità e trasparenza sono i vostri punti di forza." },
    { stars: 4, user: "Rita N.", text: "Gestione efficiente e comunicazione sempre chiara." },
    { stars: 4, user: "Stefano O.", text: "Un partner affidabile per la gestione del mio condominio." },
    { stars: 4, user: "Tiziana P.", text: "Servizio di alta qualità e sempre disponibile." },
    { stars: 4, user: "Umberto Q.", text: "Efficienza e cortesia in ogni intervento." },
    { stars: 4, user: "Valentina R.", text: "La gestione condominiale non è mai stata così semplice." },
    { stars: 4, user: "Walter S.", text: "Un servizio professionale e altamente raccomandabile." },
    { stars: 4, user: "Xenia T.", text: "Gestione impeccabile e sempre attenta alle nostre esigenze." }
];

/* 
  Se in futuro desideri importare `allTestimonials` in un file JS
  usando un modulo ES6, puoi aggiungere:
    export { allTestimonials };
  e cambiare la struttura del progetto di conseguenza.
*/
