import { createSecret } from "../../utils/db";
var id = require("nodejs-unique-numeric-id-generator");

export default async function send(req, res) {
	const uuid = id.generate(new Date().toJSON());
	const secret = req.body.secret;

	await createSecret(secret, uuid);

	res.status(200).json({uuid: uuid});
}
