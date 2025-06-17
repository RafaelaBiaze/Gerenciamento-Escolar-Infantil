import dotenv from 'dotenv';
import constants from './constants.js';
import helpers from './helpers.js';

/** Init .env file */
dotenv.config();

/** Inserir as constantes globalmente */
globalThis.CONSTANTS = constants;

/** Inserir os helpers globalmente */
Object.entries(helpers).forEach(([nome, funcao]) => {
    globalThis[nome] = funcao;
});