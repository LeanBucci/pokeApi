const number = document.querySelector(".nmbIn");
const form = document.getElementById("form");
const container = document.querySelector(".card-container");
const messajeContainer = document.querySelector(".search-msg");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

// RENDERIZAR CARD --------------------------------------------------------------------------------
function renderPokemon(pokemon) {
  container.innerHTML = `   <div class="weather-card animate">
    <div class="weather-info-container">
    <p class="weather-description">#${pokemon.id}</p>
      <h2 class="weather-title">${pokemon.name}</h2>
      <div class="weather-temp-container">
        <span class="weather-temp"></span>
      </div>
    </div>
    <div class="weather-img-container">
      <img src="${pokemon.sprites.front_default}" />
    </div>
    <div class="weather-extra-container">
      <div class="weather-minmax-container">
        <span class="weather-span"><i class="fa-solid fa-arrow-up-long">${pokemon.types
          .map((type) => `<p>${type.type.name}</p>`)
          .join(" ")}</i></span>
      </div>
      <span class="weather-humidity">Altura: ${
        pokemon.height / 10
      } Mts - Peso: ${pokemon.weight / 10} Kg</span>
    </div>
  </div>`;
}

// FUNCIÓN GENERADORA DE MENSAJE ERROR ---------------------------------------------------------------------
function msjError(messaje) {
  messajeContainer.textContent = messaje;
}

// BUSQUEDA DE LA API -----------------------------------------------------------------------------------
async function getPokemon() {
  const baseUrl = `${BASE_URL}${number.value}`;
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
// FUNCIÓN DE BUSQUEDA -----------------------------------------------------------------------------------
async function searchPokemon(e) {
  e.preventDefault();
  const pokemon = await getPokemon();
  if (pokemon === undefined) {
    messajeContainer.textContent = "No existe el Pókemon, por favor elija otro";
    container.innerHTML = "";
    form.reset();
    return;
  }
  renderPokemon(pokemon);
}

function init() {
  form.addEventListener("submit", searchPokemon);
}
init();
