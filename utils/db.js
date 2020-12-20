const sqlite3 = require("sqlite3");

const DATABASE_PATH = "./db/secrets.db";

const openDB = () => {
	let db = new sqlite3.Database(DATABASE_PATH, sqlite3.OPEN_READWRITE, (err) => {
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

const createSecret = (secret, uuid) => {
	let db = openDB();
	db.run(`INSERT into Secrets (secret, uuid) values ("${secret}", "${uuid}");`);
	closeDB(db);
}

const getSecret = (uuid) => {
	//every time you get a secret, it must be destroyed
	let db = openDB();
	let sql = `SELECT secret FROM Secrets WHERE uuid = "${uuid}"`;

	return new Promise(function(resolve, reject) {
		db.get(sql, (err, row) => {
			if(err) return console.error(err.stack);
	
			sql = `DELETE FROM Secrets WHERE uuid = "${uuid}"`;
			db.run(sql, (err) => {
				if(err) return console.error(err.stack);
			});
	
			closeDB(db);
			if(row){
				resolve(row.secret);
			}else{
				resolve(-1);
			}
		});
	})	
}

//export functions
module.exports = { createSecret, getSecret };
