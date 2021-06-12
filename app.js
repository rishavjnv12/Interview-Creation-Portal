const path = require("path");
const mongoose = require("mongoose");
const Candidate = require("./models/candidate");
const Interview = require('./models/interview')
const express = require("express");
const hbs = require("hbs");

const app = express();
const publicDirectoryPath = path.join(__dirname, "./public");
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));

app.use(express.static(publicDirectoryPath));

// Database Connection
mongoose.connect("mongodb+srv://rishavjnv12:rishavjnv12@cluster0.vlycn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});



app.post("/create",async (req, res) => {
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

app.get("/create",async (req,res)=>{
	await res.render('create')
})

app.get("/users",async (req,res)=>{
	console.log('Here!')
	await Candidate.find({},async (err,result)=>{
		await res.render('candidates', {
			array: result
		})
	})
})

app.post("/users",async (req,res)=>{
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


app.get("/interview",async (req,res)=>{
	await Interview.find({},async (err,result)=>{
		result.forEach((item)=>{
			item.dateString = item.date.toString().substring(0,15)
		})
		await res.render('interview', {
			array: result,
		})
	})
})

app.post("/interview",async (req,res)=>{
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

app.get('/',async (req,res)=>{
	await res.render('index')
})


app.listen(port, () => {
  console.log("Server is up on port " + port);
});
