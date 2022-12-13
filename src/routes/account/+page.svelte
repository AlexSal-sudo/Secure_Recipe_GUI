<script>
    import axios from 'axios';
	import { onMount } from "svelte/internal";
    import RecipeAccount from "../../import/recipe_account.svelte";

    let recipes = [];

    let alert_authorization = null;
    let type_account = null;

    function error_authorization(error) {
        alert_authorization = error;
        document.getElementById('account').innerHTML = "";
        document.getElementById('content').id = "tmp";
    }

    onMount(async() => {
        if(getCookie('csrftoken') === null) {
            error_authorization("You are not logged in or registered.");
        } else {
            axios.get("http://localhost:8000/api/v1/personal-area/", {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                withCredentials: true,
            }).then(response => {
                recipes = response.data;
            })

            axios.get("http://localhost:8000/api/v1/personal-area/account-type", {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                withCredentials: true,
            }).then(response => {
                type_account = response.data['type-account'];
            })
        }
    });
</script>

<link rel="stylesheet" href="../css/account.css">

<title>ACCOUNT | Secure Recipe</title>

{#if alert_authorization != null}
    <div class="invalid-feedback" style="margin: 0 auto; width: 600px; margin-top: 90px;">
        {@html alert_authorization}
        <a href="/"  on:click={resetStyleSetting}>Return to homepage</a>
    </div>
{/if}

<div id="account">
    {#if type_account == 0}
        <h2>List of published recipes</h2>
    {:else}
        <h2>List of recipes posted by users</h2>
    {/if}

    {#if type_account != 2}
        <a class="create_post" href="/account/add-recipe"><i class="fa fa-plus"></i> Add</a>
    {/if}

    <div class="listRecipeAccount">
        {#each recipes as recipe}
            <RecipeAccount {...recipe} type_account={type_account}></RecipeAccount>
        {/each}
    </div>
</div>