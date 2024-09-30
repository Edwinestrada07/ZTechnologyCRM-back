import { DataTypes, Model } from 'sequelize';
import sequelize from '../connect.js';
import Client from '../client/client.model.js';
import Product from '../product/product.model.js';

class Quote extends Model {}

Quote.init({
    cant: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    subtotal: DataTypes.FLOAT,
    shippingPrice: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DELETE']),
        defaultValue: 'ACTIVE'
    },
}, {
    sequelize,
    modelName: 'Quote'
});

// Definimos las relaciones con Client y Product
Quote.belongsTo(Client, { foreignKey: 'clientId', allowNull: false });
Quote.belongsTo(Product, { foreignKey: 'productId', allowNull: false });

Quote.sync({ alter: true });

export default Quote;
