const recipeURL = new URL('https://api.spoonacular.com/recipes/complexSearch');

recipeURL.search = new URLSearchParams({
  apiKey: '187c0eba5b0d4570b499b9d5f22c7a0a',
  includeIngredients: 'apple,cream',
  addRecipeInformation: true,
  fillIngredients: true,
  number: 1
});

// can use just the recipe URL with includeIngredients and addRecipeInformation parameter to get all the information in a single API call

// as opposed to using multiple API calls like the one originally used below

// const APIkey = 'apiKey=187c0eba5b0d4570b499b9d5f22c7a0a';

console.log(recipeURL)
console.log(fetch(recipeURL))
fetch(recipeURL)
  .then((response) => {
    return response.json()})
  .then ((result) => console.log(result));

 