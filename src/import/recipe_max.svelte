<script>
    export let user;
    export let created_at;
    export let title;
    export let description;
    export let ingredients;
    export let step;
</script>

<h1 class="title">{title}</h1>
<a class="user" href="#"><i class="fa fa-user"></i> {user}</a>
<!-- svelte-ignore a11y-missing-attribute -->
<a class="created_at"><i class="fa fa-clock-o"></i> {created_at}</a>
<p class="description">{description}</p>

<h2>Ingredienti</h2>
<ul class="ingredients">
    <!-- <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li> -->
    {@html ingredients}
</ul>

<h2>Passi</h2>
{step}
<!-- <ol class="steps">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin dui dui. Nunc pellentesque sollicitudin venenatis. Sed laoreet magna et dolor porta vulputate. Suspendisse ut tortor lectus. Morbi vel pellentesque risus. Pellentesque vitae nisi non tortor sagittis faucibus. Morbi nec arcu malesuada, tristique risus et, iaculis velit. Morbi in condimentum nisi. Ut egestas accumsan nunc.</li>
    <li>In in elit et dui aliquet lobortis ut nec tellus. Donec consequat sem a venenatis accumsan. Fusce accumsan eu lectus a accumsan. Donec aliquam, sapien ac lacinia finibus, nunc lacus suscipit tortor, vel scelerisque sapien diam eget est. Ut hendrerit velit dolor, sit amet blandit metus tincidunt a. Vestibulum interdum lorem tortor, ac suscipit risus ultrices sed. Duis lacinia id enim vulputate suscipit. Maecenas malesuada magna aliquam efficitur porta.</li>
    <li>Sed fermentum convallis nunc ac eleifend. Duis eget euismod odio. Nulla vulputate lectus et ipsum placerat, id sodales velit sollicitudin. Sed convallis porta justo vitae commodo. Donec rutrum ut tortor quis pellentesque. In arcu turpis, cursus vitae elit eu, consequat auctor ipsum. Etiam massa elit, pulvinar vitae ante nec, laoreet euismod erat. Suspendisse potenti. Pellentesque at neque porta, placerat turpis at, pharetra ligula.</li>
</ol> -->