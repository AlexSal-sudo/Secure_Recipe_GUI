<script>
	import { onMount } from "svelte/internal";

    import axios from 'axios';
    onMount(async() => {
        console.log(getCookie('csrftoken'))
        if(getCookie('csrftoken') === null) {
            window.location.replace('/')
        }
    });
    
    let recipe = {
        title: null,
        description: null,
        ingredients: []
    }

    let alert_displayed = null;
    async function addRecipe() {
        const nodeList = document.getElementById('list-ingredients').childNodes;
        let ingredients = []
        let ingredient = {
            name: "",
            quantity: 0,
            unit: ""
        }
        for (let i = 0; i < nodeList.length; i++) {
            if(nodeList[i].nodeName === 'DIV') {
                for(let j = 0; j < nodeList[i].childNodes.length; j++) {
                    if(nodeList[i].childNodes[j].nodeName === 'TABLE') {
                        let indice = 0;
                        if(nodeList[i].childNodes[j].childNodes[0].childNodes[0].childNodes[0].childNodes[2] == undefined)
                            indice++;
                        ingredient.name = nodeList[i].childNodes[j].childNodes[0].childNodes[0].childNodes[0].childNodes[2-indice].value;
                        ingredient.quantity = Number(nodeList[i].childNodes[j].childNodes[0].childNodes[0].childNodes[2-indice].childNodes[2-indice].value);
                        ingredient.unit = nodeList[i].childNodes[j].childNodes[0].childNodes[0].childNodes[4-(indice*2)].childNodes[2-indice].value;
                        ingredients.push(ingredient);
                        ingredient = {
                            name: "",
                            quantity: 0,
                            unit: ""
                        }
                    }
                }
            }
        }
        
        recipe.ingredients = ingredients

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
            let error_list = "<ul>"
            for(let key in error.response.data) {
                for(let i = 0; i < error.response.data[key].length; i++)
                    error_list += "<li><i>" + key.toUpperCase() + ":</i> " + error.response.data[key][i] + "</li>"
            }
            error_list += "</ul>"
            alert_displayed = error_list;
        })
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
</script>

<link rel="stylesheet" href="../css/recipe_max.css">

<title>ADD RECIPE | Secure Recipe</title>

<form>
    <h1>Add Recipe</h1>
    {#if alert_displayed != null}
        <div class="invalid-feedback">{@html alert_displayed}</div>
    {/if}
    <h2>Title</h2>
    <input type="text" id="title" name="title" bind:value={recipe.title}>
    <h2>Description</h2>
    <textarea name="description" class="description" width="100%" rows="5" bind:value={recipe.description}/>               
    <h2>Ingredients</h2>
    <div id="list-ingredients">
        <input type="submit" id="addIngredients" value="Add ingredients" on:click={addIngredients}>
    </div>
    <input type="submit" id="publish" value="Publish recipe" on:click={addRecipe} style="margin-block-start: 1em;" disabled>
</form>