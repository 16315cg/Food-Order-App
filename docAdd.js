var currentPage = "docAdd";
			
//p5 Preload Function
function preload() {
	
}

function setup() {
	backButton = createButton("Back");
	backButton.position(20, 20);
	backButton.mousePressed(goBack);
}
  
function draw() {
	canvas = createCanvas(1, 1);
}

function goBack() {
	window.open("index.html", "_self");
}