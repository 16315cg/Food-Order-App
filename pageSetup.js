function pageSetup() {
	loginButton = createButton("Login");
	loginButton.position(20, 20);
	loginButton.mousePressed(userLogin);
	
	homeButton = createButton("Home");
	homeButton.position(loginButton.x + loginButton.width + 20, loginButton.y);
	homeButton.mousePressed(goHome);
	
	meatButton = createButton("Meat");
	meatButton.position(homeButton.x + homeButton.width + 20, homeButton.y);
	meatButton.mousePressed(goMeat);
	
	vegeButton = createButton("Vegetarian");
	vegeButton.position(meatButton.x + meatButton.width + 20, meatButton.y);
	vegeButton.mousePressed(goVege);
	
	drinkButton = createButton("Drinks");
	drinkButton.position(vegeButton.x + vegeButton.width + 20, vegeButton.y);
	drinkButton.mousePressed(goDrink);
}

function userLogin() {
	window.open("login.html", "_self");
}

function goHome() {
	window.open("index.html", "_self");
}

function goMeat() {
	window.open("meat.html", "_self");
}

function goVege() {
	window.open("vege.html", "_self");
}

function goDrink() {
	window.open("drink.html", "_self");
}