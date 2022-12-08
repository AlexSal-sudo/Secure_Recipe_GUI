<script>
    // @ts-nocheck
    export let id;
    export let author;
    export let username;
    export let created_at;
    export let updated_at;
    export let title;
    export let description;
    export let ingredients;
</script>

<div class="recipeAccount">
    <p>{title}</p>
    <a class="modify_post" href="#"><i class="fa fa-pencil"></i> Edit</a>
    <a class="delete_post" href="/account/delete/{id}"><i class="fa fa-close"></i> Delete</a>
</div>