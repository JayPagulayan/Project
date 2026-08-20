// Just tring to put comments here
let myButton = document.getElementById("addBtn");

myButton.addEventListener("click", function() {
    //alert("The Add Item form will go here!");
    let itemName = prompt("Enter the Item Name");
    let itemCategory = prompt("Enter the Category:");
    let itemStock = prompt("Enter the Stock Level:");

    let newItemData = {
        "name": itemName,
        "category": itemCategory,
        "stock": itemStock
    };  

    fetch('/add',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItemData)
        }).then(function(response){
            if(response.ok){
                window.location.reload();
        }
    });
});