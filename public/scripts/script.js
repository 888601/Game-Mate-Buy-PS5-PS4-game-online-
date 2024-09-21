
var slides = document.querySelectorAll(".slide");
var index = 0;
var timer;

function changeSlide() {
  var slides = document.querySelectorAll(".slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].style.opacity = 0;
  }
  console.log(index)
  slides[index].style.display = "block";
  slides[index].style.opacity = 1;
}

function prevSlide() {
  var slides = document.querySelectorAll(".slide");
  console.log(slides)
  index = (index - 1 + slides.length) % slides.length;
  changeSlide();
}

function nextSlide() {
  var slides = document.querySelectorAll(".slide");
  console.log(slides)
  index = (index + 1) % slides.length;
  changeSlide();
}

function navigateToPage(url) {
  window.location.href = url;
}

// Function to start the automatic slide changer
function startAutomaticSlideChange() {
  timer = setInterval(function () {
    nextSlide();
  }, 5000); // Change slide every 5 seconds (adjust as needed)
}

// Function to stop the automatic slide changer
function stopAutomaticSlideChange() {
  clearInterval(timer);
}

// Attach click event to each arrow
document.getElementById("prev-arrow").addEventListener("click", function () {
  prevSlide();
  stopAutomaticSlideChange(); // Stop automatic slide change on manual navigation
});

document.getElementById("next-arrow").addEventListener("click", function () {
  nextSlide();
  stopAutomaticSlideChange(); // Stop automatic slide change on manual navigation
});

// Set initial slider position to show the first image and start automatic slide change
changeSlide();
startAutomaticSlideChange();


function startAutomaticSlideChange() {
  timer = setInterval(function () {
    nextSlide();
  }, 8000); // Change slide every 8 seconds to match the CSS animation duration
}




const cart = {
  cartItems: [],

   // Function to add an item to the cart
  addToCart: function(itemName, price) {
    this.cartItems.push({ itemName, price });
    this.updateCartOverlay(); // Update the cart overlay
    this.saveCartToLocalStorage(); // Save cart to localStorage
  },
  // Function to update contens of cart overlay
  updateCartOverlay: function() {
    const cartOverlay = document.getElementById("cartOverlay");
    const cartWindow = cartOverlay.querySelector(".cart-window");

    // Clear the previous cart items
    cartWindow.innerHTML = "<h2>Your Shopping Cart</h2>";

    // Display each cart item in the overlay
    this.cartItems.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `<p>${item.itemName} - $${item.price}</p>`;
      cartWindow.appendChild(itemDiv);
    });
  },
  // Save cart to local storage
  saveCartToLocalStorage: function() {
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  },

  isOverlayVisible : false,
  cart_toggle: function() {
    const cartOverlay = document.getElementById("cartOverlay");
    //let isOverlayVisible = false;
    if (this.isOverlayVisible) {
      cartOverlay.style.right = "-30%"; // Slide out the overlay
    } else {
      cartOverlay.style.right = "0"; // Slide in the overlay
    }
    this.isOverlayVisible = !this.isOverlayVisible; // Toggle the state
  },
  cart_init: function() {
    const floatingCartBtn = document.getElementById("floatingCartBtn");  
    floatingCartBtn.addEventListener("click", () => {
      this.cart_toggle();
    });
  },
  
}
cart.cart_init();

// script.js
/* const GameNamespace = {
  initialize: function () {
    document.addEventListener('DOMContentLoaded', function () {
      const gamesContainer = document.querySelector('.ps5-games'); // Assuming this is the container for the games

      // Sample game data
      fetch('game_title.json')
        .then(response => response.json())
        .then(data => {
        data.forEach(gameData => {
          const gameDiv = document.createElement('div');
          gameDiv.className = 'game';
  
          const imageContainer = document.createElement('div');
          imageContainer.className = 'image-container';
  
          const image = document.createElement('img');
          image.src = gameData.img;
          image.alt = gameData.alt;
  
          const buyButton = document.createElement('button');
          buyButton.className = 'buybutton';
          buyButton.textContent = `$${gameData.price}`;
  
          imageContainer.appendChild(image);
          imageContainer.appendChild(buyButton);
          gameDiv.appendChild(imageContainer);
          this.gamesContainer.appendChild(gameDiv);
        });
      })
      .catch(error => console.error('Error loading JSON:', error));
    });
  }
};

GameNamespace.initialize();
*/

/*const cart = {
  cart_init: function() {
    const floatingCartBtn = document.getElementById("floatingCartBtn");  
    floatingCartBtn.addEventListener("click", () => {
    const cartOverlay = document.getElementById("cartOverlay");
    let isOverlayVisible = false;
    if (isOverlayVisible) {
      cartOverlay.style.right = "-30%"; // Slide out the overlay
    } else {
      cartOverlay.style.right = "0"; // Slide in the overlay
    }
    isOverlayVisible = !isOverlayVisible; // Toggle the state
    });
  }
}
cart.cart_init();*/

// script.js
const GameNamespace = {
  gameData: [],
  itemsToShow: 8,
  itemsPerLoad: 16,
  gamesContainer: document.querySelector('.ps-games'),
  loadMoreBtn: document.getElementById('loadMoreBtn'),

  initialize: function () {
    document.addEventListener('DOMContentLoaded', function () {
      GameNamespace.fetchGameData();
      GameNamespace.loadMoreBtn.addEventListener('click', function () {
        GameNamespace.itemsToShow += GameNamespace.itemsPerLoad;
        GameNamespace.displayGames(GameNamespace.gameData);
      });
    });
  },

  fetchGameData: function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/data/game_title.json', true);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status === 200) {
        GameNamespace.gameData = JSON.parse(this.responseText);
        GameNamespace.displayGames(GameNamespace.gameData);
      } else {
        console.error('Request failed:', xhr.status);
      }
    };

    xhr.send();
  },

  displayGames: function (data) {
    const gamesContainer = GameNamespace.gamesContainer;
    gamesContainer.innerHTML = ''; // Clear existing content

    const gamesToShow = data.slice(0, GameNamespace.itemsToShow);

    gamesToShow.forEach(gameData => {
      const gameDiv = document.createElement('div');
      gameDiv.className = 'game';
      gameDiv.setAttribute('data-id', gameData.id);

      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';

      const image = document.createElement('img');
      image.src = gameData.img;

      const imagetitle = document.createElement('div');
      imagetitle.className = 'image-title';
      const title = document.createElement('p');
      title.textContent = gameData.title;

      const buyButton = document.createElement('button');
      buyButton.className = 'buybutton';
      buyButton.textContent = `$${gameData.price}`;

      imageContainer.appendChild(title);
      imageContainer.appendChild(image);
      imageContainer.appendChild(buyButton);
      gameDiv.appendChild(imageContainer);
      gamesContainer.appendChild(gameDiv);

      // Add click event listener to each game
      gameDiv.addEventListener('click', function () {
        const gameId = gameDiv.getAttribute('data-id');
        window.open(`game_desc.html?id=${gameId}`, '_blank');
      });
    });

    // Hide the load more button if all games are shown
    if (GameNamespace.itemsToShow >= data.length) {
      GameNamespace.loadMoreBtn.style.display = 'none';
    } else {
      GameNamespace.loadMoreBtn.style.display = 'block';
    }
  },
};

GameNamespace.initialize();
const GameNamespace1 = {
  initialize: function () {
    document.addEventListener('DOMContentLoaded', function () {
      const gamesContainer = document.querySelector('.ps5acc');

      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/data/acc.json', true);
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
          const data = JSON.parse(this.responseText);

          data.forEach(gameData => {
            const gameDiv = document.createElement('div');
            gameDiv.className = 'game';
            gameDiv.setAttribute('data-id', gameData.id);

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            
            const image = document.createElement('img');
            image.src = gameData.img;

            const imagetitle = document.createElement('p');
            imagetitle.className = 'image-title';
            const title = document.createElement('p');
            title.textContent = gameData.title;

            const buyButton = document.createElement('button');
            buyButton.className = 'buybutton';
            buyButton.textContent = `$${gameData.price}`;

            imageContainer.appendChild(title);
            imageContainer.appendChild(image);
            imageContainer.appendChild(buyButton);
            gameDiv.appendChild(imageContainer);
            gamesContainer.appendChild(gameDiv);
          });

          // Add click event listener to each game
          const gameElements = document.querySelectorAll('.game');
          gameElements.forEach(gameElement => {
            gameElement.addEventListener('click', function () {
              const gameId = this.getAttribute('data-id');
              window.open(`game_desc.html?id=${gameId}`, '_blank');
            });
          });
		}      };

      xhr.send();
    });
  },
};

GameNamespace1.initialize();

