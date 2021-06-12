const express = require('express')
const router = express.Router()
const Candidate = require("../models/candidate")

router.post("/create",async (req, res) => {
	console.log(req.query)
	const new_user = new Candidate({
		name: req.query.name,
		email: req.query.email,
		username: req.query.username
	});
	await new_user.save((err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
		}
	});
});

router.get("/create",async (req,res)=>{
	await res.render('create')
})

module.exports = router
