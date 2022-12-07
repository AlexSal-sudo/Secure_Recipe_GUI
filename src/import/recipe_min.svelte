<script>
    // @ts-nocheck
    export let id;
    export let author;
    export let created_at;
    export let title;
    export let description;
    export let ingredients;
</script>

<div id="recipe">
    <a class="user" href="../user/{author}"><i class="fa fa-user"></i> {author}</a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="created_at"><i class="fa fa-clock-o"></i> {created_at}</a>
    <h2 class="title"><a  href="../recipe/{id}">{title}</a></h2>
    <a class="button" href="../recipe/{id}">View recipes</a>       
</div>