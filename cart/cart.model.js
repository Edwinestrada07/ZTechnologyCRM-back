import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";
import User from "../user/user.model.js";
import Product from "../product/product.model.js";

class Cart extends Model {
}

Cart.init({
    account: DataTypes.FLOAT,
    quoteNumber: DataTypes.FLOAT,
    shippingPrice: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DELETE']), 
        defaultValue: 'ACTIVE'
    },
    
}, {
    sequelize,
    modelName: 'Cart'
});

Cart.belongsTo(User)
Cart.belongsTo(Product)

Cart.sync({ alter: true });

export default Cart;
