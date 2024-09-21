const GameNamespace = {
  initialize: function () {
    document.addEventListener('DOMContentLoaded', function () {
      const gamesContainer = document.querySelector('.ps5-games');

      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/data/game_title.json', true);
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
          });

          // Add click event listener to each game
          const gameElements = document.querySelectorAll('.game');
          gameElements.forEach(gameElement => {
            gameElement.addEventListener('click', function () {
              const gameId = this.getAttribute('data-id');
              window.open(`game_desc.html?id=${gameId}`, '_blank');
            });
          });
        } else {
          console.error('Request failed:', xhr.status);
        }
      };

      xhr.send();
    });
  },
};

GameNamespace.initialize();

