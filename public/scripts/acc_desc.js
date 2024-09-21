document.addEventListener('DOMContentLoaded', function () {
  const gameId = getQueryParam('id');
  
  // Fetch accessory details based on the ID from your new JSON data
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/data/acc.json', true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      const selectedAccessory = data.find(accessory => accessory.id === parseInt(gameId));

      if (selectedAccessory) {
        const accessoryDetailsContainer = document.getElementById('acc_desc');
        const detailsHTML = `
          <div class="row">
            <div class="product-img-case">
              <img src="${selectedAccessory.img}" alt="${selectedAccessory.title}">
            </div>
            <div class="product-summary-case">
              <h1 class="product_title entry-title">${selectedAccessory.title}</h1>
              <p class="product_price price headerfont">Price: $${selectedAccessory.price}</p>
              <div class="woocommerce-product-details__short-description">
                <p>Description: ${selectedAccessory.description}</p>
                <p>Genre: ${selectedAccessory.genre}</p>
              </div>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;
        accessoryDetailsContainer.innerHTML = detailsHTML;
      }
    }
  };
  xhr.send();
});

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
