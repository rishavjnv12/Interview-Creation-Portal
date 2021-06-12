const path = require("path");
const mongoose = require("mongoose")
const express = require("express");
const hbs = require("hbs");

const app = express();
const publicDirectoryPath = path.join(__dirname, "./public")
const port = process.env.PORT || 3000

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"))
app.use(express.static(publicDirectoryPath))

const createRouter = require('./routers/create.js')
const interviewRouter = require('./routers/interview.js')
const usersRouter = require('./routers/users.js')
app.use(createRouter)
app.use(interviewRouter)
app.use(usersRouter)

// Database Connection
mongoose.connect("mongodb+srv://rishavjnv12:rishavjnv12@cluster0.vlycn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});



app.get('/',async (req,res)=>{
	await res.render('index')
})


app.listen(port, () => {
  console.log("Server is up on port " + port);
});
