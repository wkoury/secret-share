-- Up
CREATE TABLE Secrets (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	secret TEXT,
	uuid TEXT
);

INSERT INTO Secrets (secret, uuid) values ("secret", "uuid");
INSERT INTO Secrets (secret, uuid) values ("anothersecrets", "anotheruuid");

-- Down
DROP TABLE Secret;