<script lang="ts">
    import axios from 'axios';

    let current_form_data = {
        "username": "",
        "password": ""
    };

    let username_data = {
        valid: null,
        message: "",
    };
    
    let password_data = {
        valid: null,
        message: "",
    };

    let alert_displayed = null;

    async function doLogin() {
        alert_displayed = null;
        password_data.valid = null;
        username_data.valid = null;

        if (current_form_data.username == "") {
            username_data.valid = false;
            username_data.message = "Username obbligatorio!";
        } else if(current_form_data.password == "") {
            password_data.valid = false;
            password_data.message = "Password obbligatoria!";
            return;
        } else {
            axios.post('http://localhost:8000/api/v1/auth/login/',{
                username: current_form_data.username,
                password: current_form_data.password
            }, {
                withCredentials: true
            }).then(response =>{
                window.location.replace('/')
            }).catch(error =>{
                alert_displayed = error.response.data.non_field_errors[0]
            });
        }
    }
</script>

<title>LOGIN | Secure Recipe</title>

<div id="login">
    <form>
        <h2>Login</h2>
        {#if alert_displayed != null}
            <div class="invalid-feedback">{alert_displayed}</div>
        {/if}
    
        {#if username_data.valid != null && !username_data.valid}
            <div class="invalid-feedback">{username_data.message}</div>
        {/if}
    
        {#if password_data.valid != null && !password_data.valid}
            <div class="invalid-feedback">{password_data.message}</div>
        {/if}
    
        <label  for="username">Username*:</label>
        <input type="text" id="username" bind:value={current_form_data.username} required/>
    
        <label for="password">Password*:</label>
        <input type="password" id="password" bind:value={current_form_data.password} required/>
    </form>
    <input type="submit" on:click={doLogin} value="Login">
</div>