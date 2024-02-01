// Selecciona el elemento con el ID "listaPokemon" en el HTML
const listaPokemon = document.querySelector("#listaPokemon");

// Función asincrónica para cargar los Pokémon de la primera generación
async function cargarPokemonPrimeraGeneracion() {
    // Itera desde el Pokémon 1 hasta el Pokémon 151
    for (let i = 1; i <= 151; i++) {
        // Hace una solicitud a la API de Pokémon para obtener la información del Pokémon
        let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);

        // Convierte la respuesta a formato JSON
        let data = await respuesta.json();

        // Llama a la función mostrarPokemon para mostrar el Pokémon en la interfaz
        mostrarPokemon(data);
    }
}

// Llama a la función para cargar los Pokémon al cargar la página
cargarPokemonPrimeraGeneracion();

// Función para mostrar un Pokémon en la interfaz
function mostrarPokemon(poke) {
    // Crea una cadena de tipos del Pokémon con clases para estilos CSS
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Formatea el ID del Pokémon para asegurarse de que tenga al menos tres dígitos
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Crea un nuevo div para el Pokémon y le agrega clases
    const div = document.createElement("div");
    div.classList.add("pokemon");

    // Inserta el contenido HTML dentro del div con la información del Pokémon
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    // Agrega un evento de clic al div del Pokémon para mostrar detalles en una nueva pestaña
    div.addEventListener("click", () => mostrarDetallesPokemon(poke));

    // Agrega el div al contenedor de la lista de Pokémon
    listaPokemon.append(div);
}

// Función para mostrar detalles simplificados del Pokémon en una nueva pestaña
function mostrarDetallesPokemon(poke) {
    // Construye el contenido HTML con la información del Pokémon
    const contenidoHTML = `
        <h2>${poke.name}</h2>
        <p>Número: #${poke.id}</p>
        <p>Tipo: ${obtenerTipos(poke)}</p>
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    `;

    // Abre una nueva pestaña con el contenido HTML
    const nuevaPestana = window.open('', '_blank');
    nuevaPestana.document.write(contenidoHTML);
}

// Función para obtener los tipos del Pokémon
function obtenerTipos(poke) {
    return poke.types.map((type) => type.type.name).join(', ');
}


