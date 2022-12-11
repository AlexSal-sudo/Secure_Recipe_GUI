<script>
	import { dataset_dev, onMount } from "svelte/internal";
    import RecipeMin from "../import/recipe_min.svelte";

    let recipes = [];
    import axios from 'axios';
    onMount(async() => {
        await axios("http://localhost:8000/api/v1/recipes/", {
            method: "GET",
        }).then(response => {
            recipes = response.data;
        })
    });
</script>

<title>Secure Recipe</title>

<h2 class="titleUserSearch">All recipes from our users</h2>

{#each recipes as recipe}
    <RecipeMin {...recipe}></RecipeMin>
{/each}