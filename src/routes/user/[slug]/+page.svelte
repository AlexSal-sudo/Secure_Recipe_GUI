<script>
    import RecipeMin from '../../../import/recipe_min.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<title>Ricette di {data.user.toUpperCase()} | Secure Recipe</title>

<h2 class="titleUserSearch">Ricette pubblicate dall'utente {data.user.toUpperCase()}</h2>
{#each data.recipes as recipe}
    <RecipeMin {...recipe}></RecipeMin>
{/each}