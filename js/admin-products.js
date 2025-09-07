import { formatDate } from "./date-utils.js";
const API_URL = "https://68bb095184055bce63f0f63d.mockapi.io/";
let games = [];
/*
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
        category: "Adventure",
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
        category: "Action",
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
*/

// Obtenemos elementos del DOM
const gamesForm = document.getElementById("gamesForm");
const tableBody = document.getElementById("tableBody");

const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categoryFilter");

const sortBtns = document.querySelectorAll("[data-order]");

//cuando cargue la pagina por primera vez llamo a la API para obtener los juegos
async function getProducts() {
  try {
    const response = await axios.get(`${API_URL}/products`)
    games = response.data;
    console.log("Juegos obtenidos de la API: ", games);
    buildTable(games);
    
  }catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los juegos. Inténtalo nuevamente más tarde.",
    });
  }
}
// Primera vez que se carga la pagina, cargo los productos
getProducts();

// !ESCUCHAR EL EVENTO SUBMIT DEL FORMULARIO
gamesForm.addEventListener("submit", async(event) => {
  try {

  //Lo primero que hacemos es prevenir el comportamiento por defecto del formulario
      event.preventDefault();

      const el = event.target.elements;
      const newGame = {
          //id: Date.now(), // Generamos un ID único basado en la fecha actual
          name: el.name.value,
          image: el.image.value,
          price: parseFloat(el.price.value), // Convertimos el precio a un número flotante
          category: el.category.value,
          description: el.description.value,
          createdAt: new Date().toISOString() // Fecha actual en formato ISO
      };
      console.log("Nuevo juego a agregar: ", newGame);

      //Vamos hacer una peticion a nuestro servidor en mockapi con un metodo POST
      const response = await axios.post(`${API_URL}/products  `, newGame);

      // Agregamos el nuevo juego al array de juegos
      games.push(response.data);

      Swal.fire({
          icon:"success",
          title: "Carga exitosa",
          text: "El juego se ha agregado correctamente.",
          position: "top-end",
          toast: true,
          showConfirmButton: false,
          theme: "dark",
          timer: 2500
      })
      // Vuelvo a iterear el array de juegos para actualizar la tabla
      //buildTable(games);
      getProducts();
  }
  catch (error) {
    console.log("Se produjo un error al cargar el juego ",error);
    Swal.fire({
        icon:"error",
        title: "Error",
        text: "No se pudo agregar el juego. Inténtalo nuevamente."
    })
  }
})

function buildTable(arrayJuegos) {
    tableBody.innerHTML = ""; // Limpiamos el contenido de la tabla

    if(arrayJuegos.length === 0) {
        tableBody.innerHTML = `<tr>
        <td colspan="6" class="text-center p-4">
            <h3 class="text-secondary">No se encontraron juegos disponibles</h3>
            </td>
        </tr>`;
        return; //Salir de la funcion si no  hay juegos
    }

    arrayJuegos.forEach((juego) => {
        tableBody.innerHTML += `<tr>
        <td class="cell-image"> 
            <img src="${juego.image}" alt="Imagen del producto"/>
        </td>

        <td class="cell-name">
            <span data-id="${juego.id}">  ${juego.name} </span>
        </td>

        <td class="cell-category">${juego.category}</td>
        <td class="cell-price">$ ${juego.price}</td>
        <td class="cell-date">${ formatDate(juego.createdAt) }</td>
        <td class="cell-actions">
            <button class="btn btn-primary btn-sm">
                <i class="fa-solid fa-pencil"></i>
            </button>
           <button class="btn btn-danger btn-sm" data-id="${juego.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
        </tr>`;
    });
    getSpanDialogBtns();
    getDeleteGameBtns();
}

 function deleteGame(id) 
{
    try {
      //const isConfirmed = confirm("¿Estás seguro de eliminar el juego?");
      Swal.fire({
        title: "¿Estás seguro de eliminar el juego?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0000FF",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        theme: "dark"
      })
      .then(async(result) => {
        if(result.isConfirmed) {
          //Hacer una peticion a la API para eliminar el juego
          const response = await axios.delete(`${API_URL}/products/${id}`);
          console.log("Juego eliminado: ", response.data);

          // Mostrar una notificación de éxito
          Swal.fire({
            icon:"success",
            title: "Eliminación exitosa",
            text: "El juego se ha eliminado correctamente.",
            showConfirmButton: false,
            theme: "dark",
            timer: 1000
          });
            getProducts(); // Vuelvo a cargar los productos desde la API
        }
      //games = games.filter(juego => juego.id !== id ); // Retener solo los juegos que no coinciden con el ID a eliminar
    });
  }
  catch (error) {
      console.log("Se produjo un error al eliminar el juego ", error);
      Swal.fire({
        icon:"error",
        title: "Error",
        text: "No se pudo eliminar el juego."
      });
    }
    // ESTÁ ALTERNATIVA SE USARIA PARA TRABAJAR CON DATOS LOCALES EN MI COMPU. Por Ejemplo, para un carrito de compras
    // Debería conocer el id del juego a eliminar
    // Vamos a obtener el índice del juego en el array
    //const indice = games.findIndex((juego) => {
    //  return juego.id === id;
    //});

    // Eliminar el juego del array
    //games.splice(indice, 1);
    
    //buildTable(games);
}


// Llamamos a la función para construir la tabla al cargar el script
// buildTable(games); 

// #filtros
// #cuando el user escriba en el seachInput
searchInput.addEventListener("keyup", (event) => {
    const inputValue = event.target.value.toLowerCase();
    const gamesFiltrados = games.filter((juego) => {

        const isMach = juego.name.toLowerCase().includes(inputValue);
        return isMach;
    })
    //console.log(gamesFiltrados);
    buildTable(gamesFiltrados);

})

categorySelect.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;

    // Si la categoría seleccionada es "" (todas las categoría), no filtramos
    if(selectedCategory === "all"){
        buildTable(games);
        return; // salimos de la función
    }

    const filteredGames = games.filter((juego) => {
        if(juego.category.toLowerCase() === selectedCategory){
            return true; // Coincide con la categoría seleccionada
        }

        return false;
    })

    buildTable(filteredGames);
})

sortBtns.forEach((btn) => {

    btn.addEventListener("click", (event) => {

        const dataOrder = event.currentTarget.dataset.order;

        if(dataOrder === "reset") {
            // Si el botón es de resetear, volvemos a mostrar todos los juegos
            buildTable(games);
            return; // Salimos de la función
        }

        console.log("Ordenar por:", dataOrder);

        const sortedGames = games.toSorted((a, b) => {
            if(dataOrder === "asc"){
                return a.price - b.price; // Orden ascendente por precio
            }
            return b.price - a.price; // Orden ascendente por precio
        })

        buildTable(sortedGames);
    })
})

function showDialog(id) {
  // Buscar el juego por su id
  const juego = games.find((jueguito) => {

    return jueguito.id === id;

  })

  // Mostrar un modal de bootstrap con la información del juego

  // Mostrar un modal de bootstrap con la información del juego
  Swal.fire({
    title: juego.name,
    html: `<div class="product-dialog">
      <div class="image-container">
        <img src="${juego.image}" alt="${juego.name}" />
      </div>

      <div class="details-container">

        <div class="category">${juego.category}</div>
        <p>${juego.description}</p>

        <div class="price">$ ${juego.price}</div>

        <div class="footer-wrapper">
          <div class="date">
            ${juego.createdAt}
          </div>
          <button class="btn btn-primary">Editar</button>
        </div>
      </div>
    </div>`,
    theme: "dark",
    showConfirmButton: false,
    width: "800px",
  });
  
}

function getSpanDialogBtns() {
  // Obtener todos los span dentro de la clase cell-name
  const spanDialogBtns = document.querySelectorAll(".cell-name span");

  // Agregar un evento click a cada span para mostrar el dialogo
  // console.log(spanDialogBtns);

  console.log(spanDialogBtns);
  spanDialogBtns.forEach((span) => {
    span.addEventListener("click", (event) => {

      event.stopPropagation(); // Evitar que el click se propague al padre
      const id = parseInt(span.dataset.id); // Obtener el id del dataset
      showDialog(id);
    });
  })
}

function getDeleteGameBtns() {

  const deleteGameBtns = document.querySelectorAll(".cell-actions .btn-danger");

  deleteGameBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {

      event.stopPropagation(); // Evitar que el click se propague al padre
      const id = parseInt(btn.dataset.id); // Obtener el id del dataset
      deleteGame(id);
    });
  })
}