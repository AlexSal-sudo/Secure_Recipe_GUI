import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    /* QUI DOVREMMO CERCARE TUTTI I DATI INERENTI ALLA RICETTA CON ID params.slug */
    return {
        /* QUI TEORICAMENTE CODICE CHE CI RESTITUISCE LA RICETTA */
        user: "Utente " + params.slug,
        created_at: "Creato "  + params.slug,
        title: "Titolo " + params.slug,
        description: "Descrizione "  + params.slug,
        ingredients: "<li>Ingrediente 1</li><li>Ingrediente 2</li><li>Ingrediente 3</li>",
        step: "Step "  + params.slug,
    };
}
