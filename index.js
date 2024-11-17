import express from 'express';
import 'dotenv/config';
import logger from './logger.js'
import morgan from 'morgan';



const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // Middleware for parsing JSON

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

let teaOrders = [];
let nextId = 1;

// POST Method - Create a new order
app.post('/order', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }
    const newTea = { id: nextId++, name, price };
    teaOrders.push(newTea);
    res.status(201).send(newTea);
});

// GET Method - Retrieve all orders
app.get('/getorders', (req, res) => { // Renamed for plural consistency
    res.status(200).send(teaOrders);
});

// GET by ID - Retrieve a specific order by ID
app.get('/order/:id', (req, res) => {
    const tea = teaOrders.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Order not found');
    }
    res.status(200).send(tea);
});

// PUT Method - Update an existing order by ID
app.put('/order/:id', (req, res) => {
    const tea = teaOrders.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Order not found');
    }

    const { name, price } = req.body;
    if (name) tea.name = name; // Update only if new values provided
    if (price) tea.price = price;

    res.status(200).send(tea);
});

// DELETE Method - Remove an order by ID
app.delete('/order/:id', (req, res) => {
    const index = teaOrders.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Order not found');
    }
    teaOrders.splice(index, 1);
    res.status(204).send(); // No content response for successful deletion
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





// import express from 'express';
// import 'dotenv/config';

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json()); // Middleware for parsing JSON

// let teaOrders = [];
// let nextId = 1;

// // POST Method - Create a new order
// app.post('/order', (req, res) => {
//     const { name, price } = req.body;
//     if (!name || !price) {
//         return res.status(400).send('Name and price are required');
//     }
//     const newTea = { id: nextId++, name, price };
//     teaOrders.push(newTea);
//     res.status(201).send(newTea);
// });

// // GET Method - Retrieve all orders
// app.get('/getorders', (req, res) => { // Renamed for plural consistency
//     res.status(200).send(teaOrders);
// });

// // GET by ID - Retrieve a specific order by ID
// app.get('/order/:id', (req, res) => {
//     const tea = teaOrders.find(t => t.id === parseInt(req.params.id));
//     if (!tea) {
//         return res.status(404).send('Order not found');
//     }
//     res.status(200).send(tea);
// });

// // PUT Method - Update an existing order by ID
// app.put('/order/:id', (req, res) => {
//     const tea = teaOrders.find(t => t.id === parseInt(req.params.id));
//     if (!tea) {
//         return res.status(404).send('Order not found');
//     }

//     const { name, price } = req.body;
//     if (name) tea.name = name; // Update only if new values provided
//     if (price) tea.price = price;

//     res.status(200).send(tea);
// });

// // DELETE Method - Remove an order by ID
// app.delete('/order/:id', (req, res) => {
//     const index = teaOrders.findIndex(t => t.id === parseInt(req.params.id));
//     if (index === -1) {
//         return res.status(404).send('Order not found');
//     }
//     teaOrders.splice(index, 1);
//     res.status(204).send(); // No content response for successful deletion
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
