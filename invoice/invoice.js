import Express from 'express'
import Invoice from './invoice.model.js'

const app = Express.Router()

app.get('/invoice', async (req, res) => {
    
    const invoice = await Invoice.findAll()
    res.send(invoice)
})

app.get('/invoice/:id', async (req, res) => {
    const invoice = await Invoice.findOne({
        where: {
            status: "ACTIVE",
            id: req.params.id  
        }
    })

    if ( !invoice ) {
        return res.status(200).json({
            msg: `La cotización con el siguiente id ${ req.params.id }, no existe`
        });
    }

    res.send(invoice); 
})

app.post('/invoice', async (req, res) => {
    const invoice = await Invoice.create(req.body); 
    invoice.save();

    res.send({ status: "success", invoice });
})

app.put('/invoice/:id', async (req, res) => {
    const invoice = await Invoice.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.send({ status: "success", invoice });
})

app.delete('/invoice/:id', async (req, res) => {
    await Invoice.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true  // Asegura que los ganchos de Sequelize se ejecuten correctamente
    });

    res.send({ status: "success" });
})

export default app