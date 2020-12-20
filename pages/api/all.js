import { openDB, closeDB } from "../../utils/db";

export default async function all(req, res) {
	let db = await openDB();
	const secrets = await db.get("SELECT * from Secrets");
	await closeDB(db);
	res.json(secrets);
}