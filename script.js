// Create app namespace
const recipeApp = {};

// Saving the base URL
recipeApp.apiURL = new URL("https://api.spoonacular.com/recipes/complexSearch");

// get recipe info method
recipeApp.getRecipeInfo = (result) => {

		console.log(result.results[Math.floor(Math.random() * result.results.length)]);

		// get recipe object and its instructions
		const recipe = result.results[Math.floor(Math.random() * result.results.length)];
		if (recipe) {

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

			recipeElement.style.opacity = '1'

			// add recipe image to page
			let recipeImage = document.querySelector('.imgContainer img')
			recipeImage.src = recipe.image

			const macros = [];
			recipe.nutrition.nutrients.forEach((nutritionFactAmount) => {
				macros.push(Math.round(nutritionFactAmount.amount));
			});

			// add nutrient info
			document.querySelector('.caloriesAmount').innerText = macros[0];
			document.querySelector('.proteinAmount').innerText = macros[1];
			document.querySelector('.fatAmount').innerText = macros[2];
			document.querySelector('.carbsAmount').innerText = macros[3];
			document.querySelector('.imgContainer p').style.display = 'inline';
		} else {
			alert('Your Selected combination didn\'t return a recipe. Please amend selections and try again')
		}
		

};

// assign all user selections to the API query
recipeApp.getUserValues = (userSelect1, userSelect2, optional1, optional2, optional3, optional4) => {

	const userValue1 = userSelect1.options[userSelect1.selectedIndex].value
	const userValue2 = userSelect2.options[userSelect2.selectedIndex].value
	const userProtein = optional1.options[optional1.selectedIndex].value
	const userFat = optional2.options[optional2.selectedIndex].value
	const userCarbs = optional3.options[optional3.selectedIndex].value
	const userCalories = optional4.options[optional4.selectedIndex].value

	recipeApp.apiURL.search = new URLSearchParams({
		apiKey: '187c0eba5b0d4570b499b9d5f22c7a0a',
		includeIngredients: `${userValue1},${userValue2}`,
		addRecipeInformation: true,
		minProtein: userProtein,
		minCarbs: userCarbs,
		minFat: userFat,
		maxCalories: userCalories,
		number: 10,
		fillIngredients: true
	});
}


// Attach an event handler to the Sumbit Button and prevent the default action of refreshing the page. Then Alert user if either dropdown ingredient has not been selected.
const button = document.querySelector('.buttonSubmit')
button.addEventListener('click', function(event){
	event.preventDefault();

	// hide button to prevent spamming
	this.style.visibility = 'hidden';
	// Disable button 
	this.disabled = true;

	// show loading pacman
	let loadingLogo = document.querySelector('.loadingContainer');
	loadingLogo.style.opacity = '1';
	
	let firstIngredient = document.querySelector("#ingredientSelector1");
	let secondIngredient = document.querySelector("#ingredientSelector2");
	let userProtein = document.querySelector('#proteinContent');
	let userFat = document.querySelector('#fatContent');
	let userCarbs = document.querySelector('#carbsContent');
	let userCalories = document.querySelector('#caloriesContent');

	if (firstIngredient.selectedIndex === 0 || secondIngredient.selectedIndex === 0){
		
		alert('Please select an item from the ingredients dropdown list.')

		// re-enable button and remove loading
		this.disabled = false;
		this.style.visibility = 'visible';
		loadingLogo.style.opacity = '0';
	} else {

		recipeApp.getUserValues (firstIngredient, secondIngredient, userProtein, userFat, userCarbs, userCalories)
		
		fetch(recipeApp.apiURL)
			.then((response) => {
				if (response) {
					return response.json()
				} 
			})
			.then((result) => {
				console.log(result)
				recipeApp.getRecipeInfo(result)

				// re-enable button and remove loading
				this.disabled = false;
				this.style.visibility = 'visible';
				loadingLogo.style.opacity = '0';
			})
	}
});

// Used anime URL from H2 in index.html 

const textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
	.add({
		targets: '.ml9 .letter',
		scale: [0, 1],
		duration: 1000,
		elasticity: 600,
		delay: (el, i) => 25 * (i + 1)
	}).add({
		targets: '.ml9',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 3500
	});
// END of H2 URL used 

// didnt need to use, left in, in case we add features
recipeApp.init = () => {

};

// Inititalizing App
recipeApp.init();