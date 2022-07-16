// Create app namespace
const recipeApp = {};

// Saving the base URL
recipeApp.apiURL = new URL ("https://api.spoonacular.com/recipes/complexSearch");

// Saving the search paramaters and API Key
recipeApp.apiURL.search = new URLSearchParams({
  apiKey: '187c0eba5b0d4570b499b9d5f22c7a0a',
  includeIngredients: `${} + ${}`,
  addRecipeInformation: true,
  fillIngredients: true,
  number: 1
});

recipeApp.init = () => {
  
}

// Attach an event handler to the Sumbit Button and prevent the default action of refreshing the page. Then Alert user if either dropdown ingredient has not been selected.
const button = document.querySelector('.buttonSubmit')
button.addEventListener('click', function(event){
	event.preventDefault()
	let firstSelection = document.querySelector("#ingredientSelector1")
	let secondSelection = document.querySelector("#ingredientSelector2")
	if (firstSelection.selectedIndex === 0 || secondSelection.selectedIndex === 0){
		alert('Please select an item from each dropdown list')
	} else {
		[selectedIndex[.value]]

		fetch(recipeApp.apiURL).then((response) => {
			return response.json()
			})
			.then((result) => console.log(result));
	}
	
});



// can use just the recipe URL with includeIngredients and addRecipeInformation parameter to get all the information in a single API call

// as opposed to using multiple API calls like the one originally used below

// missedIngredients, usedIngredients and analyzedInstructions

// console.log(recipeApp.apiURL)
// console.log(fetch(recipeApp.apiURL))
// fetch(recipeApp.apiURL)
//   .then((response) => {
//     return response.json()})
//   .then ((result) => console.log(result));


// Inititalizing App
recipeApp.init();