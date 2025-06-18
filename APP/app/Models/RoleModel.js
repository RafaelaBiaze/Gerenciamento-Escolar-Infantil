import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {
    return sequelize.define(
        "RoleModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: "roles",
            timestamps: true,
            updatedAt: "updated_at",
            createdAt: "created_at"
        }
    );
})();