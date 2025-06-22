import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

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
            id_turma: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            registro_aluno: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            nome_aluno: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            data_nascimento_aluno: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: "alunos",
            timestamps: false
        }
    );
})();