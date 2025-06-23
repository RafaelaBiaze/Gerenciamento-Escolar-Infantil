import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

export default (function () {
    return sequelize.define(
        "PresencaModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            id_aluno: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            data_presenca: {
                type: DataTypes.DATE,
                allowNull: false
            },
            comparecimento: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            tableName: "presenca",
            timestamps: false
        }
    );
})();