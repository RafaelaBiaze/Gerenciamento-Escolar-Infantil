import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';
import "../../bootstrap/app.js";

export default (function () {
    return sequelize.define(
        "PagamentoModel",
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
            id_responsavel: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            forma_pagamento: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            valor: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: true
            },
            status_pagamento: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: 'pendente'
            },
            data_pagamento: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: "pagamentos",
            timestamps: false
        }
    );
})();