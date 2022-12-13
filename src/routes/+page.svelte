<script>
    import axios from 'axios';
	import { onMount } from "svelte/internal";
    import RecipeMin from "../import/recipe_min.svelte";

    let recipes = [];

    let alert_displayed = null;
    let input_search = null;
    let button_cancelSearch = null;

    onMount(async() => {
        alert_displayed = null;
        axios.get("http://localhost:8000/api/v1/recipes/"
        ).then(response => {
            recipes = response.data;
        });
    });

    async function orderDate() {
        alert_displayed = null;
        axios.get('http://localhost:8000/api/v1/recipes/sort-by-date/'
        ).then(response =>{
            recipes = response.data;
        });
    };

    async function orderTitle() {
        alert_displayed = null;
        axios.get('http://localhost:8000/api/v1/recipes/sort-by-title/'
        ).then(response =>{
            recipes = response.data;
        });
    };

    async function searchAuthor() {
        alert_displayed = null;
        button_cancelSearch.disabled = false;
        axios.get('http://localhost:8000/api/v1/recipes/by-author/' + input_search.value
        ).then(response =>{
            recipes = response.data;
        }).catch(error =>{
            alert_displayed = error.response.data['detail']
        });
    };

    async function searchIngredient() {
        alert_displayed = null;
        button_cancelSearch.disabled = false;
        axios.get('http://localhost:8000/api/v1/recipes/by-ingredient/' + input_search.value
        ).then(response =>{
            recipes = response.data;
        }).catch(error =>{
            alert_displayed = error.response.data['detail']
        });
    };

    async function searchTitle() {
        alert_displayed = null;
        button_cancelSearch.disabled = false;
        axios.get('http://localhost:8000/api/v1/recipes/by-title/' + input_search.value
        ).then(response =>{
            recipes = response.data;
        }).catch(error =>{
            alert_displayed = error.response.data['detail']
        });
    };

    async function cancelSearch() {
        alert_displayed = null;
        input_search.value = "";
        button_cancelSearch.disabled = true;
        axios.get("http://localhost:8000/api/v1/recipes/"
        ).then(response => {
            recipes = response.data;
        });
    };
</script>

<title>Secure Recipe</title>

<h2 class="titleUserSearch">All recipes from our users</h2>

<div class="search">
    <h3>Sort recipes by:</h3>
    <table>
        <tr>
            <td>
                <button on:click={orderDate}>Order by DATE</button>
            </td>
            <td>
                <button on:click={orderTitle}>Order by TITLE</button>
            </td>
        </tr>
    </table>
    
    <h3>Search recipes by:</h3>
    {#if alert_displayed != null}
        <div class="invalid-feedback">{alert_displayed}</div>
    {/if}
    <input type="text" id="search" name="search" bind:this={input_search}>
    <table>
        <tr>
            <td>
                <button on:click={searchAuthor}>Search by AUTHOR</button>
            </td>
            <td>
                <button on:click={searchIngredient}>Search by INGREDIENTS</button>
            </td>
            <td>
                <button on:click={searchTitle}>Search by TITLE</button>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <button on:click={cancelSearch} bind:this={button_cancelSearch} disabled>Cancel search</button>
            </td>
        </tr>
    </table>
    
</div>

{#each recipes as recipe}
    <RecipeMin {...recipe}></RecipeMin>
{/each}