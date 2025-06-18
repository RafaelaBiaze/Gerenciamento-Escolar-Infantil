import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import TodoModel from './TodoModel.js';

export default (function () {

    return sequelize.define(
        "ProjetoModel",
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
            tableName: "projetos",
            timestamps: true,
            updatedAt: "updated_at",
            createdAt: "created_at"
        },

    );

})();
