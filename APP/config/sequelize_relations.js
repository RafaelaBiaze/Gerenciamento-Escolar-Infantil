import AlunoModel from '../app/Models/AlunoModel.js';
import AlunoResponsavelModel from '../app/Models/AlunoResponsavelModel.js';
import ColaboradorModel from '../app/Models/ColaboradorModel.js';
import ColaboradorProjetoModel from '../app/Models/ColaboradorProjetoModel.js';
import ProfessorModel from '../app/Models/ProfessorModel.js';
import ProjetoModel from '../app/Models/ProjetoModel.js';
import ResponsavelModel from '../app/Models/ResponsavelModel.js';
import RoleModel from '../app/Models/RoleModel.js';
import TodoModel from '../app/Models/TodoModel.js';
import TurmaModel from '../app/Models/TurmaModel.js';
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

    ProfessorModel.hasOne(TurmaModel, {
        foreignKey: 'id_professor',
        as: 'turma'
    });

    TurmaModel.belongsTo(ProfessorModel, {
        foreignKey: 'id_professor',
        as: 'professor'
    })

    TurmaModel.hasMany(AlunoModel, {
        foreignKey: 'id_turma',
        as: 'alunos'
    });

    AlunoModel.belongsTo(TurmaModel, {
        foreignKey: 'id_turma',
        as: 'turma'
    });

    ResponsavelModel.belongsToMany(AlunoModel, {
        through: AlunoResponsavelModel,
        foreignKey: 'id_responsavel',
        otherKey: 'id_aluno',
        as: 'alunos'
    });

    AlunoModel.belongsToMany(ResponsavelModel, {
        through: AlunoResponsavelModel,
        foreignKey: 'id_aluno',
        otherKey: 'id_responsavel',
        as: 'responsaveis'
    });

}