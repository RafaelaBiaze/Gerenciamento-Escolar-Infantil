import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import ColaboradorModel from './ColaboradorModel.js';

export default (function () {

    const Todo = sequelize.define(
        "TodoModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_checked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            id_colaborador: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            finished_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
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
            tableName: "todos",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return Todo;

})();