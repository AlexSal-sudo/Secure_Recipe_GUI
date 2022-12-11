<script>

</script>

<div class="add-ingredients">
    <table>
        <tr>
            <td>
                <label for="nomeProdotto">Ingredients name:</label>
                <input type="text" id="nomeProdotto" name="nomeProdotto">
            </td>
            <td>
                <label for="quantitaProdotto">Quantity:</label>
                <input type="number" id="quantitaProdotto" name="quantitaProdotto">
            </td>
            <td>
                <label for="unitaProdotto">Unit of measure:</label>
                <select id="unitaProdotto">
                    <option value="n/a">n/a</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="cl">cl</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="cup">cup</option>
                </select>
            </td>
        </tr>
    </table>
    <input type="submit" id="removeIngredients" name="removeIngredients" value="Remove ingredient" onclick="this.parentElement.remove();if(document.getElementById('list-ingredients').childElementCount > 1) document.getElementById('publish').disabled = false; else document.getElementById('publish').disabled = true;">
</div>