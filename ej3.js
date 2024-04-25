const express = require('express');
const app = express();
const PORT = 3000;

const productos = [
    { 
        id: 1, 
        nombre: 'Taza de Harry Potter', 
        precio: 300
    },
    { 
        id: 2, 
        nombre: 'FIFA 23 PS5', 
        precio: 1000
    },
    {  
        id: 3, 
        nombre: 'Figura Goku Super Saiyan', 
        precio: 100
    },
    {  
        id: 4,  
        nombre: 'Zelda Breath of the Wild', 
        precio: 200
    },
    {  
        id: 5,  
        nombre: 'Skin Valorant', 
        precio: 120
    },
    {  
        id: 6, 
        nombre: 'Taza de Star Wars', 
        precio: 220
    }
  ];


// Funcion middleware que se ejecuta antes de entrar en el endpoint
app.use(express.json());

app.get("/products", (req, res)=> {
    const allProducts = {
        description: 'Productos',
        items: productos
    };
    res.status(200).json(allProducts);
});

// app.get("/id/:id", (req, res) => {
//     console.log(req.params.nombre);
//     const product = productos[req.params.id-1];
//     res.send(product);
// })

// Crear endpoint para poder crear un producto nuevo

app.post("/", (req, res) => {
    console.log(req.body);
    const newProduct = {
        id:productos.length + 1,
        nombre:req.body.nombre,
        precio:req.body.precio
    };
    productos.push(newProduct);
    res.status(201).send(productos);
});

// Crear endpoint para poder actualizar un producto

app.put("/id/:id", (req, res) => {
    const found = productos.some(product => product.id == req.params.id)
    if (found) {
        productos.forEach(product => {
            if(product.id == req.params.id) {
                product.nombre = req.body.nombre || product.nombre,
                product.precio = req.body.precio || product.precio
            }
        })
        console.log(req.body);
        console.log(req.params.id);
        res.status(202).send(productos);       
    } else {
        res.status(404).send(`Member with ${req.params.id} doesn't exist`);
    }
});

// Crear endpoint para poder eliminar un producto

app.delete("/id/:id", (req, res) => {
    const found = productos.some(product => product.id == req.params.id)
    if (found) {
        const productFilter = productos.filter(product => product.id != req.params.id);
        res.send(productFilter);
    } else {
        res.status(404).send(`Member with id ${req.params.id} doesn't exist`);
    }
});

// Crear filtro por precio de producto

app.get("/filter/price", (req, res) => {
    
})

// Crear filtro que muestre los productos con un precio entre 50 y 250.



// Crear un filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto



// Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese product



app.listen(PORT, () => console.log(`Servidor ejercicio 3 levantado en el puerto ${PORT}`));
