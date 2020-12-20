import sqlite3 from "sqlite3";
import { openDB, closeDB } from "../../utils/db";

export default function all(req, res) {
	let db = openDB();
	const secrets = db.all("select * from Secrets");
	res.json(secrets);
}