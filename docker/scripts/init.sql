-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS shop_db;

-- Usar o banco de dados
USE shop_db;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL
);

-- Inserir alguns usuários com saldo inicial
INSERT INTO users (name, balance) VALUES ('João', 100.00);
INSERT INTO users (name, balance) VALUES ('Maria', 200.00);
INSERT INTO users (name, balance) VALUES ('Pedro', 300.00);

-- Tabela de histórico de compras
CREATE TABLE IF NOT EXISTS purchase_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    sale_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inserir histórico de compras
INSERT INTO purchase_history (user_id, item, price, quantity) VALUES (1, 'Gin', 40.00, 1);
INSERT INTO purchase_history (user_id, item, price, quantity) VALUES (1, 'Cerveja Heineken', 45.50, 2);
INSERT INTO purchase_history (user_id, item, price, quantity) VALUES (2, 'Caipirinha de limão', 28.00, 1);

-- Tabela de itens do menu
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available_quantity INT NOT NULL
);

-- Inserir itens no menu
INSERT INTO menu (item, price, available_quantity) VALUES ('Gin', 40.00, 10);
INSERT INTO menu (item, price, available_quantity) VALUES ('Caipirinha de limão', 28.00, 5);
INSERT INTO menu (item, price, available_quantity) VALUES ('Cerveja Heineken', 45.50, 8);
