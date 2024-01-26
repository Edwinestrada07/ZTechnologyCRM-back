import Express from 'express'
import Cart from './cart.model.js'

const app = Express.Router()

app.get('/cart', async (req, res) => {
    try {
      const cart = await Cart.findAll({
        where: {
            status: "ACTIVE",
            id: req.params.id  
        }
      })
  
      res.send(cart)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'  })
    }
})

app.get('/cart/:id', async (req, res) => {
    const cart = await Cart.findOne({
        where: {
            status: "ACTIVE",
            id: req.params.id  
        }
    })

    if ( !cart ) {
        return res.status(200).json({
            msg: `La cotización con el siguiente id ${ req.params.id }, no existe`
        });
    }

    res.send(cart); 
})

app.post('/cart', async (req, res) => {
    const cart = await Cart.create(req.body); 
    cart.save();

    res.send({ status: "success", cart });
})

app.put('/cart/:id', async (req, res) => {
    const cart = await Cart.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.send({ status: "success", cart });
})

app.delete('/cart/:id', async (req, res) => {
    await Cart.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true  // Asegura que los ganchos de Sequelize se ejecuten correctamente
    });

    res.send({ status: "success" });
})

export default app