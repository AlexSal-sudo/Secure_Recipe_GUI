<script>
	import { onMount } from "svelte/internal";
    import RecipeAccount from "../../import/recipe_account.svelte";

    let recipes = [];
    let type_account = null;
    import axios from 'axios';
    onMount(async() => {
        if(getCookie('csrftoken') === null) {
            window.location.href = '/'
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