import { error } from '@sveltejs/kit';
import RecipeMin from '../../../import/recipe_min.svelte';
 
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        id: params.slug
    };
}
