import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";
import Product from "../product/product.model.js"

class Invoice extends Model {
}

Invoice.init({
    cant: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    subtotal: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DELETE']), 
        defaultValue: 'ACTIVE'
    },
    
}, {
    sequelize,
    modelName: 'Invoice'
});

// Relation (Muchos a muchos) una factura puede contener muchos product y muchos products pueden estar en muchas facturas 
Invoice.belongsToMany(Product, { through: 'InvoiceProduct', foreignKey: 'invoiceId' });
Product.belongsToMany(Invoice, { through: 'InvoiceProduct', foreignKey: 'productId' });

Invoice.sync({ alter: true });

export default Invoice;
