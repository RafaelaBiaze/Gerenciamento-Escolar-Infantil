import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {

    return sequelize.define(
        "AlunoMateriaModel",
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
            id_materia: {
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
            tableName: "alunos_materias",
            timestamps: true,
            updatedAt: false,
            createdAt: "created_at"
        },

    );

})();
