// app.js  

document.getElementById('recipeForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Prevent the default form submission  

    // Get values from the input fields  
    const categoryName = document.getElementById('categoryName').value;  

    // Validate input fields
    const recipeName = document.getElementById('recipeName').value;  
    if (!recipeName) {  
        alert('Please enter a recipe name.');  
        return;  
    }

    const recipePrepTime = document.getElementById('recipePrepTime').value;  
    if (!recipePrepTime) {  
        alert('Please enter a recipe prep time.');  
        return;  
    }
    const recipeInstructions = document.getElementById('recipeInstructions').value;  
    const recipeIngredients = document.getElementById('recipeIngredients').value.split(',').map(ingredient => ingredient.trim());  

    // Create a recipe object  
    const recipe = {  
        categoryName,  
        recipeName,  
       
        recipeInstructions,  
        ingredients: recipeIngredients  
    };  

    // Add recipe to the recipe list  
    addRecipeToList(recipe);  

    // Clear the form  
    document.getElementById('recipeForm').reset();  
});  

// Function to add recipe to the displayed list  
function addRecipeToList(recipe) {  
    const recipeContainer = document.getElementById('recipeContainer');  
    
    const recipeDiv = document.createElement('div');  
    recipeDiv.classList.add('recipe');  

    recipeDiv.innerHTML = `  
        <h3>${recipe.recipeName}</h3>  
        <p><strong>Category:</strong> ${recipe.categoryName}</p>  
        <p><strong>Prep Time:</strong> ${recipe.recipePrepTime} minutes</p>
        
        <p><strong>Instructions:</strong> ${recipe.recipeInstructions}</p>  
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>  
    `;  

    recipeContainer.appendChild(recipeDiv);  
}