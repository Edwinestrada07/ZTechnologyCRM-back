import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";

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

Invoice.sync({ alter: true });

export default Invoice;
