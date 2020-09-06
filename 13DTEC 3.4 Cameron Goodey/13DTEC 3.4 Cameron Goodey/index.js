var currentPage = "login";

var path = '13DTEC';    // CHANGE THIS TO YOUR PATH <=========

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

//p5 Preload Function
function preload() {
	
}

function setup() {
	pageSetup();
}
  
function draw() {
	canvas = createCanvas(1, 1);
}

function pageSetup() {
	loginButton = createButton("Login");
	loginButton.id("test");
	loginButton.position(20, 20);
	loginButton.mousePressed(userLogin);
}

function userLogin() {
	fb_login(dataRec);
}