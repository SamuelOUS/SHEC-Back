CREATE TABLE client (
    id_client SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE client_binnacle (
    id_client_binnacle SERIAL PRIMARY KEY,
    operation VARCHAR(100) NOT NULL,
    name_table varchar(110) NOT NULL,
    timestamp timestamp NULL,
	id_client INT DEFAULT NULL,
	FOREIGN KEY (id_client) REFERENCES client(id_client)
);

CREATE TABLE binnacle (
    id_binnacle SERIAL PRIMARY KEY,
    operation VARCHAR(100) NOT NULL,
    name_table varchar(110) NOT NULL,
    timestamp timestamp NULL,
);

CREATE TABLE home (
    id_home SERIAL PRIMARY KEY,
    id_client INT NOT NULL,
	stratum INT NOT NULL,
	FOREIGN KEY (id_client) REFERENCES client(id_client)
);

CREATE TABLE device (
    id_devices SERIAL PRIMARY KEY NOT NULL,
    id_home INT NOT NULL,
    name VARCHAR(25) NOT NULL,
    time_on INT NOT NULL,
    expent INT NOT NULL,
	FOREIGN KEY (id_home) REFERENCES home(id_home)
);

CREATE TABLE bill (
    id_bill varchar(110) PRIMARY KEY NOT NULL,
    id_home INT NOT NULL,
    price_kw FLOAT NOT NULL,
    emition_date TIMESTAMP NOT NULL,
	FOREIGN KEY (id_home) REFERENCES home(id_home)
);


INSERT INTO client (name, email, password)
VALUES 
('Samuel Ortega', 'samuel.ortega@example.com', 'password123'),
('Maria Perez', 'maria.perez@example.com', 'passMaria2023'),
('Juan Garcia', 'juan.garcia@example.com', 'juanSecurePass');

INSERT INTO home (id_client, stratum)
VALUES
(1, 3), -- El cliente con id_client = 1 es Samuel Ortega
(2, 4), -- El cliente con id_client = 2 es Maria Perez
(3, 2); -- El cliente con id_client = 3 es Juan Garcia

select * from device;
INSERT INTO device (id_home, name, time_on, expent)
VALUES
(1, 'Lavadora', 120, 1500), -- Dispositivo de Samuel Ortega
(1, 'Refrigerador', 1440, 2000), -- Dispositivo de Samuel Ortega
(2, 'Televisor', 300, 500), -- Dispositivo de Maria Perez
(3, 'Microondas', 45, 800); -- Dispositivo de Juan Garcia

INSERT INTO bill (id_bill, id_home, price_kw, emition_date)
VALUES
('BILL001', 1, 150.75, '2024-08-01 10:00:00'), -- Factura de Samuel Ortega
('BILL002', 2, 130.50, '2024-08-10 09:30:00'), -- Factura de Maria Perez
('BILL003', 3, 100.25, '2024-08-20 14:15:00'); -- Factura de Juan Garcia


INSERT INTO binnacle (operation, name_table, timestampt, id_client)
VALUES
('INSERT', 'client', NOW(), 1), -- Operación de inserción realizada por Samuel Ortega
('INSERT', 'devices', NOW(), 2), -- Operación de inserción realizada por Maria Perez
('UPDATE', 'home', NOW(), 3); -- Operación de actualización realizada por Juan Garcia
