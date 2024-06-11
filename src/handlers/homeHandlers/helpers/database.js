

const database = {
    id: 1,
    title: "Rickandmorty",
    infoHeader: "Aqui tenemos un poco de informacion acerca de la aplicacion que estamos exhibiendo.",
    infoBody: "Esta es una pagina web experimental creada en react.js con vite, la misma fue hecha con la finalidad de poner en practica todo lo aprendido en el bootcamp 'Soy Henry'.",
    url: "https://rick-and-morty2024.vercel.app",
    items: [ { img: 'assets/amontono/img2.png', text: 'Texto 2' },
             { img: 'assets/amontono/img3.png', text: 'Texto 3' },
            { img: 'assets/amontono/img4.png', text: 'Texto 4' },
            { img: 'assets/amontono/img5.png', text: 'Seccion de "Home", adonde utiliza una funcion de paginado que muestra 20 cards por pagina, y esta habilitada la seccion de favoritos donde puede guardar y eliminar sus cards' },
            { img: 'assets/amontono/img6.png', text: 'Texto 6' },
            { img: 'assets/amontono/img7.png', text: 'Texto 7' },
            { img: 'assets/amontono/img8.png', text: 'Texto 8' },
            { img: 'assets/amontono/img9.png', text: 'Texto 9' },
            { img: 'assets/amontono/img10.png', text: 'Texto 10' }]
}
const items = database.items;
const info =  database

//console.log(items)
//console.log(info)
export {
  items,
  info
};