import Express from 'express';
import Product from './product.model.js';
import { validateToken } from '../utils/auth.utils.js';

const app = Express.Router();

app.get('/product', validateToken, async (req, res) => {
    const product = await Product.findAll({
        where: {
            status: "ACTIVE",  
        }
    });

    res.send(product); 
})

app.post('/product', validateToken, async (req, res) => {
    const product = await Product.create(req.body); 
    product.save();

    res.send({ status: "success", product });
});

app.put('/product/:id', validateToken, async (req, res) => {
    const product = await Product.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.send({ status: "success", product });
});

app.delete('/product/:id', validateToken, async (req, res) => {
    await Product.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true  // Asegura que los ganchos de Sequelize se ejecuten correctamente
    });

    res.send({ status: "success" });
});


export default app;