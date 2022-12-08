<script>
    import { onMount } from 'svelte/internal';
    /** @type {import('./$types').PageData} */
    export let data;

    function getCookie(name) {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }

    import axios from 'axios';
    onMount(async() => {
        await axios("http://localhost:8000/api/v1/personal-area/" + data.id, {
            method: "DELETE",
            withCredentials: true,
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
        }).then(response => {
            window.location.href = '/account'
        })
    });
</script>

<title>ELIMINAZIONE RICETTA | Secure Recipe</title>