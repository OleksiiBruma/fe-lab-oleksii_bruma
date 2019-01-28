const firebase = require("firebase/app");
require("firebase/firestore");

export class Websockets{
  constructor(){
    firebase.initializeApp({
      apiKey: 'AIzaSyCIOfHq8ULvkGkw9Xr700E1TxNxGx52sKQ',
      authDomain: 'prodapp-be142.firebaseapp.com',
      projectId: 'prodapp-be142'
    });
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();
  }
  addData(){
// Add a second document with a generated ID.
  this.db.collection("tasks").add({
    id: "Alan",
    title: "Mathison",
    description: "Turing",
    createDate: new Date(),
    startDate: new Date(),
    deadline: new Date(),
    isActive: true,
    estimationTotal: 0,
    estimationUsed: 1,
    priority: 4,
    categoryId: 5,
    isInProgress: true,


  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    })
  }
  getData(){
    this.db.collection("tasks").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    });
  }

}
