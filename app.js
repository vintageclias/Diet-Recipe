// Wait for the DOM to be ready before executing script  
document.addEventListener('DOMContentLoaded', () => {  
    // Fetch existing recipes when the page loads  
    fetchRecipes();  

    // Handle form submission  
    document.getElementById('recipeForm').addEventListener('submit', async (event) => {  
        event.preventDefault();  

        const categoryName = document.getElementById('categoryName').value;  
        const recipeName = document.getElementById('recipeName').value;  
        const recipePrepTime = document.getElementById('recipePrepTime').value;  
        const recipeInstructions = document.getElementById('recipeInstructions').value;  
        const recipeIngredients = document.getElementById('recipeIngredients').value.split(',');  

        const recipe = {  
            categoryName,  
            recipeName,  
            recipePrepTime,  
            recipeInstructions,  
            ingredients: recipeIngredients  
        };  

        // Get the recipe ID from the hidden input  
        const recipeId = document.getElementById('recipeId').value;  
        
        if (recipeId) {  
            // Update existing recipe  
            updateRecipe(recipeId, recipe);  
        } else {  
            // Create a new recipe  
            addRecipeToList(recipe);  
            createRecipe(recipe);  
        }  

        // Clear the form  
        document.getElementById('recipeForm').reset();  
    });  
});  

// Function to add recipe to the displayed list  
function addRecipeToList(recipe) {  
    const recipeContainer = document.getElementById('recipeContainer');  
    const recipeDiv = document.createElement('div');  
    recipeDiv.classList.add('recipe');  

    // Use the ID from the server instead of creating a new one  
    const recipeId = recipe.id; // Assuming `recipe` has an ID from your server  

    recipeDiv.innerHTML = `  
        <h3>${recipe.recipeName}</h3>  
        <p><strong>Category:</strong> ${recipe.categoryName}</p>  
        <p><strong>Prep Time:</strong> ${recipe.recipePrepTime} minutes</p>  
        <p><strong>Instructions:</strong> ${recipe.recipeInstructions}</p>  
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>  
        <button onclick="editRecipe('${recipeId}', '${recipe.recipeName}', '${recipe.categoryName}', '${recipe.recipePrepTime}', '${recipe.recipeInstructions}', '${recipe.ingredients.join(', ')}')">Edit</button>  
        <button onclick="deleteRecipe('${recipeId}')">Delete</button>  
    `;  

    recipeDiv.setAttribute('data-id', recipeId);  
    recipeContainer.appendChild(recipeDiv);  
}  

// Function to create a new recipe  
async function createRecipe(recipe) {  
    try {  
        const response = await fetch('http://localhost:3000/recipes', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify(recipe)  
        });  
        if (!response.ok) throw new Error('Network response was not ok');  
        const data = await response.json();  
        console.log('Recipe created:', data);  
    } catch (error) {  
        console.error('Error creating recipe:', error);  
    }  
}  

// Function to update an existing recipe using PUT  
async function updateRecipe(id, recipe) {  
    try {  
        const response = await fetch(`http://localhost:3000/recipes/${id}`, {  
            method: 'PUT',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify(recipe)  
        });  
        if (!response.ok) throw new Error('Network response was not ok');  
        const data = await response.json();  
        console.log('Recipe updated:', data);  
    } catch (error) {  
        console.error('Error updating recipe:', error);  
    }  
}  

// Function to fetch existing recipes (GET)  
async function fetchRecipes() {  
    try {  
        const response = await fetch('http://localhost:3000/recipes');  
        if (!response.ok) throw new Error('Network response was not ok');  
        const recipes = await response.json();  
        recipes.forEach(addRecipeToList);  
    } catch (error) {  
        console.error('Error fetching recipes:', error);  
    }  
}  

// Function to edit a recipe  
function editRecipe(id, name, category, prepTime, instructions, ingredients) {  
    document.getElementById('recipeId').value = id; // Set the correct recipe ID  
    document.getElementById('categoryName').value = category;  
    document.getElementById('recipeName').value = name;  
    document.getElementById('recipePrepTime').value = prepTime;  
    document.getElementById('recipeInstructions').value = instructions;  
    document.getElementById('recipeIngredients').value = ingredients;  

    // Optionally, show a message or highlight the form  
    alert(`Editing recipe: ${name}`);  
}  

// Function to delete a recipe  
async function deleteRecipe(id) {  
    try {  
        const response = await fetch(`http://localhost:3000/recipes/${id}`, {  
            method: 'DELETE'  
        });  
        if (!response.ok) throw new Error('Network response was not ok');  
        console.log('Recipe deleted:', id);  
        document.querySelector(`[data-id="${id}"]`).remove(); // Remove the recipe from the DOM  
    } catch (error) {  
        console.error('Error deleting recipe:', error);  
    }  
}