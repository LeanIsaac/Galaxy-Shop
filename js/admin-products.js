const games = [
    {
        id: 1,
        name: "The Legend of Zelda: Breath of the Wild",
        image: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
        price: 59.99,
        category: "Action",
        description: "An open-world action-adventure game set in the vast kingdom of Hyrule, where players control Link to defeat Calamity Ganon and save Princess Zelda.",
        createdAt: "2023-10-01T12:00:00Z"
    },
    {
        id: 2,
        name: "Super Mario Odyssey",
        image: "https://m.media-amazon.com/images/I/61sv4VFKgJL._SL1000_.jpg",
        price: 49.99,
        category: "Platformer",
        description: "A 3D platformer where Mario travels across various kingdoms to rescue Princess Peach from Bowser.",
        createdAt: "2023-10-02T12:00:00Z"
    },
    {
        id: 3,
        name: "Animal Crossing: New Horizons",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Animal_Crossing_New_Horizons.jpg/250px-Animal_Crossing_New_Horizons.jpg",
        price: 59.99,
        category: "Simulation",
        description: "A life simulation game where players create and manage their own island paradise.",
        createdAt: "2023-10-03T12:00:00Z"
    },
    {
        id: 4,
        name: "Splatoon 2",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Splatoon_2.jpg/250px-Splatoon_2.jpg",
        price: 39.99,
        category: "Shooter",
        description: "A colorful third-person shooter where players control Inklings to compete in turf wars.",
        createdAt: "2023-10-04T12:00:00Z"
    },
    {
        id: 5,
        name: "Fire Emblem Three Houses",
        image: "https://static.wikia.nocookie.net/fireemblem/images/7/79/Three_Houses_cover_art.png",
        price: 59.99,
        category: "Role-playing",
        description: "A tactical role-playing game set in the Garreg Mach Monastery, where players lead one of three houses in a battle for the future of Fódlan.",
        createdAt: "2023-10-05T12:00:00Z"
    },
    {
        id: 6,
        name: "The Witcher 3: Wild Hunt",
        image:
        "https://juegosdigitalesargentina.com/files/images/productos/1618591872-the-witcher-3-wild-hunt-complete-edition-ps5.jpg",
        price: 49.99,
        category: "RPG",
        description:
        "An open-world RPG that follows Geralt of Rivia as he searches for his adopted daughter while battling monsters and engaging in political intrigue.",
        createdAt: "2023-10-04T12:00:00Z",
    },
    {
        id: 7,
        name: "God of War Ragnarok",
        image:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1750909504",
        price: 99.99,
        category: "Action",
        description:
        "An action-adventure game that follows Kratos and his son Atreus as they journey through the world of Norse mythology.",
        createdAt: "2023-10-03T12:00:00Z",
    },
    {
        id: 8,
        name: "Spider Man 2",
        image:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2651280/cb8da9b3e99cf7362cd88c10a0544b7fe892ccad/capsule_616x353.jpg?t=1750954033",
        price: 39.99,
        category: "Adventure",
        description:
        "An action-adventure game where players control both Peter Parker and Miles Morales as they fight against various villains in New York City.",
        createdAt: "2023-10-05T12:00:00Z",
    }
];

const gamesForm = document.getElementById("gamesForm");

const tableBody = document.getElementById("tableBody");

gamesForm.addEventListener("submit", (event) => {
    //Lo primero que hacemos es prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    const el = event.target.elements;
    const newGame = {
        id: Date.now(), // Generamos un ID único basado en la fecha actual
        name: el.name.value,
        image: el.image.value,
        price: parseFloat(el.price.value), // Convertimos el precio a un número flotante
        category: el.category.value,
        description: el.description.value,
        createdAt: new Date().toISOString() // Fecha actual en formato ISO
    };

    // Agregamos el nuevo juego al array de juegos
    games.push(newGame);

    // Vuelvo a iterear el array de juegos para actualizar la tabla
    buildTable(games);

})

function buildTable(arrayJuegos) {
    tableBody.innerHTML = ""; // Limpiamos el contenido de la tabla
    arrayJuegos.forEach((juego) => {
        tableBody.innerHTML += `<tr>
        <td class="cell-image"> 
            <img src="${juego.image}" alt="Imagen del producto"/>
        </td>
        <td class="cell-name">${juego.name}</td>
        <td class="cell-category">${juego.category}</td>
        <td class="cell-price">$ ${juego.price}</td>
        <td class="cell-date">${new Date(juego.createdAt).toLocaleDateString()}</td>
        <td class="cell-actions">
            <button class="btn btn-primary btn-sm">
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteGame(${juego.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
        </tr>`;
    });
}

function deleteGame(id) {
    // Debería conocer el id del juego a eliminar
  // Vamos a obtener el índice del juego en el array
  const indice = games.findIndex(juego => {
    return juego.id === id;
  })

  // Eliminar el juego del array
  games.splice(indice, 1);

  buildTable(games);
}

buildTable(games); // Llamamos a la función para construir la tabla al cargar el script