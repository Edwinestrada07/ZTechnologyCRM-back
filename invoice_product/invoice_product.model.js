import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";
import Product from "../product/product.model.js"
import Invoice from "../invoice/invoice.model.js";

class Invoice_Product extends Model {
}

Invoice_Product.init({
    cant: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
}, {
    sequelize,
    modelName: 'Invoice_Product'
});

// Relation (Muchos a muchos) una factura puede contener muchos product y muchos products pueden estar en muchas facturas 
Invoice.belongsToMany(Product, { through: Invoice_Product });
Product.belongsToMany(Invoice, { through: Invoice_Product });

Invoice_Product.sync({ alter: true });

export default Invoice_Product;