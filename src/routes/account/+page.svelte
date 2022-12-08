<script>
	import { dataset_dev, onMount } from "svelte/internal";
    import RecipeAccount from "../../import/recipe_account.svelte";

    function getCookie(name) {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }

    let recipes = [];
    import axios from 'axios';
    onMount(async() => {
        if(getCookie('csrftoken') === null) {
            window.location.href = '/'
        } else {
            await axios("http://localhost:8000/api/v1/personal-area/", {
                method: "GET",
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                withCredentials: true,
            }).then(response => {
                recipes = response.data;
            })
        }
        
    });
</script>

<link rel="stylesheet" href="../css/account.css">
<title>ACCOUNT | Secure Recipe</title>

<h2>List of published recipes</h2>
<a class="create_post" href="/account/add-recipe"><i class="fa fa-plus"></i> Add</a>

<div class="listRecipeAccount">
    {#each recipes as recipe}
        <RecipeAccount {...recipe}></RecipeAccount>
    {/each}
</div>