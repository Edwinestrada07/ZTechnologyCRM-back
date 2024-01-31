import Express from 'express'
import Invoice from './invoice.model.js'
import { validateToken } from '../utils/auth.utils.js'
import Invoice_Product from '../invoice_product/invoice_product.model'

const app = Express.Router()

app.get('/invoice_product', validateToken, async (req, res) => {
    
    const invoice_product = await Invoice_Product.findAll()
    res.send(invoice_product)
})

/*app.get('/invoice_product/:id', validateToken, async (req, res) => {
    const invoice_product = await Invoice_Product.findOne({
        where: {
            status: "ACTIVE",
            id: req.params.id  
        }
    })

    if ( !invoice_product ) {
        return res.status(200).json({
            
        });
    }

    res.send(invoice_product); 
})*/

app.post('/invoice_product', validateToken, async (req, res) => {
    const cant = req.body.cant
    const ProductId = req.body.productId
    const InvoiceId = req.body.invoiceId

    try {
        const invoice_product = await Invoice_Product.create({ cant, ProductId, InvoiceId}); 
        invoice_product.save();

    } catch (error) {
        console.log('Error al crear factura')
        res.send({ status: "success", Invoice_Product })
    }
})

/*app.put('/invoice_product/:id', async (req, res) => {
    const invoice_product = await Invoice_Product.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.send({ status: "success", invoice_product });
})

app.delete('/invoice_product/:id', async (req, res) => {
    await Invoice_Product.destroy({
        where: {
            id: req.params.id
        },
        individualHooks: true  // Asegura que los ganchos de Sequelize se ejecuten correctamente
    });

    res.send({ status: "success" });
})*/

export default app