<script>
	import { dataset_dev, onMount } from "svelte/internal";
    import { redirect } from '@sveltejs/kit';

    export let data;

    function getCookie(name) {
        function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
        return match ? match[1] : null;
    }

    function addIngredients() {
        var e = document.createElement('div')
        e.innerHTML = "<div class=\"add-ingredients\">" +
                "<table>" +
                    "<tr>" +
                        "<td>" +
                            "<label for=\"nomeProdotto\">Ingredients name:</label>" +
                            "<input type=\"text\" id=\"nomeProdotto\" name=\"nomeProdotto\">" +
                        "</td>" +
                        "<td>" +
                            "<label for=\"quantitaProdotto\">Quantity:</label>" +
                            "<input type=\"number\" id=\"quantitaProdotto\" name=\"quantitaProdotto\">" +
                        "</td>" +
                        "<td>" +
                            "<label for=\"unitaProdotto\">Unit of measure:</label>" +
                            "<select id=\"unitaProdotto\">" +
                                "<option value=\"n/a\">n/a</option>" +
                                "<option value=\"g\">g</option>" +
                                "<option value=\"kg\">kg</option>" +
                                "<option value=\"cl\">cl</option>" +
                                "<option value=\"ml\">ml</option>" +
                                "<option value=\"l\">l</option>" +
                                "<option value=\"cup\">cup</option>" +
                            "</select>" +
                        "</td>" +
                    "</tr>" +
                "</table>" +
                "<input type=\"submit\" id=\"removeIngredients\" name=\"removeIngredients\" value=\"Remove ingredient\" onclick=\"this.parentElement.remove();if(document.getElementById('list-ingredients').childElementCount > 1) document.getElementById('publish').disabled = false; else document.getElementById('publish').disabled = true;\">" +
            "</div>"
        while(e.firstChild)
            document.getElementById("list-ingredients")?.appendChild(e.firstChild);
        document.getElementById('publish').disabled = false;
    }

    let recipe = {}

    import axios from 'axios';

    function existingIngredients(ingredients) {
        return "<div class=\"add-ingredients\">" +
                "<table>" +
                    "<tr>" +
                        "<td>" +
                            "<label for=\"nomeProdotto\">Ingredients name:</label>" +
                            "<input type=\"text\" id=\"nomeProdotto\" name=\"nomeProdotto\" value=\"" + ingredients.name +"\">" +
                        "</td>" +
                        "<td>" +
                            "<label for=\"quantitaProdotto\">Quantity:</label>" +
                            "<input type=\"number\" id=\"quantitaProdotto\" name=\"quantitaProdotto\" value=\"" + ingredients.quantity + "\">" +
                        "</td>" +
                        "<td>" +
                            "<label for=\"unitaProdotto\">Unit of measure:</label>" +
                            "<select id=\"unitaProdotto\" value=\"" + ingredients.unit + "\">" +
                                "<option value=\"n/a\">n/a</option>" +
                                "<option value=\"g\">g</option>" +
                                "<option value=\"kg\">kg</option>" +
                                "<option value=\"cl\">cl</option>" +
                                "<option value=\"ml\">ml</option>" +
                                "<option value=\"l\">l</option>" +
                                "<option value=\"cup\">cup</option>" +
                            "</select>" +
                        "</td>" +
                    "</tr>" +
                "</table>" +
                "<input type=\"submit\" id=\"removeIngredients\" name=\"removeIngredients\" value=\"Remove ingredient\" onclick=\"this.parentElement.remove();if(document.getElementById('list-ingredients').childElementCount > 1) document.getElementById('publish').disabled = false; else document.getElementById('publish').disabled = true;\">" +
            "</div>"
    }
    
    onMount(async() => {
        if(getCookie('csrftoken') === null) {
            window.location.replace('/')
        } else {
            await axios("http://localhost:8000/api/v1/personal-area/" + data.id, {
                method: "GET",
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                withCredentials: true,
            }).then(response => {
                recipe = response.data;
                for(let i = 0; i < recipe.ingredients.length; i++) {
                    var e = document.createElement('div')
                    e.innerHTML = existingIngredients(recipe.ingredients[i])
                    while(e.firstChild)
                        document.getElementById("list-ingredients")?.appendChild(e.firstChild);
                    document.getElementById('publish').disabled = false;
                }
            }).catch(error =>{
                window.location.replace('/account')
            })
        }
    });

    let alert_displayed = null;
    async function updateRecipe() {
        const nodeList = document.getElementById('list-ingredients').childNodes;
        let ingredients = []
        let ingredient = {
            name: "",
            quantity: 0,
            unit: ""
        }
        for (let i = 0; i < nodeList.length; i++) {
            if(nodeList[i].nodeName !== 'INPUT') {
                ingredient.name = nodeList[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].value;
                ingredient.quantity = Number(nodeList[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].value);
                ingredient.unit = nodeList[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[1].value;
            }
            ingredients.push(ingredient);
            ingredient = {
                name: "",
                quantity: 0,
                unit: ""
            } 
        }

        for (let i = 0; i < nodeList.length; i++) {
            ingredients[i] = ingredients[i+1];
        }
        ingredients.pop()
        recipe.ingredients = ingredients

        axios.put('http://localhost:8000/api/v1/personal-area/' + data.id + '/', {
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            withCredentials: true
        }).then(response =>{
            window.location.replace('/account')
        }).catch(error =>{
            alert_displayed = error.response.data;
        })
    }
</script>

<link rel="stylesheet" href="../../css/recipe_max.css">

<title>EDIT RECIPE | Secure Recipe</title>

<form>
    <h1>Edit Recipe</h1>
    {#if alert_displayed != null}
        <div class="invalid-feedback">{alert_displayed}</div>
    {/if}
    <h2>Title</h2>
    <input type="text" id="title" name="title" bind:value={recipe.title}>
    <a class="created_at"><i class="fa fa-clock-o"></i> {recipe.created_at}</a>
    <h2>Description</h2>
    <textarea name="description" class="description" width="100%" rows="5" bind:value={recipe.description}/>               
    <h2>Ingredients</h2>
    <div id="list-ingredients">
        <input type="submit" id="addIngredients" value="Add ingredients" on:click={addIngredients}>
    </div>
    <input type="submit" id="publish" value="Update recipe" style="margin-block-start: 1em;" on:click={updateRecipe}>
</form>