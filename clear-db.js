//Run node clear-db.js when you need to clear the db file
const sqlite3 = require("sqlite3");

const openDB = () => {
	let db = new sqlite3.Database("./db/secrets.db", sqlite3.OPEN_READWRITE, (err) => {
		if (err) {
			console.error(err.message);
			return null;
		}
	});

	return db;
}

const closeDB = db => {
	db.close((err) => {
		if (err) {
			console.error(err.message);
			return false;
		}
	});

	return true;
}

const clearDB = () => {
	let db = openDB();
	db.run("DELETE FROM Secrets;");
	closeDB(db);
}

clearDB();
