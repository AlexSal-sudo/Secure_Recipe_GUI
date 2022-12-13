<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte/internal';

    function getCookie(name) {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }

    onMount(async() => {        
        await axios('http://localhost:8000/api/v1/auth/logout/', {
            method: "POST",
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            withCredentials: true,
        }).then(response =>{
            document.cookie = "csrftoken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            window.location.href = '/'
        })
    });
</script>

<title>LOGOUT | Secure Recipe</title>