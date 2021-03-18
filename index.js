const express = require("express");
const createError = require("http-errors");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Información para la página
let postresSuaves = [
    {
        id: 1,
        nombre: 'Flan',
        sabor: 'Vainilla',
        img: '/img/kobby-mendez-4rymwWECY7I-unsplash.jpg',
        cssClass: 'postre-frio',
    },
    {
        id: 2,
        nombre: 'Mousse',
        sabor: 'Chocolate',
        img: '/img/pexels-ella-olsson-3026810.jpg',
    },
    {
        id: 3,
        nombre: 'Pastel',
        sabor: 'Tres leches',
        img: '/img/pexels-caramelle-bakery-4699096.jpg',
    },
];

let postresFrios = [
    {
        id: 1,
        nombre: 'Helado',
        sabor: 'Galleta',
        img: '/img/pexels-roman-odintsov-5060281.jpg',
        cssClass: 'postre-frio',
    },
    {
        id: 2,
        nombre: 'Pay',
        sabor: 'Limón',
        img: '/img/pexels-alesia-kozik-6631965.jpg',
    },
    {
        id: 3,
        nombre: 'Paleta helada',
        sabor: 'Frutas',
        img: '/img/pexels-jill-wellington-461189.jpg',
    },
];

let postresCalientes = [
    {
        id: 1,
        nombre: 'Chocolate Lava Cake',
        sabor: 'Chocolate',
        img: '/img/pexels-kristina-paukshtite-1998633.jpg',
    },
    {
        id: 2,
        nombre: 'Chocolate Caliente',
        sabor: 'Chocolate',
        img: '/img/pexels-polina-tankilevitch-5419239.jpg',
    },
    {
        id: 3,
        nombre: 'brownie',
        sabor: 'Chocolate',
        img: '/img/pexels-pixabay-45202.jpg',
    },
];

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/index", {});
});

app.get("/postres/suaves", (req, res) => {
    res.render("pages/postres/suaves", {
        postres: postresSuaves
    });
});

app.get("/postres/frios", (req, res) => {
    res.render("pages/postres/frios", {
        postres: postresFrios
    });
});

app.get("/postres/calientes", (req, res) => {
    res.render("pages/postres/calientes", {
        postres: postresCalientes
    });
});

// /postres/suaves/postre?id=1
// /postres/suaves/postre?id=2
app.get("/postres/suaves/postre", (req, res) => {
    // Query Params
    // ?id=1
    // req.query.id
    // for (const key in object) {
    //     if (Object.hasOwnProperty.call(object, key)) {
    //         const element = object[key];

    //     }
    // }

    let id = req.query.id; //es un string

    for (let i = 0; i < postresSuaves.length; i++) {
        const postre = postresSuaves[i];

        if (postre.id.toString() === id) { //*
            //return finalizar función actual (req, res)
            return res.render("pages/postres/postre", {
                // postre: postre
                postre
            });
        }
    }

    // TODO: Mostrar error 404

    // for (const i of postresSuaves) {
    // }
    // array.forEach(element => {

    // });
});

app.get("/search", (req, res) => {
    res.render("pages/search", {});
});

app.get("/about", (req, res) => {
    res.render("pages/about", {});
});

app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});