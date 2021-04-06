import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
    'ca': {
        hola: 'Hola, ',
        intro: 'Has fet caca avui? A què vols jugar?',
        boles: 'Boletes',
        nono: 'Nonogram',
        master: 'Mastermind',
        pescamines: 'Pescamines',
        ranquing: 'Rànquing',
        gat: 'Gat',
        usuari: 'Opcions',
        nom: "Nom",
        canviar_nom: "Canvia el nom",
        codi_usuari: "Codi d'usuari",
        codi_instruccions: "El pots fer servir per identificar-te quan vulguis guanyar galetes des d'un altre ordenyador o mòbil.",
        idioma: "Idioma",
        sortir: 'Tanca la sessió'
    },
    'en': {
        hola: 'Hi ',
        intro: 'Did you poop today? What do you wanna play?',
        boles: 'Balls',
        nono: 'Nonogram',
        master: 'Mastermind',
        pescamines: 'Minesweeper',
        ranquing: 'Ranking',
        gat: 'Cat',
        usuari: 'Options',
        nom: "Name",
        canviar_nom: "Change name",
        codi_usuari: "User code",
        codi_instruccions: "You can use it to login and earn cookies from another device.",
        idioma: "Language",
        sortir: 'Logout'
    },
    'es': {
        hola: 'Hola ',
        intro: 'Has hecho caca hoy? A qué quieres jugar?',
        boles: 'Bolitas',
        nono: 'Nonogram',
        master: 'Mastermind',
        pescamines: 'Buscaminas',
        ranquing: 'Ranking',
        gat: 'Gato',
        usuari: 'Opciones',
        nom: "Nombre",
        canviar_nom: "Cambiar nombre",
        codi_usuari: "Código de usuario",
        codi_instruccions: "Puedes usarlo para iniciar sesión y ganar galletas desde otro dispositivo.",
        idioma: "Idioma",
        sortir: 'Salir'
    },
};

const i18n = new VueI18n({
    locale: 'ca',   
    fallbackLocale: 'es',
    messages,
});

export default i18n;