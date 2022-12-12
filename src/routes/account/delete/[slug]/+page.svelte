<script>
    import { onMount } from 'svelte/internal';
    /** @type {import('./$types').PageData} */
    export let data;

    import axios from 'axios';
    onMount(async() => {
        if(getCookie('csrftoken') === null) {
            window.location.replace('/')
        } else {
            axios.delete("http://localhost:8000/api/v1/personal-area/" + data.id, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            }).then(response => {
                window.location.href = '/account'
            })
        }
    });
</script>

<title>ELIMINAZIONE RICETTA | Secure Recipe</title>