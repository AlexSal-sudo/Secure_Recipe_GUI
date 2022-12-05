<script>
    export let id;
    export let user;
    export let created_at;
    export let title;
</script>

<div id="recipe">
    <a class="user" href="../user/{user}"><i class="fa fa-user"></i> {user}</a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="created_at"><i class="fa fa-clock-o"></i> {created_at}</a>
    <h2 class="title"><a  href="../recipe/{id}">{title}</a></h2>
    <a class="button" href="../recipe/{id}">Visualizza ricette</a>       
</div>