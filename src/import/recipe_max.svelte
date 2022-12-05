<script>
    export let user;
    export let created_at;
    export let title;
    export let description;
    export let ingredients;
</script>

<h1 class="title">{title}</h1>
<a class="user" href="../user/{user}"><i class="fa fa-user"></i> {user}</a>
<!-- svelte-ignore a11y-missing-attribute -->
<a class="created_at"><i class="fa fa-clock-o"></i> {created_at}</a>

<h2>Passi</h2>
<p class="description">{description}</p>

<h2>Ingredienti</h2>
<ul class="ingredients">
    <!-- <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li> -->
    {@html ingredients}
</ul>