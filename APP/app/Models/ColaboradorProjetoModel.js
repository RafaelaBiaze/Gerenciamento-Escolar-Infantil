import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {

    return sequelize.define(
        "ColaboradorProjetoModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            id_colaborador: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_projeto: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: "colaboradores_projetos",
            timestamps: true,
            updatedAt: false,
            createdAt: "created_at"
        },

    );

})();
