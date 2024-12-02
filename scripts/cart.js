document.addEventListener("DOMContentLoaded", function () {
  const listCart = document.querySelector(".cards-container");
  const removeAllButton = document.querySelector("#remove-all");
  const totalPriceDiv = document.getElementById("total-price");

  // Check if the cart display exists on this page
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
              <img src="${item.image || "default-image.jpg"}" alt="Item Image" />
              <div class="cart-card-content">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${parseFloat(item.price).toFixed(2)} BD</p>
                <button class="remove-button" data-index="${index}">Remove from Cart</button>
              </div>
            </div>
          `;

          // Calculate the total price
          totalPrice += parseFloat(item.price);

          listCart.appendChild(newCart);
        });

        totalPriceDiv.innerHTML = `<h3>Total: ${totalPrice.toFixed(2)} BD</h3>`;
      } else {
        // Display empty cart message
        listCart.innerHTML = `
          <div style="width: 100%;">
            <p style="text-align: center; color: gray; padding-top: 9em; font-size: 1.2em">
              Your cart is empty!
            </p>
          </div>
        `;
        totalPriceDiv.innerHTML = `<h3>Total: 0.00 BD</h3>`;
      }
    }
  }

  // Remove an item from the cart
  if (listCart) {
    listCart.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("remove-button")) {
        const itemIndex = parseInt(event.target.getAttribute("data-index"), 10);
        removeFromCart(itemIndex);
      }
    });
  }

  function removeFromCart(itemIndex) {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    carts.splice(itemIndex, 1); // Remove the item by index
    localStorage.setItem("cart", JSON.stringify(carts)); // Save updated cart
    addCartToHTML(); // Refresh the cart display
  }

  // Remove all items from the cart
  if (removeAllButton) {
    removeAllButton.addEventListener("click", function () {
      localStorage.removeItem("cart"); // Clear the cart in localStorage
      addCartToHTML(); // Refresh the cart display
    });
  }

  // Checkout function
  window.checkout = function () {
    let carts = JSON.parse(localStorage.getItem("cart"));
    if (!carts || carts.length === 0) {
      alert("Your cart is empty. Please add items to your cart first.");
      return;
    }
    alert("Your order is being packed and will be delivered to you soon.");
    localStorage.removeItem("cart"); // Clear the cart after checkout
    addCartToHTML(); // Refresh the cart display
  };
});
