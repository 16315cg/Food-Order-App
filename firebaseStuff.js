//Written By Cameron Goodey Term 1-3 2020
//All Firebase code module

// database vaiables
var dataRec = {
    uid:      '',
    email:    '',
    name:     '',
    photoURL: ''
};

var category = "meat";

const db = firebase.firestore();
var lat;
var lon;

//Firebase Login
function fb_login(_dataRec) {
	firebase.auth().onAuthStateChanged(newLogin);
  
	function newLogin(user) {
		if (user) {
			// user is signed in
			_dataRec.uid      = user.uid;
			_dataRec.email    = user.email;
			_dataRec.name     = user.displayName;
			_dataRec.photoURL = user.photoURL;
			loginStatus = 'logged in';
			loginOK();
		}
		else {
			// user NOT logged in, so redirect to Google login
			_dataRec.uid      = '',
			_dataRec.email    = '',
			_dataRec.name     = '',
			_dataRec.photoURL = ''
			loginStatus = 'logged out';
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider);
		}
	}
}

function loginOK() {
	console.table(dataRec);
	loginButton.hide();
	userIcon = createImg(dataRec.photoURL);
	userIcon.size(40, 40);
	userIcon.position(40, 40);
	userNameP = createP().position(userIcon.x + userIcon.width + 10, userIcon.y)
	.id('smallText');
	userNameP.html('Hello ' + dataRec.name);
	
	getLocation();
}

const foodList = document.querySelector('#food-list');
const form = document.querySelector('#add-food-form');

function renderFood(doc){
	let li = document.createElement('li');
	let name = document.createElement('span');
	let price = document.createElement('span');
	let imageURL = document.createElement('img');
	let imgURL = doc.data().imageURL;
	let cross = document.createElement('div');
	
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	price.textContent = "$" + doc.data().price;
	imageURL.textContent = doc.data().imageURL;
	cross.textContent = 'x';
	
	li.appendChild(name);
	li.appendChild(price);
	li.appendChild(imageURL);
	li.appendChild(cross);
	
	console.log(imgURL);
	imageURL.src = imgURL;
	imageURL.width = 20;
	imageURL.height = 20;
	
	foodList.appendChild(li);
	
	//deleting data
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('meat').doc(id).delete();
		console.log('Document ' + id + ' has been deleted. 🦀🦀🦀');
	})
}

//real-time listener
db.collection(category).orderBy('name', 'desc').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			renderFood(change.doc);
		} else if (change.type == 'removed') {
			let li = foodList.querySelector('[data-id=' + change.doc.id + ']');
			foodList.removeChild(li);
		}
	})
})

// saving data
/* form.addEventListener('submit', (event) => {
	event.preventDefault();
	var ageInt = parseInt(form.age.value);
	db.collection('users').add({
		name: form.name.value,
		age: ageInt,
		date: new Date(),
		userLocation: new firebase.firestore.GeoPoint(lat, lon),
		creator: [dataRec.name, dataRec.email]
	});
	form.name.value = '';
	form.age.value = '';
}); */

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(saveCoords);
	} else { 
		console.log("Geolocation is not supported by this browser.");
	}
}

function saveCoords(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	console.log(lat, lon);
}

//Restart Game Function
function restartApp() {
	document.location.reload();
}

//Exit Game Function
function exitApp() {
	window.open("index.html", "_self");
}