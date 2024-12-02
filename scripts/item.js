document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function addToCart(event) {
    const productCard = event.target.closest(".card");
    if (!productCard) return;

    const name = productCard.querySelector(".Product-name").textContent.trim();
    const price = productCard.querySelector(".Price").textContent.trim();
    const imageSrc = productCard.querySelector(".card-front img").getAttribute("src");

    const itemExists = cart.some((cartItem) => cartItem.name === name);
    if (itemExists) {
      alert(`"${name}" is already in your cart!`);
    } else {
      cart.push({ name, price, image: imageSrc });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`Added "${name}" to your cart!`);
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      addToCart(event);
    }
  });
});
