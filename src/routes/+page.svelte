<script>
	import { onMount } from "svelte/internal";
    import RecipeMin from "../import/recipe_min.svelte";

    let recipes = [];
    import axios from 'axios';
    onMount(async() => {
        axios.get("http://localhost:8000/api/v1/recipes/"
        ).then(response => {
            recipes = response.data;
        })
    });

    async function orderDate() {
        axios.get('http://localhost:8000/api/v1/recipes/sort-by-date/'
        ).then(response =>{
            recipes = response.data;
        }) 
    }

    async function orderTitle() {
        axios.get('http://localhost:8000/api/v1/recipes/sort-by-title/'
        ).then(response =>{
            recipes = response.data;
        }) 
    }
</script>

<title>Secure Recipe</title>

<h2 class="titleUserSearch">All recipes from our users</h2>

<div class="search">
    <h3>Recipe filter</h3>
    <button on:click={orderDate}>Order by DATE</button>
    <button on:click={orderTitle}>Order by TITLE</button>
</div>

{#each recipes as recipe}
    <RecipeMin {...recipe}></RecipeMin>
{/each}