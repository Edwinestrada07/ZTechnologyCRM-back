import Express from 'express'
import Product from './product.model.js'
import { validateToken } from '../utils/auth.utils.js'
import { Op } from "sequelize"

const app = Express.Router()

app.get('/product', validateToken, async (req, res) => {
    try {
        const { name } = req.query;
        console.log("query name ", name)

        const conditions = {}
        conditions.status = "ACTIVE"

        if(name) {
            conditions.name = { [Op.iLike]: `%${name}%` }
        }

        const product = await Product.findAll({
            where: conditions
        })
    
        res.send(product)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/product/:id', validateToken, async (req, res) => {
    
    if (!req.params.id) {
        return res.status(400).json({
            msg: "ID de producto no proporcionado"
        });
    }

    const product = await Product.findOne({
        where: {
            status: "ACTIVE",
            id: req.params.id
        }
    })

    if (!product) {
        return res.status(200).json({
            msg: `El producto con el siguiente id ${req.params.id}, no existe`
        });
    }

    res.send(product);
})


app.post('/product', validateToken, async (req, res) => {
    const product = await Product.create(req.body); 
    product.save();

    res.send({ status: "success", product });
})

app.put('/product/:id', validateToken, async (req, res) => {
    const product = await Product.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.send({ status: "success", product });
})

app.delete('/product/:id', validateToken, async (req, res) => {
    await Product.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true  // Asegura que los ganchos de Sequelize se ejecuten correctamente
    });

    res.send({ status: "success" });
})


export default app;