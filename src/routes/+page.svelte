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
{#each recipes as recipe}
    <RecipeMin {...recipe}></RecipeMin>
{/each}