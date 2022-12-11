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

    // 0 per utente
    // 1 per admin
    // 2 per moderator
    export let type_account;
</script>

<div class="recipeAccount">
    <p><a href="/recipe/{id}">{title}</a></p>
    {#if type_account != 2}<a class="modify_post" href="/account/edit-recipe/{id}"><i class="fa fa-pencil"></i> Edit</a>{/if}
    {#if type_account != 0}<a class="delete_post" href="/account/delete/{id}"><i class="fa fa-close"></i> Delete</a>{/if}
</div>