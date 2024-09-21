document.addEventListener('DOMContentLoaded', function () {
  const gameId = getQueryParam('id');
  
  // Fetch game details based on the ID from your JSON data
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/data/game_title.json', true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      const selectedGame = data.find(game => game.id === parseInt(gameId));

      if (selectedGame) {
        const gameDetailsContainer = document.getElementById('game_desc');
        const detailsHTML = `
          <div class="row">
            <div class="product-img-case">
              <img src="${selectedGame.img}" alt="${selectedGame.title}">
            </div>
            <div class="product-summary-case">
              <h1 class="product_title entry-title">${selectedGame.title}</h1>
              <p class="product_price price headerfont">Price: $${selectedGame.price}</p>
              <div class="woocommerce-product-details__short-description">
                <p>Description: ${selectedGame.description}</p>
                <p>Genre: ${selectedGame.genre}</p>
              </div>
              <button class="add-to-cart">Add to Cart</button>
              <div class="video-link">
                <p>GamePlay: <a href="${selectedGame.youtubeLink}" target="_blank">${selectedGame.youtubeLink}</a></p>
              </div>
              <div class="checkpincodeservisability">
                <p>Check Serviceable Pincode</p>
                <div class="fas fa-map-marker-alt">
                  <input type="number" id="Spincode" name="Spincode" maxlength="6" value="" placeholder="Enter Pincode">
                  <button class="CheckPinService">Check</button>
                </div>
                <p class="PinServiceStatus"></p>
              </div>
            </div>
          </div>
        `;
        gameDetailsContainer.innerHTML = detailsHTML;
        
        // Add event listener for the CheckPinService button
        const checkPinServiceButton = document.querySelector('.CheckPinService');
        checkPinServiceButton.addEventListener('click', function () {
          const pinInput = document.getElementById('Spincode');
          const pincode = pinInput.value;
          
          // Perform pincode validation and update PinServiceStatus accordingly
          const pinServiceStatus = document.querySelector('.PinServiceStatus');
          // Your logic to check the pincode serviceability and update the status
          pinServiceStatus.textContent = 'Pincode serviceability status goes here';
        });
      }
    }
  };
  xhr.send();
});

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
