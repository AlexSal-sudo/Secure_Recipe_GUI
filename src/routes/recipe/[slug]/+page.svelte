<script>
    import RecipeMax from '../../../import/recipe_max.svelte';
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<link rel="stylesheet" href="../css/recipe_max.css">
  
<title>{data.title} | Secure Recipe</title>

<RecipeMax
    user={data.user}
    created_at={data.created_at}
    title={data.title}
    description={data.description}
    ingredients={data.ingredients}
></RecipeMax>