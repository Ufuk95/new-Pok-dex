async function returnPokecards(stats) {
    return `
            <div onclick="openPokemonCard(${stats.id - 1}, 1)" id="${stats.name}" class="pokemon ${stats.types[0].type.name}">
            <img class="pokeballInPokemon" src="./img/headerpng.png">
            <div class="pokemon-name">
            <h3>${capitalize(stats.name)}</h3>
            <h4>#${stats.id}</h4>
            </div>
            <div class="stats">
            ${await returnTypes(stats)}
            </div>
            ${getPokepic(stats)}
            </div>
        `;
};

async function returnTypes(stats) {
    if (stats.types.length === 2) {
        return `
        <div class="type ${stats.types[0].type.name + 'type'}">${capitalize(stats.types[0].type.name)}</div> 
        <div class="type ${stats.types[0].type.name + 'type'}">${capitalize(stats.types[1].type.name)}</div>`;
    } else {
        return `
        <div class="type ${stats.types[0].type.name + 'type'}">${capitalize(stats.types[0].type.name)}</div>
        `;
    }
};

function getPokepic(stats) {
    let imageUrl = stats.sprites.other["official-artwork"].front_default;
    if (imageUrl.includes(".png")) {
        return `<img class="pokemon-pic" src="${stats.sprites.other["official-artwork"].front_default}">`;
    } else {
        return "Pokemon";
    }
};

function spinnerHtml() {
    return `
    <div onclick="doNotClose(event)">
    <svg class="spinner" width="120" height="120" viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="95" fill="none" stroke="black" stroke-width="10" />
        <path d="M 100 5 A 95 95 0 0 1 195 100 L 5 100 A 95 95 0 0 1 100 5" fill="red" />
        <path d="M 100 195 A 95 95 0 0 1 5 100 L 195 100 A 95 95 0 0 1 100 195" fill="white" />
        <rect x="5" y="95" width="190" height="10" fill="black" />
        <circle cx="100" cy="100" r="25" fill="white" stroke="black" stroke-width="10" />
        <circle cx="100" cy="100" r="10" fill="black" />
    </svg>
    </div>
    `;
};

function returnStopContainer() {
    return `
    <div class="no-result-container">
    <img width="150" height="150" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/921.png">
    <p>Caution! <br> You stopped the rendering process.</p>
    </div>
    `;
};

async function returnNoResultContainer() {
    return `
            <div class='no-result-container'>
            <img src="${await returnPokeImageUrl("psyduck")}" alt="Enton" width="150" height="150">
            <p>No Pokémon found!</p>
            <div class="loadMoreButton" onclick="init()">Back to start</div>
            <div>`;
};

async function returnPokecard(stats, specData, i) {
    return `
        <div class="pokecard">
            <div class="pokecard-header ${stats.types[0].type.name}">
                <div class="headcontrol">
                    <div class="backbutton" onclick="closePokemonCard()">←</div>
                </div>
                <div class="nametype-container">
                    <div>
                        <h1 class="name">${capitalize(specData.name)}</h1>
                        <div class="type-container">
                        ${await returnTypes(stats)}
                        </div>
                    </div>
                    <div class="integer-card">
                        <span>#${stats.id}</span>
                    </div>
                </div>
                <img class="backgroundBall" src="./img/headerpng.png" alt="header.png">
            </div>
            <div class="pokecard-content">
                <div class="arrow-container">
                    <img id="left" onclick="lastPokemon(${i})" class="left-arrow booth-arrow" src="./img/pfeil-left.png" alt="back">
                    <img id="right" onclick="nextPokemon(${i})" class="booth-arrow" src="./img/pfeil.png" alt="next">
                </div>
                <div class="img-container">
                    <img class="cardimg"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png"
                        alt="">
                </div>
                <div class="menu-container">
                    <menu class="card-menu">
                        <nav class="navigation" id="nav1" onclick="setMenu(1, ${i}, -112, 19)">About</nav>
                        <nav class="navigation" id="nav2" onclick="setMenu(2, ${i}, -40, 25)">Base Stats</nav>
                        <nav class="navigation" id="nav3" onclick="setMenu(3, ${i}, 41, 25)">Evolution</nav>
                        <nav class="navigation" id="nav4" onclick="setMenu(4, ${i}, 112, 19)">Shiny</nav>
                    </menu>
                    <div class="navbar-container">
                        <div class="navbar"></div>
                        <div id="nav" class="nav"></div>
                    </div>
                    <div id="statsContainer">

                    </div>
                </div>
            </div>
        </div>
    `;
};

async function returnAbout(stats, specData) {
    return `
<table class="table-card">
<tbody>
    <tr class="tr-card">
        <td>Habitat:</td>
        <td>${capitalize(specData.habitat.name)}</td>
    </tr>
    <tr class="tr-card">
        <td>Height:</td>
        <td>${(stats.height / 10).toFixed(2)} m</td>
    </tr>
    <tr class="tr-card">
        <td>Weight:</td>
        <td>${(stats.weight / 10).toFixed(2)} kg</td>
    </tr>
    <tr class="tr-card">
        <td>Abilities:</td>
        <td>
        ${await checkandreturnAbilitys(stats)}
        </td>
    </tr>
    <tr class="tr-card">
        <td>Egg groups:</td>
        <td>
        ${await checkandreturnEggGroups(specData)}
        </td>
    </tr>
        <tr class="tr-card">
        <td>German name:</td>
        <td>
        ${specData.names[5].name}
        </td>
    </tr>
</tbody>
</table>
    `;
};

async function returnBaseStats(stats) {
    return `
            <div class="base-bar">
                <div class="stat-name">Hp</div>
                <div class="stat">${stats.stats[0].base_stat}</div>
                <div class="background-bar">
                    <div style="width:${stats.stats[0].base_stat / 200 * 100}%;" class="hp anim-bar">
                    </div>
                </div>
            </div>
            <div class="base-bar">
                <div class="stat-name">Attack</div>
                <div class="stat">${stats.stats[1].base_stat}</div>
                    <div class="background-bar">
                    <div style="width:${stats.stats[1].base_stat / 200 * 100}%;" class="attack anim-bar">
                    </div>
                </div>
            </div>
            <div class="base-bar">
            <div class="stat-name">Sp. Atk.</div>
            <div class="stat">${stats.stats[3].base_stat}</div>
                <div class="background-bar">
                <div style="width:${stats.stats[3].base_stat / 200 * 100}%;" class="special-attack anim-bar">
                </div>
            </div>
            </div>
            <div class="base-bar">
                <div class="stat-name">Defense</div>
                <div class="stat">${stats.stats[2].base_stat}</div>
                    <div class="background-bar">
                    <div style="width:${stats.stats[2].base_stat / 200 * 100}%;" class="defense anim-bar">
                    </div>
                </div>
            </div>
            <div class="base-bar">
                <div class="stat-name">Sp. Def.</div>
                <div class="stat">${stats.stats[4].base_stat}</div>
                    <div class="background-bar">
                    <div style="width:${stats.stats[4].base_stat / 200 * 100}%;" class="special-defense anim-bar">
                    </div>
                </div>
            </div>
            <div class="base-bar">
                <div class="stat-name">Speed</div>
                <div class="stat">${stats.stats[5].base_stat}</div>
                    <div class="background-bar">
                    <div style="width:${stats.stats[5].base_stat / 200 * 100}%;" class="speed anim-bar">
                    </div>
                </div>
            </div>
    `;
};

async function returnEvoChainHtml(evoData) {
    if (evoData.chain.evolves_to.length === 0) {
        const specData1 = await loadSpeciesData(evoData.chain.species.name);
        return `
        <div class="evochain">
        <div class="upperevo">
            <img onclick="openPokemonCard(${specData1.id - 1}, 1)" class="pokechain-img scale1" src="${await returnPokeGifUrl(evoData.chain.species.name)}" alt="evo1">
            <span>${capitalize(evoData.chain.species.name)}</span>
        </div>
        </div>
        `;
    } else if (evoData.chain.evolves_to[0].evolves_to.length === 0) {
        const specData1 = await loadSpeciesData(evoData.chain.species.name);
        const specData2 = await loadSpeciesData(evoData.chain.evolves_to[0].species.name);
        return `
        <div class="evochain">
        <div class="upperevo">
            <img onclick="openPokemonCard(${specData1.id - 1}, 1)" class="pokechain-img" src="${await returnPokeGifUrl(evoData.chain.species.name)}" alt="evo1">
            <span>${capitalize(evoData.chain.species.name)}</span>
        </div>
        <img class="dropdown" src="./img/evo-pfeil.png" alt="">
        <div class="upperevo">
            <img onclick="openPokemonCard(${specData2.id - 1}, 1)" class="pokechain-img scale2" src="${await returnPokeGifUrl(evoData.chain.evolves_to[0].species.name)}"
                alt="evo2">
            <span>${capitalize(evoData.chain.evolves_to[0].species.name)}</span>
        </div>
        </div>
        `;
    } else if (evoData.chain.evolves_to[0].evolves_to[0].evolves_to.length === 0) {
        const specData1 = await loadSpeciesData(evoData.chain.species.name);
        const specData2 = await loadSpeciesData(evoData.chain.evolves_to[0].species.name);
        const specData3 = await loadSpeciesData(evoData.chain.evolves_to[0].evolves_to[0].species.name);
        return `
        <div class="evochain">
        <div class="upperevo">
            <img onclick="openPokemonCard(${specData1.id - 1}, 1)" class="pokechain-img" src="${await returnPokeGifUrl(evoData.chain.species.name)}" alt="evo1">
            <span>${capitalize(evoData.chain.species.name)}</span>
        </div>
        <img class="dropdown" src="./img/evo-pfeil.png" alt="">
        <div class="upperevo">
            <img onclick="openPokemonCard(${specData2.id - 1}, 1)" class="pokechain-img scale2" src="${await returnPokeGifUrl(evoData.chain.evolves_to[0].species.name)}"
                alt="evo2">
            <span>${capitalize(evoData.chain.evolves_to[0].species.name)}</span>
        </div>
        <div class="thirdevo">
            <div class="dropdown2-position">
                <img class="dropdown2" src="./img/evo-pfeil.png" alt="">
            </div>
            <img onclick="openPokemonCard(${specData3.id - 1}, 1)" class="pokechain-img scale3"
                src="${await returnPokeGifUrl(evoData.chain.evolves_to[0].evolves_to[0].species.name)}" alt="evo3">
            <span>${capitalize(evoData.chain.evolves_to[0].evolves_to[0].species.name)}</span>
        </div>
        </div>
        `;
    }
};

async function returnShinyMenu(stats) {
    return `
        <img class="shiny" src="${stats.sprites.other["official-artwork"].front_shiny}" alt="Shiny">
    `;
};

async function checkandreturnAbilitys(stats) {
    if (stats.abilities.length === 1) {
        return `
        ${capitalize(stats.abilities[0].ability.name)}<br>
        `;
    } else if (stats.abilities.length === 2) {
        return `
        ${capitalize(stats.abilities[0].ability.name)}<br>
        ${capitalize(stats.abilities[1].ability.name)}<br>
        `;
    } else if (stats.abilities.length === 3) {
        return `
        ${capitalize(stats.abilities[0].ability.name)}<br>
        ${capitalize(stats.abilities[1].ability.name)}<br>
        ${capitalize(stats.abilities[2].ability.name)}<br>
        `;
    }
};

async function checkandreturnEggGroups(data) {
    if (data.egg_groups.length === 1) {
        return `
        ${capitalize(data.egg_groups[0].name)}
        `;
    } else if (data.egg_groups.length === 2) {
        return `
        ${capitalize(data.egg_groups[0].name)}<br>
        ${capitalize(data.egg_groups[1].name)}
        `;
    }
};