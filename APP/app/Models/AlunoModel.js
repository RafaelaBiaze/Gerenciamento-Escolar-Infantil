import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {

    return sequelize.define(
        "AlunoModel",
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
            tableName: "alunos",
            timestamps: true,
            updatedAt: "updated_at",
            createdAt: "created_at"
        },

    );

})();
