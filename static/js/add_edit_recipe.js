function addIngredients() {
    var e = document.createElement('div');
    e.innerHTML = "<div class=\"add-ingredients\">" +
            "<table>" +
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
            "</table>" +
            "<input type=\"submit\" id=\"removeIngredients\" name=\"removeIngredients\" value=\"Remove ingredient\" onclick=\"this.parentElement.remove();if(document.getElementById('list-ingredients').childElementCount > 1) document.getElementById('publish').disabled = false; else document.getElementById('publish').disabled = true;\">" +
        "</div>"
    while(e.firstChild)
        document.getElementById("list-ingredients")?.appendChild(e.firstChild);
    document.getElementById('publish').disabled = false;
}

function giveIngredients() {
    const nodeList = document.getElementById('list-ingredients').childNodes;
    let ingredients = [];
    let ingredient = {
        name: "",
        quantity: 0,
        unit: ""
    };
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
                    };
                }
            }
        }
    }
    
    return ingredients;
}

function printError(result) {
    let error_list = "<ul>";
    for(let key in result) {
        for(let i = 0; i < result[key].length; i++)
            error_list += "<li><i>" + key.toUpperCase() + ":</i> " + result[key][i] + "</li>";
    }
    error_list += "</ul>";
    return error_list;
}

function resetStyleSetting() {
    document.getElementById('tmp').id = "content";
}