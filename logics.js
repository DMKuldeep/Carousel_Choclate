const products = [
  {
    id: 1,
    name: "Dark chocolate beta",
    price: 200,
    url: "./images/choc5.jpg",
  },
  {
    id: 2,
    name: "Dark choclate",
    price: 150,
    url: "./images/choc6.jpg",
  },
  {
    id: 3,
    name: "Dark Choclate Bundle",
    price: 160,
    url: "./images/choc7.jpg",
  },
  {
    id: 4,
    name: "Dark Choclate Fills",
    price: 170,
    url: "./images/choc8.jpg",
  },
  {
    id: 5,
    name: "Mix Choclates",
    price: 180,
    url: "./images/choc9.jpg",
  },

  {
    id: 6,
    name: "Dark Bites ",
    price: 190,
    url: "./images/choc10.jpg",
  },
  {
    id: 7,
    name: "Dark Strawberry Choclate",
    price: 200,
    url: "./images/choc11.jpg",
  },
  {
    id: 8,
    name: "Dark Rose choclate",
    price: 190,
    url: "./images/choc12.jpg",
  },
  {
    id: 9,
    name: "Dark Sundai ",
    price: 2500,
    url: "./images/choc13.jpg",
  },
  {
    id: 10,
    name: "Dark Rose Choclate ",
    price: 280,
    url: "./images/choc14.jpg",
  },
  // Add the rest of your products here
];
const carts = [];
let TotalAmount = 0;
const productList = document.getElementById("product-list");
const error = document.getElementById("error-message");
const foot = document.getElementById("total-amount");
function removeCart(uniqueId) {
  const index = carts.findIndex((obj) => obj.uniqueId === uniqueId);

  if (index !== -1) {
    carts.splice(index, 1); // Remove one element at the found index
    if (carts.length === 7) {
      error.innerHTML = "";
    }
    console.log(`Object with ID ${uniqueId} removed.`);
  } else {
    console.log(`Object with ID ${uniqueId} not found.`);
  }
}
function addTableDta() {
  const cartList = document.getElementById("cart-list");
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  carts.forEach((cart) => {
    // Assuming you have a reference to the cart list element

    // Create a new table row
    const tableRow = document.createElement("tr");

    // Create table cells (td) for the columns you want in the row
    const productNameCell = document.createElement("td");
    const productPriceCell = document.createElement("td");
    const removeButtonCell = document.createElement("td");

    // Add content to the table cells (you can replace these with actual product data)
    productNameCell.textContent = cart.name;
    productPriceCell.textContent = `₹ ${cart.price}`;

    // Create a remove button and add a click event listener to remove the row when clicked
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      // Remove the table row when the remove button is clicked
      tableRow.remove();
      removeCart(cart.uniqueId);
      totalAmount(TotalAmount);
    });

    // Append the remove button to the removeButtonCell
    removeButtonCell.appendChild(removeButton);

    // Append the table cells to the table row in the desired order
    tableRow.appendChild(productNameCell);
    tableRow.appendChild(productPriceCell);
    tableRow.appendChild(removeButtonCell);

    // Append the table row to the cart list
    cartList.appendChild(tableRow);
  });
}
function totalAmount(TotalAmmount) {
  TotalAmmount = 0;
  carts.forEach((cart) => {
    TotalAmmount += cart.price;
  });
  if ((TotalAmmount) => 0) {
    foot.innerHTML = TotalAmmount;
  }
}
function addButtonClick(product, key) {
  
  console.log("product", product);
  if (carts && carts.length <= 7) {
    carts.push({ ...product, uniqueId: key });
    addTableDta();
  } else {
    alert("Add to cart limit exceed first checkout!!");
    error.innerHTML = "<h4>Add to cart limit exceed first checkout!!<h4> ";
  }

  totalAmount(TotalAmount);
  console.log("carts", carts);
}
products.map((product) => {
  // Create a card container div
  const card = document.createElement("div");
  card.classList.add("card");
  const timestamp = new Date().getTime();

  // Random number between 0 and 9999 (you can adjust the range as needed)
  const randomNumber = Math.floor(Math.random() * 10000);

  // Combine timestamp and random number to create a unique ID
  const uniqueId = `${timestamp}-${randomNumber}`;

  // Create the title div
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  titleDiv.style.backgroundImage = `url(${product.url})`;
  const titleHeading = document.createElement("h1");
  titleHeading.textContent = product.name;
  titleDiv.appendChild(titleHeading);

  // Create the content div
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  // Create the inner content div
  const innerContentDiv = document.createElement("div");
  innerContentDiv.classList.add("inner-content");

  // Create the price div
  const priceDiv = document.createElement("div");
  priceDiv.classList.add("price");
  priceDiv.textContent = `₹ ${product.price}`;

  // Create the "add" button div
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button");
  buttonDiv.textContent = "Add";

  buttonDiv.addEventListener("click", function () {
    addButtonClick(product, uniqueId);
  });

  // Append elements to the inner content div
  innerContentDiv.appendChild(priceDiv);
  innerContentDiv.appendChild(buttonDiv);

  // Append the title and inner content divs to the content div
  contentDiv.appendChild(titleDiv);
  contentDiv.appendChild(innerContentDiv);

  // Append the content div to the card
  card.appendChild(contentDiv);

  // Append the card to the product list container
  productList.appendChild(card);
});
