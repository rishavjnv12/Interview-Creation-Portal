const express = require('express')
const router = express.Router()
const Interview = require("../models/interview")

router.get("/interview",async (req,res)=>{
	await Interview.find({},async (err,result)=>{
		result.forEach((item)=>{
			item.dateString = item.date.toString().substring(0,15)
		})
		await res.render('interview', {
			array: result,
		})
	})
})

router.post("/interview",async (req,res)=>{
	if(req.query.delete){
		console.log(req.query.id)
		await Interview.findByIdAndDelete(req.query.id,async (err,result)=>{
			if(err)
				await res.send(err)
			else 
				await res.send(result)
		})
	}else{
		await Interview.findById(req.query.id,async (err,result)=>{
			const userName = result.userName
			const newStartTime = req.query.newStartTime
			const newEndTime = req.query.newEndTime
			Interview.find({userName:userName,date:new Date(req.query.newDate)},async (err,result)=>{
				let already_scheduled = false
				result.forEach((item)=>{
					console.log(newStartTime,newEndTime,item.startTime,item.endTime)
					if((newEndTime > item.startTime && newEndTime <= item.endTime) || (newStartTime < item.endTime && newStartTime >= item.startTime)){
						already_scheduled = true
					}
				})
				if(!already_scheduled){
					Interview.findByIdAndUpdate(req.query.id,{startTime:newStartTime,endTime:newEndTime,date:new Date(req.query.newDate)},(err,result)=>{
						if(err)
							res.status(404).send()
						else {
							res.status(200).send()
						}
					})
				}else{
					res.status(403).send()
				}
			})
		})
	}
})

module.exports = router