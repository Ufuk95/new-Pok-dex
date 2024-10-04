async function openPokemonCard(i, x, p, w) {
    pokeId = i;
    menuIndex = x;
    pixel = p;
    width = w;
    openLoadingSpinner();
    if (i < 1025) {
        changeDisplay();
        const stats = await loadDataFromPokemon(allPokemons[i].url); 
        const specData = await loadSpeciesData(allPokemons[i].name);
        let container = document.getElementById("pokecardContainer");
        container.innerHTML = "";
        container.innerHTML += await returnPokecard(stats, specData, i);
        setMenu(menuIndex, i, p, w);
        hideArrow(i);
        closeLoadingSpinner();
    } else {
        closePokemonCard();
        document.getElementById("content").innerHTML = await returnNoResultContainer();
        closeLoadingSpinner();
    }
};

function closePokemonCard() {
    pixel = -112;
    width = 19;
    document.getElementById("body").classList.remove("overflow-y-out");
    document.getElementById("pokeCard").style.display = "none";
};

async function setMenu(x, i, p, w) {
    menuIndex = x;
    pixel = p;
    width = w;
    const stats = await loadDataFromPokemon(allPokemons[i].url);
    const specData = await loadSpeciesData(allPokemons[i].name); 
    const evoData = await loadEvolutionData(specData.evolution_chain.url);
    document.getElementById("nav").style.transform = `translate(${pixel}px)`;
    document.getElementById("nav").style.width = `${width}%`;
    await executeRightMenu(menuIndex, stats, specData, evoData, i);
};

async function executeRightMenu(x, stats, specData, evoData) {
    let content = document.getElementById("statsContainer");
    if (x === 1) {
        content.innerHTML = await returnAbout(stats, specData)
    } else if (x === 2) {
        content.innerHTML = await returnBaseStats(stats, specData);
    } else if (x === 3) {
        openLoadingSpinner();
        content.innerHTML = await returnEvoChainHtml(evoData);
        closeLoadingSpinner();
    } else if (x === 4) {
        content.innerHTML = await returnShinyMenu(stats);
    }
};

function nextPokemon(i) {
    hideArrow(i);
    if (i < allPokemons.length - 1) {
        i++;
        openPokemonCard(i, menuIndex, pixel, width);
    }
};

function lastPokemon(i) {
    hideArrow(i);
    if (i > 0) {
        i--;
        openPokemonCard(i, menuIndex, pixel, width);
    }
};

function hideArrow(i) {
    if (i === 0) {
        document.getElementById("left").style.opacity = "0";
        document.getElementById("left").style.cursor = "auto";
    }
    if (i === allPokemons.length - 1) {
        document.getElementById("right").style.opacity = "0";
        document.getElementById("right").style.cursor = "auto";
    }
};

function changeDisplay() {
    document.getElementById("pokeCard").style.display = "";
    document.getElementById("body").classList.add("overflow-y-out");
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        lastPokemon(pokeId);
    } else if (event.key === "ArrowRight") {
        nextPokemon(pokeId);
    }
});