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

function deleteItem(itemId){
    let confirmDelete = confirm("Are you sure you want to delete this item?");

    if(confirmDelete){
        fetch('/delete/' + itemId, {
            method: 'DELETE'
        }).then(function(response){
            if(response.ok){
                window.location.reload();
            }
        });
    }
}

function editItem(itemId){
    let newStock = prompt("Enter the new stock level:");
    if (newStock !== null && newStock.trim() !== "") {

        let updateData = {
            "stock": newStock
        };

        fetch('/edit/' + itemId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        }).then(function(response){
            if(response.ok){
                window.location.reload();
            }
        });

    }
}