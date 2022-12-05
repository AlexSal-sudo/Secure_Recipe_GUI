<script>
    import RecipeMin from '../../../import/recipe_min.svelte';
    import { onMount } from 'svelte/internal';
    /** @type {import('./$types').PageData} */
    export let data;

    let url = "http://localhost:8000/api/v1/recipes/by-author/" + data.id
    let recipes = [];
    import axios from 'axios';
    onMount(async() => {
        await axios(url, {
            method: "GET",
        }).then(response => {
            console.log(response.data);
            recipes = response.data;
        })
    });
</script>

<title>Ricette di {data.id} | Secure Recipe</title>

<h2 class="titleUserSearch">Ricette pubblicate dall'utente {data.id}</h2>
{#each recipes as recipe}
    <RecipeMin {...recipe}></RecipeMin>
{/each}