<script>
    import axios from 'axios';
    import { onMount } from 'svelte/internal';
    import RecipeMin from '../../../import/recipe_min.svelte';
    
    export let data;

    let recipes = [];

    onMount(async() => {
        axios.get("http://localhost:8000/api/v1/recipes/by-author/" + data.id,)
        .then(response => {
            recipes = response.data;
        })
    });
</script>

<title>Recipes of {data.id.toUpperCase()} | Secure Recipe</title>

<h2 class="titleUserSearch">Recipes posted by the user {data.id.toUpperCase()}</h2>
{#each recipes as recipe}
    <RecipeMin {...recipe}></RecipeMin>
{/each}