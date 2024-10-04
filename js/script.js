let limitedPokemons = [];
let allPokemons = [];
let offset = 0;
let limit = 0;
let breaking = false;
let pokeId = 0;
let menuIndex = 1;
let pixel = -112;
let width = 19;

async function init() {
    await loadBaseData();
    await loadLimitedData();
    await renderPokemon(limitedPokemons);
    document.getElementById('search').value = "";
    document.getElementById('lessAndMoreButtons').style.display = "";
    document.getElementById("loadLessButton").style.display = "none";
    document.getElementById("pageContainer").innerHTML = "";
    offset = 0;
    limit = 0;
    breaking = false;
};

function capitalize(str) {
    if (str !== null) {
        if (str.length === 0) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
        return "undefined";
    }
};

function openLoadingSpinner() {
    document.getElementById("dialogContainer").innerHTML = spinnerHtml();
    breaking = false;
    document.getElementById("dialog").style.display = "";
};

async function closeLoadingSpinner() {
    breaking = true;
    document.getElementById("dialog").style.display = "none";
    await stopLoading(breaking);
};

function doNotClose(event) {
    event.stopPropagation();
};
