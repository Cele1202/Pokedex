// Selecciona el elemento con el ID "listaPokemon" y lo asigna a la variable listaPokemon
const listaPokemon = document.querySelector("#listaPokemon");

// Selecciona todos los elementos con la clase "btn-header" y los asigna a la variable botonesHeader
const botonesHeader = document.querySelectorAll(".btn-header");

// URL base para obtener información de Pokémon de la API PokeAPI
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Función asincrónica para cargar Pokémon de la primera generación
async function cargarPokemonPrimeraGeneracion() {
    // Bucle que itera desde 1 hasta 151
    for (let i = 1; i <= 151; i++) {
        // Realiza una solicitud a la API para obtener información del Pokémon con el ID actual (i)
        let respuesta = await fetch(URL + i);
        // Convierte la respuesta a formato JSON
        data = await respuesta.json();
        // Llama a la función mostrarPokemon con los datos del Pokémon obtenidos
        mostrarPokemon(data);
    }
}

// Llama a la función para cargar Pokémon de la primera generación
cargarPokemonPrimeraGeneracion();

// Función para mostrar información de un Pokémon en el HTML
function mostrarPokemon(poke) {
    // Crea un array de etiquetas de tipo de Pokémon (tipos) y las une en una cadena
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Formatea el ID del Pokémon para que siempre tenga al menos 3 dígitos
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Crea un nuevo elemento div y le asigna clases y contenido HTML
    const div = document.createElement("div");
    div.classList.add("pokemon");
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
    // Agrega el nuevo div al elemento con ID "listaPokemon"
    listaPokemon.append(div);
}

// Asigna un evento de clic a cada botón del encabezado
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    // Obtiene el ID del botón clickeado
    const botonId = event.currentTarget.id;

    // Limpia el contenido del elemento con ID "listaPokemon"
    listaPokemon.innerHTML = "";

    // Bucle que itera desde 1 hasta 151
    for (let i = 1; i <= 151; i++) {
        // Realiza una solicitud a la API para obtener información del Pokémon con el ID actual (i)
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                // Verifica si se deben mostrar todos los Pokémon o solo los del tipo del botón clickeado
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    // Obtiene los tipos del Pokémon y verifica si alguno coincide con el tipo del botón
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
}));
