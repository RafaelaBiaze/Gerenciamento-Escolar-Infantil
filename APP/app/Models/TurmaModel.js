import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

export default (function () {
    return sequelize.define(
        "TurmaModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            id_professor: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            sala: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            periodo: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            ano: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            tableName: "turmas",
            timestamps: false
        }
    );
})();