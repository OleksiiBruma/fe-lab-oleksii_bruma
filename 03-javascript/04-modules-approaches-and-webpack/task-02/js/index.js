var EmployeeCollection = require('./EmployeeCollection.js').EmployeeCollection;
var EmployeeData = require('./employees-collection.json');
var collection = new EmployeeCollection(EmployeeData);
var fiveNames = document.getElementById("five-names");
var threeIds = document.getElementById("three-ids");
var collectionAverage = document.getElementById("collection-average");
var collectionContent = document.getElementById("collection-content");
fiveNames.textContent = collection.getFiveNames().join(", ");
threeIds.textContent =  collection.getThreeIds().join(", ");
collectionAverage.textContent = collection.getCollectionAverage();
collectionContent.textContent = JSON.stringify(collection.sorted, null, 2)

