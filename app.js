// import modules
import productList from './product.js';
import cartList from './cart.js';


// show all products dynamically using JavaScript
const productContainer = document.getElementById("product-container");

function productInitialization() {
    productList.map((item) => {
        productContainer.innerHTML += `  
        <div class="col">
            <div class="card h-100">
                <img src=${item.image} class="card-img-top" alt=${item.name}>
                <div class="card-body">
                    <h6 id="Product-name" class="card-title">${item.name}</h6>
                    <p id="category" class="card-text">${item.category}</p>
                    <div class="d-flex justify-content-between fw-bolder">
                        <p id="price" class="card-text">${item.price}<span class="ms-1">Tk</span></p>
                        <p id="stocked" class="card-text"><span class="me-1">Qty:</span>${item.stocked}</p>
                    </div>
                    <button onclick="handleAddToCart(${item.id})" type="button" id="add-to-cart" class="btn btn-dark w-100">Add To Cart</button>
                </div>
            </div>
        </div>`;
    });
}
productInitialization();



// b) Adding Products to Cart:

let handleAddToCart=(...pdoductId)=>{ // using rest parameter

    let itemFound = cartList.find(item => item.id === pdoductId[0]);
    // console.log(existItem);
    if (itemFound) {
        alert("You have already added this product to the cart.");
    }
    else {
        let product = productList.find(item => item.id === pdoductId[0]);
        let newCartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            stocked: product.stocked - 1,
            ordered: product.ordered + 1,
        };
        // cartList = [...cartList, newCartItem];
        cartList.push(newCartItem);
        console.log("cartList :", cartList);
        displayCartItems();

    }
}
// export default handleAddToCart;
window.handleAddToCart=handleAddToCart;

// c) Displaying Cart Items:
let cartContainer = document.getElementById("cart-container");

let displayCartItems = () => {
    cartContainer.innerHTML = "";
    cartList.map(item => {
        let cartRow = document.createElement("tr");
        cartRow.innerHTML = `
                <td>
                <div>
                    <h6>${item.name}</h6>
                    <p>BDT ${item.price}</p>
                </div>
                </td>
                <td>
                <button onclick="handleIncrementQuantity(${item.id})" class="btn btn-sm">
                    <i class="fa-solid fa-plus"></i>
                </button>
    
                <span id="ordered-quantity" class="mx-1">${item.ordered}</span>
    
                <button onclick="handleDecrementQuantity(${item.id})" class="btn btn-sm">
                    <i class="fa-solid fa-minus"></i>
                </button>
                </td>
                <td>
                <i class="fa-solid fa-bangladeshi-taka-sign me-1"></i><span id="indevidual-price">${calculateIndividualPrice(item)}</span>
                </td>
                <td><button onclick="handleRemoveCartItem(${item.id})" class="btn btn-sm"><i class="fa-solid fa-trash-can text-danger"></i></button></td>`;
        cartContainer.appendChild(cartRow);

        document.getElementById("total-cart-amount").textContent = calculateTotalCartAmount() + " " + "TK";
    })
    document.getElementById("total-cart-amount").textContent = calculateTotalCartAmount() + " " + "TK";
}
window.displayCartItems=displayCartItems;


const handleRemoveCartItem = (productId) => {
    cartList = cartList.filter(item => item.id !== productId);
    displayCartItems();
}
window.handleRemoveCartItem=handleRemoveCartItem;

const handleClearCart = () => {
    console.log("data clear successfully");
    cartList = [];
    console.log("clear cart", cartList);
    displayCartItems();
}
window.handleClearCart=handleClearCart;

let handleIncrementQuantity = (productId) => {
    cartList = cartList.map((item) => {
        if (item.id === productId && item.quantity >= item.ordered) {
            item.ordered++;
        }
        return item;
    });
    displayCartItems();
}
window.handleIncrementQuantity=handleIncrementQuantity;

let handleDecrementQuantity = (productId) => {
    cartList = cartList.map((item) => {
        if (item.id === productId && item.ordered > 1) {
            item.ordered--;
        }
        return item;
    });
    displayCartItems();
}
window.handleDecrementQuantity=handleDecrementQuantity;

// Function to calculate the total amount for an individual item

const calculateIndividualPrice = (item) => {
    return item.ordered * item.price;
}

// Function to calculate the overall total amount

const calculateTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartList) {
        totalAmount += calculateIndividualPrice(item);
    }
    return totalAmount;
}

// Initial display of cart items
displayCartItems();
