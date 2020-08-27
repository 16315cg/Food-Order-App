//Written By Cameron Goodey Term 1-2 2020
//All Firebase code module

// database vaiables
var dataRec = {
    uid:      '',
    email:    '',
    name:     '',
    photoURL: ''
};

const db = firebase.firestore();

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
}

const userList = document.querySelector('#user-list');
const form = document.querySelector('#add-user-form');

function renderUser(doc){
	let li = document.createElement('li');
	let name = document.createElement('span');
	let age = document.createElement('span');
	
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	age.textContent = doc.data().age;
	
	li.appendChild(name);
	li.appendChild(age);
	
	userList.appendChild(li);
}

// getting data
db.collection('users').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderUser(doc);
	});
});

// saving data
form.addEventListener('submit', (event) => {
	event.preventDefault();
	db.collection('users').add({
		name: form.name.value,
		age: form.age.value
	});
	form.name.value = '';
	form.age.value = '';
});

//Restart Game Function
function restartApp() {
	document.location.reload();
}

//Exit Game Function
function exitApp() {
	window.open("index.html", "_self");
}