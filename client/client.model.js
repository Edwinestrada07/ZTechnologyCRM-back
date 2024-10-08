import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";
import User from "../user/user.model.js";

class Client extends Model {
    getPasswordEncrypt() {
        return this.password;
    }
}

Client.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DELETE']),
        defaultValue: 'ACTIVE'
    },
}, {
    sequelize,
    modelName: 'Client'
});

// Relaciones (Un cliente pertenece a un usuario)
Client.belongsTo(User, { foreignKey: 'userId', allowNull: false });
User.hasMany(Client, { foreignKey: 'userId', allowNull: false });

Client.sync({ alter: true });

export default Client;
