import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

export default (function () {
    return sequelize.define(
        "AlunoResponsavelModel",
        {
            id_responsavel: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_aluno: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            tableName: "aluno_responsavel",
            timestamps: false
        }
    );
})();