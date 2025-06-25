-- ATENÇÃO O BANCO ATUALMENTE TEM POUCOS DADOS JUSTAMENTE PARA TESTES.
-- 1. Listar todos os alunos e o nome da turma de cada um.
SELECT
    a.nome_aluno,
    t.sala
FROM
    alunos a
JOIN
    turmas t ON a.id_turma = t.id;

-- 2. Mostrar as atividades, o nome da turma e o nome do professor que a aplicou.
--    (O uso de alias como 't' para turmas e 'pr' para professores)
SELECT
    at.nome_atividade,
    at.data_atividade,
    t.sala AS nome_turma,
    pr.nome_professor
FROM
    atividades at
JOIN
    turmas t ON at.id_turma = t.id
JOIN
    professores pr ON at.id_professor = pr.id;


-- 3. Listar todos os responsáveis e os nomes dos seus respectivos alunos.
SELECT
    r.nome_responsavel,
    r.telefone_responsavel,
    a.nome_aluno
FROM
    responsavel r
JOIN
    aluno_responsavel ar ON r.id = ar.id_responsavel
JOIN
    alunos a ON ar.id_aluno = a.id
ORDER BY
    r.nome_responsavel;


-- 4. Obter todos os usuários que são professores, junto com o nome do perfil.
SELECT
    u.login,
    u.email,
    r.nome AS nome_perfil
FROM
    users u
JOIN
    roles r ON u.id_role = r.id
WHERE
    r.nome = 'Role_Professor';


-- 5. Ver o histórico de presença de um aluno específico.
SELECT
    a.nome_aluno,
    p.data_presenca,
    p.comparecimento,
    t.sala AS nome_turma
FROM
    presenca p
JOIN
    alunos a ON p.id_aluno = a.id
JOIN
    turmas t ON a.id_turma = t.id
WHERE
    a.nome_aluno = 'João Henrique do Prado';

-- 6. Listar todas as turmas, incluindo as que ainda não têm professor.
SELECT
    t.sala,
    t.periodo,
    pr.nome_professor
FROM
    turmas t
LEFT JOIN
    professores pr ON t.id_professor = pr.id;


-- 7. Exibir o email de login de todos os responsáveis.
SELECT
    r.nome_responsavel,
    u.email
FROM
    responsavel r
JOIN
    users u ON r.id_user = u.id;


-- 8. Contar quantos alunos cada professor leciona.
SELECT
    pr.nome_professor,
    count(a.id) AS quantidade_alunos
FROM
    professores pr
JOIN
    turmas t ON pr.id = t.id_professor
JOIN
    alunos a ON t.id = a.id_turma
GROUP BY
    pr.nome_professor;

-- SELECT SEM JOIN

-- 1. Selecionar todos os alunos nascidos a partir de 2021.
--    (O formato de data 'YYYY-MM-DD' é o padrão ISO 8601 e a forma recomendada no PostgreSQL)
SELECT * FROM alunos WHERE data_nascimento_aluno >= '2021-01-01';


-- 2. Contar o número total de turmas no período da "Tarde".
--    (A função count() é altamente otimizada)
SELECT count(*) AS total_turmas_tarde FROM turmas WHERE periodo = 'Manhã';


-- 3. Encontrar todos os registros de ausência.
SELECT * FROM presenca WHERE comparecimento = true;


-- 4. Listar todos os perfis (roles) disponíveis.
SELECT nome FROM roles ORDER BY nome ASC;


-- 5. Selecionar todas as atividades agendadas para o mês de Junho de 2025.
SELECT nome_atividade, data_atividade FROM atividades WHERE data_atividade BETWEEN '2025-02-01' AND '2025-05-30';


-- 6. Listar usuários que nunca tiveram seus dados alterados.
SELECT login, email, created_at FROM users WHERE created_at = updated_at;


-- 7. Listar professores cujo CPF é nulo ou vazio.
SELECT nome_professor FROM professores WHERE cpf_professor IS NULL OR cpf_professor = '';


-- 8. Selecionar as 5 atividades mais recentes.
SELECT nome_atividade, descricao_atividade, data_atividade FROM atividades ORDER BY data_atividade DESC LIMIT 5;