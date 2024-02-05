// Selecciona el contenedor donde se mostrarán los Pokémon
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
    const contenidoHTML = 

    `
        <h2>${poke.name}</h2>
        <div class="caracteristicas">
            <p>Número: #${poke.id}</p>
            <p>Categoría:${obtenerTipos(poke)}</p>
            <p>Altura: 1.5m</p>
            <p>Peso: 5 kg</p>
        </div>
        <div class="imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="tipos">
            <h2>Tipo</h2>
            <a href="#">Fuego</a>
            <a href="#">Volador</a>
        </div>
        <div class="debilidades">
            <h2>Debilidad</h2>
            <a href="#">Eléctrico</a>
            <a href="#">Planta</a>
            <a href="#">Agua</a>
        </div>
    `


    // Abre una nueva pestaña con el contenido HTML
    const nuevaPestana = window.open('', '_blank');
    nuevaPestana.document.write(contenidoHTML);
}

// Función para obtener los tipos del Pokémon
function obtenerTipos(poke) {
    return poke.types.map((type) => type.type.name).join(', ');
}

// Selecciona todos los botones de tipo
const btnTipos = document.querySelectorAll(".btn-header");

// Agrega eventos de clic a todos los botones de tipo
btnTipos.forEach(btn => {
    btn.addEventListener("click", () => {
        const tipoSeleccionado = btn.id;
        if (tipoSeleccionado === 'ver-todos') {
            // Si se hace clic en "ver todos", muestra todos los Pokémon
            mostrarTodosLosPokemon();
        } else {
            // De lo contrario, filtra los Pokémon por tipo
            filtrarPokemonPorTipo(tipoSeleccionado);
        }
    });
});

// Función para mostrar todos los Pokémon
function mostrarTodosLosPokemon() {
    const pokemones = document.querySelectorAll(".pokemon");
    pokemones.forEach(pokemon => {
        pokemon.style.display = "block";
    });
}

// Selecciona el input de búsqueda
const inputBusqueda = document.getElementById("pokemonSearch");

// Agrega un evento de escucha al input de búsqueda
inputBusqueda.addEventListener("input", () => {
    const valorBusqueda = inputBusqueda.value.toLowerCase();
    filtrarPokemonPorBusqueda(valorBusqueda);
});

// Función para filtrar Pokémon por tipo
function filtrarPokemonPorTipo(tipo) {
    const pokemones = document.querySelectorAll(".pokemon");

    pokemones.forEach(pokemon => {
        const tiposPokemon = pokemon.querySelectorAll(".tipo");
        let tipoEncontrado = false;

        // Verifica si el tipo del Pokémon coincide con el tipo seleccionado
        tiposPokemon.forEach(tipoPokemon => {
            if (tipoPokemon.textContent.toLowerCase() === tipo) {
                tipoEncontrado = true;
            }
        });

        // Muestra u oculta el Pokémon según el tipo
        if (tipoEncontrado || tipo === 'ver-todos') {
            pokemon.style.display = "block";
        } else {
            pokemon.style.display = "none";
        }
    });
}

// Función para filtrar Pokémon por nombre o número de búsqueda
function filtrarPokemonPorBusqueda(busqueda) {
    const pokemones = document.querySelectorAll(".pokemon");
    
    pokemones.forEach(pokemon => {
        const nombrePokemon = pokemon.querySelector(".pokemon-nombre").textContent.toLowerCase();
        const idPokemon = pokemon.querySelector(".pokemon-id").textContent.toLowerCase();
        
        if (nombrePokemon.includes(busqueda) || idPokemon.includes(busqueda)) {
            pokemon.style.display = "block";
        } else {
            pokemon.style.display = "none";
        }
    });
}
