// Just tring to put comments here
let myButton = document.getElementById("addBtn");
let tableBody = document.getElementById("inventoryBody");

let currentId = 102;

myButton.addEventListener("click", function() {
    //alert("The Add Item form will go here!");
    let itemName = prompt("Enter the Item Name;");
    let itemCategory = prompt("Enter the Category:");
    let itemStock = prompt("Enter the Stock Level:");

    let newRow = `
    <tr>
        <td>${currentId}</td>
        <td>${itemName}</td>
        <td>${itemCategory}</td>
        <td>${itemStock}</td>
    </tr>  
    `;

    tableBody.innerHTML += newRow;
    currentId++;
});