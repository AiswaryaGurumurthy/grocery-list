const groceryform = document.getElementById('grocery-input-form');
const input = document.getElementById('grocery-input-textbox');
const list = document.getElementById('grocery-list');
const alertMessage = document.getElementById('alert-message');
let itemBeingEdited = null;

// Create the clear button, but don't show it yet
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear grocery list';
clearBtn.className = 'clear';
clearBtn.style.display = 'none';
clearBtn.style.marginTop = '1em';
clearBtn.onclick = (e) => {
    e.preventDefault();
    list.innerHTML = '';
    clearBtn.style.display = 'none';
    alertMessage.textContent = "Grocery list cleared!";
    alertMessage.style.color = "red";
    setTimeout(() => {
        alertMessage.textContent = "";
    }, 1000);
};
// Insert the button after the form, but still not displayed as the list is empty
groceryform.parentNode.insertBefore(clearBtn, list.nextSibling);

//Creating list item with actions
function createListItem(text) {
    const li = document.createElement('li');
    const inputval = document.createElement('inputval');
    inputval.textContent = text;
    li.appendChild(inputval);
    
    const actions = document.createElement('div');
    actions.className = 'actions';

    const purchasechbx = document.createElement('input');
    purchasechbx.type = 'checkbox';
    purchasechbx.onclick = () => {
        li.classList.toggle('purchased');
        alertMessage.textContent = "Item marked as purchased!";
        alertMessage.style.color = "green";
        setTimeout(() => {
            alertMessage.textContent = "";
        }, 1000);
    };
    actions.appendChild(purchasechbx);

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';
    editBtn.className = 'edit';
    editBtn.onclick = () => {
        input.value = inputval.textContent;
        itemBeingEdited = inputval;
    };
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => {
        li.remove();
        // Hide clear button if list is empty after deletion
        if (list.children.length === 0) {
            clearBtn.style.display = 'none';
        }
        alertMessage.textContent = "Item deleted!";
        alertMessage.style.color = "red";
        setTimeout(() => {
            alertMessage.textContent = "";
        }, 1000);
    };
    actions.appendChild(deleteBtn);

    li.appendChild(actions);
    return li;
}

groceryform.onsubmit = (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
        if (itemBeingEdited) {
            itemBeingEdited.textContent = value;
            alertMessage.textContent = "Item updated!";
            alertMessage.style.color = "green";
            setTimeout(() => {
                alertMessage.textContent = "";
            }, 1000);
            itemBeingEdited = null;
        } else {
            list.insertBefore(createListItem(value), list.firstChild);
            alertMessage.textContent = "Item added!";
            alertMessage.style.color = "green";
            setTimeout(() => {
                alertMessage.textContent = "";
            }, 1000);
        }
        input.value = '';
        // Show clear button only if the list not empty
        if (list.children.length > 0) {
            clearBtn.style.display = '';
        }
    } else {
        alertMessage.textContent = "Please enter a valid item!";
        alertMessage.style.color = "red";
        setTimeout(() => {
            alertMessage.textContent = "";
        }, 1000);
    }
};
