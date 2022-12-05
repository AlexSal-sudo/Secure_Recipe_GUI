import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    /* QUI DOVREMMO CERCARE TUTTI I DATI INERENTI ALLA RICETTA CON ID params.slug */
    return {
        /* QUI TEORICAMENTE CODICE CHE CI RESTITUISCE LA RICETTA */
        id: params.slug
    };
}
