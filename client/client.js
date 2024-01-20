import Express from 'express';
import Client from './client.model.js';
import { validateToken } from '../utils/auth.utils.js';

const app = Express.Router();

app.get('/client', validateToken, async (req, res) => {
    const client = await Client.findAll({
        where: {
            status: "ACTIVE",
        }
    });

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