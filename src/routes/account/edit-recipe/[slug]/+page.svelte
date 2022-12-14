<script>
    import axios from 'axios';
    import { onMount } from "svelte/internal";

    import IngredientRecipe from "../../../../import/ingredient_recipe.svelte";

    export let data;

    let recipe = {
        title: "",
        description: "",
        ingredients: []
    }
    let list_ingredients = []

    let alert_authorization = null;
    let alert_displayed = null;

    function error_authorization(error) {
        alert_authorization = error;
        document.getElementById('edit-recipe').innerHTML = "";
        document.getElementById('content').id = "tmp";
    };

    onMount(async() => {
        alert_authorization = null;
        alert_displayed = null;
        
        if(getCookie('csrftoken') === null) {
            error_authorization("You are not logged in or registered.");
        } else {
            axios.get("http://localhost:8000/api/v1/personal-area/account-type", {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                withCredentials: true,
            }).then(response => {
                if(response.data['type-account'] == 2) {
                    error_authorization("You do not have permission to perform this action.");
                } else {
                    axios.get("http://localhost:8000/api/v1/personal-area/" + data.id, {
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                        withCredentials: true,
                    }).then(response => {
                        recipe = response.data;
                        list_ingredients = recipe.ingredients;
                    });
                }
            });
        }
    });

    async function updateRecipe() {
        recipe.ingredients = giveIngredients();

        axios.put('http://localhost:8000/api/v1/personal-area/' + data.id + '/', {
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            withCredentials: true
        }).then(response =>{
            window.location.replace('/account')
        }).catch(error =>{
            alert_displayed = printError(error.response.data)
        });
    }

    function clearErrorValidate() {
        alert_displayed = null;
    }

    function validate() {
        let error = {
            title: [],
            description: []
        };
        let title_regex = new RegExp("^[a-zA-ZÀ-ú ]+$");
        let description_regex = new RegExp("^[a-zA-Z0-9À-ú \'!;\.,\n]+$");
        if(!recipe.title.match(title_regex))
            error.title.push("Enter a valid value.");
        if(!recipe.description.match(description_regex))
            error.description.push("Enter a valid value.");
            if(error.title.length != 0 || error.description.length != 0) {
            alert_displayed = printError(error);
            document.getElementById('publish').disabled = true;
        } else {
            document.getElementById('publish').disabled = false;
        }
    }
</script>

<link rel="stylesheet" href="../../css/recipe_max.css">

<title>EDIT RECIPE | Secure Recipe</title>

{#if alert_authorization != null}
    <div class="invalid-feedback" style="margin: 0 auto; width: 600px; margin-top: 90px;">
        {@html alert_authorization}
        <a href="/" on:click={resetStyleSetting}>Return to homepage</a>
    </div>
{/if}

<div id="edit-recipe">
    <h1>Edit Recipe</h1>
    {#if alert_displayed != null}
        <div class="invalid-feedback">{@html alert_displayed}</div>
    {/if}
    <h2>Title</h2>
    <input type="text" id="title" name="title" bind:value={recipe.title} on:focusin={clearErrorValidate} on:focusout={validate}>
    <a class="created_at"><i class="fa fa-clock-o"></i> {recipe.created_at}</a>
    <h2>Description</h2>
    <textarea name="description" class="description" width="100%" rows="5" bind:value={recipe.description} on:focusin={clearErrorValidate} on:focusout={validate}/>               
    <h2>Ingredients</h2>
    <div id="list-ingredients">
        <input type="submit" id="addIngredients" value="Add ingredients" on:click={addIngredients}>
        {#each list_ingredients as item}
            <svelte:component this={IngredientRecipe} {...item}/>
        {/each}
    </div>
    <button id="publish" style="margin-block-start: 1em;" on:click={updateRecipe}>Update recipe</button>
</div>