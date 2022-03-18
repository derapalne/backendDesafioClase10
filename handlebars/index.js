const ProductosAPI = require("./productosApi");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

const productosApi = new ProductosAPI();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "index.hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

productosApi.addProducto({
    title: "Onigiri",
    price: 200,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/food-solid-in-the-kitchen/512/Onigiri-256.png",
});

productosApi.addProducto({
    title: "Biological Warfare",
    price: 800000000,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/infectious-pandemics-1/480/12-virus-256.png",
});

productosApi.addProducto({
    title: "Eg",
    price: 120,
    thumbnail:
        "https://cdn3.iconfinder.com/data/icons/food-solid-in-the-kitchen/512/Egg_and_bacon-256.png",
});

app.get("/", (req, res) => {
    res.render("productosForm", { prods: productosApi.productos });
});

app.post("/productos", (req, res) => {
    productosApi.addProducto(req.body);
    res.render("productosForm", { prods: productosApi.productos });
});

app.get("/productos", (req, res) => {
    const prods = productosApi.getAll();
    console.log(prods);
    res.render("productosList", { prods });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Lisstooooo ", PORT));
