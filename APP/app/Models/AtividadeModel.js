import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

export default (function () {
    return sequelize.define(
        "AtividadeModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            id_turma: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_professor: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            nome_atividade: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            descricao_atividade: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            data_atividade: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: "atividades",
            timestamps: false
        }
    );
})();