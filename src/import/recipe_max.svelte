<script>
    export let id;
    export let author;
    export let username;
    export let created_at;
    export let updated_at;
    export let title;
    export let description;
    export let ingredients;
</script>

<h1 class="title">{title}</h1>
<a class="user" href="../user/{author}"><i class="fa fa-user"></i> {author}</a>
<!-- svelte-ignore a11y-missing-attribute -->
<a class="created_at"><i class="fa fa-clock-o"></i> {created_at}</a>

<h2>Description</h2>
<p class="description">{description}</p>

<h2>Ingredients</h2>
<ul class="ingredients">
    {@html ingredients}
</ul>