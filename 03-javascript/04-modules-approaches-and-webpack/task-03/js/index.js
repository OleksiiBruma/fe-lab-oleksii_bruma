import {EmployeeCollection} from'./EmployeeCollection.js';
import EmployeeData from './employees-collection.json';
let collectionData = new EmployeeCollection(EmployeeData);
let fiveNames = document.getElementById("five-names");
let threeIds = document.getElementById("three-ids");
let collectionAverage = document.getElementById("collection-average");
let collectionContent = document.getElementById("collection-content");
fiveNames.textContent = collectionData.getFiveNames().join(", ");
threeIds.textContent =  collectionData.getThreeIds().join(", ");
collectionAverage.textContent = collectionData.getCollectionAverage();
collectionContent.textContent = JSON.stringify(collectionData.sorted, null, 2)

