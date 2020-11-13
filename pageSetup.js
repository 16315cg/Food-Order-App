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
	fb_login(dataRec);
}

function showAdminButton() {
	if (dataRec.uid == "aW33dzuLqWY2BCWiQdmyrJsxzT62" ||
	dataRec.uid == "2caewtXLgRZfC1ACF4a7RnhbBO72" ||	
	// Usually userID would be used for admin however I do not have these users UID's
	dataRec.email == "bryan.gillies@hvhs.school.nz" ||
	dataRec.email == "katie.long@hvhs.school.nz") {
		adminButton = createButton("Admin");
		adminButton.position(drinkButton.x + drinkButton.width + 20, drinkButton.y);
		adminButton.mousePressed(goAdmin);
	}
}

function goHome() {
	currentPage = 'home';
	manualRead();
}

function goMeat() {
	currentPage = 'meat';
	manualRead();
}

function goVege() {
	currentPage = 'vegetarian';
	manualRead();
}

function goDrink() {
	currentPage = 'drink';
	manualRead();
}

function goAdmin() {
	window.open("docAdd.html", "_self");
}