//(for items page)

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Add event listeners to each button
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = button.getAttribute("data-id");
      addToCart(itemId-1);
    });
  });

  // Add item to cart
  function addToCart(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    fetch('products.json')
    .then(response => response.json())
    .then(items => {
      // Check if the item is already in the cart by matching the item id
      const itemExists = cart.some(cartItem => cartItem.id === items[itemId].id);

      if (itemExists) {
        // If the item is already in the cart, alert the user
        alert(`Item is already in your cart!`);
      } else {
        // If the item is not in the cart, add it and update localStorage
        cart.push(items[itemId]);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Item has been added to your cart!`);
      }
    });
  }
});
