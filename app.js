const express = require('express');
const app = express()
const cors = require('cors')
const Donar_register = require("./routes/Register/Donar_register.route");
const blogsRouter = require("./routes/blogs/blogs.route");
const userRouter = require("./routes/auth/user.route");
const userRegister = require("./routes/Register/user_register.route");
const adminRouter = require("./routes/auth/admin.route");
const volunteerRouter = require("./routes/volunteer/volunteer.route");
const sliderRouter = require("./routes/slider/slider.route");
const colorRouter = require("./routes/color/color.route");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
//  router //////////////////////////////////////// 
app.use('/api/donar-register', Donar_register)

// users /////
app.use("/api/users", userRouter)
app.use("/api/users-register", userRegister)
//  blogs api 
app.use('/api/blogs', blogsRouter)
// admin 
app.use("/api/admin", adminRouter)

// volunteer 
app.use("/api/volunteer", volunteerRouter)

// slider
app.use("/api/slider", sliderRouter)



// colors 
app.use("/api/color", colorRouter)

module.exports = app