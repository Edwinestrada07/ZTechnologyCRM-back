import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";
import Client from "../client/client.model.js";

class User extends Model {
    getPasswordEncrypt() {
        return this.password; 
    }
}

User.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: {
        type: DataTypes.ENUM(['ADMIN', 'GESTOR']), 
        defaultValue: 'GESTOR'
    },
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DELETE']), 
        defaultValue: 'ACTIVE'
    },
}, {
    sequelize,
    modelName: 'User'
});

//Relations (Un usuario puede tener muchos clientes)
User.hasMany(Client)
Client.belongsTo(User)

User.sync({ alter: true });

export default User