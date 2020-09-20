//Written By Cameron Goodey Term 1-3 2020
//All Firebase code module

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

//current issue: runs the listener before it runs the setup so the type sort returns undefined (i think)

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
	
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	price.textContent = "$" + doc.data().price;
	imageURL.textContent = doc.data().imageURL;
	
	li.appendChild(imageURL);
	li.appendChild(name);
	li.appendChild(price);
	
	imageURL.src = imgURL;
	
	foodList.appendChild(li);
	
	//deleting data
	/*cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('meat').doc(id).delete();
		console.log('Document ' + id + ' has been deleted. 🦀🦀🦀');
	})*/
}

//real-time listener
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