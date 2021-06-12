const express = require('express')
const router = express.Router()
const Interview = require("../models/interview")
const Candidate = require("../models/candidate")

router.get("/users",async (req,res)=>{
	console.log('Here!')
	await Candidate.find({},async (err,result)=>{
		await res.render('candidates', {
			array: result
		})
	})
})

router.post("/users",async (req,res)=>{
	const start_time = req.query.startTime
	const end_time = req.query.endTime 
	const user_name = req.query.username
	Interview.find({userName:req.query.username,date:new Date(req.query.date)},async (err,result)=>{
		let already_scheduled = false
		result.forEach((item)=>{
			console.log(start_time,end_time,item.startTime,item.endTime)
			if((end_time > item.startTime && end_time <= item.endTime) || (start_time < item.endTime && start_time >= item.startTime)){
				already_scheduled = true
			}
		})
		console.log(already_scheduled)
		if(!already_scheduled){
			const new_interview = new Interview({
				date:new Date(req.query.date),
				startTime:start_time,
				endTime:end_time,
				userName:user_name
			})
			await new_interview.save(async (err,result)=>{
				if(err)
					await res.status(404).send()
				else 
					await res.status(201).send()
				console.log('Inside save')
			})
		}else{
			await res.status(403).send()
		}
	})
})

module.exports = router