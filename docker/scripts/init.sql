-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS shop_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;


-- Usar o banco de dados
USE shop_db;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Inserir usuário com saldo inicial
INSERT INTO User (name, balance) VALUES ('Yago', 100.00);

-- Tabela de histórico de compras
CREATE TABLE IF NOT EXISTS PurshaceHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    item VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    saleDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Inserir histórico de compras (corrigido o nome da coluna para userId)
INSERT INTO PurshaceHistory (userId, item, price, quantity) VALUES (1, 'Gin Tanqueray', 40.00, 1);
INSERT INTO PurshaceHistory (userId, item, price, quantity) VALUES (1, 'Cerveja Heineken', 45.50, 2);

-- Tabela de itens do menu
CREATE TABLE IF NOT EXISTS Menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    availableQuantity INT,
    image VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Inserir itens no menu
INSERT INTO Menu (item, price, availableQuantity, image) VALUES ('Gin Tanqueray', 40.00, 10, 'gin.png');
INSERT INTO Menu (item, price, availableQuantity, image) VALUES ('Caipirinha de limão', 28.00, 5, 'caipirinha-limao.png');
INSERT INTO Menu (item, price, availableQuantity, image) VALUES ('Cerveja Heineken', 45.50, 8, 'heineken.png');
INSERT INTO Menu (item, price, availableQuantity, image) VALUES ('Caipirinha de Morango', 45.50, 8, 'caipirinha-morango.png');
INSERT INTO Menu (item, price, availableQuantity, image) VALUES ('Fitzgerald da casa', 45.50, 8, 'fitzgerald-casa.png');
INSERT INTO Menu (item, price, availableQuantity, image) VALUES ('Cosmopolitan', 45.50, 8, 'cosmopolitan.png');
INSERT INTO Menu (item, price, availableQuantity, image) VALUES ('Champagne', 95.00, 0, 'champagne.png');


-- Tabela de checkout para monitorar o status de compras
CREATE TABLE IF NOT EXISTS Checkout (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    status ENUM('in_progress', 'completed', 'abandoned', 'insufficient_funds') NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Tabela de checkout_items para armazenar os itens de cada checkout
CREATE TABLE IF NOT EXISTS CheckoutItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checkoutId INT,
    menuItemId INT,
    quantity INT NOT NULL,
    FOREIGN KEY (checkoutId) REFERENCES Checkout(id),
    FOREIGN KEY (menuItemId) REFERENCES Menu(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
