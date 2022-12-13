<script>
    import axios from 'axios';

    let new_form_data = {
        "username": "",
        "email": "",
        "password1": "",
        "password2": ""
    }

    let alert_displayed = null;

    async function doRegistration() {
        alert_displayed = null;
        let password_regex = new RegExp("^(?=.*[0-9])(?=.*[a-z]).{8,32}$")
        if(new_form_data.password1 === new_form_data.password2)
            if(new_form_data.password1.length >= 8)
                if(new_form_data.password1.match(password_regex))
                    axios.post('http://localhost:8000/api/v1/auth/registration/',{
                        username: new_form_data.username,
                        email: new_form_data.email,
                        password1: new_form_data.password1,
                        password2: new_form_data.password2
                    }, {
                        withCredentials: true
                    }).then(response =>{
                        window.location.replace('/account')
                    }).catch(error =>{
                        alert_displayed = error.response.data.non_field_errors[0]
                    })
                else
                    alert_displayed = "Password must contains at least one upper letter, one number and a special character!"
            else
                alert_displayed = "Password too short!"
        else
            alert_displayed = "Password mismatch, please check your passwords!"    
    }
</script>

<title>SIGN IN | Secure Recipe</title>

<div id="register">
    <form>
        <h2>Sign In</h2>
        {#if alert_displayed != null}
            <div class="invalid-feedback">{alert_displayed}</div>
        {/if}
        <label for="username">Username*:</label>
        <input type="text" id="username" name="username" bind:value={new_form_data.username} required>
        <label for="mail">E-mail address*:</label>
        <input type="email" id="mail" name="mail" bind:value={new_form_data.email} required>
        <label for="password">Password*:</label>
        <input type="password" id="password" name="password" bind:value={new_form_data.password1} required>
        <label for="password">Confirm Password*:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" bind:value={new_form_data.password2} required>
    </form>
    <input type="submit" value="Sign In" on:click={doRegistration}>
</div>

