CREATE DATABASE IF NOT EXISTS suporte_tecnico;
USE suporte_tecnico;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) DEFAULT 'usuario'
);

CREATE TABLE IF NOT EXISTS chamados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    prioridade ENUM('baixa', 'média', 'alta') NOT NULL,
    status ENUM('aberto', 'em andamento', 'concluído') NOT NULL DEFAULT 'aberto',
    categoria VARCHAR(100) NOT NULL,
    usuario_id INT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Usuário padrão para testes (senha: 123456)
INSERT INTO usuarios (nome, email, senha, perfil) 
VALUES ('Administrador', 'admin@suporte.com', '123456', 'admin')
ON DUPLICATE KEY UPDATE id=id;