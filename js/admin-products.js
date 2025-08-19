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
    }
];

const tableBody = document.getElementById("tableBody");

games.forEach((juego) => {
    tableBody.innerHTML += `<tr>
    <td class="cell-image"> 
        <img src="${juego.image}" alt="Imagen del producto"/>
    </td>
    <td class="cell-name">${juego.name}</td>
    <td class="cell-category">${juego.category}</td>
    <td class="cell-price">${juego.price}</td>
    <td class="cell-date">${new Date(juego.createdAt).toLocaleDateString()}</td>
    <td class="cell-actions">
        <button class="btn btn-primary btn-sm">
            <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="btn btn-danger btn-sm">
            <i class="fa-solid fa-trash"></i>
        </button>
    </td>
    </tr>`;
})

/*
games.forEach(game => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="cell-image"> 
            <img src="${game.image}" alt="Imagen del producto"/>
        </td>
        <td class="cell-name">${game.name}</td>
        <td class="cell-category">${game.category}</td>
        <td class="cell-price">${game.price.toFixed(2)}</td>
        <td class="cell-date">${new Date(game.createdAt).toLocaleDateString()}</td>
        <td class="cell-actions">
            <button class="btn btn-primary btn-sm">
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(row);
});
*/