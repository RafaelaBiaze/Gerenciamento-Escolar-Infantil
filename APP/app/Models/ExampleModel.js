import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {

    /* 

      sequelize.define(parametro1, parametro2, parametro3)
      parametro1: string :: nome da model
      parametro2: objeto_campos :: defnição dos campos
      parametro3: objeto_configuracoes :: configurações gerais

      objeto_campos: {campo_1: {...}, campo_2: {...}}
    
    */

    return sequelize.define(
        "ExampleModel",
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
            esta_ativo: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            tableName: "tabela_exemplo",
            timestamps: false
        }
    );

})();
