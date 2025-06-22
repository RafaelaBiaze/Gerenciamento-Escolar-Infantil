import ColaboradorModel from '../app/Models/ColaboradorModel.js';
import ColaboradorProjetoModel from '../app/Models/ColaboradorProjetoModel.js';
import ProfessorModel from '../app/Models/ProfessorModel.js';
import ProjetoModel from '../app/Models/ProjetoModel.js';
import ResponsavelModel from '../app/Models/ResponsavelModel.js';
import RoleModel from '../app/Models/RoleModel.js';
import TodoModel from '../app/Models/TodoModel.js';
import UserModel from '../app/Models/UserModel.js';

export default () => {

    ColaboradorModel.hasMany(TodoModel, {
        foreignKey: 'id_colaborador',
        as: 'todos'
    });

    TodoModel.belongsTo(ColaboradorModel, {
        foreignKey: 'id_colaborador',
        as: 'colaborador'
    });

    ColaboradorModel.belongsToMany(ProjetoModel, {
        through: ColaboradorProjetoModel,
        foreignKey: 'id_colaborador',
        otherKey: 'id_projeto',
        as: 'projetos'
    });

    ProjetoModel.belongsToMany(ColaboradorModel, {
        through: ColaboradorProjetoModel,
        foreignKey: 'id_projeto',
        otherKey: 'id_colaborador',
        as: 'colaboradores'
    });

    UserModel.belongsTo(RoleModel, {
        foreignKey: "id_role",
        as: "role"
    });

    RoleModel.hasMany(UserModel, {
        foreignKey: "id_role",
        as: "users"
    });

    ProfessorModel.belongsTo(UserModel, {
        foreignKey: "id_user",
        as: "user"
    });

    UserModel.hasOne(ProfessorModel, {
        foreignKey: "id_user",
        as: "professor"
    });

    ResponsavelModel.belongsTo(UserModel, {
        foreignKey: "id_user",
        as: "user"
    });

    UserModel.hasOne(ResponsavelModel, {
        foreignKey: "id_user",
        as: "responsavel"
    });

}