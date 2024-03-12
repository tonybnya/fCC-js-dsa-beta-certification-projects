// const searchInput = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-button");
const allPokemonsUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const formatInput = (input) => {
  // lowercase the input
  let string = input.toLowerCase();

  // Replace special characters for gender
  // \u2640: Unicode character for the female symbol (♀)
  // \u2642: Unicode character for the male symbol (♂)
  string = string.replace(/[\u2640\u2642]/g, (match) => {
    return match === "\u2640" ? "f" : "m";
  });
  
  // remove special characters and replace empty spaces by '-'
  string = string.replace(/[^a-z0-9\s]/g, '').replace(/\s/g, '-');

  return string;
};

console.log(formatInput("Pikachu")); // pikachu
console.log(formatInput("Nirodan ♀")); // nirodan-f
console.log(formatInput("Nirodan ♂")); // nirodan-m
console.log(formatInput("Mr. Mime")); // mr-mime