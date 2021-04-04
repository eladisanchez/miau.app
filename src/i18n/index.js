import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
    'ca': {
        hola: 'Hola, ',
        intro: 'Has fet caca avui? A què vols jugar?',
        boles: 'Les Boles de l\'Eladi',
        nono: 'El Nonogram de la Maria',
        master: 'El Mastermind de Ta Mare',
        ranquing: 'Rànquing',
        gat: 'Gat',
        usuari: 'Usuari'
    },
    'en': {
        hola: 'Hi ',
        intro: 'Have gone potty today? What do you wanna play?',
        boles: 'Eladi\'s Balls',
        nono: 'Maria\'s Nonogram',
        master: 'Mastermind',
        ranquing: 'Ranking',
        gat: 'Cat',
        usuari: 'User'
    },
};

const i18n = new VueI18n({
    locale: 'ca',   
    fallbackLocale: 'es',
    messages,
});

export default i18n;