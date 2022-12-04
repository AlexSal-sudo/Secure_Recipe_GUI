<script>
    export let user;
    export let created_at;
    export let title;
    export let description;
</script>

<div id="recipe">
    <a class="user" href="#"><i class="fa fa-user"></i> {user}</a>
    <a class="created_at" href="#"><i class="fa fa-clock-o"></i> {created_at}</a>
    <h2 class="title"><a href="#">{title}</a></h2>
    <p class="description">{description}</p>
    <a class="button" href="#">Visualizza ricette</a>       
</div>