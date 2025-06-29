import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

export default (function () {
    return sequelize.define(
        "ProfessorModel",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            nome_professor: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            cpf_professor: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            telefone_professor: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: "professores",
            timestamps: false
        }
    );
})();