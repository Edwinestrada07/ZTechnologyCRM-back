import Express from "express"
import User from "./user.model.js"

const app = Express.Router()

app.get('/user', async (req, res) => {
    const user = await User.findAll({
        where: {
            status: "ACTIVE",
        }
    })

    res.send(user)
})

app.post('/user', async (req, res) => {
    const user = await User.create(req.body)
    user.save()

    res.send({ status: "success", user })
})

app.put('/user/:id', async (req, res) => {
    const user = await User.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    res.send({ status: "success", user})
})

app.delete('/user/:id', async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true// Asegura que los ganchos de Sequelize se ejecuten correctamente
    })

    res.send({ status: "success"})
})

export default app