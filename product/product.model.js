import { BelongsTo, DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";

class Product extends Model {
}

Product.init({
    title: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DELETE']), 
        defaultValue: 'ACTIVE'
    },
}, {
    sequelize,
    modelName: 'Product' 
});

Product.sync({ alter: true });

export default Product;