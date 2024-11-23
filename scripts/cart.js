document.addEventListener("DOMContentLoaded", function () {
  const listCart = document.querySelector(".cards-container");
  const removeAllButton = document.querySelector("#remove-all");
  const totalPriceDiv = document.getElementById("total-price");

  // Check if the listCart element exists on this page
  if (listCart) {
    addCartToHTML();
  }

  // Add cart items to the HTML
  function addCartToHTML() {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    if (listCart) {
      listCart.innerHTML = ""; // Clear any existing items

      if (carts.length > 0) {
        carts.forEach((item, index) => {
          let newCart = document.createElement("div");
          newCart.classList.add("item");

          newCart.innerHTML = `
            <div class="cart-card">
              <img src="${
                item.image || "default-image.jpg"
              }" alt="Item Image" />
              <div class="cart-card-content">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${item.price} BD</p>
                <button class="remove-button" data-id="${
                  item.id
                }">Remove from Cart</button>
              </div>
            </div>
          `;

          // calculating the total
          totalPrice += item.price;

          listCart.appendChild(newCart);
        });

        totalPriceDiv.innerHTML = `<h3>Total: ${totalPrice.toFixed(2)} BD</h3>`;
      } else {
        listCart.innerHTML = `
          <div style="width: 100%;">
            <p style="text-align: center; color: gray; padding-top: 9em; font-size: 1.2em">Your cart is empty!</p>
          </div>
        `;
      }
    }
  }
  listCart.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("remove-button")) {
      const itemId = parseInt(event.target.getAttribute("data-id"), 10);
      removeFromCart(itemId);
    }
  });
  // Remove an item from the cart
  function removeFromCart(itemId) {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    carts = carts.filter((item) => item.id !== itemId);
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(carts));

    addCartToHTML();
  }

  // Remove All Items from Cart
  if (removeAllButton) {
    removeAllButton.addEventListener("click", function () {
      localStorage.removeItem("cart");
      addCartToHTML(); // Refresh the cart display
    });
  }

  // Checkout Function
  window.checkout = function () {
    let cart = JSON.parse(localStorage.getItem("cart"));
    // Check if the cart is empty
    if (!cart || cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart first.");
      return;
    }
    alert("Your order is being packed and will be delivered to you soon.");
    localStorage.removeItem("cart");

    addCartToHTML();
  };
});
