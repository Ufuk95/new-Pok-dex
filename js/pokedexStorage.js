
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";

async function loadBaseData() {
    allPokemons = [];
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    allPokemons = responseToJson.results;
};

async function loadLimitedData(offset) {
    limitedPokemons = [];
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    let responseToJson = await response.json();
    limitedPokemons = responseToJson.results;
};

async function loadDataFromPokemon(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
};

async function loadSpeciesData(offset) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${offset}`);
    let responseToJson = await response.json();
    return responseToJson;
};

async function loadEvolutionData(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
};

async function stopLoading(x) {
    limitedPokemons = [];
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${x}&offset=0`);
    let responseToJson = await response.json();
    limitedPokemons = responseToJson.results;
};

async function loadType() {
    let response = await fetch("https://pokeapi.co/api/v2/type");
    let responseToJson = await response.json();
    return responseToJson;
};

async function returnPokeImageUrl(pokemon) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let responseToJson = await response.json();
    return responseToJson.sprites.other["official-artwork"].front_default;
};

async function returnPokeGifUrl(pokemon) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let responseToJson = await response.json();
    return responseToJson.sprites.other.showdown.front_default;
};