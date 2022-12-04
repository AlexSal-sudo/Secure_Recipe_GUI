import { error } from '@sveltejs/kit';
import RecipeMin from '../../../import/recipe_min.svelte';
 
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    /* QUI DOVREMMO CERCARE TUTTI I DATI INERENTI ALLA RICETTA CON ID params.slug */
    let recipes = [
        {id:"1", user:params.slug, created_at:"05/11/2022", title:"Titolo 1", description:"Descrizione 1"},
        {id:"2", user:params.slug, created_at:"06/11/2022", title:"Titolo 2", description:"Descrizione 2"},
    ]
    
    return {
        /* QUI TEORICAMENTE CODICE CHE CI RESTITUISCE LE RICETTE DEGLI USER */
        user: params.slug,
        recipes: recipes
    };
}
