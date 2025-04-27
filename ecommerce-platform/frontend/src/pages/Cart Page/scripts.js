document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cart);
  
    document.getElementById('checkout').addEventListener('click', () => {
      proceedToCheckout(cart);
    });
  });
  
  function displayCartItems(cart) {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button onclick="removeFromCart