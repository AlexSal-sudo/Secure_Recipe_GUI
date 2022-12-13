<script>
// @ts-nocheck

    export let name;
    export let quantity;
    export let unit;
</script>

<div class="add-ingredients">
    <table>
        <tbody>
            <tr>
                <td>
                    <label for="nomeProdotto">Ingredients name:</label>
                    <input type="text" id="nomeProdotto" name="nomeProdotto" value="{name}" pattern="^[a-zA-ZÀ-ú ]+$">
                </td>
                <td>
                    <label for="quantitaProdotto">Quantity:</label>
                    <input type="number" id="quantitaProdotto" name="quantitaProdotto" value="{quantity}" min="1" max="1000">
                </td>
                <td>
                    <label for="unitaProdotto">Unit of measure:</label>
                    <select id="unitaProdotto">
                        {#if unit == "n/a"}
                            <option value="n/a" selected>n/a</option>
                        {:else}
                            <option value="n/a">n/a</option>
                        {/if}

                        {#if unit == "g"}
                            <option value="g" selected>g</option>
                        {:else}
                            <option value="g">g</option>
                        {/if}
                        
                        {#if unit == "kg"}
                            <option value="kg" selected>kg</option>
                        {:else}
                            <option value="kg">kg</option>
                        {/if}

                        {#if unit == "cl"}
                            <option value="cl" selected>cl</option>
                        {:else}
                            <option value="cl">cl</option>
                        {/if}
                        
                        {#if unit == "ml"}
                            <option value="ml" selected>ml</option>
                        {:else}
                            <option value="ml">ml</option>
                        {/if}
                        
                        {#if unit == "l"}
                            <option value="l" selected>l</option>
                        {:else}
                            <option value="l">l</option>
                        {/if}
                        
                        {#if unit == "cup"}
                            <option value="cup" selected>cup</option>
                        {:else}
                            <option value="cup">cup</option>
                        {/if}
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
    <button id="removeIngredients" name="removeIngredients" onclick="this.parentElement.remove();if(document.getElementById('list-ingredients').childElementCount > 1) document.getElementById('publish').disabled = false; else document.getElementById('publish').disabled = true;">Remove ingredient</button>
</div>