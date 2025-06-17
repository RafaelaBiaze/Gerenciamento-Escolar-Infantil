import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {

    return sequelize.define(
        "MateriaModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
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
            tableName: "materias",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

})();