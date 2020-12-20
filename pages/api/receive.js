import { getSecret } from "../../utils/db";

export default function receive(req, res) {
	const uuid = req.query.uuid;
	
	getSecret(uuid).then(secret => {
		if(secret !== -1){
			res.json({secret: secret});
		}else{
			res.json({secret: "", DNE: true});
		}
	});
}