//Written By Cameron Goodey Term 1-2 2020
//Console log module

//Global Variables
const INFO = "Green";
const WARN = "Yellow";
const ERROR = "Red";
const traceX = 186;
const traceY = 453;
var trace = true;

//Template: logFunct(name (eg: current score), what you are logging (eg: score number), INFO/WARN/ERROR)

//Create the trace button
function createTrace() {
	traceButton = createButton("Trace ON");
	traceButton.id("mainButton");
	traceButton.position(traceX, traceY);
	traceButton.style("background-color", "green");
	traceButton.mousePressed(traceToggle);
}

//Toggle the trace button on/off
function traceToggle() {
	if (trace) {
		traceButton.hide();
		traceButton = createButton("Trace OFF");
		traceButton.id("mainButton");
		traceButton.position(traceX, traceY);
		traceButton.style("background-color", "red");
		traceButton.mousePressed(traceToggle);

		trace = false;
	} else {
		traceButton.hide();
		traceButton = createButton("Trace ON");
		traceButton.id("mainButton");
		traceButton.position(traceX, traceY);
		traceButton.style("background-color", "green");
		traceButton.mousePressed(traceToggle);

		trace = true;
	}
}

//Display in the console
function logFunct(_function, _text, _type) {

	if (trace) {
		if (_type == INFO) {
			console.info("%c" + _function + ': ' + _text, "color:" + _type);
		}
		if (_type == WARN) {
			console.warn("%c" + _function + ': ' + _text, "color:" + _type);
		}
		if (_type == ERROR) {
			console.error("%c" + _function + ': ' + _text, "color:" + _type);
		}
	}
}