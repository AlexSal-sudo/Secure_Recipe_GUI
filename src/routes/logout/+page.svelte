<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte/internal';

    onMount(async() => {        
        axios.post('http://localhost:8000/api/v1/auth/logout/', {
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            withCredentials: true,
        }).then(response =>{
            document.cookie = "csrftoken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            window.location.href = '/'
        });
    });
</script>

<title>LOGOUT | Secure Recipe</title>