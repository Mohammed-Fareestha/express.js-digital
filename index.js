import express from 'express';

const app = express();
const port = 8000;
app.use(express.json());

let teaOrder = [];
let nextId = 1;

// POST Method
app.post('/order', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaOrder.push(newTea);
    res.status(201).send(newTea);
});

// GET Method
app.get('/getorder', (req, res) => {  // Fixed typo here
    res.status(200).send(teaOrder);
});

// GET by ID
app.get('/myorder/:id', (req, res) => {
    const tea = teaOrder.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Order not found');
    }
    res.status(200).send(tea);
});

// PUT Update Method
app.put('/orderChange/:id', (req, res) => {  // Fixed missing slash here
    const tea = teaOrder.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Order not found!');
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

// DELETE Method
app.delete('/removeorder/:id', (req, res) => {
    const index = teaOrder.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Order not found');
    }
    teaOrder.splice(index, 1);
    return res.status(204).send('Order Removed');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
