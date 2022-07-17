// Create app namespace
const recipeApp = {};
recipeApp.getUserValues = (userSelect1, userSelect2) => {
	const userValue1 = userSelect1.options[userSelect1.selectedIndex].value
	const userValue2 = userSelect2.options[userSelect2.selectedIndex].value
	recipeApp.apiURL.search = new URLSearchParams({
		apiKey: '187c0eba5b0d4570b499b9d5f22c7a0a',
		includeIngredients: `${userValue1},${userValue2}`,
		addRecipeInformation: true,
		number: 10,
		//   fillIngredients: false,
	});
	console.log(recipeApp.apiURL)
	// recipeApp.apiURL.includeIngredients = `${userValue1},${userValue2}`
}
// Saving the base URL
recipeApp.apiURL = new URL ("https://api.spoonacular.com/recipes/complexSearch");

// Saving the search paramaters and API Key
// recipeApp.apiURL.search = new URLSearchParams({
//   apiKey: '187c0eba5b0d4570b499b9d5f22c7a0a',
//   includeIngredients: `tofu,broccoli`,
//   addRecipeInformation: true,
//   number: 10
// //   fillIngredients: false,
// });

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
		recipeApp.getUserValues (firstSelection, secondSelection)
		
		fetch(recipeApp.apiURL).then((response) => {
			return response.json()
			})
			// Console logging a randomized recipe. Save it to a variable called recipe. Then returning


			.then((result) => {
				console.log(result.results[Math.floor(Math.random() * result.results.length)]);
				const recipe = result.results[Math.floor(Math.random() * result.results.length)];
				const recipeInstructions = recipe.analyzedInstructions[0];
				let parsedInstructions = ''
				for (let i = 0; i < recipeInstructions.steps.length; i++){
					parsedInstructions += `${i + 1} ${recipeInstructions.steps[i].step} <br><br>`
				}
				console.log(parsedInstructions)
				document.querySelector('.textContainer p')
				const recipeElement = document.querySelector('.textContainer p')
				recipeElement.innerHTML = parsedInstructions
			});
		
			
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