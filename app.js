document.addEventListener('DOMContentLoaded', () => {  
    const recipeForm = document.getElementById('recipeForm');  
    const recipeContainer = document.getElementById('recipeContainer');  
    const recipeIdInput = document.getElementById('recipeId');  
    let recipes = []; // Store recipes in an array.  

    const displayRecipes = () => {  
        recipeContainer.innerHTML = ''; // Clear previous recipes  
        recipes.forEach(recipe => {  
            const recipeDiv = document.createElement('div');  
            recipeDiv.classList.add('recipe');  
            recipeDiv.innerHTML = `  
                <h3>${recipe.recipeName}</h3>  
                <p>Category: ${recipe.categoryName}</p>  
                <p>Preparation Time: ${recipe.recipePrepTime} minutes</p>  
                <p>Cooking Time: ${recipe.recipeCookTime} minutes</p>  
                <p>Servings: ${recipe.recipeServings}</p>  
                <p>Instructions: ${recipe.recipeInstructions}</p>                 
                 <p>Ingredients: ${recipe.ingredients.join(', ')}</p>  
                  ${recipe.recipeImage ? `<img src="${recipe.recipeImage}" alt="${recipe.recipeName}" style="max-width: 100%; height: auto;" />` : ''}



                
                                <button class="editButton" data-id="${recipe.id}">Edit</button>  
                <button class="deleteButton" data-id="${recipe.id}">Delete</button>  
            `;  
            recipeContainer.appendChild(recipeDiv);  
        });  

        // Add event listeners for edit and delete buttons  
        document.querySelectorAll('.editButton').forEach(button => {  
            button.addEventListener('click', editRecipe);  
        });  

        document.querySelectorAll('.deleteButton').forEach(button => {  
            button.addEventListener('click', deleteRecipe);  
        });  
    };  

    const addOrUpdateRecipe = (recipe) => {  
        if (recipeIdInput.value) {  
            // Update existing recipe  
            const index = recipes.findIndex(r => r.id === parseInt(recipeIdInput.value));  
            recipes[index] = { ...recipe, id: parseInt(recipeIdInput.value) };  
            recipeIdInput.value = ''; // Clear the ID after use  
        } else {  
            // Add new recipe  
            recipe.id = recipes.length ? Math.max(recipes.map(r => r.id)) + 1 : 1; // Generate new ID  
            recipes.push(recipe);  
        }  
        displayRecipes();  
        showSuccessMessage('Recipe saved successfully!');  
        recipeForm.reset(); // Reset form  
    };  

    const deleteRecipe = (event) => {  
        const id = parseInt(event.target.dataset.id);  
        recipes = recipes.filter(recipe => recipe.id !== id);  
        displayRecipes();  
        showSuccessMessage('Recipe deleted successfully!');  
    };  

    const editRecipe = (event) => {  
        const id = parseInt(event.target.dataset.id);  
        const recipe = recipes.find(r => r.id === id);  
        if (recipe) {  
            categoryName.value = recipe.categoryName;  
            recipeName.value = recipe.recipeName;  
            recipePrepTime.value = recipe.recipePrepTime;  
            recipeCookTime.value = recipe.recipeCookTime;  
            recipeServings.value = recipe.recipeServings;  
            recipeInstructions.value = recipe.recipeInstructions;  
            recipeIngredients.value = recipe.ingredients.join(', ');  
            recipeImage.value = recipe.recipeImage;  
            recipeIdInput.value = recipe.id; // Set ID for editing  
        }  
    };  

    const showSuccessMessage = (message) => {  
        const successContainer = document.getElementById('successContainer');  
        successContainer.textContent = message;  
        setTimeout(() => {  
            successContainer.textContent = ''; // Clear message after a few seconds  
        }, 3000);  
    };  

    recipeForm.addEventListener('submit', (event) => {  
        event.preventDefault(); // Prevent form submission  
        const recipe = {  
            categoryName: document.getElementById('categoryName').value.trim(),  
            recipeName: document.getElementById('recipeName').value.trim(),  
            recipePrepTime: document.getElementById('recipePrepTime').value,  
            recipeCookTime: document.getElementById('recipeCookTime').value,  
            recipeServings: document.getElementById('recipeServings').value,  
            recipeInstructions: document.getElementById('recipeInstructions').value.trim(),  
            ingredients: document.getElementById('recipeIngredients').value.split(',').map(item => item.trim()).filter(item => item !== ''),  
         
        };  

        addOrUpdateRecipe(recipe);  
    });  

    document.getElementById('refreshButton').addEventListener('click', displayRecipes);  
});