import express from 'express'
import cors from 'cors'
import AuthRouter from './auth/auth.js'
import ClientRouter from './client/client.js'
import ProductRouter from './product/product.js'
import UserRouter from './user/user.js'
import InvoiceRouter from './invoice/invoice.js'
import Invoice_Product from './invoice_product/invoice_product.model.js' 

const app = express()

app.use(cors({ origin: '*' }));
app.use(express.json())

app.use(AuthRouter);
app.use(ClientRouter)
app.use(ProductRouter)
app.use(UserRouter)
app.use(InvoiceRouter)
app.use(Invoice_Product)

app.listen(4000);






//Otra forma de crear una tabla (Usando import en vez de require) TABLA USER
/*const User = sequelize.define('user', {
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
})
//Para sincrónizar el modelo con la base de datos
sequelize.sync({force: true})*/

// export default app para conectar con las tablas en lugar de module.export app




