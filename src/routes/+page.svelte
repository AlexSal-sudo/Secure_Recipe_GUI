<script>
    import Header from "../import/header.svelte"
    import RecipeMin from "../import/recipe_min.svelte";
</script>

<div class="full-site">
    <Header></Header>
    
    <div id="content">
        <RecipeMin 
            user="bonciarello"
            created_at="05/11/2022"
            title="Ricetta con include di Svelte"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum facilisis placerat. Sed aliquet orci tellus, ut luctus metus lacinia eu. Duis ornare eleifend ligula. Vivamus pharetra nulla lacus, eu molestie ligula scelerisque et. Fusce viverra a diam id efficitur. Phasellus nisl augue, luctus sit amet convallis vel, egestas vitae arcu. Mauris sed arcu elit. Sed fringilla varius nisi ut euismod. Sed scelerisque, magna sit amet tincidunt rutrum, lectus magna mollis lacus, vitae posuere orci felis vitae nibh. Praesent iaculis turpis mauris, a sollicitudin odio suscipit quis. Sed consectetur nisi nisl, quis malesuada risus porta non. Vivamus congue nisi magna, at rutrum mauris facilisis vitae. Nullam non nibh magna. Curabitur eget tempus tellus, quis commodo sapien. Aliquam efficitur tempus nunc, bibendum dignissim risus rhoncus id. Vestibulum tempor suscipit eros ut ultrices."
        ></RecipeMin>
    </div>
</div>