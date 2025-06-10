CREATE TABLE IF NOT EXISTS tabela_exemplo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(155),
    esta_ativo BOOLEAN DEFAULT FALSE
);

INSERT INTO tabela_exemplo (nome, esta_ativo) VALUES
('João da Silva', TRUE),
('Maria Oliveira', FALSE),
('Pedro Santos', TRUE),
('Ana Paula Souza', TRUE),
('Carlos Eduardo', FALSE),
('Juliana Rocha', TRUE),
('Fernando Almeida', FALSE),
('Beatriz Lima', TRUE),
('Rafael Costa', TRUE),
('Larissa Martins', FALSE),
('Bruno Ferreira', TRUE),
('Camila Duarte', FALSE);