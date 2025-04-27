document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        displayProductDetails(product);
        fetchReviews(productId);
      });
  
    document.getElementById('review-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const reviewText = document.getElementById('review-text').value;
      submitReview(productId, reviewText);
    });
  });
  
  function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <p>${product.description}</p>
      <button onclick="addToCart('${product._id}')">Add to Cart</button>
    `;
  }
  
  function fetchReviews(productId) {
    fetch(`/api/reviews?productId=${productId}`)
      .then(response => response.json())
      .then(reviews => {
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = reviews.map(review => `
          <div class="review">
            <p>${review.text}</p>
            <small>By ${review.user.name}</small>
          </div>
        `).join('');
      });
  }
  
  function submitReview(productId, text) {
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ productId, text }),
    })
      .then(() => fetchReviews(productId));
  }