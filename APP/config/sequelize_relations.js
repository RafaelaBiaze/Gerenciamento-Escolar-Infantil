import AlunoMateriaModel from '../app/Models/AlunoMateriaModel.js';
import AlunoModel from '../app/Models/AlunoModel.js';
import MateriaModel from '../app/Models/MateriaModel.js';

export default () => {

    AlunoModel.belongsToMany(MateriaModel, {
        through: AlunoMateriaModel,
        foreignKey: 'id_aluno',
        otherKey: "id_materia",
        as: 'materias'
    });

    MateriaModel.belongsToMany(AlunoModel, {
        through: AlunoMateriaModel,
        foreignKey: 'id_materia',
        otherKey: "id_aluno",
        as: 'alunos'
    });

}