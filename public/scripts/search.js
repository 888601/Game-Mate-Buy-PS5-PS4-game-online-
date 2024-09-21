const gameData = []; // Initialize an empty array to store the game data

// Fetch the JSON data for games and accessories and populate the gameData array
const fetchGames = fetch('/data/game_title.json').then(response => response.json());
const fetchAccessories = fetch('/data/acc.json').then(response => response.json());

Promise.all([fetchGames, fetchAccessories])
  .then(data => {
    gameData.push(...data[0]); // Push game data into the gameData array
    gameData.push(...data[1]); // Push accessory data into the gameData array
  })
  .catch(error => console.error('Error fetching JSON:', error));

function performSearch() {
  console.log('performSearch function called');
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();

  // Filter game titles based on search term
  const filteredGames = gameData.filter(game => game.title.toLowerCase().includes(searchTerm));

  if (filteredGames.length > 0) {
    const searchResultsPage = `search_results.html?q=${encodeURIComponent(searchTerm)}`;
    window.location.href = searchResultsPage;
  } else 
     {
		 // Display no results found message
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
    console.log('error');
  }
}

function showSuggestions() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = ''; // Clear previous suggestions

  // Filter game titles based on search term
  const filteredGames = gameData.filter(game => game.title.toLowerCase().includes(searchTerm));

  // Display suggestions
  filteredGames.forEach(game => {
    const suggestionDiv = document.createElement('div');
    suggestionDiv.textContent = game.title;
    suggestionDiv.classList.add('suggestion');
    suggestionsDiv.appendChild(suggestionDiv);
  });
}
