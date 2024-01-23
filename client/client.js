import Express from 'express';
import Client from './client.model.js';
import { validateToken } from '../utils/auth.utils.js';
import { Op } from "sequelize"

const app = Express.Router();

app.get('/client', validateToken, async (req, res) => {
    try {
        const { name } = req.query;
        console.log("query name ", name)

        const conditions = {}
        conditions.status = "ACTIVE"

        if(name) {
            conditions.name = { [Op.iLike]: `%${name}%` }
        }

        const client = await Client.findAll({
            where: conditions
        })
    
        res.send(client)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

app.get('/client/:id', validateToken, async (req, res) => {
    const client = await Client.findOne({
        where: {
            status: "ACTIVE",
            id: req.params.id
        }
    });

    if ( !client ) {
        return res.status(200).json({
            msg: `El cliente con el siguiente id ${ req.params.id }, no existe`
        });
    }

    res.send(client);
})

app.post('/client', validateToken, async (req, res) => {
    const client = await Client.create(req.body); 
    client.save();

    res.send({ status: "success" });
});

app.put('/client/:id', validateToken, async (req, res) => {
    await Client.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.send({ status: "success" }); 
});

app.delete('/client/:id', validateToken, async (req, res) => {
    await Client.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true  // Asegura que los ganchos de Sequelize se ejecuten correctamente
    });

    res.send({ status: "success" });
});


export default app;