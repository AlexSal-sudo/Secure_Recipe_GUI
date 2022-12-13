<script>
    import axios from 'axios';
    import { onMount } from 'svelte/internal';
    
    export let data;

    let alert_displayed = null;

    onMount(async() => {
        alert_displayed = null;

        if(getCookie('csrftoken') === null) {
            alert_displayed = "You are not logged in or registered.";
        } else {
            axios.delete("http://localhost:8000/api/v1/personal-area/" + data.id, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            }).then(response => {
                window.location.href = '/account'
            }).catch(error =>{
                alert_displayed = error.response.data["detail"];
            });
        }
    });
</script>

<title>ELIMINAZIONE RICETTA | Secure Recipe</title>

{#if alert_displayed != null}
    <div class="invalid-feedback" style="margin: 0 auto; width: 600px;">
        {@html alert_displayed}
        <a href="/">Return to homepage</a>
    </div>
{/if}