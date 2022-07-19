// Create app namespace
const recipeApp = {};

// Saving the base URL
recipeApp.apiURL = new URL("https://api.spoonacular.com/recipes/complexSearch");

// get recipe info method
recipeApp.getRecipeInfo = (result) => {

		console.log(result.results[Math.floor(Math.random() * result.results.length)]);

		// get recipe object and its instructions
		const recipe = result.results[Math.floor(Math.random() * result.results.length)];
		const recipeInstructions = recipe.analyzedInstructions[0];

		// display recipe title on page
		const recipeTitle = recipe.title;
		const titleElement = document.querySelector('.recipeTitle');
		titleElement.innerText = recipeTitle;


		// parse recipe instructions and display on page
		let parsedInstructions = ''
		for (let i = 0; i < recipeInstructions.steps.length; i++) {
			parsedInstructions += `${i + 1}.  ${recipeInstructions.steps[i].step} <br><br>`
		}

		const recipeElement = document.querySelector('.textContainer p')
		recipeElement.innerHTML = parsedInstructions

		// add recipe image to page
		let recipeImage = document.querySelector('.imgContainer img')
		recipeImage.src = recipe.image

		const macros = [];
		recipe.nutrition.nutrients.forEach((nutritionFactAmount) => {
			macros.push(Math.round(nutritionFactAmount.amount));
		});

		// [cal, protein, fat, carbs]
	document.querySelector('.caloriesAmount').innerText = macros[0];
	document.querySelector('.proteinAmount').innerText = macros[1];
	document.querySelector('.fatAmount').innerText = macros[2];
	document.querySelector('.carbsAmount').innerText = macros[3];
	document.querySelector('.imgContainer p').style.display = 'inline';
	
	

};

// assign all user selections to the API query
recipeApp.getUserValues = (userSelect1, userSelect2, optional1, optional2, optional3, optional4) => {

	const userValue1 = userSelect1.options[userSelect1.selectedIndex].value
	const userValue2 = userSelect2.options[userSelect2.selectedIndex].value
	const userProtein = optional1.options[optional1.selectedIndex].value
	const userFat = optional2.options[optional2.selectedIndex].value
	const userCarbs = optional3.options[optional3.selectedIndex].value
	const userCalories = optional4.options[optional4.selectedIndex].value
	console.log(userCalories)

	recipeApp.apiURL.search = new URLSearchParams({
		apiKey: '187c0eba5b0d4570b499b9d5f22c7a0a',
		includeIngredients: `${userValue1},${userValue2}`,
		addRecipeInformation: true,
		minProtein: userProtein,
		minCarbs: userCarbs,
		minFat: userFat,
		maxCalories: userCalories,
		number: 10,
	});
	console.log(recipeApp.apiURL)
}


// Attach an event handler to the Sumbit Button and prevent the default action of refreshing the page. Then Alert user if either dropdown ingredient has not been selected.
const button = document.querySelector('.buttonSubmit')
button.addEventListener('click', function(event){
	event.preventDefault()

	// consider making a function to select all of these variables, and putting it into an array, and then using spread in the recipeApp.getUserValues
	let firstIngredient = document.querySelector("#ingredientSelector1");
	let secondIngredient = document.querySelector("#ingredientSelector2");
	let userProtein = document.querySelector('#proteinContent');
	let userFat = document.querySelector('#fatContent');
	let userCarbs = document.querySelector('#carbsContent');
	let userCalories = document.querySelector('#caloriesContent');

	if (firstIngredient.selectedIndex === 0 || secondIngredient.selectedIndex === 0){
		
		alert('Please select an item from the ingredients dropdown list.')

	} else {

		recipeApp.getUserValues (firstIngredient, secondIngredient, userProtein, userFat, userCarbs, userCalories)
		
		fetch(recipeApp.apiURL)
			.then((response) => {
				if (response) {
					return response.json()
				} //else {
				// 	throw new Error('something went wrong')
				// }
			})
			.then((result) => {
				console.log(result)
				recipeApp.getRecipeInfo(result)
			})
			// .catch((error) => {
			// 	if (error.message === "something went wrong") {
			// 		alert('No recipes found. Please select another combination!')
			// 	}
			// });
	
	}
	
});

recipeApp.init = () => {

};

// Inititalizing App
recipeApp.init();