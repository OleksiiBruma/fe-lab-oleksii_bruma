/* root component starts here */
require('assets/less/main.less'); // include general styles

require('./router'); // include router

/* example of including header component */
//require('./components/header/header');
//require('./components/settings/settings');
const firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: 'AIzaSyCIOfHq8ULvkGkw9Xr700E1TxNxGx52sKQ',
  authDomain: 'prodapp-be142.firebaseapp.com',
  projectId: 'prodapp-be142'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Add a second document with a generated ID.
db.collection("users").add({
  first: "Alan",
  middle: "Mathison",
  last: "Turing",
  born: 1912
})
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });

db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
});
