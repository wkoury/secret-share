import { getSecret } from "../../utils/db";

export default async function receive(req, res) {
	const uuid = req.query.uuid;
	
	await getSecret(uuid).then(secret => {
		if(secret !== -1){
			res.json({secret: secret});
		}else{
			res.json({secret: "", DNE: true});
		}
	});
}