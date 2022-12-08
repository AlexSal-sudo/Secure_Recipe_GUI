<script>
	import { dataset_dev, onMount } from "svelte/internal";

    function getCookie(name) {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }

    import axios from 'axios';
    onMount(async() => {
        if(getCookie('csrftoken') === null) {
            window.location.replace('/')
        }
    });

    function getCreateDate() {
        let timeElapsed = Date.now();
        let today = new Date(timeElapsed);
        if(today.getDate() < 10)
            return today.getFullYear() + "-" + (today.getMonth()+1) + "-0" + today.getDate();
        else
            return today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
    }
    
    let recipe = {
        title: null,
        description: null,
        ingredients: []
    }
    let date = getCreateDate()
    let ingredient = {
        name: null,
        quantity: null,
        unit: null
    }
    let ingredients = []

    let alert_displayed = null;
    async function addRecipe() {
        axios.post('http://localhost:8000/api/v1/personal-area/', {
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            withCredentials: true
        }).then(response =>{
            window.location.replace('/')
        }).catch(error =>{
            console.log(error)
            alert_displayed = error.response.data;
        })
    }

    function addIngredients() {
        ingredient.quantity = Number(ingredient.quantity)
        let tmp = {
            name: null,
            quantity: null,
            unit: null
        }
        tmp.name = ingredient.name;
        tmp.quantity = ingredient.quantity;
        tmp.unit = ingredient.unit;
        ingredients.push(tmp);

        let list = "";
        let i = 0;
            for (;ingredients[i];) {
                list += "<li><i>"
                    + ingredients[i].name
                    + "</i>, "
                    + ingredients[i].quantity
                    + " "
                    + ingredients[i].unit
                    + "</li>";
                i++;
            }

        document.getElementById("list-ingredients").innerHTML = list;
        document.getElementById('publish').disabled = false;

        recipe.ingredients = ingredients;
        ingredient.name = null;
        ingredient.quantity = null;
        ingredient.unit = null;
    }

    function deleteIngredients(n) {
        ingredients.pop(n);
        console.log(ingredients);
    }
</script>

<link rel="stylesheet" href="../css/recipe_max.css">

<title>ADD RECIPE | Secure Recipe</title>

<form>
    <h1>Add Recipe</h1>
    {#if alert_displayed != null}
        <div class="invalid-feedback">{alert_displayed}</div>
    {/if}
    <h2>Title</h2>
    <input type="text" id="title" name="title" bind:value={recipe.title}>
    <a class="user"><i class="fa fa-user"></i> Utente</a>
    <a class="created_at"><i class="fa fa-clock-o"></i> {date}</a>
    <h2>Description</h2>
    <textarea name="description" class="description" width="100%" rows="5" bind:value={recipe.description}/>               
    <h2>Ingredients</h2>
    <h4>Add ingredients</h4>
        <div class="add-ingredients">
            <table>
                <tr>
                    <td>
                        <label for="nomeProdotto">Ingredients name:</label>
                        <input type="text" id="nomeProdotto" name="nomeProdotto" bind:value={ingredient.name}>
                    </td>
                    <td>
                        <label for="quantitaProdotto">Quantity:</label>
                        <input type="number" id="quantitaProdotto" name="quantitaProdotto" bind:value={ingredient.quantity}>
                    </td>
                    <td>
                        <label for="unitaProdotto">Unit of measure:</label>
                        <select id="unitaProdotto" bind:value={ingredient.unit}>
                            <option value="n/a">n/a</option>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="cl">cl</option>
                            <option value="ml">ml</option>
                            <option value="l">l</option>
                            <option value="l">cup</option>
                        </select>
                    </td>
                </tr>
            </table>
            <input type="submit" id="addIngredients" name="addIngredients" value="Add ingredients" on:click={addIngredients}>
        </div>
    <h4>List ingredients</h4>
    <ul id="list-ingredients">
        <p style="text-align: center"><i>No ingredients entered</i></p>
    </ul>
    <input type="submit" id="publish" value="Publish recipe" on:click={addRecipe} disabled>
</form>