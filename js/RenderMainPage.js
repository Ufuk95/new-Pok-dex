async function renderPokemon(pokemons) {
    openLoadingSpinner();
    let content = document.getElementById("content");
    content.innerHTML = "";
    for (let i = 0; i < pokemons.length; i++) {
        if (breaking === false) {
            limit++;
            const stats = await loadDataFromPokemon(pokemons[i].url);
            content.innerHTML += await returnPokecards(stats, i);
        } else {
            closeLoadingSpinner();
        }
    }
    closeLoadingSpinner();
};

async function filterNames() {
    await loadBaseData();
    let searchInput = document.getElementById('search').value.toLowerCase();
    if (searchInput.length >= 1) {
        document.getElementById('lessAndMoreButtons').style.display = "none";
        let filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
        if (filteredPokemons.length >= 1) {
            await renderPokemon(filteredPokemons);
        } else {
            document.getElementById("content").innerHTML = await returnNoResultContainer();
        }
    } else {
        document.getElementById('lessAndMoreButtons').style.display = "";
        await init();
    }
};

window.addEventListener("keydown", async function (e) {
    if (e.code === "Enter") {
        filterNames();
    }
});

async function loadMorePokemons() {
    offset += 20;
    if (offset >= 20) {
        document.getElementById("loadLessButton").style.display = "flex";
        document.getElementById("pageContainer").style.display = "";
        document.getElementById("pageContainer").innerHTML = `<span class='page'>Page ${offset / 20 + 1}</span>`;
    }
    await loadLimitedData(offset);
    await renderPokemon(limitedPokemons);
};

async function loadLessPokemons() {
    if (offset >= 20) {
        offset -= 20;
        await loadLimitedData(offset);
        await renderPokemon(limitedPokemons);
        document.getElementById("pageContainer").innerHTML = `<span class='page'>Page ${offset / 20 + 1}</span>`;
    }
    if (offset < 20) {
        document.getElementById("loadLessButton").style.display = "none";
        document.getElementById("pageContainer").style.display = "none";
    }
    
};

