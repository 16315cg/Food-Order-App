//Written By Cameron Goodey Term 1-3 2020
//All Firebase code module

/* 
To do:
	Fully integrate the user login to allow a user to be logged in as an admin. 
	The admin will be able to use the docAdd page to add and remove documents. 
	Preferably the admin would also be able to edit documents within the webpage.
*/

// database vaiables
var dataRec = {
    uid:      '',
    email:    '',
    name:     '',
    photoURL: ''
};

var collection = 'products';
var type = currentPage;

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
	userIcon.position(40, 22);
	userNameP = createP().position(userIcon.x, userIcon.y + userIcon.height + 5)
	.id('smallText');
	userNameP.html('Hello ' + dataRec.name);
	showAdminButton()
	
	getLocation();
}

var foodList = document.querySelector('#food-list');
const form = document.querySelector('#add-food-form');

function renderFood(doc){
	let li = document.createElement('li');
	let name = document.createElement('span');
	let price = document.createElement('span');
	let imageURL = document.createElement('img');
	let imageURLText = document.createElement('span');
	let imgURL = doc.data().imageURL;
	let type = document.createElement('span');
	let cross = document.createElement('div');
	
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	price.textContent = "$" + doc.data().price;
	imageURL.textContent = doc.data().imageURL;
	imageURLText.textContent = doc.data().imageURL;
	type.textContent = doc.data().type;
	cross.textContent = "X";
	
	li.appendChild(imageURL);
	li.appendChild(name);
	li.appendChild(price);
	
	if (currentPage == "docAdd") {
		li.appendChild(imageURLText);
		li.appendChild(type);
		li.appendChild(cross);
		
		cross.addEventListener('click', (e) => {
			e.stopPropagation();
			let id = e.target.parentElement.getAttribute('data-id');
			let deleteCheck = confirm("Are you sure you want to delete this?");
			if (deleteCheck) {
				db.collection('products').doc(id).delete();
				console.log('Document ' + id + ' has been deleted.');
			}
		})
	} else {
		imageURL.src = imgURL;	
		//home screen food selection listener
		li.addEventListener('click', (e) => {
			e.stopPropagation();
			let id = e.target.getAttribute('data-id');
			console.log(id);
		})
		name.addEventListener('click', (e) => {
			e.stopPropagation();
			let id = e.target.parentElement.getAttribute('data-id');
			console.log(id);
		})
		price.addEventListener('click', (e) => {
			e.stopPropagation();
			let id = e.target.parentElement.getAttribute('data-id');
			console.log(id);
		})
		imageURL.addEventListener('click', (e) => {
			e.stopPropagation();
			let id = e.target.parentElement.getAttribute('data-id');
			console.log(id);
		})
	}
	foodList.appendChild(li);
}

//real-time listener
db.collection('products').orderBy("name").onSnapshot(snapshot => {
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

function manualRead() {
	$(foodList).empty();
	
	if (currentPage == 'home') {
		db.collection('products').orderBy("name").onSnapshot(snapshot => {
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
	} else {
		type = currentPage;
		db.collection(collection).where('type', '==', type).orderBy("name").onSnapshot(snapshot => {
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
	}
}

// saving data
if (currentPage == 'docAdd') {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		var priceInt = parseInt(form.price.value);
		db.collection('products').add({
			name: form.name.value,
			price: priceInt,
			imageURL: form.imageURL.value,
			type: form.type.value
		});
		form.name.value = '';
		form.price.value = '';
		form.imageURL.value = '';
		form.type.value = '';
	});
}

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