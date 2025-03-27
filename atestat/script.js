function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find(item => item.id === product.id);
  
  let quantityInput = document.getElementById("quantity");
  let quantity = quantityInput ? parseInt(quantityInput.value) : 1;

  if (existingProduct) {
      existingProduct.quantity += quantity;
  } else {
      cart.push({ ...product, quantity: quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produsul a fost adăugat în coș!");
  renderCart();
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
      if (cart[productIndex].quantity > 1) {
          cart[productIndex].quantity--;
      } else {
          cart.splice(productIndex, 1);
      }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(product => {
      let item = document.createElement("li");
      item.classList.add("cart-item");

      let pretBun = parseFloat((product.price * product.quantity).toFixed(2));
      item.innerHTML = `${product.name} x${product.quantity} - ${pretBun} € 
          <button onclick="removeFromCart('${product.id}')">➖</button>`;
      cartContainer.appendChild(item);
      total += pretBun;
  });

  totalContainer.textContent = `Total: ${total} €`;
}

renderCart();
