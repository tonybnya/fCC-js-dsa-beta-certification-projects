const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const allPokemonsUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const formatInput = (input) => {
  // lowercase the input
  let endpoint = input.toLowerCase();

  // Replace special characters for gender
  // \u2640: Unicode character for the female symbol (♀)
  // \u2642: Unicode character for the male symbol (♂)
  endpoint = endpoint.replace(/[\u2640\u2642]/g, (match) => {
    return match === "\u2640" ? "f" : "m";
  });
  
  // remove special characters and replace empty spaces by '-'
  endpoint = endpoint.replace(/[^a-z0-9\s]/g, '').replace(/\s/g, '-');

  return endpoint;
};

const fetchData = async (endpoint) => {
  try {
    const url = `${allPokemonsUrl}/${endpoint}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    const pokemonDescription = document.getElementById('pokemon-description');
    const identification = document.getElementById('identification');
    // identification.innerHTML = `<span id="pokemon-name">${data.name.toUpperCase()}</span> #<span id="pokemon-id">${data.id}</span>`;

    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = data.id;

    // Construct biometric paragraph
    const biometric = document.getElementById('biometric');
    biometric.textContent = `Weight: ${data.weight} Height: ${data.height}`;

    // Construct types
    const typesDiv = document.getElementById('types');
    typesDiv.innerHTML = data.types.map(type => `<span>${type.type.name.toUpperCase()}</span>`).join(' ');

    // Set image source
    const img = pokemonDescription.querySelector('img');
    img.src = data.sprites.front_default;
    img.alt = data.name;
    img.setAttribute('id', 'sprite');

    const statsTable = document.querySelector('table');
    const statIds = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

    data.stats.forEach(stat => {
      const statName = stat.stat.name;
      const statId = statIds.find(id => id.includes(statName.toLowerCase()));
      if (statId) {
        const statCell = document.getElementById(statId);
        statCell.textContent = stat.base_stat;
      }
    });

  } catch(err) {
    alert("Pokémon not found");
  }
};

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const endpoint = formatInput(searchInput.value);
  console.log(endpoint);
  fetchData(endpoint);
  searchInput.value = "";
})