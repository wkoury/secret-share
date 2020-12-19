
export default function receive(req, res) {
	res.json({secret: req.query.uuid});
}