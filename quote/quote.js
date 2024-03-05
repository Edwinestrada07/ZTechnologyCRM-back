import Express from 'express'
import Quote from './quote.model.js'
import { validateToken } from '../utils/auth.utils.js'

const app = Express.Router()

app.get('/quote', validateToken, async (req, res) => {
    
    const quote = await Quote.findAll()
    res.send(quote)
})

app.get('/quote/:id', validateToken, async (req, res) => {
    const quote = await Quote.findOne({
        where: {
            status: "ACTIVE",
            id: req.params.id  
        }
    })

    if ( !quote ) {
        return res.status(200).json({
            msg: `La cotización con el siguiente id ${ req.params.id }, no existe`
        })
    }

    res.send(quote) 
})

app.post('/quote', validateToken, async (req, res) => {
    const quote = await Quote.create(req.body)
    quote.save()

    res.send({ status: "success", quote: quote })
})

app.put('/quote/:id', validateToken, async (req, res) => {
    const quote = await Quote.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    res.send({ status: "success", quote: quote })
})

app.delete('/quote/:id', validateToken, async (req, res) => {
    await Quote.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true  // Asegura que los ganchos de Sequelize se ejecuten correctamente
    })

    res.send({ status: "success" })
})

export default app