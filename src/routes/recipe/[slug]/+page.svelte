<script>
    import axios from 'axios';
    import { onMount } from 'svelte/internal';
    import RecipeMax from '../../../import/recipe_max.svelte';

    export let data;

    let recipe = {};
    let ingredientsList = "";
    
    onMount(async() => {
        axios.get("http://localhost:8000/api/v1/recipes/" + data.id)
        .then(response => {
            for(let i = 0; i < response.data.ingredients.length; i++) {
                ingredientsList += "<li><i>" + response.data.ingredients[i].name + "</i>, " + response.data.ingredients[i].quantity + " "  + response.data.ingredients[i].unit + "</li>";
                i++;
            }
            recipe = response.data;
            recipe.ingredients = ingredientsList;
        });
    });
</script>

<link rel="stylesheet" href="../css/recipe_max.css">
  
<title>{recipe.title} | Secure Recipe</title>

<RecipeMax {...recipe}></RecipeMax>