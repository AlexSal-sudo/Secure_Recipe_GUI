<script>
    import RecipeMax from '../../../import/recipe_max.svelte';
    import { onMount } from 'svelte/internal';
    /** @type {import('./$types').PageData} */
    export let data;

    let recipe = {};
    let ingredientsList = "";
    let url = "http://localhost:8000/api/v1/recipes/" + data.id
    import axios from 'axios';
    onMount(async() => {
        await axios(url, {
            method: "GET",
        }).then(response => {
            let i = 0;
            for (;response.data.ingredients[i];) {
                ingredientsList += "<li><i>" + response.data.ingredients[i].name + "</i>, " + response.data.ingredients[i].quantity + " "  + response.data.ingredients[i].unit + "</li>";
                i++;
            }
            recipe = response.data;
            recipe.ingredients = ingredientsList;
        })
    });
</script>

<link rel="stylesheet" href="../css/recipe_max.css">
  
<title>{recipe.title} | Secure Recipe</title>

<RecipeMax {...recipe}></RecipeMax>